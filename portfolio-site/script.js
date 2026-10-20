const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external = 'target="_blank" rel="noopener"';

document.querySelectorAll('[data-content]').forEach(el => {
  const key = el.dataset.content;
  if (siteContent[key] !== undefined) el.textContent = siteContent[key];
});

$('#year').textContent = new Date().getFullYear();

const mailto = `mailto:${siteContent.email}`;
$('#emailButton').href = mailto;
$('#contactEmail').href = mailto;
$('#contactEmail').textContent = siteContent.email;
if (siteContent.cv) {
  $('#cvButton').href = siteContent.cv.url;
  $('#cvButton').textContent = `${siteContent.cv.label} ↗`;
} else {
  $('#cvButton').remove();
}

/* Selected work */
$('#projectGrid').innerHTML = siteContent.projects.map(project => `
  <article class="project">
    <figure class="project-image">
      <img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title)}" loading="lazy" decoding="async">
    </figure>
    <div class="project-body">
      <p class="project-meta">${esc(project.year)} · ${esc(project.category)}</p>
      <h3>${esc(project.title)}</h3>
      ${project.client ? `<p class="project-client">${esc(project.client)}</p>` : ''}
      <p>${esc(project.description)}</p>
      <p class="project-tags">${project.tags.map(esc).join(', ')}</p>
    </div>
  </article>
`).join('');

/* Games: only the first screenshot loads up front; the rest load when someone flips through */
const shotSrc = (game, n) => `assets/games/${game.slug}/${n}.jpg`;

$('#gameGallery').innerHTML = siteContent.games.map(game => {
  const count = Math.max(1, game.shots || 1);
  const shots = Array.from({length: count}, (_, i) => i === 0
    ? `<img class="shot is-active" src="${esc(shotSrc(game, 1))}" alt="${esc(game.title)} screenshot 1" loading="lazy" decoding="async">`
    : `<img class="shot" data-src="${esc(shotSrc(game, i + 1))}" alt="${esc(game.title)} screenshot ${i + 1}" decoding="async">`
  ).join('');
  const controls = count > 1 ? `
    <button class="shot-btn shot-prev" type="button" aria-label="Previous screenshot of ${esc(game.title)}">‹</button>
    <button class="shot-btn shot-next" type="button" aria-label="Next screenshot of ${esc(game.title)}">›</button>
    <span class="shot-count" aria-hidden="true">1 / ${count}</span>` : '';
  return `<article class="game">
    <div class="game-media">
      <a class="game-shots" href="${esc(game.url)}" ${external} tabindex="-1" aria-hidden="true">${shots}</a>
      ${controls}
    </div>
    <h3 class="game-title"><a href="${esc(game.url)}" ${external}>${esc(game.title)}</a></h3>
    <p class="game-links"><a href="${esc(game.url)}" ${external}>itch.io</a>${game.video ? ` · <a href="${esc(game.video)}" ${external}>Trailer</a>` : ''}</p>
  </article>`;
}).join('');

document.querySelectorAll('.game').forEach(card => {
  const shots = [...card.querySelectorAll('.shot')];
  if (shots.length < 2) return;
  const counter = card.querySelector('.shot-count');
  let current = 0;

  const load = (img) => { if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; } };
  const show = (next) => {
    current = (next + shots.length) % shots.length;
    load(shots[current]);
    load(shots[(current + 1) % shots.length]);
    shots.forEach((img, i) => img.classList.toggle('is-active', i === current));
    counter.textContent = `${current + 1} / ${shots.length}`;
  };

  // Warm up the next screenshot when the pointer arrives, so the first click feels instant
  card.addEventListener('pointerenter', () => load(shots[1]), {once: true});
  card.querySelector('.shot-prev').addEventListener('click', () => show(current - 1));
  card.querySelector('.shot-next').addEventListener('click', () => show(current + 1));

  let touchX = null;
  const media = card.querySelector('.game-media');
  media.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive: true});
  media.addEventListener('touchend', e => {
    if (touchX === null) return;
    const delta = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(delta) > 35) { e.preventDefault(); show(current + (delta < 0 ? 1 : -1)); }
  });
});

/* Experience */
const initials = (name) => name.split('·')[0].trim().split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');

$('#experienceTimeline').innerHTML = siteContent.experience.map(item => `
  <li class="job">
    <div class="job-logo" data-initials="${esc(initials(item.company))}">
      <img src="${esc(item.visual)}" alt="${esc(item.visualAlt || item.company)}" loading="lazy" decoding="async">
    </div>
    <p class="job-period">${esc(item.period)}</p>
    <div class="job-body">
      <h3>${esc(item.role)}</h3>
      <p class="job-company">${esc(item.company)}</p>
      <p>${esc(item.description)}</p>
    </div>
  </li>
`).join('');

