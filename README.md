# Aanchal Sharma, portfolio

A single-page portfolio for Aanchal Sharma, brand and content strategist. Plain HTML, CSS, and JavaScript, with Three.js for the two 3D stages. No build step.

## Files

- `index.html`: the page markup and styles; the design tokens sit in the `:root` block at the top
- `DESIGN.md`: the design system, with every token and the component patterns
- `app.js`: page behaviour (reveals, count-ups, panel deck, project dialogs)
- `scene.js`: the two Three.js stages, built after the page has painted; the creator wall is built only when scrolled near
- `three.min.js`: Three.js r128, bundled locally
- `img/`: photos used in the page (WebP)
- `media/`: reel posters (WebP) and 8-second muted preview loops
- `vercel.json`: cache headers for the static assets
- `Aanchal-Sharma-CV.pdf`: the CV served by the Download CV button
- `.claude/skills/`: agent skills used when working on this repository with Claude Code

## Design system

Colours, type, spacing, radii, and motion are CSS custom properties declared once in `index.html` and documented in `DESIGN.md`. Change a value there and it reaches the whole site. The `portfolio-design-system` skill tells Claude Code to follow it.

## Run it locally

Any static file server works. With Python installed:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Checks

Before merging a change, run Lighthouse and an axe scan against a local server (the `webapp-testing` skill describes the Playwright setup). The site should keep accessibility, best practices, and SEO at 100 and zero axe violations, including colour contrast at WCAG AA.

## Deploy

The site is static, so Vercel serves it as it is: import the repository, keep the defaults, and deploy.
