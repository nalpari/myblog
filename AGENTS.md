# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

(Imported by `CLAUDE.md`; also read directly by Codex. Keep it agent-neutral.)

## What this is

A hand-written static blog in Korean (`lang="ko"`), deployed on Vercel. No build step,
no package manager, no tests, no framework. Files are served as-is.

## Commands

There is nothing to build or test. To preview routing accurately:

```sh
npx vercel dev
```

Do **not** preview with `python3 -m http.server` — every internal link is extensionless
and will 404 without Vercel's `cleanUrls` rewriting.

## Routing contract

`vercel.json` sets `cleanUrls: true` and `trailingSlash: false`. So `posts/hello-world.html`
is served at `/posts/hello-world`. Every `href`, `<link rel="canonical">`, and stylesheet path
must be **absolute and extensionless** (`/posts/hello-world`, `/assets/style.css`).
Writing `.html` in a link works locally-ish but is wrong for the deployed URLs.

## Adding a post

There is no index generator. Three manual edits, all required:

1. Create `posts/<slug>.html` — copy the structure of `posts/hello-world.html`:
   `.wrap > article > h1 + p.meta` (the date), then `p.nav` with the `← 목록으로` back link.
2. Set `<title>… · Blog</title>`, `<meta name="description">`, and
   `<link rel="canonical" href="/posts/<slug>" />`.
3. Add an `<li>` to the `ul.posts` list in `index.html` (title + `.meta` line with date).
   Forgetting this makes the post live but unreachable from the home page.

## Styling

All CSS lives in `assets/style.css`; posts have no per-page styles. Light/dark comes from
`color-scheme: light dark` plus CSS custom properties overridden in a
`@media (prefers-color-scheme: dark)` block — add new colors as variables in both blocks,
not as hardcoded values in a rule.

## Design hooks

The Impeccable skill is wired as a PostToolUse (Edit/Write) and Stop hook in both
`.claude/settings.local.json` and `.codex/hooks.json`. Editing HTML/CSS here triggers a
design check; that is expected, not an error.
