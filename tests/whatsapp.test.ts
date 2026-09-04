import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';
import { createWebhook } from '../netlify/functions/whatsapp';
import { createWorker, type Receipt, type ReceiptStore } from '../server/whatsapp/worker';
import { incomingMessages, MAX_BODY_BYTES, receiptKey } from '../server/whatsapp/protocol';
import { instructions } from '../server/whatsapp/reply';

const env = {
  WHATSAPP_VERIFY_TOKEN: 'test-verify', META_APP_SECRET: 'test-secret',
  WHATSAPP_BOT_ENABLED: 'true', WHATSAPP_TOKEN: 'test-token',
  WHATSAPP_PHONE_NUMBER_ID: '123456', WHATSAPP_API_VERSION: 'v25.0', OPENAI_API_KEY: 'test-key',
};
const context = { site: { url: 'https://example.netlify.app' } };
const message = (id = 'wamid.test') => ({ id, from: '77010000000', type: 'text',
  timestamp: String(Math.floor(Date.now() / 1000)), text: { body: 'Какая фасовка?' } });
const payload = (messages: unknown[] = [message()]) => ({ object: 'whatsapp_business_account',
  entry: [{ changes: [{ field: 'messages', value: { metadata: { phone_number_id: '123456' }, messages } }] }] });
function signed(value: unknown = payload(), secret = env.META_APP_SECRET): Request {
  const body = typeof value === 'string' ? value : JSON.stringify(value);
  return new Request('https://untrusted.example/.netlify/functions/whatsapp', {
    method: 'POST', body, headers: { 'x-hub-signature-256': `sha256=${createHmac('sha256', secret).update(body).digest('hex')}` },
  });
}
const neverFetch: typeof fetch = async () => { throw new Error('Unexpected network request'); };
class MemoryStore implements ReceiptStore {
  values = new Map<string, Receipt>();
  async get(key: string) { return this.values.get(key) || null; }
  async setJSON(key: string, value: Receipt, options?: { onlyIfNew: boolean }) {
    if (options?.onlyIfNew && this.values.has(key)) return { modified: false };
    this.values.set(key, value);
    return { modified: true };
  }
  async delete(key: string) { this.values.delete(key); }
}
function providers(send: () => Promise<Response> = async () => Response.json({ messages: [{ id: 'outgoing' }] })) {
  const calls: Array<{ url: string; body: any }> = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = String(input);
    calls.push({ url, body: JSON.parse(String(init?.body)) });
    if (url === 'https://api.openai.com/v1/responses') return Response.json({ status: 'completed', output: [
      { type: 'reasoning', summary: [] },
      { type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'Есть фасовка 1, 5, 10, 25 и 50 кг.' }] },
    ] });
    assert.equal(url, 'https://graph.facebook.com/v25.0/123456/messages');
    return send();
  };
  return { calls, fetcher };
}

test('GET verifies only a matching token and returns the exact challenge', async () => {
  const handler = createWebhook(env, neverFetch);
  const response = await handler(new Request('https://example.test/?hub.mode=subscribe&hub.verify_token=test-verify&hub.challenge=12345'), context);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), '12345');
  assert.equal((await handler(new Request('https://example.test/?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=12345'), context)).status, 403);
  assert.equal((await createWebhook({})(new Request('https://example.test/'), context)).status, 503);
});

test('POST rejects forged signatures, malformed JSON, oversized bodies and other methods', async () => {
  const handler = createWebhook(env, neverFetch);
  assert.equal((await handler(signed(payload(), 'wrong'), context)).status, 403);
  assert.equal((await handler(new Request('https://x.test/', { method: 'POST', body: '{}' }), context)).status, 403);
  assert.equal((await handler(signed('{broken'), context)).status, 400);
  assert.equal((await handler(signed('x'.repeat(MAX_BODY_BYTES + 1)), context)).status, 413);
  assert.equal((await handler(new Request('https://x.test/', { method: 'DELETE' }), context)).status, 405);
});

test('disabled bot, statuses and disallowed senders never queue work', async () => {
  assert.equal((await createWebhook({ ...env, WHATSAPP_BOT_ENABLED: 'false' }, neverFetch)(signed(), context)).status, 200);
  assert.equal((await createWebhook(env, neverFetch)(signed(payload([])), context)).status, 200);
  assert.equal((await createWebhook({ ...env, WHATSAPP_ALLOWED_NUMBERS: '77020000000' }, neverFetch)(signed(), context)).status, 200);
});

