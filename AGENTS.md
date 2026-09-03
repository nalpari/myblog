# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

(Imported by `CLAUDE.md`; also read directly by Codex. Keep it agent-neutral.)

## What this is

devgrr: a hand-written static tech blog in Korean (`lang="ko"`) for junior developers, deployed
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

`vercel.json` sets `cleanUrls: true` and `trailingSlash: false`. So `posts/hello-world.html`
is served at `/posts/hello-world`. Every `href`, `<link rel="canonical">`, and stylesheet path
must be **absolute and extensionless** (`/posts/hello-world`, `/assets/style.css`).
Writing `.html` in a link works locally-ish but is wrong for the deployed URLs.

## Adding a post

There is no index generator. Three manual edits, all required:

1. Create `posts/<slug>.html` by copying `posts/spring-transaction-propagation.html`
   (full-featured) or `posts/hello-world.html` (minimal). Keep the skeleton: `.topbar`,
   `main.post-layout > article.post` with `header.post-head` (`p.ref` = branch tag + empty
   `span.hash` + `time`, then `h1`, `p.lede`), `div.body`, `footer.post-foot`, and the empty
   `nav.toc` after the article. Set `<title>… · devgrr</title>`, `<meta name="description">`,
   and `<link rel="canonical" href="/posts/<slug>" />`.
   - `p.ref .branch` carries `data-branch="frontend|backend|infra|cs"` and links to
     `/?branch=<name>` (the home page lands filtered on that branch).
   - Delete `<span class="sample">예시 글</span>` for real posts; the shipped example posts
     carry it because their content is synthetic.
2. Add an `<li>` at the **top** of `ol.commits` in `index.html` with `data-branch`,
   `data-slug` (= file name), `<a href="/posts/<slug>"><span class="title">…</span></a>`,
   a `<p class="summary">` (one or two sentences; shown in the preview pane and on mobile), and
   optionally `<pre class="snippet [diff]" data-lang="…" hidden>` with 5-15 lines for the
   preview pane. The **last** `<li>` (`hello-world`, `data-branch="main"`) is the graph root;
   leave it last.
3. Optional: `data-head` on one `<li>` pins the post shown in the preview on a first visit.
   After a visitor reads a post, that post becomes HEAD for them (localStorage).

Commit hashes are computed from the slug by JS; there is nothing to maintain.

## Content conventions

- Code: `<pre class="code" data-lang="java" data-file="Foo.java">` with raw text, `<` escaped
  as `&lt;`. Add class `diff` and prefix lines with `+` / `-` for diffs (`@@` lines render as
  hunk headers). Colors come from highlight.js (cdnjs) at runtime; `dockerfile` needs the extra
  language script (see `posts/docker-image-diet.html`). Blocks render as plain `<pre>` without JS.
- The senior's note: `<aside class="review"><p class="review-head"><b>devgrr</b> 리뷰 코멘트
  <span class="hash">File.java:12</span></p><p>…</p></aside>`.
- Sections are `h2` (the TOC is built from them); use `h3` inside a section.
- Dates are `<time datetime="YYYY-MM-DD">`. Never invent metrics or testimonials (`PRODUCT.md`).

## Styling

All CSS lives in `assets/style.css`; pages have no per-page styles. Dark is the default theme
(`:root`), light overrides sit in `@media (prefers-color-scheme: light)` — add new colors as
variables in both blocks, never as hardcoded values in a rule. Branch colors are
`--frontend / --backend / --infra / --cs / --main` and reach elements through `--c` on any
`[data-branch]`. Fonts: Wanted Sans Variable (jsDelivr) for text, Commit Mono (fontsource via
jsDelivr) for code, hashes and the wordmark; both are linked in every page head.

## JS

`assets/site.js` (vanilla, `defer`, one file for both pages) draws the graph from the
`ol.commits` DOM, fills the preview pane, handles hover/focus checkout, `j`/`k` keys, the
branch filter, code-block rendering, the post TOC with scroll-spy, and reading-position memory.
Without JS the index is a plain list and posts are plain text.

## Design hooks

The Impeccable skill is wired as a PostToolUse (Edit/Write) and Stop hook in both
`.claude/settings.local.json` and `.codex/hooks.json`. Editing HTML/CSS here triggers a
design check; that is expected, not an error.