// External logos can disappear; show the company's initials instead of a broken image
document.querySelectorAll('.job-logo img').forEach(img => {
  const fail = () => img.parentElement.classList.add('is-missing');
  if (img.complete && img.naturalWidth === 0) fail();
  else img.addEventListener('error', fail);
});

/* About */
$('#skillsPanel').innerHTML = siteContent.skills.map(([name, desc]) => `
  <div><dt>${esc(name)}</dt><dd>${esc(desc)}</dd></div>
`).join('');

$('#facts').innerHTML = siteContent.facts.map(([label, value]) => `
  <div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>
`).join('');

$('#contactLinks').innerHTML = siteContent.contact.map(link => `
  <li><a href="${esc(link.url)}" ${external}>${esc(link.label)} ↗</a></li>
`).join('');

/* Section pager: one section on screen at a time, switched with tabs, arrows, keys or swipes.
   Each section still scrolls normally, and scrolling past its end moves on to the next one. */
const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tabs a')];
const header = $('.site-header');
const pager = $('#pager');
const prevBtn = $('#pagerPrev');
const nextBtn = $('#pagerNext');
const edgeHint = $('#edgeHint');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = -1;
let lastSwitch = 0;

document.documentElement.classList.add('paged');
pager.hidden = false;

const counts = {
  work: `${siteContent.projects.length} projects`,
  games: `${siteContent.games.length} games`,
  art: 'Illustration, 3D & sketches',
  experience: `${siteContent.experience.length} roles`,
  about: 'Skills & background',
  contact: 'Email & links'
};
$('#tour').innerHTML = `<p class="tour-label">Jump to</p><div class="tour-links">${panels.slice(1).map((panel, i) => `
  <a class="tour-link" href="#${panel.id}"><span class="tour-num">${String(i + 1).padStart(2, '0')}</span><strong>${esc(panel.dataset.title)}</strong><small>${esc(counts[panel.id] || '')}</small></a>
`).join('')}</div>`;

$('#pagerDots').innerHTML = panels.map((panel, i) =>
  `<button class="pager-dot" type="button" data-index="${i}" aria-label="Go to ${esc(panel.dataset.title)}"></button>`
).join('');
const dots = [...document.querySelectorAll('.pager-dot')];

panels.forEach((panel, i) => {
  panel.tabIndex = -1;
  const next = panels[i + 1];
  panel.insertAdjacentHTML('beforeend', next
    ? `<div class="panel-end wrap"><a class="panel-next" href="#${next.id}"><small>Next</small><span>${esc(next.dataset.title)} →</span></a><p class="panel-end-hint">or keep scrolling</p></div>`
    : `<div class="panel-end wrap"><a class="panel-next" href="#${panels[0].id}"><small>That's everything</small><span>Back to start ↺</span></a></div>`);
});

const atTop = (panel) => panel.scrollTop <= 1;
const atBottom = (panel) => panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;

const go = (index, {landAt = 'top', push = true, focus = false} = {}) => {
  index = Math.max(0, Math.min(panels.length - 1, index));
  if (index === current) return;
  const direction = index > current ? 'next' : 'prev';
  const panel = panels[index];

  panels.forEach((p, i) => {
    const active = i === index;
    p.classList.toggle('is-active', active);
    p.classList.remove('enter-next', 'enter-prev');
    p.inert = !active;
  });
  if (current !== -1 && !reducedMotion) {
    void panel.offsetWidth; // restart the entrance animation
    panel.classList.add(`enter-${direction}`);
  }
  panel.scrollTop = landAt === 'bottom' ? panel.scrollHeight : 0;
  current = index;
  lastSwitch = Date.now();
  hideHint();

  tabs.forEach(tab => {
    const on = tab.getAttribute('href') === `#${panel.id}`;
    if (on) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
    if (on) {
      const nav = tab.parentElement;
      nav.scrollTo({left: tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2, behavior: reducedMotion ? 'auto' : 'smooth'});
    }
  });
  dots.forEach((dot, i) => dot.setAttribute('aria-current', i === index ? 'true' : 'false'));
  const prev = panels[index - 1];
  const next = panels[index + 1];
  prevBtn.disabled = !prev;
  nextBtn.disabled = !next;
  prevBtn.querySelector('.pager-label').textContent = prev ? prev.dataset.title : '';
  nextBtn.querySelector('.pager-label').textContent = next ? next.dataset.title : '';
  prevBtn.setAttribute('aria-label', prev ? `Previous section: ${prev.dataset.title}` : 'Previous section');
  nextBtn.setAttribute('aria-label', next ? `Next section: ${next.dataset.title}` : 'Next section');
  header.classList.toggle('is-scrolled', panel.scrollTop > 8);

  const hash = `#${panel.id}`;
  if (push && location.hash !== hash) history.pushState(null, '', hash);
  if (focus) panel.focus({preventScroll: true});
};

