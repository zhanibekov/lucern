import {
  incomingMessages, isAllowed, matchesSecret, readBody, requireBotConfig, validSignature,
  type Environment,
} from '../../server/whatsapp/protocol';

interface SiteContext { site: { url: string } }

export function createWebhook(env: Environment, fetcher: typeof fetch = fetch) {
  return async (request: Request, context: SiteContext): Promise<Response> => {
    const respond = (text: string, status = 200) => new Response(text, {
      status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
    if (request.method === 'GET') {
      if (!env.WHATSAPP_VERIFY_TOKEN) return respond('Webhook not configured', 503);
      const query = new URL(request.url).searchParams;
      const token = query.get('hub.verify_token') || '';
      const challenge = query.get('hub.challenge');
      if (query.get('hub.mode') !== 'subscribe' || !challenge ||
          !matchesSecret(token, env.WHATSAPP_VERIFY_TOKEN)) return respond('Forbidden', 403);
      return respond(challenge);
    }
    if (request.method !== 'POST') return new Response('Method not allowed', {
      status: 405, headers: { Allow: 'GET, POST' },
    });
    if (!env.META_APP_SECRET) return respond('Webhook not configured', 503);

    let body: string;
    try { body = await readBody(request); }
    catch { return respond('Invalid or oversized payload', 413); }
    const signature = request.headers.get('x-hub-signature-256');
    if (!validSignature(body, signature, env.META_APP_SECRET)) return respond('Forbidden', 403);
    let payload: unknown;
    try { payload = JSON.parse(body); }
    catch { return respond('Invalid JSON', 400); }
    if (env.WHATSAPP_BOT_ENABLED !== 'true') return respond('EVENT_RECEIVED');

    try {
      requireBotConfig(env);
      const messages = incomingMessages(payload, env.WHATSAPP_PHONE_NUMBER_ID!);
      if (!messages.some(message => isAllowed(message, env))) return respond('EVENT_RECEIVED');
      // Use Netlify's trusted site metadata, never the incoming Host header.
      const workerUrl = new URL('/.netlify/functions/whatsapp-reply-background', context.site.url);
      if (workerUrl.protocol !== 'https:' && env.NETLIFY_DEV !== 'true') throw new Error('invalid_site_url');
      const queued = await fetcher(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hub-signature-256': signature! },
        body,
        redirect: 'error',
        signal: AbortSignal.timeout(4000),
      });
      // A 200 HTML SPA fallback is NOT proof that the job was queued.
      if (queued.status !== 202) throw new Error('worker_not_queued');
      return respond('EVENT_RECEIVED');
    } catch {
      console.error('whatsapp_webhook_queue_failed: check function configuration and worker deployment');
      return respond('Temporarily unavailable', 503);
    }
  };
}

export default async (request: Request, context: SiteContext) => createWebhook(process.env)(request, context);
