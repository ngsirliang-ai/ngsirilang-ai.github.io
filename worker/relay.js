// Site relay worker — Phase B of the site guide.
// Deploy target: Cloudflare Workers (free plan). Secrets (never in code):
//   BOT_TOKEN  — from @BotFather (stored at Desktop\Config\site-relay-bot-token.txt)
//   CHAT_ID    — William's private chat (Desktop\Config\site-relay-chat-id.txt)
//
// POST /message  { name, text, page }  → Telegram DM to William
// Simple spam guard: 5 messages / hour per IP via a sliding window.

const RATE_LIMIT = 5; // per hour
const WINDOW_MS = 60 * 60 * 1000;

export default {
  async fetch(request, env) {
    // CORS: allow the site (and localhost during testing)
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/message') {
      return new Response('Not found', { status: 404, headers: cors });
    }

    // Honeypot: real visitors never fill this hidden field
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Bad request', { status: 400, headers: cors });
    }
    if (body.hp) return new Response('OK', { headers: cors }); // silently drop bots

    const name = String(body.name || '').slice(0, 80).trim();
    const text = String(body.text || '').slice(0, 2000).trim();
    const page = String(body.page || '').slice(0, 120);
    if (!name || !text) return new Response('Missing fields', { status: 400, headers: cors });

    // Rate limit per IP (best-effort, in-memory per isolate)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    RATE_BUCKETS[ip] = (RATE_BUCKETS[ip] || []).filter((t) => now - t < WINDOW_MS);
    if (RATE_BUCKETS[ip].length >= RATE_LIMIT) {
      return new Response('Too many messages', { status: 429, headers: cors });
    }
    RATE_BUCKETS[ip].push(now);

    const msg =
      `📩 Website message\n` +
      `From: ${name}\n` +
      `Page: ${page}\n\n` +
      `${text}`;
    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: msg }),
    });
    if (!r.ok) return new Response('Relay failed', { status: 502, headers: cors });
    return new Response('OK', { headers: cors });
  },
};

const RATE_BUCKETS = {};
