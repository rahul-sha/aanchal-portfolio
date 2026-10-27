# Aanchal Sharma, portfolio

A single-page portfolio for Aanchal Sharma, brand and content strategist. Plain HTML, CSS, and JavaScript, with Three.js for the two 3D stages. No build step.

## Files

- `index.html`: the whole site, including styles and scripts
- `three.min.js`: Three.js r128, bundled locally
- `img/`: photos used in the page
- `media/`: reel posters and 8-second muted preview loops
- `Aanchal-Sharma-CV.pdf`: the CV served by the Download CV button
- `.claude/skills/`: agent skills used when working on this repository with Claude Code

## Run it locally

Any static file server works. With Python installed:

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

## Deploy

The site is static, so Vercel serves it as it is: import the repository, keep the defaults, and deploy.
