# NEXT — continuation checklist

Working state lives in `IDEA.md` (status log at the bottom). Dev server:
`npx astro dev --host 127.0.0.1 --port 4321` (free the port first if stuck —
see the personal-site skill). Preview for William: `desktop_preview` open
`http://127.0.0.1:4321/`.

## ⏳ Waiting on William (5-minute items)

- [x] **BotFather bot** — DONE 2026-10-22: @SirLiangWeb_bot. Token +
      chat_id (8258403217) saved in Desktop\Config\ (site-relay-bot-token.txt,
      site-relay-chat-id.txt). Test DM delivered ✓.
- [ ] **Cloudflare account** — dash.cloudflare.com, free plan, no card.
      Then: deploy worker/relay.js (already written, secrets via wrangler),
      set RELAY_URL in ChatWidget, restore widget as footer link.
- [x] **Mark Six + TamaDroid** — DONE 2026-10-22 as Automations cards
      ("Lottery Systems Lab" terminal with real 132-draw data; TamaDroid
      with real phone screenshot + demo links).
- [x] **Real contact email** — done 2026-10-22: Cue relay
      `cue-vmitjb@bot.cue.im` live on About + parked ChatWidget. LinkedIn via
      short link `is.gd/2iiRiX` (clean 301; tinyurl.com wraps links in a
      VigLink ad hop — avoided).

## 🚫 Off the site (William's call, 2026-10-22)

- **Kopi mention digest** — private tool only, never shown on the site.
- **Feasibility toolkit** — William builds it separately; not in this
  site's queue (may link to it when it exists).
- **Custom domain** — waits until there's "something plausible to show".

## 🤖 Chatbot (Phase B — next build session)

- [ ] **ChatWidget parked (2026-10-22, William: "affecting experience")** —
      component file kept at src/components/ChatWidget.astro; restore by
      re-adding `import ChatWidget` + `<ChatWidget />` in BaseLayout.astro.
      Redesign as a quieter affordance (e.g. a footer "Ask me" link that
      opens the panel) before it returns.
- [ ] Cloudflare Worker: POST /message → rate-limit → Telegram sendMessage to
      William's chat_id (secrets: bot token + chat id).
- [ ] Set `RELAY_URL` in `src/components/ChatWidget.astro`, test end-to-end.
- [ ] (Phase C, optional) LLM brain upgrade — replace `think()` only.

## 🌐 Website next steps

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
