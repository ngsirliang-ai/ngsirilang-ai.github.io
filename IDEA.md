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
