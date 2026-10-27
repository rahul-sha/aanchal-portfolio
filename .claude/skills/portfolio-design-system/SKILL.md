---
name: portfolio-design-system
description: Use when changing the look of this portfolio (colours, type, spacing, radius, motion, panels, cards, dialogs) so the change follows the site's design tokens and contrast rules.
---

# Portfolio design system

This site has a design system. Read `DESIGN.md` at the repo root before changing any styling, and work from it.

## Rules

1. Every colour, font size, spacing step, radius, and duration is a CSS custom property in the `:root` block at the top of `index.html`. Use the token in rules. Never write a raw hex value, pixel size, or duration that a token already covers.
2. A new value needs a new token in `:root` and a matching row in `DESIGN.md`, in the same change.
3. Text and background come as a pair. A new panel colour class sets both. Check the pairing against the AA list in `DESIGN.md`, and run the axe scan from `README.md` before opening a pull request.
4. There is no dark mode. Do not add `prefers-color-scheme: dark` rules. The page sets `color-scheme: light` on purpose.
5. Motion uses `--ease` and the `--dur-*` tokens and must stop under `prefers-reduced-motion: reduce`.
6. Test at 390 px and 1280 px wide, with reduced motion on and off, using the `webapp-testing` skill. A styling refactor should produce pixel-identical screenshots before and after.

## Where things live

- Tokens: `:root` in `index.html`
- Reference and pattern catalogue: `DESIGN.md`
- Three.js colours: hex literals in `scene.js`, kept in step with the palette by hand
