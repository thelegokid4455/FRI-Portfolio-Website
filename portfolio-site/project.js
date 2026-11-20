/* Case-study page: project.html?p=<slug>, built from siteContent.projects in content.js */
const $ = (selector, root = document) => root.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external = 'target="_blank" rel="noopener"';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SITE = 'https://thelegokid4455.github.io/FRI-Portfolio-Website/';

const projects = siteContent.projects;
const slug = new URLSearchParams(location.search).get('p');
const index = projects.findIndex(p => p.slug === slug);
const main = $('#case');

const setMeta = (selector, attr, value) => { const el = $(selector); if (el) el.setAttribute(attr, value); };
const mailto = `mailto:${siteContent.email}`;

const footer = `<footer class="footer">
  <div class="footer-row">
    <p class="footer-name">© ${new Date().getFullYear()} ${esc(siteContent.nameFull)}</p>
    <a class="footer-cta" href="index.html#contact">Work with me →</a>
  </div>
  <ul class="footer-links">
    <li><a href="${esc(mailto)}">${esc(siteContent.email)}</a></li>
    ${siteContent.contact.map(link => `<li><a href="${esc(link.url)}" ${external}>${esc(link.label)}</a></li>`).join('')}
  </ul>
</footer>`;

/* Horizontal strip: scrolls with a finger, mouse drag or arrow buttons, and settles on a whole item.
   A drag never counts as a click on the item underneath. */
const makeStrip = (wrapper) => {
  const track = $('.strip-track', wrapper);
  const prev = $('.strip-prev', wrapper);
  const next = $('.strip-next', wrapper);
  const items = () => [...track.children];

  const nearestLeft = () => {
    const left = track.scrollLeft;
    return items().reduce((best, el) => Math.abs(el.offsetLeft - track.offsetLeft - left) < Math.abs(best - left) ? el.offsetLeft - track.offsetLeft : best, 0);
  };
  const stepBy = (dir) => {
    const first = items()[0];
    const stepWidth = first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : track.clientWidth;
    const perView = Math.max(1, Math.floor(track.clientWidth / stepWidth));
    track.scrollBy({left: dir * stepWidth * perView, behavior: reducedMotion ? 'auto' : 'smooth'});
  };
  const update = () => {
    if (!prev) return;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    wrapper.classList.toggle('is-static', track.scrollWidth <= track.clientWidth + 2);
  };
  prev?.addEventListener('click', () => stepBy(-1));
  next?.addEventListener('click', () => stepBy(1));
  track.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', update);

  // Mouse drag (touch already scrolls natively)
  let drag = null;
  let suppressClick = false;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag = {x: e.clientX, left: track.scrollLeft, moved: false};
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; track.classList.add('is-dragging'); }
    if (drag.moved) { track.scrollLeft = drag.left - dx; e.preventDefault(); }
  });
  window.addEventListener('pointerup', () => {
    if (!drag) return;
    if (drag.moved) {
      suppressClick = true;
      track.classList.remove('is-dragging');
      track.scrollTo({left: nearestLeft(), behavior: reducedMotion ? 'auto' : 'smooth'});
      setTimeout(() => { suppressClick = false; }, 0);
    }
    drag = null;
  });
  track.addEventListener('click', e => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } }, true);
  track.addEventListener('dragstart', e => e.preventDefault());
  update();
  return {update};
};

const stripMarkup = (label, inner, extraClass = '') => `
  <div class="strip ${extraClass}">
    <button class="strip-btn strip-prev" type="button" aria-label="Scroll ${esc(label)} left">‹</button>
    <div class="strip-track">${inner}</div>
    <button class="strip-btn strip-next" type="button" aria-label="Scroll ${esc(label)} right">›</button>
  </div>`;

/* Menu button below 900 px */
const menuBtn = $('#menuBtn');
const header = $('.site-header');
const setMenu = (open) => {
  header.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
};
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); } });
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 8), {passive: true});

