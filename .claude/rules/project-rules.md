# Project rules: Aanchal Sharma portfolio

Rules for this project only. They add to, or override, the shared rules from the Cartographer plugin (`DESIGN.md` and the shared skills). Claude Code loads this file automatically because it sits in `.claude/rules/`.

Keep each rule to one line, with the reason after a colon. Tag each one so the weekly review can sort it.

## Adds
Rules the shared base does not cover.

- [design] Read `DESIGN.md` and use the `portfolio-design-system` skill before any visual change; use only the tokens in `:root` of `index.html`: one change there reaches the whole site.
- [design] Keep the design system in step in four places: `:root`, `DESIGN.md`, the Claude Design System page, and the Trilium copy: Rahul uses all four.
- [design] The studio hero has no images or posters, and few lights: Rahul chose a detailed set built from shapes, and lights cost speed.
- [design] Studio hero props aim at `HEAD` with `yawTo`/`tiltTo`; joints use `rod`, `legs`, and `lightStand`: props must look physically plausible.
- [design] In `buildStudioSet`, never name a variable `phone` (it is the device flag) and use `/* */` mid-line, never `//`: both broke the scene before.
- [design] The 2M Short and Singapore/L'Oréal work have no media and use text views: no footage exists, and Aanchal still has to check those steps.
- [deploy] When `app.js` or `scene.js` changes, bump its `?v=` in `index.html`: browsers cache the scripts for an hour.
- [deploy] Give a changed image or video a new file name: media is cached for a year.
- [safety] Do not run `.claude/skills/deploy-to-vercel/resources/deploy.sh`: it uploads the site to a third-party host.
- [data] Never invent or round up figures or claims in Aanchal's copy; use only her CV and what Rahul supplies: recruiters will check them.
- [writing] Page copy is in Aanchal's professional voice: UK English, the Oxford comma, no emojis, and no hype.
- [testing] Check with the system in dark mode (the page must stay light), and keep Lighthouse accessibility, best practices, and SEO at 100: the site is judged by recruiters on any screen.
- [workflow] Every pull request includes phone (390 px) and desktop (1280 px) screenshots, and says which skills were used: Rahul reviews from the screenshots.

## Overrides
Rules that replace a shared one for this project. Name the shared rule being replaced.

- [design] Overrides DESIGN.md section 3 (light and dark): the page stays light in dark mode, and `color-scheme: light` is deliberate: the earlier dark variant made text unreadable.
- [design] Overrides DESIGN.md section 7 (speed and privacy): Fraunces and Albert Sans load from Google Fonts, as recorded in the project's `DESIGN.md`: chosen with the design in October 2026. Self-hosting them is an open question for Rahul.

## Tags
Use one of: `design`, `workflow`, `safety`, `testing`, `writing`, `deploy`, `data`.
