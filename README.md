# Sir Liang Ng — personal site

Hotel feasibility by day, AI tinkerer by night.
Built with [Astro](https://astro.build), hosted free on GitHub Pages.

**Live site:** https://ngsirliang-ai.github.io/

## Run it locally

```bash
npm install     # first time only
npm run dev     # dev server → http://localhost:4321
npm run build   # production build → dist/
npm run preview # serve the production build locally
```

## Folder tour (the 2-minute version)

| Path | What it is |
|---|---|
| `src/pages/` | **One file = one URL.** `index.astro` → `/`, `about.astro` → `/about/` |
| `src/layouts/BaseLayout.astro` | Shared shell every page wraps in (nav, footer, styles) |
| `src/styles/global.css` | All styling — one readable file, design tokens at the top |
| `public/` | Files served as-is (favicon today, images later) |
| `astro.config.mjs` | Site URL + GitHub Pages `base` setting |
| `.github/workflows/deploy.yml` | Auto-deploys to GitHub Pages on every push to `main` |

## Deploy (one-time setup)

1. Create an empty repo on GitHub, then push this folder to it.
2. Repo → **Settings → Pages → Source: "GitHub Actions"**.
3. Push to `main` — the site goes live a minute later.

URL depends on the repo name — see the comments in `astro.config.mjs`:
- repo `<username>.github.io` → `https://<username>.github.io/`
- repo `anything-else` → `https://<username>.github.io/anything-else/`

## Roadmap

See [IDEA.md](./IDEA.md) for the full brief: three pillars, a writing
section, feasibility calculators, and a proper design pass.
