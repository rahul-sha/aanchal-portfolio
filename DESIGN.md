# Design system

The reference for how the portfolio looks and behaves. Every value here is a CSS custom property declared once in the `:root` block at the top of `index.html`. Rules in the stylesheet use the token, never the raw value, so a change made in `:root` reaches the whole site.

A copy of this system lives inside Claude as a Design System artifact at https://claude.ai/artifact/2iPwsVBSqA9gs8nkaYC5g1, with the same tokens, this guidance as its brand book, and live component previews. Keep the two in step: a change here is also a change there.

The site is light only. There is no dark-mode variant: an earlier attempt remapped the backgrounds while the ink-coloured text and icons stayed put, and the result was unreadable. `color-scheme: light` is set on purpose.

## Colour

### Brand palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0E0E1A` | Page background behind the deck, 3D stages, dark pills and buttons, body text on light panels |
| `--cream` | `#F6F3EC` | The light panel, dialog boxes, text on dark surfaces |
| `--blue` | `#2B4BFF` | Results panel, blue pills, accent numerals in the dialogs |
| `--coral` | `#FF5E4D` | Contact panel, focus rings, progress bar |
| `--lime` | `#D9F55B` | Primary button, the Download CV pill, highlighted words, badge text |
| `--lilac` | `#DCCFFF` | About panel |
| `--sky` | `#BFE3FF` | Highlighted words on the creator stage, one dialog hero |
| `--white` | `#fff` | Text on blue and coral, the light stat cards |

### Roles

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `var(--cream)` | Default page surface |
| `--fg` | `var(--ink)` | Default text |
| `--muted` | `#5E5B6B` | Secondary text on cream and lilac. Passes AA on both. |
| `--line` | `#D9D4CA` | Hairline rules in the experience list |
| `--stage-fg` | `var(--cream)` | Text on the two 3D stages |

### Tints

Fixed opacities of ink, cream, and white, named by their percentage.

| Token | Use |
| --- | --- |
| `--ink-05` | Step cards in the dialogs |
| `--ink-08` | Border on the light stat cards |
| `--ink-15` | Border on brand chips |
| `--ink-25` | Shadow under the play button on work cards |
| `--ink-82` | Nav pill bar and dialog backdrop |
| `--cream-12` | Nav link hover |
| `--cream-14` | Nav pill bar border |
| `--cream-45` | Ghost button border on the stages |
| `--cream-92` | Tags and the reel play button |
| `--white-30` | Rule above stat labels on blue |

The two gradients that darken the 3D stages behind the hero text use a run of ink opacities and stay inline in the `.stage::after` rule. The Three.js colours in `scene.js` are hex literals of the same palette, because WebGL materials take numbers, not CSS variables.

### Pairings that pass WCAG AA

- Ink on cream, lilac, sky, lime, and coral.
- Cream and white on ink and blue.
- Muted (`#5E5B6B`) on cream and lilac, for text 13 px and up.
- White on coral passes only at large sizes. It is used for the italic word in the contact heading and nowhere smaller.

Do not place cream or white body text on coral, lime on cream, or sky on cream. Each fails AA.

## Type

Two families, loaded from Google Fonts with a non-blocking preload.

| Token | Family | Use |
| --- | --- | --- |
| `--display` | Fraunces (variable, weight 300 and 400, italic) | Headings, big numerals, names, the nav brand |
| `--body` | Albert Sans | Everything else |

Headings are weight 300 with `letter-spacing: -0.025em` and the Fraunces axes `SOFT 40, WONK 1`. Italic display text is used for emphasis words and takes an accent colour.

### Text sizes (Albert Sans)

| Token | Size | Typical use |
| --- | --- | --- |
| `--text-2xs` | 11 px | Tags on work cards |
| `--text-xs` | 12 px | Eyebrows, placeholder labels, reel links, brand chips |
| `--text-sm` | 13 px | Captions, meta rows, stage footers, pills |
| `--text-md` | 14 px | Nav links, labels, buttons in dialogs, step titles |
| `--text-base` | 15 px | Button labels, card descriptions |
| `--text-lg` | 16 px | Dialog summaries |
| `--text-body` | 17 px | Body copy. Set on `body`. |
| `--text-xl` | 18 px | About paragraph, contact links |
| `--text-2xl` | 19 px | Nav brand |
| `--text-3xl` | 20 px | Dialog close glyph |
| `--text-lead` | 16 to 19 px, fluid | Hero lead paragraph |

### Display sizes (Fraunces)

Fluid sizes use `clamp()` so they scale with the viewport between a phone floor and a desktop ceiling.

| Token | Value | Use |
| --- | --- | --- |
| `--display-hero` | `clamp(44px, 7.4vw, 124px)` | Hero headline |
| `--display-contact` | `clamp(48px, 8vw, 128px)` | Contact headline |
| `--display-stat` | `clamp(56px, 7vw, 112px)` | Results numerals |
| `--display-stage` | `clamp(40px, 6vw, 100px)` | Creator stage headline |
| `--display-section` | `clamp(40px, 5.6vw, 84px)` | Section headings |
| `--display-word` | `clamp(44px, 6vw, 84px)` | Big word in dialog hero tiles |
| `--display-about` | `clamp(36px, 4.8vw, 68px)` | About heading |
| `--display-dialog` | `clamp(32px, 4vw, 56px)` | Dialog titles |
| `--display-figure` | `clamp(32px, 4vw, 52px)` | Dialog stat numerals |
| `--display-lede` | `clamp(24px, 2.6vw, 36px)` | Results lede |
| `--display-placeholder` | 80 px | Numeral on typographic work cards |
| `--display-item` | 26 px | Work card titles, experience titles |
| `--display-card` | 22 px | Hero card title, step numbers |

