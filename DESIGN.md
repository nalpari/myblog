---
name: devgrr
description: A one-person Korean tech blog drawn as a commit graph. The home page is git log --graph; the right pane is the checked-out post.
colors:
  bg: "#12151b"
  bg-2: "#191c23"
  bg-band: "#1c212d"
  line: "#2a2f37"
  line-2: "#3a4049"
  fg: "#dfe3e9"
  fg-2: "#b6bbc4"
  fg-3: "#7b808a"
  frontend: "#46c26f"
  backend: "#5ba4ff"
  infra: "#f472b6"
  cs: "#e2a33a"
  main: "#8b909a"
  add: "rgba(62, 190, 110, 0.22)"
  del: "rgba(255, 90, 90, 0.18)"
  add-ink: "#5ad48a"
  del-ink: "#ff8080"
  syn-keyword: "#ff7b9c"
  syn-meta: "#e2c05a"
  syn-title: "#79b8ff"
  syn-string: "#a5d6ff"
  syn-comment: "#7b808a"
  syn-number: "#e6a23c"
  syn-type: "#ffab70"
  pill-ink: "#ffffff"
typography:
  wordmark:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lede:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "17.5px"
    fontWeight: 400
    lineHeight: 1.75
  meta:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Wanted Sans Variable, Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
  code:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "14.5px"
    fontWeight: 500
    lineHeight: "20.5px"
    fontVariation: "font-variant-ligatures: none"
  hash:
    fontFamily: "Commit Mono, ui-monospace, SF Mono, Menlo, Consolas, monospace"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "font-variant-ligatures: none"
rounded:
  focus: "4px"
  inline: "5px"
  row: "8px"
  panel: "10px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  base: "16px"
  para: "22px"
  lg: "28px"
  xl: "32px"
  2xl: "44px"
  3xl: "56px"
  4xl: "72px"
  5xl: "96px"
  row: "100px"
components:
  branch-tag:
    backgroundColor: "color-mix(in srgb, var(--c) 30%, var(--bg))"
    textColor: "color-mix(in srgb, var(--c) 78%, var(--pill-ink))"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 6px"
    height: "27px"
  branch-tag-hover:
    backgroundColor: "color-mix(in srgb, var(--c) 22%, transparent)"
  branch-tag-pressed:
    backgroundColor: "var(--c)"
    textColor: "{colors.bg}"
  commit-row:
    typography: "{typography.title}"
    rounded: "{rounded.row}"
    padding: "0 14px 0 239px"
    height: "74px"
  commit-row-hover:
    backgroundColor: "{colors.bg-band}"
  commit-row-head:
    backgroundColor: "{colors.bg-band}"
  branch-chip:
    backgroundColor: "color-mix(in srgb, var(--c) 12%, transparent)"
    textColor: "var(--c)"
    rounded: "{rounded.pill}"
    padding: "0 9px"
    height: "26px"
  code-panel:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.fg}"
    typography: "{typography.code}"
    rounded: "{rounded.panel}"
    padding: "28px 12px 24px"
  code-panel-filename:
    backgroundColor: "color-mix(in srgb, var(--bg) 40%, var(--bg-2))"
    textColor: "{colors.fg-3}"
    padding: "0 14px"
    height: "32px"
  inline-code:
    backgroundColor: "{colors.bg-band}"
    rounded: "{rounded.inline}"
    padding: "2px 6px"
  review-note:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.fg}"
    rounded: "{rounded.panel}"
    padding: "16px 16px 18px"
  review-note-head:
    backgroundColor: "color-mix(in srgb, var(--backend) 10%, var(--bg-2))"
    textColor: "{colors.fg-2}"
    padding: "10px 16px"
  nav-link:
    textColor: "{colors.fg-3}"
  nav-link-hover:
    textColor: "{colors.fg}"
  toc-link:
    textColor: "{colors.fg-3}"
    padding: "5px 0 5px 14px"
  toc-link-current:
    textColor: "{colors.fg}"
  resume-button:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.fg}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
---

# Design System: devgrr

## Overview

**Creative North Star: "The Commit Graph"**

devgrr is one senior developer's log for juniors, and the site draws itself the way that log looks in a terminal. The home page is `git log --graph`: a main trunk on the far left, four topic lanes forking from the root commit and merging back into it, a title and a hash on every row. The right pane is the checked-out post, HEAD. Every post opens with its ref line: branch chip, hash, date. The scene is a developer's editor at night; dark is the default written in `:root` as the second argument of `light-dark()`, and light is a full sibling theme rather than a fallback. A `dark`/`light` pill in the top bar writes the choice to `html[data-theme]`.