const step = (delta, options) => go(current + delta, options);
const indexOf = (hash) => panels.findIndex(p => `#${p.id}` === hash);

prevBtn.addEventListener('click', () => step(-1, {focus: true}));
nextBtn.addEventListener('click', () => step(1, {focus: true}));
dots.forEach(dot => dot.addEventListener('click', () => go(Number(dot.dataset.index), {focus: true})));

// Any in-page link to a section (tabs, hero buttons, "Next" links) switches instead of jumping
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const index = indexOf(link.getAttribute('href'));
  if (index === -1) return;
  event.preventDefault();
  go(index, {focus: true});
});

window.addEventListener('popstate', () => {
  const index = indexOf(location.hash);
  go(index === -1 ? 0 : index, {push: false});
});

document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); step(1, {focus: true}); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1, {focus: true}); }
});

/* Scrolling past the top or bottom of a section moves to the neighbouring one */
const EDGE_PULL = 260;
let pull = 0;
let pullTimer;
const hideHint = () => { pull = 0; edgeHint.classList.remove('is-visible'); };
const showHint = (direction) => {
  const target = panels[current + (direction > 0 ? 1 : -1)];
  if (!target) return;
  edgeHint.textContent = direction > 0 ? `Keep scrolling for ${target.dataset.title} ↓` : `Keep scrolling for ${target.dataset.title} ↑`;
  edgeHint.style.setProperty('--pull', Math.min(1, Math.abs(pull) / EDGE_PULL));
  edgeHint.classList.toggle('is-top', direction < 0);
  edgeHint.classList.add('is-visible');
};

panels.forEach(panel => {
  panel.addEventListener('scroll', () => {
    if (panel === panels[current]) header.classList.toggle('is-scrolled', panel.scrollTop > 8);
  }, {passive: true});

  panel.addEventListener('wheel', event => {
    if (panel !== panels[current] || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (Date.now() - lastSwitch < 700) return; // let momentum from the last switch die down
    const down = event.deltaY > 0;
    if ((down && !atBottom(panel)) || (!down && !atTop(panel))) { hideHint(); return; }
    if ((down && pull < 0) || (!down && pull > 0)) pull = 0;
    pull += event.deltaY * (event.deltaMode === 1 ? 33 : 1);
    clearTimeout(pullTimer);
    pullTimer = setTimeout(hideHint, 900);
    if (Math.abs(pull) >= EDGE_PULL) {
      step(down ? 1 : -1, {landAt: down ? 'top' : 'bottom'});
    } else {
      showHint(down ? 1 : -1);
    }
  }, {passive: true});
});

/* Touch: swipe sideways to switch, or keep pulling past the end of a section */
let touchStart = null;
$('#stage').addEventListener('touchstart', event => {
  const panel = panels[current];
  const t = event.changedTouches[0];
  touchStart = {x: t.clientX, y: t.clientY, top: atTop(panel), bottom: atBottom(panel), inCarousel: !!event.target.closest('.game-media')};
}, {passive: true});
$('#stage').addEventListener('touchend', event => {
  if (!touchStart) return;
  const t = event.changedTouches[0];
  const dx = t.clientX - touchStart.x;
  const dy = t.clientY - touchStart.y;
  const panel = panels[current];
  if (!touchStart.inCarousel && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    step(dx < 0 ? 1 : -1);
  } else if (touchStart.bottom && atBottom(panel) && dy < -90) {
    step(1);
  } else if (touchStart.top && atTop(panel) && dy > 90 && current > 0) {
    step(-1, {landAt: 'bottom'});
  }
  touchStart = null;
}, {passive: true});

const startIndex = indexOf(location.hash);
go(startIndex === -1 ? 0 : startIndex, {push: false});

/* Visit counter (third-party; fails quietly) */
const visitorCount = $('#visitorCount');
fetch('https://countapi.mileshilliard.com/api/v1/hit/thelegokid4455-portfolio-visits-2026', {cache: 'no-store'})
  .then(response => {
    if (!response.ok) throw new Error('Visitor counter unavailable');
    return response.json();
  })
  .then(data => {
    const count = Number(data.value ?? data.count);
    if (Number.isFinite(count)) visitorCount.textContent = count.toLocaleString();
  })
  .catch(() => { visitorCount.closest('.visitor-counter').hidden = true; });
