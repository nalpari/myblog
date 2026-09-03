/* devgrr: the commit-graph index and the post page. Runs as-is, no build step.
   Without JS the index is a plain list and posts are plain text; this file only adds. */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const HEAD_KEY = 'devgrr:head';
  const POS_KEY = 'devgrr:pos';
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode: the page still works */ } },
  };

  // A stable 7-hex "commit hash" from the slug (FNV-1a), so nobody maintains hashes by hand.
  function hash7(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0').slice(0, 7);
  }

  /* ---------- code blocks: line-wrapped, diff-aware, highlighted when hljs is present ---------- */

  function renderCode(pre) {
    if (pre.dataset.rendered) return;
    const lang = pre.dataset.lang || 'plaintext';
    const isDiff = pre.classList.contains('diff');
    const text = pre.textContent.replace(/^\n+/, '').replace(/\s+$/, '');
    const canHl = typeof hljs !== 'undefined' && hljs.getLanguage(lang);
    const hl = (t) => (canHl ? hljs.highlight(t, { language: lang, ignoreIllegals: true }).value : esc(t));
    const code = document.createElement('code');
    text.split('\n').forEach((line, i) => {
      let mark = ' ', body = line;
      if (isDiff && (line[0] === '+' || line[0] === '-')) { mark = line[0]; body = line.slice(1); }
      const kind = mark === '+' ? 'add' : mark === '-' ? 'del' : isDiff && body.startsWith('@@') ? 'hunk' : 'ctx';
      code.insertAdjacentHTML('beforeend',
        `<span class="ln ${kind}"><span class="n">${i + 1}</span><span class="m">${mark}</span><span class="c">${kind === 'hunk' ? esc(body) : hl(body)}</span></span>`);
    });
    pre.replaceChildren(code);
    pre.dataset.rendered = '1';
  }

  $$('pre.code').forEach(renderCode);

  /* ---------- home: git log --graph ---------- */

  const list = $('.commits');
  if (list) initGraph(list);

  function initGraph(list) {
    const graph = list.closest('.graph');
    const svg = $('svg.lanes', graph);
    const rows = $$(':scope > li', list);
    const tags = $$('.branches button[data-branch]');
    const preview = $('#preview');
    const color = (el) => getComputedStyle(el).getPropertyValue('--c').trim() || 'currentColor';

    rows.forEach((li) => {
      const a = $('a', li);
      if (a && !$('.hash', a)) a.insertAdjacentHTML('beforeend', `<span class="hash">${hash7(li.dataset.slug || a.pathname)}</span>`);
    });

    let head = rows.find((r) => r.dataset.slug === store.get(HEAD_KEY)) || rows.find((r) => r.hasAttribute('data-head')) || rows[0];
    let nodes = [];

    function layout() {
      const gr = graph.getBoundingClientRect();
      const laneX = {};
      // main is the trunk at the far left; every post is a commit on its topic lane merged into main.
      // Lanes sit under their tag pills; on narrow screens --lane-gap packs them instead.
      const style = getComputedStyle(graph);
      const x0 = parseFloat(style.getPropertyValue("--main-x")) || 6;
      const gap = parseFloat(style.getPropertyValue("--lane-gap")) || 0;
      tags.forEach((t, i) => { const r = t.getBoundingClientRect(); laneX[t.dataset.branch] = gap ? x0 + gap * (i + 1) : r.left + r.width / 2 - gr.left; });
      laneX.main = x0;

      nodes = rows.map((li) => {
        const r = $("a", li).getBoundingClientRect();
        return { li, b: li.dataset.branch, x: laneX[li.dataset.branch] ?? x0, y: r.top + r.height / 2 - gr.top };
      });
      const root = nodes[nodes.length - 1];
      const pitch = nodes.length > 1 ? Math.max(40, nodes[nodes.length - 2].y - (nodes[nodes.length - 3] ? nodes[nodes.length - 3].y : 0)) : 100;
      const fork = Math.min(150, Math.max(70, root.y - (nodes.length > 1 ? nodes[nodes.length - 2].y : 0) + 40));
      const span = Math.max(1, root.y);
      const delayOf = (n, i) => 0.15 + ((root.y - n.y) / span) * 0.9 + (i + 1) * 0.06;

      svg.setAttribute("viewBox", `0 0 ${gr.width} ${gr.height}`);
      let out = `<path class="lane" data-branch="main" d="M${x0} ${root.y} L${x0} 0" pathLength="1" style="--c:${color(root.li)};--d:0s"/>`;
      tags.forEach((t, i) => {
        const b = t.dataset.branch, x = laneX[b];
        const d = `M${x0} ${root.y} C${x0} ${root.y - fork * 0.55} ${x} ${root.y - fork * 0.45} ${x} ${root.y - fork} L${x} 0`;
        out += `<path class="lane" data-branch="${b}" d="${d}" pathLength="1" style="--c:${color(t)};--d:${(i + 1) * 0.08}s"/>`;
      });
      nodes.forEach((n, i) => {
        const d = delayOf(n, tags.findIndex((t) => t.dataset.branch === n.b));
        n.li.style.setProperty("--d", `${d.toFixed(2)}s`);
        if (n.b !== "main" && n !== root) {
          // the merge: this commit lands on main halfway to the next row up
          const my = n.y - pitch / 2;
          out += `<path class="lane arc" data-branch="${n.b}" d="M${n.x} ${n.y} C${n.x} ${n.y - pitch * 0.3} ${x0} ${my + pitch * 0.2} ${x0} ${my}" pathLength="1" style="--c:${color(n.li)};--d:${(d + 0.12).toFixed(2)}s"/>`;
          out += `<circle class="node merge" data-branch="main" cx="${x0}" cy="${my}" r="4" style="--c:${color(root.li)};--d:${(d + 0.32).toFixed(2)}s"/>`;
        }
      });
      nodes.forEach((n, i) => {
        const d = delayOf(n, tags.findIndex((t) => t.dataset.branch === n.b));
        out += `<circle class="node${n.li === head ? " is-head" : ""}" data-branch="${n.b}" cx="${n.x}" cy="${n.y}" r="7" style="--c:${color(n.li)};--d:${d.toFixed(2)}s"/>`;
      });
      svg.innerHTML = out;
    }

    let shown = null;
    function show(li) {
      if (li === shown) return;
      shown = li;
      rows.forEach((r) => r.classList.toggle('is-head', r === li));
      $$('.node:not(.merge)', svg).forEach((n, i) => n.classList.toggle('is-head', nodes[i] && nodes[i].li === li));
      if (!preview) return;
      const a = $('a', li);
      const title = $('.preview-title', preview);
      const summary = $('.preview-summary', preview);
      const codeBox = $('.preview-code', preview);
      title.innerHTML = `<a href="${a.getAttribute('href')}">${$('.title', a).textContent}</a>`;
      summary.textContent = ($('.summary', li) || {}).textContent || '';
      const snip = $('.snippet', li);
      codeBox.replaceChildren();
      if (snip) {
        const pre = document.createElement('pre');
        pre.className = 'code' + (snip.classList.contains('diff') ? ' diff' : '');
        if (snip.dataset.lang) pre.dataset.lang = snip.dataset.lang;
        if (snip.dataset.file) pre.dataset.file = snip.dataset.file;
        pre.textContent = snip.textContent;
        renderCode(pre);
        codeBox.appendChild(pre);
      }
    }

    // hover or focus checks a commit out into the preview; leaving returns to HEAD
    list.addEventListener('mouseover', (e) => { const li = e.target.closest('li'); if (li && rows.includes(li)) show(li); });
    list.addEventListener('mouseleave', () => show(head));
    list.addEventListener('focusin', (e) => { const li = e.target.closest('li'); if (li) show(li); });
    list.addEventListener('focusout', (e) => { if (!list.contains(e.relatedTarget)) show(head); });

    // j / k walk the log like a pager; Enter opens (native link)
    document.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || /^(input|textarea|select)$/i.test(e.target.tagName)) return;
      if (e.key !== 'j' && e.key !== 'k') return;
      const visible = rows.filter((r) => !graph.dataset.filter || r.dataset.branch === graph.dataset.filter);
      const cur = rows.find((r) => r.contains(document.activeElement)) || rows.find((r) => r.classList.contains('is-head'));
      let i = visible.indexOf(cur);
      i = e.key === 'j' ? Math.min(visible.length - 1, i + 1) : Math.max(0, i - 1);
      e.preventDefault();
      $('a', visible[i]).focus();
    });

    // a branch tag filters the log to that branch; pressing it again clears
    tags.forEach((t) => t.addEventListener('click', () => {
      const on = graph.dataset.filter === t.dataset.branch;
      tags.forEach((x) => x.setAttribute('aria-pressed', String(!on && x === t)));
      if (on) delete graph.dataset.filter; else graph.dataset.filter = t.dataset.branch;
    }));

    layout();
    show(head);

    // /?branch=backend arrives from a post's branch tag: land filtered
    const wanted = new URLSearchParams(location.search).get('branch');
    const wantedTag = tags.find((t) => t.dataset.branch === wanted);
    if (wantedTag) wantedTag.click();

    // the one authored moment: the log rises from its root once fonts are in
    if (!reduce) {
      graph.classList.add('is-drawing');
      if (preview) preview.classList.add('is-late');
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
        layout();
        requestAnimationFrame(() => { graph.classList.remove('is-drawing'); graph.classList.add('is-drawn'); });
        setTimeout(() => graph.classList.remove('is-drawn'), 2600);
      });
    } else if (document.fonts) {
      document.fonts.ready.then(layout);
    }

    new ResizeObserver(() => layout()).observe(graph);
  }

  /* ---------- post page ---------- */

  const post = $('article.post');
  if (post) initPost(post);

  function initPost(post) {
    const slug = location.pathname.replace(/\/$/, '').split('/').pop().replace(/\.html$/, '');
    store.set(HEAD_KEY, slug);

    const hash = $('.post-head .hash', post);
    if (hash && !hash.textContent.trim()) hash.textContent = hash7(slug);

    // table of contents from the h2s; the current one follows the scroll
    const toc = $('.toc');
    const h2s = $$('.body h2', post);
    if (toc && h2s.length > 1) {
      const used = new Set();
      const ol = document.createElement('ol');
      h2s.forEach((h, i) => {
        if (!h.id) {
          let id = h.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '') || `section-${i + 1}`;
          while (used.has(id)) id += '-';
          h.id = id;
        }
        used.add(h.id);
        ol.insertAdjacentHTML('beforeend', `<li><a href="#${h.id}">${esc(h.textContent)}</a></li>`);
      });
      toc.insertAdjacentHTML('afterbegin', '<p>목차</p>');
      toc.appendChild(ol);
      const links = $$('a', ol);
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.toggleAttribute('aria-current', l.getAttribute('href') === `#${en.target.id}`));
        });
      }, { rootMargin: '-10% 0px -70% 0px' });
      h2s.forEach((h) => io.observe(h));
    }

    // where you stopped last time is a mark, not a mood: offer to jump back
    let saved = null;
    try { saved = JSON.parse(store.get(POS_KEY) || 'null'); } catch { saved = null; }
    if (saved && saved.slug === slug && saved.y > 600 && Math.abs(scrollY - saved.y) > 300) {
      const btn = document.createElement('button');
      btn.className = 'resume';
      btn.type = 'button';
      btn.textContent = '읽던 곳으로';
      btn.addEventListener('click', () => { scrollTo({ top: saved.y, behavior: reduce ? 'auto' : 'smooth' }); btn.remove(); });
      document.body.appendChild(btn);
      setTimeout(() => btn.remove(), 15000);
    }
    addEventListener('pagehide', () => store.set(POS_KEY, JSON.stringify({ slug, y: Math.round(scrollY) })));
  }
})();