if (index === -1) {
  /* Unknown project link: say so, and keep it out of search results */
  document.title = 'Project not found | Farhan Irsyad';
  setMeta('meta[name="robots"]', 'content', 'noindex, follow');
  main.innerHTML = `
    <section class="case-missing">
      <p class="label">Case study</p>
      <h1>That project isn't here</h1>
      <p>The link may be old or mistyped. Here's everything I've put online:</p>
      <ul class="case-missing-list">${projects.map(p => `<li><a href="project.html?p=${esc(p.slug)}">${esc(p.title)}</a></li>`).join('')}</ul>
      <p><a class="btn btn-solid" href="index.html#work">See all work</a></p>
    </section>
    ${footer}`;
} else {
  const p = projects[index];
  const cs = p.caseStudy || {};
  const media = (p.media && p.media.length) ? p.media : [{image: p.image, alt: p.imageAlt, caption: p.imageCaption || ''}];
  const prevP = projects[(index - 1 + projects.length) % projects.length];
  const nextP = projects[(index + 1) % projects.length];
  const url = `${SITE}project.html?p=${encodeURIComponent(p.slug)}`;
  const desc = p.description.length > 150 ? p.description.slice(0, 147).replace(/\s+\S*$/, '') + '…' : p.description;

  document.title = `${p.title}: case study | Farhan Irsyad`;
  setMeta('meta[name="description"]', 'content', desc);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:title"]', 'content', `${p.title} | Farhan Irsyad`);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]', 'content', url);

  // Sections appear only when there's confirmed content for them
  const sections = [
    ['Overview', `<p>${esc(cs.overview || p.description)}</p>`],
    cs.challenge && ['The challenge', `<p>${esc(cs.challenge)}</p>`],
    cs.approach && ['Approach', `<p>${esc(cs.approach)}</p>`],
    cs.features && cs.features.length && ['Interactive features', `<ul class="case-list">${cs.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>`],
    p.tags && p.tags.length && ['Technology', `<ul class="chips">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`],
    cs.statusNote && ['Status', `<p>${esc(cs.statusNote)}</p>`],
    cs.contribution && ['My contribution', `<p>${esc(cs.contribution)}</p>`],
    cs.feedback && ['Feedback', `<blockquote class="case-quote"><p>“${esc(cs.feedback.quote)}”</p><footer>${esc(cs.feedback.source)}</footer></blockquote>`]
  ].filter(Boolean);

  const facts = [
    ['Type', p.category],
    ['Kind', p.kind],
    ['Status', p.status],
    ['Year', p.year],
    ['Built for / with', p.credit],
    ['My role', p.role],
    ['Built with', (p.tags || []).join(', ')]
  ].filter(([, v]) => v);

  const thumbs = media.map((m, i) => `
    <button class="thumb" type="button" data-index="${i}" aria-label="Show ${m.video ? 'clip' : 'image'} ${i + 1}: ${esc(m.caption || m.alt || '')}">
      <img src="${esc(m.poster || m.image)}" alt="" loading="lazy" decoding="async">
      ${m.video ? '<span class="thumb-play" aria-hidden="true">▶</span>' : ''}
    </button>`).join('');

  const others = projects.filter(o => o.slug !== p.slug).map(o => `
    <a class="more-card" href="project.html?p=${esc(o.slug)}">
      <img src="${esc(o.image)}" alt=""${o.imageFocus ? ` style="object-position: ${esc(o.imageFocus)}"` : ''} loading="lazy" decoding="async">
      <strong>${esc(o.title)}</strong>
      <small>${esc(o.category)}</small>
    </a>`).join('');

  main.innerHTML = `
    <p class="case-back"><a href="index.html#work">← All work</a></p>
    <header class="case-head">
      <p class="label">Case study · ${esc(p.category)}</p>
      <h1>${esc(p.title)}</h1>
      ${p.kind || p.status ? `<p class="badges">${p.kind ? `<span class="badge">${esc(p.kind)}</span>` : ''}${p.status ? `<span class="badge badge-status">${esc(p.status)}</span>` : ''}</p>` : ''}
      ${p.credit ? `<p class="project-client">${esc(p.credit)}</p>` : ''}
    </header>

    <section class="viewer" aria-roledescription="carousel" aria-label="${esc(p.title)} screenshots and clips">
      <div class="viewer-stage" id="viewerStage" tabindex="0" aria-live="polite"></div>
      ${media.length > 1 ? `
        <button class="viewer-btn viewer-prev" id="viewerPrev" type="button" aria-label="Previous">‹</button>
        <button class="viewer-btn viewer-next" id="viewerNext" type="button" aria-label="Next">›</button>` : ''}
      <div class="viewer-bar">
        <p class="viewer-caption" id="viewerCaption"></p>
        <p class="viewer-count" id="viewerCount"></p>
      </div>
      ${media.length > 1 ? stripMarkup('thumbnails', thumbs, 'thumbs') : ''}
    </section>

    <div class="case-body">
      <article class="case-sections">
        ${sections.map(([title, body], i) => `
          <section class="case-section"><h2><span class="case-num">${String(i + 1).padStart(2, '0')}</span> ${esc(title)}</h2>${body}</section>`).join('')}
      </article>
      <aside class="case-facts" aria-label="Project facts">
        <dl>${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        ${(p.links || []).map(l => `<a class="btn case-link" href="${esc(l.url)}"${/^https?:/.test(l.url) ? ' ' + external : ''}>${esc(l.label)}${/^https?:/.test(l.url) ? ' ↗' : ''}</a>`).join('')}
      </aside>
    </div>

    <section class="case-cta">
      <div>
        <p class="label">Work with me</p>
        <h2>Need something like this built?</h2>
        <p>Tell me what you need and when. I reply by email, usually with a few questions first.</p>
      </div>
      <div class="actions">
        <a class="btn btn-solid" href="index.html#contact">Work with me</a>
        <a class="btn" href="${esc(mailto)}?subject=${encodeURIComponent('Project like ' + p.title)}">Email me</a>
      </div>
    </section>

    <nav class="case-pager" aria-label="More projects">
      <a class="case-pager-link" href="project.html?p=${esc(prevP.slug)}"><small>← Previous project</small><span>${esc(prevP.title)}</span></a>
      <a class="case-pager-link case-pager-next" href="project.html?p=${esc(nextP.slug)}"><small>Next project →</small><span>${esc(nextP.title)}</span></a>
    </nav>

    <section class="more-work">
      <h2 class="sub-head">More work</h2>
      ${stripMarkup('more work', others, 'more')}
    </section>
    ${footer}`;

  /* Media viewer: arrows, thumbnails, swipe, mouse drag and arrow keys */
  const stage = $('#viewerStage');
  const caption = $('#viewerCaption');
  const count = $('#viewerCount');
  const thumbButtons = [...document.querySelectorAll('.thumb')];
  let current = -1;

  const render = (i) => {
    current = (i + media.length) % media.length;
    const m = media[current];
    if (m.video) {
      stage.innerHTML = `
        <video muted loop playsinline preload="metadata" poster="${esc(m.poster || '')}" aria-label="${esc(m.alt || m.caption || '')}"><source src="${esc(m.video)}" type="video/mp4"></video>
        <button class="video-toggle" type="button">Pause</button>`;
      const video = $('video', stage);
      const toggle = $('.video-toggle', stage);
      const setState = (playing) => { toggle.textContent = playing ? 'Pause' : 'Play'; toggle.setAttribute('aria-label', playing ? 'Pause clip' : 'Play clip'); };
      toggle.addEventListener('click', () => { if (video.paused) video.play(); else video.pause(); });
      video.addEventListener('play', () => setState(true));
      video.addEventListener('pause', () => setState(false));
      if (reducedMotion) setState(false); else video.play().catch(() => setState(false));
    } else {
      stage.innerHTML = `<img src="${esc(m.image)}" alt="${esc(m.alt || m.caption || p.title)}" decoding="async">`;
    }
    caption.textContent = m.caption || '';
    count.textContent = media.length > 1 ? `${current + 1} / ${media.length}` : '';
    thumbButtons.forEach((t, n) => {
      t.setAttribute('aria-current', String(n === current));
      if (n === current) {
        const track = t.parentElement;
        const left = t.offsetLeft - track.offsetLeft - (track.clientWidth - t.offsetWidth) / 2;
        track.scrollTo({left, behavior: reducedMotion ? 'auto' : 'smooth'});
      }
    });
    // Warm up the next image so arrows feel instant
    const nextM = media[(current + 1) % media.length];
    if (nextM && (nextM.image || nextM.poster)) { const img = new Image(); img.src = nextM.image || nextM.poster; }
  };

  render(0);
  if (media.length > 1) {
    $('#viewerPrev').addEventListener('click', () => render(current - 1));
    $('#viewerNext').addEventListener('click', () => render(current + 1));
    thumbButtons.forEach(t => t.addEventListener('click', () => render(Number(t.dataset.index))));
    makeStrip($('.thumbs'));

    document.addEventListener('keydown', e => {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.target.closest?.('input, textarea, select, .more')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); render(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); render(current + 1); }
    });

    // Swipe (touch) and drag (mouse) on the stage
    let start = null;
    stage.addEventListener('pointerdown', e => {
      if (e.target.closest('.video-toggle')) return;
      start = {x: e.clientX, y: e.clientY};
    });
    stage.addEventListener('pointerup', e => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) render(current + (dx < 0 ? 1 : -1));
    });
    stage.addEventListener('pointercancel', () => { start = null; });
    stage.addEventListener('dragstart', e => e.preventDefault());
  }

  makeStrip($('.more'));
}
