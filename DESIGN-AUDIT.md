# DESIGN AUDIT — 2026-10-22

Method: 8 screenshots (5 pages desktop dark, light home, timeline close-up,
mobile 390px) → senior-designer critique per surface → each element scored by
TypeSafe JEV (System One, `jev-latest`) on a 0–4 rubric:
**0 = actively detracts … 4 = signature strength.**

## JeV grades (score / confidence)

### ✅ Plus side — keep, polish, build around

| Element | Score | Conf | Verdict |
|---|---|---|---|
| **Written voice** (Beerlao, sea urchin, handcuffs, hotels-as-compass lede) | **3.79** | 0.83 | The crown jewel. Design pass must *serve* the copy, never bury it |
| **Route timeline concept** (departure board) | 2.76 | ⚠️ 0.00 | Score unusable (zero confidence). Vision critique stands: concept is signature, execution is a generic accordion — biggest upgrade opportunity |
| AI stack chips (⚡ Hermes · GLM · n8n) | 2.39 | 0.51 | Keep; fits chip language |
| Where You Can Spot Me pills | 2.39 | 0.45 | Keep; flags do the color work |

### ❌ Horrible — will actively detract (all ≤ 1.0, high confidence)

| Element | Score | Conf | Verdict |
|---|---|---|---|
| **Naive auto light theme** (cream + mustard token swap) | **0.02** | 0.98 | Worst element on the site, near-total confidence. Amber-on-cream ≈3:1 (fails AA); reads "mustard on default blog". Go dark-only until light is *designed* |
| Mobile scale (60px H1, dead zones push cards below fold, sub-44px nav) | 0.07 | 0.94 | Clamp type, tighten rhythm, enlarge tap targets |
| Hero H1 repeating the name (3rd occurrence by line 3) | 0.07 | 0.94 | Replace with value-proposition headline; let header carry the name |
| Default system-ui everywhere (no mono/uppercase accents) | 0.08 | 0.93 | Classic slop tell; board concept demands monospace metadata |
| Raw light-mode screenshots in dark project cards | 0.09 | 0.93 | Glare + illegible thumbnails; unify crop, dark-tint or re-theme captures |
| Projects layout (floating columns, no card surface) | 0.85 | 0.88 | Wrap each project in a real card: border, padding, hover |
| Footer "Astro" default-blue link | 0.93 | 0.89 | Only blue on the site; recolor to muted/accent |
| "LIVE · CODE PRIVATE" badge repeated per card | 1.00 | 0.89 | Say it once in the page intro |
| Pillar cards (flat, no affordance, orphan 3rd tile) | 1.16 | 0.82 | Content right, treatment wrong: hover states, arrows, equal grid |
| Brass accent (one dot on About; 4 competing jobs on Projects) | 1.80 | 0.31 | Low confidence — mixed. Extend brass into type/rules/states, but give it ONE job per surface |

## Design-pass spec (updated)

1. **Dark-only launch.** Remove the `prefers-color-scheme` light block now;
   design light deliberately in v2 ("day mode": deep ochre accent passing AA,
   warm-tinted surfaces) *then* add the sun/moon toggle. (Revises Option 3:
   same dark-first brand, but no broken-light stopgap in between.)
2. **Departure-board typography**: monospace, uppercase, letter-spaced,
   tabular-figure metadata pinned to a fixed right column; brass-tinted;
   rows tightened to ~44–48px with hairline rules; chevrons aligned.
3. **Hero**: value-proposition headline (e.g. "Should this hotel deal happen?
   I'll tell you."), name stays in the header only.
4. **Projects**: unified card surfaces (border + padding + hover), larger
   uniform-crop screenshots, badge stated once, one CTA per card.
5. **Mobile**: clamp H1 ~40px / body ~16–17px, section rhythm 48–64px,
   44px+ tap targets.
6. **Footer**: accent-colored link, add a branded detail (monogram favicon).
7. **Font**: pick a real face pair (editorial sans + mono for board data).

## Quick wins available before the full pass

- [ ] Dark-only: delete light block in `global.css` (2 min, kills the 0.02-scored element)
- [ ] Footer link color (1 min)
- [ ] Hero headline swap (copy change, 5 min)
- [ ] `font-variant-numeric: tabular-nums` on `.period` (1 min, instant board feel)