## Space

A 4 px scale. Use the nearest step for padding, margin, and gap.

| Token | Value |
| --- | --- |
| `--s-1` | 4 px |
| `--s-2` | 8 px |
| `--s-3` | 12 px |
| `--s-4` | 16 px |
| `--s-5` | 20 px |
| `--s-6` | 24 px |
| `--s-7` | 28 px |
| `--s-8` | 32 px |
| `--s-10` | 40 px |
| `--s-11` | 44 px |
| `--s-14` | 56 px |
| `--s-18` | 72 px |

A handful of optical adjustments sit off the scale (6, 7, 9, 10, 14, 18, 22, and 26 px, mostly pill padding and heading margins). They are deliberate and stay as literals. Section padding on the panels is fluid: `clamp(72px, 10vh, 120px)` above and `clamp(48px, 8vh, 96px)` below.

## Radius

| Token | Value | Use |
| --- | --- | --- |
| `--r-sm` | 14 px | Step cards |
| `--r-md` | 16 px | Hero card, reel tiles, stat cards |
| `--r-lg` | 20 px | Work thumbnails, dialog hero tiles |
| `--r-xl` | 24 px | About photo |
| `--r-2xl` | 28 px | Panel top corners, dialog box. Also available as `--radius`. |
| `--r-pill` | 999 px | Buttons, pills, tags, nav |

Circles (play buttons, the close button, the badge, the blob) use `50%`.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `--ease` | `cubic-bezier(.22,.8,.2,1)` | Every transition and keyframe |
| `--dur-fast` | 0.3 s | Hover lifts and scales |
| `--dur-med` | 0.4 s | Hero card pop, experience row nudge |
| `--dur-reveal-item` | 0.9 s | Staggered reveals, 0.1 s apart |
| `--dur-reveal` | 1 s | Single reveals, headline rise |

Scroll-linked effects (the panel deck easing back, the hero parallax, the image drift) are driven in `app.js` from scroll position, not from CSS durations. Everything above is switched off under `prefers-reduced-motion: reduce`, and the panels fall back to normal flow.

## Layout

| Token | Value | Use |
| --- | --- | --- |
| `--wrap` | 1240 px | Content width |
| `--gutter` | 16 px | Side padding, widened by the safe-area inset on notched phones |
| `--nav-h` | 72 px | Scroll margin so anchored sections clear the floating nav |
| `--tap` | 44 px | Minimum size for the close button and other small controls |

The page is a deck of full-height sticky panels inside `<main>`, plus the footer as the last panel. In-page links scroll by script because the browser's own anchor jump lands on a sticky panel's pinned position.

## Patterns

- **Panel** (`.panel` with a colour class `.p-blue`, `.p-cream`, `.p-lilac`, `.p-coral`, or `.stage`): full viewport height, top corners at `--r-2xl`, content inside `.inner > .wrap.gutter`. Each colour class sets both background and text colour, so text stays readable when a panel changes colour.
- **Stage** (`.stage`): an ink panel with a Three.js canvas behind the text and a gradient scrim. Interactive children opt back in with `pointer-events: auto`. The hero studio is a film set built entirely from primitives in `buildStudioSet` (no photographs or posters): one shadow-casting key spot plus four point lights, emissive fixtures, additive light beams, and a canvas-drawn edit screen. Props take their colours from the palette above, with lime for marks and the focus ring, coral for record lights and the neon sign, lilac for the backdrop and tube light, and sky for the LED panel. The creator wall draws 54 phone tiles with corners at about `--r-md` scale from a single atlas (`media/wall-atlas.webp`, 24 frames: six reels by four moments) so no two neighbouring tiles share a frame, with faint lilac, sky, cream, and lime tints over the frames.
- **Section head** (`.sec-head`): an eyebrow number, a display heading, and an optional short paragraph aligned to the baseline.
- **Button** (`.btn`): pill, 48 px tall, `--text-base` semibold. `.btn.p` is lime on ink for the primary action. `.btn.g` is a ghost outline for use on the stages only.
- **Pill** (`.pill`, `.nav a.cv`, `.tag`): pill radius, `--text-sm` or smaller, semibold. Default is ink on cream; `.b`, `.c`, and `.l` swap in blue, coral, and lime.
- **Work card** (`.work article`): a 4:3 thumbnail at `--r-lg` with a play button or a typographic placeholder, then a `--display-item` title with a year, then a muted description with the result in `--fg` semibold. Clicking opens a dialog.
- **Dialog** (`dialog.proj > .box`): cream box at `--r-2xl`, a close button at `--tap`, a head row with title and meta, a summary, then content such as the reel grid, stat cards, or step list.
- **Reel grid** (`.reels`): auto-fitting columns no narrower than 150 px, 9:16 tiles at `--r-md`, alternate tiles pushed down by `--s-7` for a staggered wall, captions of name and link only.
- **Focus**: every link and button shows a 3 px coral outline offset by 3 px on keyboard focus.

## Adding something new

1. Pick existing tokens first. A new colour, size, or radius needs a token in `:root` and a row in this file.
2. Check contrast against the pairings above before shipping a new colour combination. Run the axe scan described in `README.md`.
3. Give every panel colour class both a background and a text colour.
4. Keep motion behind `--ease` and the duration tokens, and make sure it stops under reduced motion.
5. Test at 390 px and 1280 px wide, in light mode, with reduced motion on and off.
