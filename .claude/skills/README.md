# Agent skills

Skills Claude Code loads when working in this repository. Each folder holds a SKILL.md that describes when it applies and what to do.

## Skills from the Cartographer plugin

`frontend-design`, `webapp-testing`, and `web-design-guidelines` now come from the Cartographer plugin (turned on in `.claude/settings.json`), so this folder no longer keeps its own copies. They were identical to the plugin's.

## Skills kept here

| Skill | Source | Licence | Use it for |
| --- | --- | --- | --- |
| deploy-to-vercel | vercel-labs/agent-skills | MIT | Deploying to Vercel (Archive.zip and the Codex script were left out) |
| web-perf | cloudflare/skills | Apache 2.0 | Performance audit before launch |
| portfolio-design-system | written for this site | n/a | Any visual change: tokens, contrast, and the no-dark-mode rule from `DESIGN.md` |

The first two were copied on 2026-10-27 from the repositories above without changes to the SKILL.md files. `portfolio-design-system` was written for this repository.
