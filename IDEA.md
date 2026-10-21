# My Website — Project Brief

Personal site for Sir Liang Ng (William) — hotel feasibility executive × AI hobbyist.
Core identity: "Hotel feasibility by day, AI tinkerer by night." The site's job is to
make that combination visible and credible.

## Audience
- Primary: recruiters, industry peers, conference organizers (professional thread)
- Secondary: AI/automation community and curious visitors (hobbyist threads)

## Three pillars
1. **Professional** (main thread) — bio, career timeline (Hyatt HK/Shanghai, AVANI),
   expertise in hotel feasibility & APAC hospitality real estate. Mostly static.
2. **AI Hobbyist mini-projects** — cards: what it does, stack, link to demo/repo.
   Includes the feasibility toolkit (interactive calculators) as a signature piece.
3. **Automations** — real workflows I run: SG haze PSI monitor for parents (Telegram),
   kopi-shop mention digest, etc. Show architecture + outcome, not just screenshots.

Plus a **writing section**, ready to fill — target a few posts a month on feasibility
practice, APAC hotel markets, and building automations as a non-developer.

## Site map (v1)
- `/` home — hero with the one-liner, links to the three pillars
- `/about` — bio, career timeline, contact
- `/projects` — AI mini-projects (cards)
- `/automations` — live workflows, with diagrams
- `/writing` — blog/essays, tag pages, RSS
- Contact reaches William without exposing his email to scrapers

## Build
- **Stack: Astro** — content-first, HTML-like components (learnable), markdown blog
  built in, near-zero JS by default → fast + great Lighthouse scores. Learning goal:
  William builds it WITH the assistant, understanding every line.
- Interactive bits (feasibility calculators) as small client-side islands, added later.
- Deploy: git push → Cloudflare Pages (or Netlify/GitHub Pages), custom domain.
- Dark/light theme toggle, saved preference. Lighthouse 90+ performance/accessibility.

## Phases
1. Skeleton + core pages (home, about, career timeline, contact)
2. Projects + automations sections, populated with existing real work
3. Writing module + first two posts
4. Feasibility toolkit page (RevPAR → value, stabilized yield, IRR sandbox)

## Status log
- 2026-10-21: Phase 1 complete. Astro 7.4 skeleton builds clean (5 pages).
  GitHub: account `ngsirliang-ai` (Google sign-in, NO password), repo
  `ngsirliang-ai.github.io` (public), gh CLI installed + authenticated,
  deploy workflow `withastro/action@v6` verified — build job green on CI.
- BLOCKER: GitHub auto-flagged the repo as spam (false positive; public page
  404, API "Not Found", push/actions fine). Support ticket text drafted in
  chat (William files from his own Edge at support.github.com/contact —
  automated filing blocked: Google blocks CDP browsers).
  Watchdog cron `site-unflag-finish` checks every 2h; on unflag it enables
  Pages + re-runs deploy + pings William.
- Local git identity: user.name "Sir Liang Ng", email 345438781+ngsirilang-ai@users.noreply.github.com
- Proxy needed for all github/npm traffic: http://127.0.0.1:7890
- Next after unflag: Phase 2 (projects/automations content), then design pass
  (skills: claude-design + popular-web-designs), then shader hero island.
- 2026-10-21 later: Manus projects exported to D:/Projects (13 dirs).
  Pushed as PRIVATE repos under ngsirliang-ai: hdb-stats, live-stats-test,
  reverse-engineer-anything, mark-six-predicter, games. Branch = master on
  these (export default), site repo = main.
- Site Projects pillar: first cards = HomeSignal (hdb-stats) + Singapore
  Pulse (live-stats-test). Sip Club (games) EXCLUDED from site by William's
  request (not mature) — stays in GitHub only. kopi-coffee not yet pushed.
- Planned feature: site chatbot relaying to William's Telegram — V1 relay
  (Cloudflare Worker + second BotFather bot; cannot reuse Jarv gateway bot,
  polling conflict), V2 LLM auto-responder, V3 two-way live.
- 2026-10-21 night session: About page voice pass (William's own jokes —
  Beerlao/sea urchin/George Clooney/handcuffs), departure-board timeline
  (hover-expand stops, click pins), real SVG flags in public/flags/ (Windows
  shows flag emoji as letter codes), Projects carousels + live-demo buttons,
  ChatWidget phase A (scripted site guide on all pages, connect form →
  mailto fallback; RELAY_URL empty until Worker). **Continuation checklist:
  NEXT.md** (top of repo).
