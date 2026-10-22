// relay.js
var RATE_LIMIT = 5;
var WINDOW_MS = 60 * 60 * 1e3;
var relay_default = {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/message") {
      return new Response("Not found", { status: 404, headers: cors });
    }
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Bad request", { status: 400, headers: cors });
    }
    if (body.hp) return new Response("OK", { headers: cors });
    const name = String(body.name || "").slice(0, 80).trim();
    const text = String(body.text || "").slice(0, 2e3).trim();
    const page = String(body.page || "").slice(0, 120);
    if (!name || !text) return new Response("Missing fields", { status: 400, headers: cors });
    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const now = Date.now();
    RATE_BUCKETS[ip] = (RATE_BUCKETS[ip] || []).filter((t) => now - t < WINDOW_MS);
    if (RATE_BUCKETS[ip].length >= RATE_LIMIT) {
      return new Response("Too many messages", { status: 429, headers: cors });
    }
    RATE_BUCKETS[ip].push(now);
    const msg = `\u{1F4E9} Website message
From: ${name}
Page: ${page}

${text}`;
    const r = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.CHAT_ID, text: msg })
    });
    if (!r.ok) return new Response("Relay failed", { status: 502, headers: cors });
    return new Response("OK", { headers: cors });
  }
};
var RATE_BUCKETS = {};
export {
  relay_default as default
};
//# sourceMappingURL=relay.js.map