Density is editorial, not dashboard: a 100px row pitch on the log, a 70ch measure on posts, 56px section breaks. Decoration comes only from things git and an editor already print: lanes, nodes, hashes, diff gutters, a filename tab, a review comment. There are no cards, no gradients, no thumbnails, no icon set (one inline chevron), and no shadow on anything in flow.

Where the direction contract and the build diverged, this file records the build. The ground shipped as #12151b rather than the contract's #0e1218, the home split is two equal columns rather than one-third and two-thirds, and the graph topology became a main trunk with merge arcs by the user's decision during the hero phase.

**Key Characteristics:**
- Dark-first with a full light sibling; every color token is one `light-dark()` value, forced by `html[data-theme]` or else by `prefers-color-scheme`.
- Two typefaces with strict jobs: Wanted Sans for prose, Commit Mono for anything git would print.
- Five branch colors reach elements through one custom property, `--c`, set by `data-branch`.
- Flat tonal layering with 1px hairlines; one shadow exists, under a fixed button.
- One authored motion, the log rising from its root; everything else is a 0.2 to 0.3s state change.
- A radius ladder of 4, 5, 8, 10px and pill.

## Colors

A cool charcoal ground with four saturated branch hues and a grey trunk; blue is both a lane and the interaction color.

### Primary
- **Backend Blue** (#5ba4ff dark / #2f6fe0 light): the backend lane, and the only branch color with a job outside its lane. It draws the focus ring, the selection tint (32% mix), body links in posts, and the 10% tint on review-note headers.

### Secondary
- **Frontend Green** (#46c26f / #1f9d55): the frontend lane, pill, and nodes.
- **Infra Pink** (#f472b6 / #d63f8a): the infra lane.
- **CS Amber** (#e2a33a / #b7791f): the cs lane.
- **Main Grey** (#8b909a / #6f7681): the trunk, its merge nodes, and the root commit (hello-world on main).

### Tertiary
- **Add and Del gutters** (rgba(62, 190, 110, 0.22) and rgba(255, 90, 90, 0.18) dark; rgba(31, 157, 85, 0.12) and rgba(220, 38, 38, 0.10) light): full-row tints behind + and − lines in diff panels.
- **Add and Del ink** (#5ad48a and #ff8080 / #1f9d55 and #d33c3c): the + and − gutter marks; added code text is a 55% mix of add-ink into fg.
- **Syntax, seven roles**: keyword #ff7b9c, meta #e2c05a, title #79b8ff, string #a5d6ff, comment #7b808a (italic), number #e6a23c, type #ffab70. Light: #c5306a, #9a6b00, #1f5fd1, #1a6fb5, #6f7681, #b45309, #b2501f. They are highlight.js classes mapped onto the `--syn-*` variables; tags fall back to fg-2.

### Neutral
- **Ground** bg (#12151b / #f7f8fa): html and body.
- **Panel** bg-2 (#191c23 / #ffffff): code panels, review notes, the resume button.
- **Band** bg-band (#1c212d / #e9ecf1): the checked-out (HEAD) row, hovered rows, inline code.
- **Hairline** line (#2a2f37 / #dfe3e8): every 1px border: top bar, preview divider, code panels, table rows, TOC rail, footers.
- **Hairline strong** line-2 (#3a4049 / #c9ced6): the resume button border and the code scrollbar thumb.
- **Ink** fg (#dfe3e9 / #16191d): headings, titles, body.
- **Ink 2** fg-2 (#b6bbc4 / #4b5260): ledes, summaries, review-note text, the back link.
- **Ink 3** fg-3 (#7b808a / #6f7681): hashes, nav at rest, meta lines, line numbers, table headers, TOC at rest, the footer.
- **Pill ink** pill-ink (#ffffff / #16191d): the light end of the branch-tag text mix.

### Named Rules
**The One Lane Rule.** A branch color reaches an element only through `--c`, which `[data-branch]` sets from the five branch variables. No rule names a branch hex directly; a new branch-colored element gets `data-branch`, not a color.

**The Sibling Theme Rule.** Every color token is one `light-dark(light, dark)` value on `:root`. `html[data-theme]` forces `color-scheme`; without it the used scheme follows `prefers-color-scheme`. A token that is a single hex is a bug.

**The Blue Has Two Jobs Rule.** Backend blue is the only branch color that also works as the interaction color: focus ring, selection tint, body links, and the review-note head tint. The other four never leave their lane.

## Typography

**Display Font:** Wanted Sans Variable (with Wanted Sans, Pretendard Variable, Apple SD Gothic Neo, Noto Sans KR, system-ui)
**Body Font:** Wanted Sans Variable, same stack
**Label/Mono Font:** Commit Mono 400, 500, 700 (with ui-monospace, SF Mono, Menlo, Consolas), ligatures off

Both families load from jsDelivr: Wanted Sans as split variable webfonts, Commit Mono from fontsource (index, 500, 700).

**Character:** A Korean-first geometric sans for everything a person wrote, and a terminal mono for everything git would print: the wordmark, hashes, code, filenames. Headings are semibold, tight-tracked (−0.015 to −0.02em) and balanced; prose is set slightly large (17.5px) and open (1.75).

### Hierarchy
- **Wordmark** (Commit Mono 700, 30px, line-height 1, −0.02em): lowercase "devgrr" in the top bar; 24px under 960px.
- **Display** (600, 40px, 1.2, −0.02em, text-wrap balance): the post h1; 30px under 960px. Its sibling is the home preview title at 35px on a 40px line.
- **Headline** (600, 26px, 1.3, −0.015em): post h2, 56px above and 18px below, 32px scroll margin; it feeds the TOC. 22px under 960px.
- **Title** (500, 20px, 1.3, −0.015em): commit row titles, one line with an ellipsis; post h3 shares the size at 600. 18px and wrapping on mobile.
- **Lede** (400, 19px, 1.55, fg-2): the post's opening paragraph. The home preview summary is its sibling at 17.5px on a 24.5px line, max 62ch.
- **Body** (400, 17.5px, 1.75): post body with a 22px paragraph gap. The home base is 17px on 1.6. 16.5px under 960px.
- **Meta** (400, 15px, fg-3): the ref line, the footer, the back link (15.5px), tables (16px).
- **Label** (500, 12px, 1, lowercase): branch pills; 12.5px on the post's branch chip.
- **Code** (Commit Mono 500, 14.5px on 20.5px): code panels; 14px on 20px on mobile. The filename tab is 13px. Inline code is 0.9em of its paragraph.
- **Hash** (Commit Mono 400, 17px, fg-3): the seven-character FNV-1a hash beside each row title; 15px on the post ref line.

### Named Rules
**The Two Voices Rule.** Wanted Sans for what a person wrote; Commit Mono, ligatures off, for what git or the editor prints: the wordmark, hashes, filenames, code. There is no third face and no system display face.

**The Lowercase Label Rule.** Labels are lowercase branch names at 12px, weight 500, untracked. Nothing on the site is uppercase or letter-spaced outward.

## Layout

**Top bar** (79px, 1px bottom hairline, padding 30px 6% 0 5.6%): wordmark left, three nav links right at 17.5px with a 24px gap. 64px tall with 20px side padding under 960px.

**Home, the log** (two equal columns, min-height 100vh minus the bar):
- Left, the graph pane: padding 43px 0 40px 5vw. Four pill tags (6px gap, 20px left margin), then the graph. The SVG lane field sits absolutely over the list; the main trunk is at `--main-x` 6px and each topic lane is positioned under the horizontal center of its pill, so the pills are the lane legend. Rows run on a 100px pitch with a 74px link inside, padded 239px on the left to reserve the lane field. The root commit is the last item; new posts go on top.
- Right, the preview: 1px left hairline, padding 61px 5.2vw 48px 28px. Title, then the summary 33px below, then the post's snippet as a code panel 19px below that.
- Filtering: a pressed tag drops every other lane, node, and row to 22% opacity (undrawn lanes to 18%), and j / k walk only the visible rows.

**Designed viewport.** From 961px up the home page scales with the width, `zoom: clamp(0.93, 100vw / 1376px, 1.16)`, so between 1280 and 1600px the rhythm of the approved comp (drawn at 1376) holds instead of floating in a wider frame.

**Post** (a grid of minmax(0, 70ch) and a 220px TOC rail, 72px gap, centered; padding 72px 6% 96px): ref line, h1, lede 20px below, then the body 44px below the head. The post foot sits 64px below the body behind a 24px-padded hairline. The TOC is sticky at 32px and disappears under 1200px.

**Rhythm.** The spacing values that recur are 6, 8, 12, 16, 22, 28, 32, 44, 56, 72 and 96px. 22 is the paragraph gap, 28 the code panel margin, 32 the review-note margin and the sticky offset, 56 the h2 lead, 72 the column gap and the post's top padding.

**Under 960px.** One column. The preview is removed and each row shows its summary instead (two-line clamp, 15px, fg-2). Lanes pack from 8px at an 18px gap; pills and rows shift 100px right (96px under 480px). Rows become auto-height stacks with 12px 14px padding. Posts get 40px 20px 72px; code panels 20px 10px 18px with a 26px line-number column.

### Named Rules
**The Reserved Gutter Rule.** Log rows reserve 239px on the left for the lane field, and each lane is positioned under the horizontal center of its pill. Text never sits under a lane.

**The Designed Viewport Rule.** Between 1280 and 1600px the home page scales with the width (zoom clamped 0.93 to 1.16 around 1376px) rather than letting its fixed rhythm float in a wider frame.

## Elevation & Depth

Flat. Depth is three tonal steps (bg, bg-2, bg-band) and 1px hairlines in `--line`. Hover and HEAD are a band of bg-band, not a lift. The only box-shadow on the site sits under the fixed "읽던 곳으로" resume button, because it floats over content rather than sitting in it.

### Shadow Vocabulary
- **Floating control** (`box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.45)`): only for a position: fixed element over content. One instance.

### Named Rules
**The One Shadow Rule.** Anything in document flow is flat. A shadow is permitted only on a fixed element floating over content, and it is the resume button's soft drop, never a hard offset.

## Shapes

A five-step radius ladder: 4px focus ring, 5px inline code, 8px log rows, 10px panels (code, review note), and pill (999px) for branch tags, the post's branch chip, and the resume button. Borders are 1px in `--line` everywhere except the home branch tags (1.5px, an 80% branch mix into ground) and the resume button (`--line-2`). The graph is drawn geometry, not boxes: round-capped 3px lanes, cubic merge arcs at 2.5px into the trunk, filled r7 circles with a 3px ground-colored ring so nodes sit on the lane, r4 merge nodes on the trunk. Code panels with a filename get a 32px tab across the top with its own hairline and a 40/60 ground-into-panel tint, corners rounded to match. Tables have bottom hairlines only. Nothing is clipped except the review note, which hides overflow to keep its head inside the radius.

### Named Rules
**The Radius Ladder Rule.** 4px focus ring, 5px inline code, 8px log rows, 10px panels, pill for tags and floating controls. No other radius.

## Components

### Branch tags (home)
Lowercase pill buttons under the top bar, one per topic lane; they filter the log and mark where its lane runs.
- **Shape:** pill (999px), 27px tall, min-width 32px, padding 0 6px; 24px tall on mobile.
- **Rest:** background 30% branch into ground, 1.5px border 80% branch into ground, text 78% branch into pill-ink, 12px weight 500 sans.
- **Hover:** background 22% branch over transparent. **Pressed** (`aria-pressed`): solid branch fill, ground-colored text. **Active:** 1px push down.

### Commit rows (home)
One row per post: title left, hash right, the SVG node drawn beside it in the reserved gutter.
- **Shape:** 74px link inside a 100px pitch, 8px radius, padding 0 14px 0 239px, 16px gap.
- **Rest:** transparent; title 20px weight 500 with ellipsis, hash 17px mono in fg-3.
- **Hover / focus:** bg-band fill (0.25s), the hash brightens to fg-2, its node scales 1.3, and the row is checked out into the preview. Leaving returns the preview to HEAD.
- **HEAD** (`is-head`): bg-band held. HEAD is the last-read post from localStorage, else the row marked `data-head`, else the top row.
- **Keyboard:** j and k move focus down and up the visible rows; Enter opens the native link.

### Branch chip (post ref line)
The first line of a post: chip, hash, date, 14px gaps, 15px fg-3.
- **Chip:** pill, 26px, padding 0 9px, 12% branch fill, 1px border at 70% branch, branch-colored 12.5px weight 500 text; links to the home filtered by that branch (`/?branch=`).
- **Hash:** mono, generated from the slug. **Date:** tabular numerals.

### Code panel
The workhorse: every snippet on the home page and in posts.
- **Shape:** 10px radius, 1px hairline, bg-2, padding 28px 12px 24px (44px top with a filename), horizontal scroll with a thin line-2 scrollbar, tab-size 4.
- **Type:** Commit Mono 500, 14.5px on 20.5px, ligatures off.
- **Lines:** each line is a grid of a 30px number, a 28px mark, and content; the mark column is dropped when the panel is not a diff. Added lines get the add tint and add-ink mark, deleted lines the del tint and del-ink mark, hunk headers fg-3.
- **Filename tab** (`data-file`): 32px, 13px fg-3, own bottom hairline, ground-tinted, top corners rounded.
- **Syntax:** highlight.js classes colored by `--syn-*`; comments italic.

### Inline code
0.9em mono on a bg-band chip, 5px radius, padding 2px 6px; 14px in table cells.

### Review note
The senior's comment on the commit: a hairlined 10px panel with a header row.
- **Head:** padding 10px 16px, 14px fg-2, bold author in fg, a mono location in fg-3, background 10% backend blue into bg-2, bottom hairline.
- **Body:** bg-2, padding 16px 16px 18px; following paragraphs lose their top padding.

### Theme switch
A two-segment pill on the right of the top bar, injected by site.js: `dark` and `light` in 12.5px Commit Mono.
- **Shape:** pill, 27px (24px on mobile), 1px line-2 border, bg-2, no shadow (it sits in flow).
- **Rest:** fg-3. **Hover:** fg. **Pressed** (`aria-pressed`): bg-band fill, fg. **Active:** 1px push down.
- First visit follows `prefers-color-scheme`. A press writes `devgrr:theme` and sets `html[data-theme]`. In-body `<picture>` sources that key off `prefers-color-scheme` are rewritten to match the forced scheme.

### Navigation
- **Top bar:** wordmark left, theme switch right.
- **TOC rail:** built from the post's h2s; sticky at 32px; 14.5px; a 1px left hairline with each link padded 5px 0 5px 14px in fg-3, hover fg, current fg with a fg left rule replacing the hairline. Hidden under 1200px.
- **Back link** (post foot): 15.5px fg-2 with a 16px inline SVG chevron, hover fg.
- **Body links:** backend blue, underlined at a 4px offset in a 50% blue mix, full blue on hover.

### Resume button
Fixed bottom-right at 24px (14px under 480px): pill, bg-2 with a line-2 border, padding 10px 16px, 14.5px fg, the floating-control shadow. It appears only when a saved scroll position is more than 600px in and more than 300px from the current one, and removes itself after 15s or on click.

### The Graph (signature)
Drawn by site.js from the list DOM; without JS the list is a plain list.
- **Trunk:** main at the far left, straight up from the root commit. **Lanes:** one per tag, forking from the root on a cubic curve (70 to 150px) then straight up under its pill. **Merge arcs:** each topic commit arcs at 2.5px into the trunk half a pitch above, landing on an r4 merge node. **Nodes:** r7, branch fill, 3px ground ring; HEAD scales 1.3.
- **Motion:** the one authored moment. Once fonts are ready, lanes draw by stroke-dashoffset (1.1s), nodes pop (0.45s), rows rise 6px (0.5s), and the preview fades in at 0.9s. Delays run from the root upward (0.15s, plus 0.9s scaled by distance from the root, plus 0.06s per lane index); the sequence is over by 2.6s. Every transition on the site uses `--ease` cubic-bezier(0.16, 1, 0.3, 1). Under `prefers-reduced-motion: reduce` nothing animates and the layout simply lands.
- **Favicon:** the same mark at 32px: one blue lane, a green and a pink node.

### Named Rules
**The Checkout Rule.** Hover or focus on a log row checks it out: the row bands, its node grows, and the preview swaps to it. Leaving returns to HEAD. New list surfaces reuse this rather than inventing a hover.

## Do's and Don'ts

### Do:
- **Do** declare every new color as `light-dark(light, dark)` on `:root` in assets/style.css; no hardcoded colors in rules.
- **Do** give a branch-colored element `data-branch` and read `var(--c)`; never a branch hex.
- **Do** put code in a `pre.code` panel with `data-lang`, add `diff` and `data-file` when they apply, and let site.js render the lines.
- **Do** write post sections as h2 so the TOC and its scroll tracking build themselves.
- **Do** keep hover and HEAD as a bg-band fill, and focus as the 2px backend-blue ring at a 3px offset.
- **Do** keep any new motion to a 0.2 to 0.3s state transition on `--ease`; the log's rise is the only authored sequence, and it is off under reduced motion.
- **Do** keep hashes, filenames, and the wordmark in Commit Mono with ligatures off.

### Don't:
- **Don't** add cards, gradients, thumbnails, or a shadow on anything in flow.
- **Don't** add a third typeface, an icon font, or a glyph set; the only icon is one inline SVG chevron.
- **Don't** uppercase or letter-space labels; branch names are lowercase 12px.
- **Don't** add a branch without a `light-dark()` color variable, a pill, and a lane; the graph reads the pills to place lanes.
- **Don't** add per-page styles to posts; all CSS lives in assets/style.css.
- **Don't** hand-write hashes; they come from the slug.
