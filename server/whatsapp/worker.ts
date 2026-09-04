import {
  incomingMessages, isAllowed, MAX_MESSAGE_AGE_MS, readBody, receiptKey, requireBotConfig, validSignature,
  type Environment,
} from './protocol';
import { generateReply, sendReply, SendError } from './reply';

export interface Receipt { status: 'sending' | 'sent' | 'uncertain'; createdAt: number }
export interface ReceiptStore {
  get(key: string, options: { type: 'json' }): Promise<Receipt | null>;
  setJSON(key: string, value: Receipt, options?: { onlyIfNew: boolean }): Promise<{ modified: boolean }>;
  delete(key: string): Promise<void>;
}

export function createWorker(env: Environment, getStore: () => ReceiptStore, fetcher: typeof fetch = fetch) {
  return async (request: Request): Promise<void> => {
    if (request.method !== 'POST' || env.WHATSAPP_BOT_ENABLED !== 'true') return;
    const body = await readBody(request);
    if (!validSignature(body, request.headers.get('x-hub-signature-256'), env.META_APP_SECRET || '')) return;
    requireBotConfig(env);
    const messages = incomingMessages(JSON.parse(body), env.WHATSAPP_PHONE_NUMBER_ID!);
    if (!messages.length) return;
    const store = getStore();
    let failed = false;
    for (const message of messages) {
      if (!isAllowed(message, env)) continue;
      const key = receiptKey(env.WHATSAPP_PHONE_NUMBER_ID!, message.id);
      try {
        const existing = await store.get(key, { type: 'json' });
        if (existing) {
          if (existing.status !== 'sent') console.warn('whatsapp_delivery_needs_review', { receipt: key });
          continue;
        }
        const text = await generateReply(message, env, fetcher);
        if (Date.now() - message.timestamp >= MAX_MESSAGE_AGE_MS) continue;
        // Atomic claim immediately before sending. Concurrent jobs may generate twice,
        // but only one can send. This survives cold starts and deploys.
        const { modified } = await store.setJSON(key, { status: 'sending', createdAt: Date.now() }, { onlyIfNew: true });
        if (!modified) continue;
        try {
          await sendReply(message, text, env, fetcher);
        } catch (error) {
          if (error instanceof SendError && error.definitelyRejected) {
            // Meta explicitly rejected the request, so a later attempt is safe.
            await store.delete(key);
          } else {
            // A timeout may occur AFTER Meta accepts the send. Do not resend blindly.
            await store.setJSON(key, { status: 'uncertain', createdAt: Date.now() });
            console.error('whatsapp_delivery_uncertain', { receipt: key });
          }
          throw error;
        }
        await store.setJSON(key, { status: 'sent', createdAt: Date.now() });
      } catch {
        failed = true;
        // No tokens, phone numbers, message text or provider response bodies in logs.
        console.error('whatsapp_reply_failed', { receipt: key });
      }
    }
    // Throw so Netlify's background retry mechanism can retry failed messages.
    if (failed) throw new Error('whatsapp_batch_failed');
  };
}
