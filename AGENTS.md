# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

(Imported by `CLAUDE.md`; also read directly by Codex. Keep it agent-neutral.)

## What this is

devgrr: a hand-written static tech blog in Korean (`lang="ko"`) for developers, deployed
on Vercel. No build step, no package manager, no tests, no framework. Files are served as-is.
The home page draws the post list as a git commit graph (`git log --graph`): each post is a
commit on its topic branch, merged into `main`. Product truth lives in `PRODUCT.md`, the visual
system in `DESIGN.md`.

## Commands

There is nothing to build or test. To preview routing accurately:

```sh
npx vercel dev
```

Do **not** preview with `python3 -m http.server` — every internal link is extensionless
and will 404 without Vercel's `cleanUrls` rewriting. Any static server that maps `/posts/x`
to `posts/x.html` also works for a quick check.

## Routing contract

`vercel.json` sets `cleanUrls: true` and `trailingSlash: false`. So `posts/git-worktree.html`
is served at `/posts/git-worktree`. Every `href`, `<link rel="canonical">`, and stylesheet path
must be **absolute and extensionless** (`/posts/git-worktree`, `/assets/style.css`).
Writing `.html` in a link works locally-ish but is wrong for the deployed URLs.

## Adding a post

1. Create `posts/<slug>.html` by copying `posts/javascript-proxy.html` (short) or
   `posts/git-worktree.html` (has an in-body figure). Keep the skeleton: `.topbar` (wordmark
   only; the theme switch is injected by `site.js`), `main.post-layout > article.post` with `header.post-head` (`p.ref` = branch
   tag + empty `span.hash` + `time`, then `h1`, `p.lede`), an optional `figure.cover` between
   the header and the body, `div.body`, `footer.post-foot`, and the empty `nav.toc` after the
   article. Set `<title>… · devgrr</title>`, `<meta name="description">` (one or two sentences;
   the home list reuses it as the summary), and `<link rel="canonical" href="/posts/<slug>" />`.
   Copy the `devgrr:theme` boot `<script>` from an existing post into `<head>` (before the
   stylesheet) so a saved theme does not flash the wrong scheme.
   - `p.ref .branch` carries `data-branch="frontend|backend|infra|cs"` and links to
     `/?branch=<name>`. The home graph only draws a lane for branches that have a pill button
     in `ul.branches` (currently frontend, backend, infra); a post on a branch without a pill
     lands on the trunk. To bring `cs` back, restore its pill: the color variable and filter
     rule are still in place.
2. Register it in `index.html`. If `.claude/skills/ingest/scripts/ingest.py` is present
   (it is gitignored as a local skill), run it from the repo root: a dry run prints the plan,
   `--write` applies it and validates, `--check` validates only. It adds an `<li>` at the top of
   `ol.commits` for every post file missing from the list, removes entries whose file is gone,
   leaves existing entries byte-for-byte alone, keeps a `main` entry last, and toggles the
   dockerfile highlighter script. Review the new entry's title (one line; long titles are cut
   at `:`) and its snippet. Without the script, add the `<li>` by hand:
   `data-branch`, `data-slug` (= file name), `<a href="/posts/<slug>"><span class="title">…
   </span></a>`, `<p class="summary">`, and optionally `<pre class="snippet [diff]"
   data-lang="…" [data-file="…"] hidden>` with 5-15 lines, none wider than about 62 columns
   (longer lines clip in the preview pane with no scroll affordance; fold shell lines with `\`).
3. Ordering: newest at the top. An entry with `data-branch="main"` is the graph root and must
   stay last; when there is none, `site.js` draws a grey virtual root below the list. Optional:
   `data-head` on one `<li>` pins the post shown in the preview on a first visit; otherwise the
   top row is HEAD. After a visitor reads a post, that post becomes HEAD for them (localStorage).

Commit hashes are computed from the slug by JS; there is nothing to maintain.

## Content conventions

- Code: `<pre class="code" data-lang="java" data-file="Foo.java">` with raw text, `<` escaped
  as `&lt;` and `&` as `&amp;`. Add class `diff` and prefix lines with `+` / `-` for diffs (`@@`
  lines render as hunk headers). Colors come from highlight.js (cdnjs) at runtime; `dockerfile`
  is not in the default bundle, so a page whose blocks use it also loads
  `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/dockerfile.min.js`.
  Languages hljs lacks (`prisma`) render as plain text. Use `data-lang="text"` for ASCII trees.
- The senior's note: `<aside class="review"><p class="review-head"><b>devgrr</b> 리뷰 코멘트
  <span class="hash">File.java:12</span></p><p>…</p></aside>`.
- Cover image: `<figure class="cover"><img src="/assets/posts/<slug>-cover.webp" width="1600"
  height="900" fetchpriority="high" alt="…"></figure>` right after `header.post-head`. Covers
  are flat diagrams on the dark ground in the post's branch color, 16:9, webp at 1600×900.
- In-body figures: `<figure><picture><source srcset="…-dark.webp" media="(prefers-color-scheme:
  dark)"><img src="…-light.webp" width height loading="lazy" alt="…"></picture><figcaption>…
  </figcaption></figure>`, both files the same size. Images live in `assets/posts/`.
- Sections are `h2` (the TOC is built from them); use `h3` inside a section. Headings and list
  titles use `word-break: keep-all`, so Korean never breaks inside a word.
- Dates are `<time datetime="YYYY-MM-DD">` (`YYYY-MM` when the source only has a month).
  Never invent metrics or testimonials (`PRODUCT.md`).
- Voice: 합니다체, no emoji, no em dashes. Code and technical terms stay in English.

## Styling

All CSS lives in `assets/style.css`; pages have no per-page styles. Dark is the default scene.
Color tokens use `light-dark(light, dark)` so both schemes live on one declaration; never
hardcode a color in a rule. `html[data-theme="light"|"dark"]` forces `color-scheme` and the
toggle persists that in `localStorage` (`devgrr:theme`); without it, `prefers-color-scheme`
chooses. Branch colors are
`--frontend / --backend / --infra / --cs / --main` and reach elements through `--c` on any
`[data-branch]`. Fonts: Wanted Sans Variable (jsDelivr) for text, Commit Mono (fontsource via
jsDelivr) for code, hashes and the wordmark; both are linked in every page head.

## JS

`assets/site.js` (vanilla, `defer`, one file for both pages) draws the graph from the
`ol.commits` DOM and the `ul.branches` pills, fills the preview pane, handles hover/focus
checkout, `j`/`k` keys, the branch filter, the dark/light theme switch, code-block rendering, the post TOC with scroll-spy,
and reading-position memory. The lanes SVG sits above the rows (`z-index`) so nodes stay
visible over the HEAD band. Without JS the index is a plain list and posts are plain text.

## Design hooks

The Impeccable skill is wired as a PostToolUse (Edit/Write) and Stop hook in both
`.claude/settings.local.json` and `.codex/hooks.json`. Editing HTML/CSS here triggers a
design check; that is expected, not an error.
