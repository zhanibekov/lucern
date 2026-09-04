import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export type Environment = Record<string, string | undefined>;
export const MAX_BODY_BYTES = 200_000;
export const MAX_MESSAGE_AGE_MS = 23 * 60 * 60 * 1000;

export function matchesSecret(actual: string, expected: string): boolean {
  const a = Buffer.from(actual);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function validSignature(body: string, signature: string | null, secret: string): boolean {
  if (!secret || !signature || !/^sha256=[a-f0-9]{64}$/.test(signature)) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;
  return matchesSecret(signature, expected);
}

export async function readBody(request: Request): Promise<string> {
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error('payload_too_large');
    }
    chunks.push(value);
  }
  // Meta sends UTF-8 JSON; reject invalid UTF-8 instead of changing signed bytes.
  return new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks));
}

export interface IncomingMessage {
  id: string;
  from: string;
  timestamp: number;
  text: string;
}

const object = (value: unknown): Record<string, any> =>
  value !== null && typeof value === 'object' && !Array.isArray(value) ? value : {};
const array = (value: unknown): unknown[] => Array.isArray(value) ? value : [];

export function incomingMessages(payload: unknown, phoneId: string, now = Date.now()): IncomingMessage[] {
  const root = object(payload);
  if (root.object !== 'whatsapp_business_account' || !phoneId) return [];
  const messages: IncomingMessage[] = [];
  const seen = new Set<string>();
  for (const entry of array(root.entry)) {
    for (const change of array(object(entry).changes)) {
      const item = object(change);
      const value = object(item.value);
      if (item.field !== 'messages' || object(value.metadata).phone_number_id !== phoneId) continue;
      for (const raw of array(value.messages)) {
        const message = object(raw);
        const text = object(message.text).body;
        const timestamp = Number(message.timestamp) * 1000;
        if (message.type !== 'text' || typeof text !== 'string' || !text.trim()) continue;
        if (typeof message.id !== 'string' || !message.id || seen.has(message.id)) continue;
        if (typeof message.from !== 'string' || !/^\d{7,15}$/.test(message.from)) continue;
        if (!Number.isFinite(timestamp) || timestamp > now + 300_000 || now - timestamp >= MAX_MESSAGE_AGE_MS) continue;
        seen.add(message.id);
        messages.push({ id: message.id, from: message.from, timestamp, text: text.slice(0, 6000) });
      }
    }
  }
  return messages;
}

export function isAllowed(message: IncomingMessage, env: Environment): boolean {
  const allowed = (env.WHATSAPP_ALLOWED_NUMBERS || '').split(',').map(n => n.trim()).filter(Boolean);
  return allowed.length === 0 || allowed.includes(message.from);
}

export function receiptKey(phoneId: string, messageId: string): string {
  return createHash('sha256').update(`${phoneId}:${messageId}`).digest('hex');
}

export function requireBotConfig(env: Environment): void {
  for (const name of ['WHATSAPP_PHONE_NUMBER_ID', 'WHATSAPP_TOKEN', 'WHATSAPP_API_VERSION', 'OPENAI_API_KEY']) {
    if (!env[name]?.trim()) throw new Error(`missing_${name}`);
  }
  if (!/^\d+$/.test(env.WHATSAPP_PHONE_NUMBER_ID!)) throw new Error('invalid_phone_id');
  if (!/^v\d+\.\d+$/.test(env.WHATSAPP_API_VERSION!)) throw new Error('invalid_api_version');
}
