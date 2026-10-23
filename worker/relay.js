// Site relay worker — V3: TWO-WAY chat between site visitors and William.
//
// Endpoints:
//   POST /message  {name, text, page?, sid?}   visitor sends a message
//              → stored in KV thread + forwarded to William's Telegram
//   GET  /reply?sid=X                          visitor polls for William's replies
//   POST /telegram                             Telegram webhook: William swipe-replies
//              to a visitor message → mapped back to that visitor's thread
//
// Storage: KV namespace SESSIONS (free tier).
//   chat:<sid>            JSON array of {who, name?, text, t}, TTL 24h, last 50 kept
//   tgmap:<message_id>    sid that Telegram message belongs to, TTL 24h
//
// Secrets (never in code): BOT_TOKEN, CHAT_ID, WEBHOOK_SECRET.

const RATE_LIMIT = 8; // per hour per IP
const WINDOW_MS = 60 * 60 * 1000;
const SITE_ORIGIN = 'https://ngsirliang-ai.github.io';
const DEV_ORIGINS = ['http://127.0.0.1:4321', 'http://localhost:4321'];
const RATE_BUCKETS = {};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);

    // ── Telegram webhook: William's replies come in here ──────────
    if (request.method === 'POST' && url.pathname === '/telegram') {
      if (request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== env.WEBHOOK_SECRET)
        return new Response('forbidden', { status: 403 });
      const update = await request.json().catch(() => null);
      const msg = update && update.message;
      if (msg && msg.text && msg.chat && msg.chat.id === Number(env.CHAT_ID)) {
        const text = msg.text.trim();
        const refId = msg.reply_to_message && msg.reply_to_message.message_id;
        let sid = refId ? await env.SESSIONS.get('tgmap:' + refId) : null;
        let via = 'reply'; // swipe-reply = exact targeting, always wins

        // /talk <id> — switch who you're talking to
        if (!sid && text.startsWith('/talk ')) {
          const want = text.split(/\s+/)[1] || '';
          if (/^[a-z0-9]{6,32}$/i.test(want) && (await env.SESSIONS.get('chat:' + want))) {
            await env.SESSIONS.put('current', want, { expirationTtl: 86400 });
            const thread = JSON.parse((await env.SESSIONS.get('chat:' + want)) || '[]');
            const name = ((thread.find(m => m.who === 'visitor') || {}).name) || want;
            await tgSend(env, env.CHAT_ID, `Now talking to ${name} (${want}). Just type — your messages go to their site chat.`);
          } else {
            await tgSend(env, env.CHAT_ID, `No open chat called "${want}". Use /sessions to list recent visitors.`);
          }
          return new Response('OK');
        }

        // /sessions — list recent visitor chats
        if (!sid && text === '/sessions') {
          const recent = JSON.parse((await env.SESSIONS.get('recent')) || '[]');
          if (!recent.length) {
            await tgSend(env, env.CHAT_ID, 'No visitor chats yet.');
            return new Response('OK');
          }
          const current = await env.SESSIONS.get('current');
          const lines = [];
          for (const r of recent.slice(0, 10)) {
            const thread = JSON.parse((await env.SESSIONS.get('chat:' + r.sid)) || '[]');
            const v = [...thread].reverse().find(m => m.who === 'visitor');
            const mark = r.sid === current ? '▶ ' : '';
            const when = new Date(r.t).toLocaleString('en-SG', { timeZone: 'Asia/Singapore' });
            lines.push(`${mark}${(v && v.name) || '?'} (${r.sid}) — ${when}`);
          }
          await tgSend(env, env.CHAT_ID, 'Recent visitor chats:\n' + lines.join('\n') +
            '\n\n/talk <id> to switch · just type to reply · swipe-reply targets exactly.');
          return new Response('OK');
        }

        // Plain text: route to the session you're in, else the newest one
        if (!sid) { sid = await env.SESSIONS.get('current'); if (sid) via = 'current'; }
        if (!sid) {
          const recent = JSON.parse((await env.SESSIONS.get('recent')) || '[]');
          if (recent.length) { sid = recent[0].sid; via = 'latest'; }
        }

        if (sid) {
          await appendMsg(env, sid, { who: 'william', text: text.slice(0, 2000), t: Date.now() });
          if (via !== 'reply') await env.SESSIONS.put('current', sid, { expirationTtl: 86400 });
          if (via === 'latest') {
            const thread = JSON.parse((await env.SESSIONS.get('chat:' + sid)) || '[]');
            const v = (thread.find(m => m.who === 'visitor') || {});
            await tgSend(env, env.CHAT_ID, `(routing to ${v.name || sid} — /sessions to switch)`);
          }
        } else {
          // Nobody is chatting: help, but at most once per 10 minutes
          const lastHelp = Number((await env.SESSIONS.get('help:ts')) || 0);
          if (Date.now() - lastHelp > 600000) {
            await env.SESSIONS.put('help:ts', String(Date.now()), { expirationTtl: 3600 });
            await tgSend(env, env.CHAT_ID, 'No visitor is chatting right now. When someone writes from the site, their message lands here — just type your reply and I route it to them. /sessions lists recent chats.');
          }
        }
      }
      return new Response('OK');
    }

    // ── Visitor sends a message ───────────────────────────────────
    if (request.method === 'POST' && url.pathname === '/message') {
      const origin = request.headers.get('Origin') || '';
      const dev = DEV_ORIGINS.some((d) => origin.startsWith(d));
      if (origin && origin !== SITE_ORIGIN && !dev)
        return json({ error: 'forbidden origin' }, 403);

      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const now = Date.now();
      RATE_BUCKETS[ip] = (RATE_BUCKETS[ip] || []).filter((t) => now - t < WINDOW_MS);
      if (RATE_BUCKETS[ip].length >= RATE_LIMIT)
        return json({ error: 'too many messages — try again later' }, 429);
      RATE_BUCKETS[ip].push(now);

      const body = await request.json().catch(() => null);
      if (!body) return json({ error: 'invalid JSON' }, 400);
      if (body.hp) return json({ ok: true }); // honeypot — silently drop bots

      const name = String(body.name || '').slice(0, 80).trim();
      const text = String(body.text || '').slice(0, 2000).trim();
      const page = String(body.page || '').slice(0, 120);
      if (!name || !text) return json({ error: 'name and text are required' }, 400);

      // Reuse the visitor's session if they have one, else mint one.
      let sid = /^[a-z0-9]{6,32}$/i.test(String(body.sid || '')) ? body.sid : null;
      if (!sid) sid = crypto.randomUUID().replace(/-/g, '').slice(0, 10);

      await appendMsg(env, sid, { who: 'visitor', name, text, page, t: now });

      // Track recent sessions for /sessions and default reply routing.
      // The newest visitor to speak becomes 'current' — William's plain-text
      // replies follow the latest active conversation.
      const prevCurrent = await env.SESSIONS.get('current');
      const recent = JSON.parse((await env.SESSIONS.get('recent')) || '[]');
      await env.SESSIONS.put('recent',
        JSON.stringify([{ sid, t: now }, ...recent.filter(r => r.sid !== sid)].slice(0, 10)),
        { expirationTtl: 86400 });
      if (prevCurrent !== sid)
        await env.SESSIONS.put('current', sid, { expirationTtl: 86400 });

      const sent = await tgSend(env, env.CHAT_ID,
        `📩 ${name} (chat ${sid})\nPage: ${page}\n\n${text}\n\n— to answer: just type in this chat (goes to ${name}), or swipe-reply here to target exactly`);
      if (prevCurrent && prevCurrent !== sid)
        await tgSend(env, env.CHAT_ID, `🔀 Now talking to ${name} (${sid}) — /sessions to switch.`);
      if (sent && sent.ok && sent.result)
        await env.SESSIONS.put('tgmap:' + sent.result.message_id, sid, { expirationTtl: 86400 });

      return json({ ok: true, sid });
    }

    // ── Visitor polls for William's replies ───────────────────────
    if (request.method === 'GET' && url.pathname === '/reply') {
      const sid = url.searchParams.get('sid') || '';
      if (!/^[a-z0-9]{6,32}$/i.test(sid)) return json({ error: 'bad sid' }, 400);
      const thread = JSON.parse((await env.SESSIONS.get('chat:' + sid)) || '[]');
      return json({ ok: true, messages: thread });
    }

    return new Response('Not found', { status: 404, headers: CORS });
  },
};

// Append to a session thread, keeping the last 50 messages, TTL 24h.
async function appendMsg(env, sid, entry) {
  const key = 'chat:' + sid;
  const thread = JSON.parse((await env.SESSIONS.get(key)) || '[]');
  thread.push(entry);
  await env.SESSIONS.put(key, JSON.stringify(thread.slice(-50)), { expirationTtl: 86400 });
}

async function tgSend(env, chatId, text) {
  const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  return r.json().catch(() => null);
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}