test('webhook forwards intact signed bytes to the trusted site and requires a queue receipt', async () => {
  const body = JSON.stringify(payload());
  const handler = createWebhook(env, async (url, init) => {
    assert.equal(String(url), 'https://example.netlify.app/.netlify/functions/whatsapp-reply-background');
    assert.equal(init?.body, body);
    assert.equal(init?.redirect, 'error');
    assert.ok(new Headers(init?.headers).get('x-hub-signature-256'));
    return new Response(null, { status: 202 });
  });
  assert.equal((await handler(signed(body), context)).status, 200);
  for (const status of [200, 500]) {
    assert.equal((await createWebhook(env, async () => new Response('<html>', { status }))(signed(), context)).status, 503);
  }
});

test('parser reads all entries, filters account, media, stale and malformed messages', () => {
  const data = payload([message('one'), message('one'), { ...message('old'), timestamp: '1' },
    { ...message('image'), type: 'image' }, { ...message('invalid'), from: 'no-number' }, null]);
  data.entry.push(payload([message('two')]).entry[0]);
  assert.deepEqual(incomingMessages(data, env.WHATSAPP_PHONE_NUMBER_ID).map(m => m.id), ['one', 'two']);
  assert.deepEqual(incomingMessages(data, 'other-phone'), []);
  assert.deepEqual(incomingMessages(null, '123456'), []);
});

test('worker uses catalog instructions, sends to original sender and skips completed duplicates', async () => {
  const store = new MemoryStore();
  const { fetcher, calls } = providers();
  const worker = createWorker(env, () => store, fetcher);
  await worker(signed());
  await worker(signed());
  assert.equal(calls.length, 2);
  assert.equal(calls[0].body.store, false);
  assert.equal(calls[0].body.input[0].content, 'Какая фасовка?');
  assert.equal(calls[1].body.to, '77010000000');
  assert.equal(calls[1].body.context.message_id, 'wamid.test');
  assert.equal(calls[1].body.text.body, 'Есть фасовка 1, 5, 10, 25 и 50 кг.');
  assert.match(instructions(), /Цена по запросу у менеджера/);
  assert.equal(store.values.get(receiptKey('123456', 'wamid.test'))?.status, 'sent');
});

test('simultaneous duplicate workers perform only one WhatsApp send', async () => {
  const store = new MemoryStore();
  const { fetcher, calls } = providers();
  const worker = createWorker(env, () => store, fetcher);
  await Promise.all([worker(signed()), worker(signed())]);
  assert.equal(calls.filter(c => c.url.includes('graph.facebook.com')).length, 1);
});

test('direct worker requests also require a signature and obey the allowlist', async () => {
  const store = new MemoryStore();
  await createWorker(env, () => store, neverFetch)(signed(payload(), 'forged'));
  await createWorker({ ...env, WHATSAPP_ALLOWED_NUMBERS: '77020000000' }, () => store, neverFetch)(signed());
  assert.equal(store.values.size, 0);
});

test('AI errors remain retryable without creating a send receipt', async () => {
  const store = new MemoryStore();
  await assert.rejects(createWorker(env, () => store, async () => Response.json({}, { status: 429 }))(signed()));
  assert.equal(store.values.size, 0);
  const { fetcher, calls } = providers();
  await createWorker(env, () => store, fetcher)(signed());
  assert.equal(calls.length, 2);
});

test('explicit WhatsApp rejection can retry; uncertain network delivery cannot duplicate', async () => {
  const rejectedStore = new MemoryStore();
  const rejected = providers(async () => Response.json({}, { status: 429 }));
  await assert.rejects(createWorker(env, () => rejectedStore, rejected.fetcher)(signed()));
  assert.equal(rejectedStore.values.size, 0);
  const uncertainStore = new MemoryStore();
  const uncertain = providers(async () => { throw new Error('network timeout'); });
  const worker = createWorker(env, () => uncertainStore, uncertain.fetcher);
  await assert.rejects(worker(signed()));
  await worker(signed());
  assert.equal(uncertain.calls.filter(c => c.url.includes('graph.facebook.com')).length, 1);
  assert.equal([...uncertainStore.values.values()][0].status, 'uncertain');
});

test('a failed item does not prevent the rest of a webhook batch from being answered', async () => {
  const store = new MemoryStore();
  const successful = providers();
  let first = true;
  const fetcher: typeof fetch = async (url, init) => {
    if (first) { first = false; return Response.json({}, { status: 503 }); }
    return successful.fetcher(url, init);
  };
  await assert.rejects(createWorker(env, () => store, fetcher)(signed(payload([message('first'), message('second')]))));
  assert.equal(store.values.size, 1);
  assert.equal(store.values.get(receiptKey('123456', 'second'))?.status, 'sent');
});
