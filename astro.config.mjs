// @ts-check
import { defineConfig } from 'astro/config';

// ── GitHub Pages setup ────────────────────────────────────────────────
// Case 1 — repo named `<username>.github.io`
//   URL: https://<username>.github.io/          → leave `base` unset
// Case 2 — repo named anything else (e.g. `my-website`)
//   URL: https://<username>.github.io/<repo>/   → uncomment base below
// Case 3 — custom domain later
//   Set `site` to "https://yourdomain.com"      → base stays unset
//
// `site` should be your final public URL — Astro uses it to build
// absolute links (and later the sitemap/RSS feed).
export default defineConfig({
  site: 'https://ngsirliang-ai.github.io',
});
