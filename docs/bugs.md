# Bugs

Known bugs and gaps in this project, newest first. The Cartographer weekly review reads this file, so the helper can answer "any open bugs?" from any project. Add bugs here, not in GitHub issues; a copy in Trilium is for safekeeping only.

Move a bug to "Fixed" when its fix is merged, and add one line on what fixed it.

## Open

| Found | Bug | Where | Notes |
| --- | --- | --- | --- |
| 2026-10-27 | The process steps in the text views for the Student Creator Program, 2M Short, Takami, and Singapore work were written from the CV and have not been checked by Aanchal | `index.html`, dialogs `#proj-ugc`, `#proj-short`, `#proj-takami`, and `#proj-sg` | A content gap, not a code bug. Aanchal to read and correct |

## Fixed

| Fixed | Bug | What fixed it |
| --- | --- | --- |
| 2026-11-02 | In the studio hero the boom mic arm floated, the lights pointed away from the creator, and the chair faced away from the desk | [#11](https://github.com/rahul-sha/aanchal-portfolio/pull/11): props aim at `HEAD`; joints built with `rod` and `legs` |
| 2026-10-27 | Visitors kept old copies of `app.js` and `scene.js` after a release | [#10](https://github.com/rahul-sha/aanchal-portfolio/pull/10): `?v=` on the script tags, bumped on each release |
| 2026-10-27 | Menu links landed in the wrong place because of the sticky panels | [#3](https://github.com/rahul-sha/aanchal-portfolio/pull/3): `app.js` scrolls in-page links itself |
| 2026-10-27 | Several colours were hard to read (ink on coral, low opacities, the nav pill) | [#3](https://github.com/rahul-sha/aanchal-portfolio/pull/3): contrast raised to WCAG AA, zero axe violations |
| 2026-10-27 | The page turned dark and hard to read when the system was in dark mode | [#3](https://github.com/rahul-sha/aanchal-portfolio/pull/3): the brand palette in every colour scheme (`color-scheme: light`) |
