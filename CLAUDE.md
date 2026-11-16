# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project does
Portfolio site for Aanchal Sharma, brand and content strategist, built to win her next role.
One page, live at https://www.aanchalll.com, with a 3D studio hero and a creator wall.

## Tech stack
- Plain HTML, CSS, and JavaScript; no build step and no package manager.
- `index.html` (markup, styles, design tokens in `:root`), `app.js` (page behaviour), `scene.js` (the two Three.js stages).
- Three.js r128 bundled as `three.min.js`. Hosted on Vercel (team "Mamba's projects"); `vercel.json` sets cache headers.
- Design system: `DESIGN.md`, the Claude Design System page (https://claude.ai/artifact/2iPwsVBSqA9gs8nkaYC5g1), and Trilium pages under "Vibe Coding Projects" > "Aanchal's Portfolio (aanchalll.com)" (build map and design system; sync with the `trilium-project-docs` skill).

## Run commands
- Start: `python3 -m http.server 8000`, then open http://localhost:8000.
- Test: no automated suite. Write a Playwright check (`webapp-testing` skill, from the Cartographer plugin) and run it with the server using that skill's `scripts/with_server.py`: `python3 <webapp-testing skill folder>/scripts/with_server.py --server "python3 -m http.server 8000" --port 8000 -- python3 check.py`.
- Check at 390 px and 1280 px, with the system in dark mode (the page must stay light), and with reduced motion on and off. Targets: zero axe violations, and Lighthouse accessibility, best practices, and SEO at 100.
- Deploy: merge the pull request into `main`; Vercel publishes it. Branches get previews, except when only `.md` files or `docs/` change (`scripts/ignore-build.sh`).

## How the page fits together
- `index.html` is a deck of full-screen `.panel` sections (`#top`, `#results`, `#work`, `#creators`, `#about`, `#experience`, `#contact`) that stick and stack as you scroll; project details open in `<dialog class="proj">` boxes.
- `app.js` reads data attributes: `data-rv` (reveal on scroll), `data-count` and `data-comma` (count-up, Indian digit grouping), `data-open` (opens a dialog), `video[data-src]` (loaded only when its dialog opens), `data-px` (parallax image).
- Sticky panels break the browser's own anchor jumps, so `app.js` scrolls in-page links itself (`goTo`). New `#` links work without extra code.
- `scene.js` starts after page load in idle time. The studio hero (`#top`, built by `buildStudioSet`) renders at once; the creator wall (`#creators`, `buildWall`) is built only when scrolled within 600 px. Each stage renders only while its `data-scene` element is on screen.
- The creator wall's 54 tiles share one texture, `media/wall-atlas.webp` (6 reels by 4 frames).
- Reduced motion is handled in three places: the CSS media query, `app.js`, and `scene.js`. A new animation needs all that apply.
- `phone` in `buildStudioSet` means a portrait hero (narrower than tall); it turns shadows off.

## Data and safety
- No database, accounts, or secrets. The real data is her work, figures, and CV.
- `main` is the live site. Never push to it directly; work on a branch.
- Never invent or round up figures or claims in her copy; use only the CV and what Rahul supplies.
- Do not run `.claude/skills/deploy-to-vercel/resources/deploy.sh`: it uploads the site to a third-party host.
- Vercel and the domain are paid by Rahul. Do not add paid services, Vercel add-ons, or new domains without asking.

## How to work
- This project uses the Cartographer plugin (shared rules and skills, turned on in `.claude/settings.json`). Its own rules are in `.claude/rules/project-rules.md`, known bugs in `docs/bugs.md`, and the plan in `docs/roadmap.md`.
- New feature, or a change across several files: show a short plan first and wait for Rahul's OK. Small fixes (one file, copy, a colour, a typo): go straight ahead.
- Work on a branch with one small pull request per step, with phone and desktop screenshots.
- Use the skills (this repo's `.claude/skills/` and the plugin's) and say which ones you used.
- Rahul is new to Linux and programming: explain each step plainly, give exact commands, and say where to click.
- UK English with the Oxford comma.

## Conventions and decisions
- Each project rule, with its reason, is in `.claude/rules/project-rules.md`. Read it before changing the page, the studio hero, or the scripts.
- No dark mode; `color-scheme: light` is deliberate. Why: the earlier dark variant made text unreadable.
- Design tokens only, documented in `DESIGN.md`. Why: one change in `:root` reaches the whole site.
- The hero is a detailed set built from shapes, with no images or posters. Why: Rahul chose it, and few lights keep it fast.
- The 2M Short and Singapore/L'Oréal work use text views. Why: no footage exists.
