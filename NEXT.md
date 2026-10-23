# NEXT — continuation checklist

Working state lives in `IDEA.md` (status log at the bottom). Dev server:
`npx astro dev --host 127.0.0.1 --port 4321` (free the port first if stuck —
see the personal-site skill). Preview for William: `desktop_preview` open
`http://127.0.0.1:4321/`.

## ⏳ Waiting on William (5-minute items)

- [x] **BotFather bot** — DONE 2026-10-22: @SirLiangWeb_bot. Token +
      chat_id (8258403217) saved in Desktop\Config\ (site-relay-bot-token.txt,
      site-relay-chat-id.txt). Test DM delivered ✓.
- [x] **Cloudflare account + Worker** — DONE 2026-10-22: subdomain
      `ngsirliang.workers.dev` registered (wrangler's own register command
      crashes — did it via REST API with wrangler's stored OAuth token);
      worker published at **https://site-relay.ngsirliang.workers.dev/message**
      (wrangler.toml main=relay.js, name=site-relay); secrets BOT_TOKEN +
      CHAT_ID uploaded and listed; Telegram leg verified live (getMe +
      sendMessage ok). **NOTE: workers.dev is GFW-blocked — cannot test the
      worker URL from China even via Clash (routes direct). Visitors abroad
      reach it fine. To self-test: add Clash rule
      DOMAIN-SUFFIX,workers.dev → Proxy, or test from VPN.**
      RELAY_URL wired into the parked ChatWidget component.
- [x] **Mark Six + TamaDroid** — DONE 2026-10-22: Lottery Systems Lab card
      live on Automations (real 132-draw data). **Pixel Pet / AI Passport
      card REMOVED same day — William is rebuilding the project; card returns
      with an emulator screenshot once a firmware .bin exists.** For that
      future session: simulator cloned at D:\projects\folotoy-sim
      (`node server.mjs --allow-local-firmware-upload`, port 4190, upload
      merged .bin via 上传固件, keyboard ↑/↓/Enter/P), source at
      D:\projects\reverse-engineer-anything\ai-passport (build needs
      ESP-IDF + ROM text file supplied locally, see
      tools/generate_tama_rom.py).
- [x] **Real contact email** — done 2026-10-22: Cue relay
      `cue-vmitjb@bot.cue.im` live on About + parked ChatWidget. LinkedIn via
      short link `is.gd/2iiRiX` (clean 301; tinyurl.com wraps links in a
      VigLink ad hop — avoided).

## 🚫 Off the site (William's call, 2026-10-22)

- **Kopi mention digest** — private tool only, never shown on the site.
- **Feasibility toolkit** — William builds it separately; not in this
  site's queue (may link to it when it exists).
- **Custom domain** — waits until there's "something plausible to show".

## 🚑 Deploy pipeline quirk (2026-10-23)

- **Push events no longer trigger Actions** (started ~23:18 SGT Oct 22; probe
  commits ad6bb9c + 01c967e created zero runs; Actions off/on toggle via API
  didn't help; repo is public + not archived/disabled). Likely flag residue —
  **if still dead after 48h, file a GitHub support ticket**.
- **Stopgap in place**: `bash deploy.sh "message"` (repo root) = commit +
  push + `gh workflow run deploy.yml --ref main`. Every push must be
  followed by a manual dispatch or the live site won't update.
- Verify serving with: `curl -s https://ngsirliang-ai.github.io/ | grep -c chat-conv`
  (≥1 = current build live).

## 🤖 Chatbot (LIVE & VERIFIED 2026-10-23 — two-way, William confirmed)

- **Full loop working**: footer Ask me → connect → visitor messages hit
  William's Telegram via worker (KV threads, 24h TTL); William just TYPES
  in @SirLiangWeb_bot → routed to the newest active visitor ('current'
  seat) → widget polls /reply every 4s → "William:" bubble in ≤5-8s.
- **Routing model**: newest visitor to speak claims 'current'; flip is
  announced ("🔀 Now talking to X"); /sessions lists; /talk <id> switches;
  swipe-reply = surgical. Threads independent, expire 24h.
- **Resilience fixes shipped**: client-minted session id (lost responses
  can't orphan threads); 10s send timeout + graceful fallback to
  cue-vmitjb@bot.cue.im; polls skip own messages (no duplicates) and pause
  in hidden tabs; conversation + name persist in localStorage.
- **Lag is ~5-8s** (webhook 1-2s + 4s poll). Snappier options if ever
  wanted: 2s poll (more KV reads) or custom domain on the worker.
- [ ] (Phase C, optional) LLM brain upgrade — replace `think()` only.

## 🌐 Website next steps

- [x] Location medallions (2026-10-23): stop flags → circular photo crops
      (Wikimedia Commons, credits in `public/img/stops/CREDITS.json`),
      stacked coins in the stop headers; auditor stays unmedalled.

- [ ] Writing section: content collections + first post (William writes).
- [ ] Kopi digest card: REMOVED from plan (William: private only, 2026-10-22).
- [ ] Feasibility toolkit — William builds separately (off this queue).
- [ ] Fix live Singapore Pulse bug: forecast card renders `[object Object]`
      under "Thundery Showers" (in the Manus-hosted app / repo
      `live-stats-test`).
- [ ] Design pass (skills: claude-design + popular-web-designs).
      **Locked decision (William, 2026-10-22): Option 3 — dark-first brand.**
      Design the DARK theme as canonical (departure-board amber-on-black is
      the brand), derive light from it; keep prefers-color-scheme for first
      visit; add a sun/moon toggle in the header persisted to localStorage.
      **2026-10-22 audit (see DESIGN-AUDIT.md, JeV-graded):** naive auto-light
      scored 0.02/0.98 — worst element on the site. Revised: go DARK-ONLY
      until light is deliberately designed (v2), then add the toggle.
      Other P0s: hero value-prop headline, mobile clamps, mono board
      typography, unified project card surfaces.
- [ ] Shader hero island (shaders/js) — ONE effect, after design pass.
- [ ] Nice-to-have: OG/meta tags + preview image, favicon set, sitemap.

## ✅ Resolved 2026-10-22

- GitHub lifted the flag overnight. Repo renamed to match the account:
  `ngsirliang-ai/ngsirliang-ai.github.io` (old spelling 301-redirects, and
  `astro.config.mjs` site URL fixed to match).
  **SITE LIVE: https://ngsirliang-ai.github.io/** — all 5 pages 200,
  deploy-on-push verified green. Watchdog cron removed (job done).
  Note: Pages dashboard says build_type "legacy" but Actions deploys are
  what actually serves the built site — cosmetic, revisit only if a
  future deploy misbehaves.
- **Domain** — optional later: sirliangng.com (~US$12/yr) → point at Pages.

## 🗃️ Manus project repos (private, pushed)

hdb-stats · live-stats-test · reverse-engineer-anything · mark-six-predicter ·
games (Sip Club — **excluded from site until mature**, William's rule).
Not yet pushed: kopi-coffee (needs git init). Branches: master (these),
main (website).
- **lottery-systems-lab (PUBLIC, 2026-10-23)** — curated public release of
  mark-six-predicter at
  github.com/ngsirliang-ai/lottery-systems-lab (linked from the Automations
  card). Rebuilt via `mark-six-predicter/build-public.py` (latest script
  versions, dates → CLI args, no history/noise). Private original stays
  private — it contains `upload/apikeyjev.docx` (JEV API key doc) and
  `tmp/manus-config/` — **never flip it public**.
