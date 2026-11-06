# CLAUDE.md

## What this project does
Portfolio site for Aanchal Sharma, brand and content strategist, built to win her next role.
One page, live at https://www.aanchalll.com, with a 3D studio hero and a creator wall.

## Tech stack
- Plain HTML, CSS, and JavaScript; no build step and no package manager.
- `index.html` (markup, styles, design tokens in `:root`), `app.js` (page behaviour), `scene.js` (the two Three.js stages).
- Three.js r128 bundled as `three.min.js`. Hosted on Vercel (team "Mamba's projects"); `vercel.json` sets cache headers.

## Run commands
- Start: `python3 -m http.server 8000`, then open http://localhost:8000.
- Test: no automated suite. Use the `webapp-testing` skill (Playwright) at 390 px and 1280 px, with dark mode on, and reduced motion on and off; run axe and Lighthouse as in `README.md`.
- Deploy: merge the pull request into `main`; Vercel publishes it. Branches get previews, except when only `.md` files or `docs/` change (`scripts/ignore-build.sh`).

## Data and safety
- No database, accounts, or secrets. The real data is her work, figures, and CV.
- `main` is the live site. Never push to it directly; work on a branch.
- Never invent or round up figures or claims in her copy; use only the CV and what Rahul supplies.
- Media is cached for a year: give a changed image or video a new file name.
- Do not run `.claude/skills/deploy-to-vercel/resources/deploy.sh`: it uploads the site to a third-party host.
- Vercel and the domain are paid by Rahul. Do not add paid services, Vercel add-ons, or new domains without asking.

## How to work
- New feature, or a change across several files: show a short plan first and wait for Rahul's OK.
- Small fixes (one file, copy, a colour, a typo): go straight ahead.
- Every change goes on a branch with a pull request and phone and desktop screenshots.
- Use the skills in `.claude/skills/` and say which ones you used.
- Rahul is not a developer: explain technical steps plainly, one step at a time.

## Conventions and decisions
- Design tokens only, read `DESIGN.md` first (`portfolio-design-system` skill). Why: one change in `:root` reaches the whole site.
- Keep the design system in step: `:root`, `DESIGN.md`, the Claude Design System page, and the Trilium copy. Why: Rahul uses all four.
- No dark mode; `color-scheme: light` is deliberate. Why: the earlier dark variant made text unreadable.
- WCAG AA contrast and zero axe violations. Why: the site is judged by recruiters on any screen.
- When `app.js` or `scene.js` changes, bump its `?v=` in `index.html`. Why: browsers cache the scripts for an hour.
- Studio hero: props aim at `HEAD` with `yawTo`/`tiltTo`; joints use `rod`, `legs`, and `lightStand`. Why: props must look physically plausible.
- In `buildStudioSet`, never name a variable `phone` (it is the device flag) and use `/* */` mid-line, never `//`. Why: both broke the scene before.
- The hero has no images or posters, and few lights. Why: Rahul chose a detailed set built from shapes, and lights cost speed.
- The 2M Short and Singapore/L'Oréal work have no media and use text views. Why: no footage exists; Aanchal still has to check those steps.
- Copy is UK English with the Oxford comma, no emojis, and no hype. Why: it is her professional voice.
