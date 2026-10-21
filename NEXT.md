# NEXT — continuation checklist

Working state lives in `IDEA.md` (status log at the bottom). Dev server:
`npx astro dev --host 127.0.0.1 --port 4321` (free the port first if stuck —
see the personal-site skill). Preview for William: `desktop_preview` open
`http://127.0.0.1:4321/`.

## ⏳ Waiting on William (5-minute items)

- [ ] **BotFather bot** — in Telegram: @BotFather → `/newbot` → e.g.
      "William's Site Relay" → paste the token to Jarv. Then message the new
      bot once (any text) so it can DM you.
- [ ] **Cloudflare account** — dash.cloudflare.com, free plan, no card.
- [ ] **Mark Six predictor + TamaDroid cards** — need their Manus-hosted URLs
      (check the Creations gallery for `*.manus.space` links) or screenshots.
- [ ] **Real contact email** — About page + chatbot still use
      `hello@example.com` placeholder.
- [ ] **GitHub support ticket** — if the repo is still flagged after ~48h,
      file from your own Edge at support.github.com/contact (draft text is in
      the chat history / can be regenerated).

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
- [ ] Kopi-shop mention digest card on Automations (reuse TelegramMock).
- [ ] Feasibility toolkit page — the signature piece (RevPAR→value, IRR).
- [ ] Fix live Singapore Pulse bug: forecast card renders `[object Object]`
      under "Thundery Showers" (in the Manus-hosted app / repo
      `live-stats-test`).
- [ ] Design pass (skills: claude-design + popular-web-designs).
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
