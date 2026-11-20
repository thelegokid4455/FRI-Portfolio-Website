const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external = 'target="_blank" rel="noopener"';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-content]').forEach(el => {
  const key = el.dataset.content;
  if (siteContent[key] !== undefined) el.textContent = siteContent[key];
});

const mailto = `mailto:${siteContent.email}`;
$('#contactEmail').href = mailto;
$('#contactEmail').textContent = siteContent.email;

/* Home */
const hero = siteContent.hero;
$('#heroTitle').textContent = hero.title;
$('#heroAudience').textContent = hero.audience;
$('#heroIntro').textContent = hero.intro;
$('#heroPrimary').textContent = hero.primary.label;
$('#heroPrimary').href = hero.primary.href;
$('#heroSecondary').textContent = hero.secondary.label;
$('#heroSecondary').href = hero.secondary.href;
$('#heroRecent').innerHTML = hero.recent.map(r => `<a href="${esc(r.url)}"${/^https?:/.test(r.url) ? ' ' + external : ''}>${esc(r.title || r.label)}</a>`).join(' · ');
$('#heroChips').innerHTML = hero.chips.map(c => `<li>${esc(c)}</li>`).join('');
if (siteContent.portfolio) {
  $('#pdfLink').href = siteContent.portfolio.pdf;
  $('#pdfLink').textContent = `Portfolio PDF (${siteContent.portfolio.pages} pages) ↗`;
} else {
  $('#pdfLink').remove();
}

// Hero clip: plays muted on a loop, unless the visitor prefers reduced motion. Always pausable.
if (hero.video) {
  const v = hero.video;
  $('#heroMedia').innerHTML = `
    <div class="hero-video">
      <video muted loop playsinline preload="metadata" poster="${esc(v.poster)}" aria-label="${esc(v.alt)}">
        <source src="${esc(v.src)}" type="video/mp4">
      </video>
      <button class="video-toggle" type="button" aria-pressed="false">Pause</button>
    </div>
    <figcaption>${esc(v.caption)}</figcaption>`;
  const video = $('#heroMedia video');
  const toggle = $('#heroMedia .video-toggle');
  const setState = (playing) => {
    toggle.textContent = playing ? 'Pause' : 'Play';
    toggle.setAttribute('aria-pressed', String(!playing));
    toggle.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
  };
  toggle.addEventListener('click', () => { if (video.paused) video.play(); else video.pause(); });
  video.addEventListener('play', () => setState(true));
  video.addEventListener('pause', () => setState(false));
  if (reducedMotion) setState(false);
  else video.play().catch(() => setState(false));
} else {
  $('#heroMedia').remove();
}

/* What I do */
$('#servicesGrid').innerHTML = siteContent.services.map(s => `
  <article class="service">
    <h3>${esc(s.title)}</h3>
    <p class="service-get">${esc(s.get)}</p>
    <dl>
      <div><dt>For</dt><dd>${esc(s.for)}</dd></div>
      <div><dt>Example</dt><dd>${esc(s.example)}</dd></div>
    </dl>
  </article>
`).join('');

/* Process */
$('#processSteps').innerHTML = siteContent.process.map((s, i) => `
  <li class="step"><span class="step-num">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>
`).join('');

/* Selected work */
$('#projectGrid').innerHTML = siteContent.projects.map(project => {
  const caseUrl = `project.html?p=${encodeURIComponent(project.slug)}`;
  return `
  <article class="project">
    <figure class="project-image">
      <a href="${esc(caseUrl)}" tabindex="-1" aria-hidden="true"><img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title)}"${project.imageFocus ? ` style="object-position: ${esc(project.imageFocus)}"` : ''} loading="lazy" decoding="async"></a>
      ${project.imageCaption ? `<figcaption>${esc(project.imageCaption)}</figcaption>` : ''}
    </figure>
    <div class="project-body">
      <p class="project-meta">${[project.year, project.category].filter(Boolean).map(esc).join(' · ')}</p>
      <h3><a class="project-title-link" href="${esc(caseUrl)}">${esc(project.title)}</a></h3>
      ${project.kind || project.status ? `<p class="badges">${project.kind ? `<span class="badge">${esc(project.kind)}</span>` : ''}${project.status ? `<span class="badge badge-status">${esc(project.status)}</span>` : ''}</p>` : ''}
      ${project.credit ? `<p class="project-client">${esc(project.credit)}</p>` : ''}
      <p>${esc(project.description)}</p>
      <p class="project-tags">${project.tags.map(esc).join(', ')}</p>
      <p class="project-link"><a href="${esc(caseUrl)}">Read the case study →</a></p>
    </div>
  </article>`;
}).join('');


// Structured data: the Selected Work projects as a list of CreativeWork, from the same content
const SITE_URL = 'https://thelegokid4455.github.io/FRI-Portfolio-Website/';
const workList = document.createElement('script');
workList.type = 'application/ld+json';
workList.textContent = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Selected work',
  itemListElement: siteContent.projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}project.html?p=${encodeURIComponent(p.slug)}`,
    name: p.title
  }))
});
document.head.appendChild(workList);
$('#gamesTitle').textContent = `${siteContent.games.length} games, from game jams to team releases`;

/* Games: only the first screenshot loads up front; the rest load when someone flips through */
const shotSrc = (game, n) => `assets/games/${game.slug}/${n}.webp`;

$('#gameGallery').innerHTML = siteContent.games.map(game => {
  const count = Math.max(1, game.shots || 1);
  const shots = Array.from({length: count}, (_, i) => i === 0
    ? `<img class="shot is-active" src="${esc(shotSrc(game, 1))}" alt="${esc(game.title)} screenshot 1" ${game.focus ? ` style="object-position: ${esc(game.focus)}"` : ''} loading="lazy" decoding="async">`
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
    ${game.genre || game.status ? `<p class="game-meta">${[game.genre, game.status].filter(Boolean).map(esc).join(' · ')}</p>` : ''}
    ${game.tagline ? `<p class="game-tagline">${esc(game.tagline)}</p>` : ''}
    ${game.with && game.with.length ? `<p class="game-credits">With ${game.with.map(esc).join(', ')}</p>` : ''}
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

/* Contact form: sends to the Apps Script web app, or falls back to the visitor's email app */
const form = $('#inquiryForm');
const inquiry = siteContent.inquiry || {projectTypes: [], budgets: []};
const formResult = $('#formResult');
const submitBtn = $('#formSubmit');
const endpoint = (inquiry.endpoint || '').trim();
const connected = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint);

const addOptions = (select, options) => select.insertAdjacentHTML('beforeend', options.map(o => `<option>${esc(o)}</option>`).join(''));
addOptions($('#f-projectType'), inquiry.projectTypes);
addOptions($('#f-budget'), inquiry.budgets);

if (!connected) {
  $('#formMode').hidden = false;
  $('#formMode').textContent = "This form isn't connected to my inbox yet. Sending opens your email app with your message filled in, so you can check it and press send.";
  submitBtn.textContent = 'Open in my email app';
}

const formData = () => ({
  name: $('#f-name').value.trim(),
  email: $('#f-email').value.trim(),
  organization: $('#f-organization').value.trim(),
  projectType: $('#f-projectType').value,
  budget: $('#f-budget').value,
  timeline: $('#f-timeline').value.trim(),
  description: $('#f-description').value.trim(),
  links: $('#f-links').value.trim(),
  consent: $('#f-consent').checked,
  website: $('#f-website').value,
  page: location.href
});

const rules = {
  name: d => d.name.length >= 2 || 'Please enter your name.',
  email: d => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email) || 'Please enter a valid email address, like name@example.com.',
  projectType: d => !!d.projectType || 'Please choose what you need.',
  budget: d => !!d.budget || 'Please choose a budget. "Not sure yet" is fine.',
  description: d => d.description.length >= 20 || `Please add a bit more detail (${d.description.length} of at least 20 characters).`,
  consent: d => d.consent || 'Please tick this box so I can store your details and reply.'
};

const setFieldError = (name, message) => {
  const input = $(`#f-${name}`);
  const error = $(`#e-${name}`);
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message || '';
};

const checkField = (name, data = formData()) => {
  const result = rules[name](data);
  setFieldError(name, result === true ? '' : result);
  return result === true;
};

// Check a field when the visitor leaves it, then live once it has shown an error
Object.keys(rules).forEach(name => {
  const input = $(`#f-${name}`);
  const evt = input.type === 'checkbox' || input.tagName === 'SELECT' ? 'change' : 'blur';
  input.addEventListener(evt, () => checkField(name));
  input.addEventListener('input', () => { if (input.getAttribute('aria-invalid') === 'true') checkField(name); });
});

const showResult = (kind, html, focus = true) => {
  formResult.className = `form-result is-${kind}`;
  formResult.innerHTML = html;
  if (focus) formResult.focus({preventScroll: true});
  formResult.scrollIntoView({block: 'nearest', behavior: reducedMotion ? 'auto' : 'smooth'});
};

const mailtoFor = (d) => {
  const body = [
    d.description, '',
    `Name: ${d.name}`,
    d.organization && `Organization: ${d.organization}`,
    `Project type: ${d.projectType}`,
    `Budget: ${d.budget}`,
    d.timeline && `Timeline: ${d.timeline}`,
    d.links && `Links: ${d.links}`
  ].filter(line => line !== '' && line !== undefined && line !== false).join('\n');
  return `mailto:${siteContent.email}?subject=${encodeURIComponent(`${d.projectType} from ${d.name}`)}&body=${encodeURIComponent(body)}`;
};

const setBusy = (busy) => {
  submitBtn.disabled = busy;
  form.setAttribute('aria-busy', String(busy));
  submitBtn.textContent = busy ? 'Sending…' : (connected ? 'Send message' : 'Open in my email app');
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = formData();
  const invalid = Object.keys(rules).filter(name => !checkField(name, data));
  if (invalid.length) {
    showResult('error', `<p>Please fix the ${invalid.length === 1 ? 'highlighted field' : `${invalid.length} highlighted fields`} and send again.</p>`, false);
    $(`#f-${invalid[0]}`).focus();
    return;
  }
  if (data.website) return; // honeypot filled: almost certainly a bot

  if (!connected) {
    window.location.href = mailtoFor(data);
    showResult('info', `<p><strong>Your email app should open now</strong> with your message filled in. Press send there to reach me.</p>
      <p>Nothing opened? Email me at <a href="mailto:${esc(siteContent.email)}">${esc(siteContent.email)}</a>.</p>`);
    return;
  }

  setBusy(true);
  formResult.className = 'form-result';
  formResult.textContent = '';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    // text/plain keeps this a "simple" request: Apps Script can't answer CORS preflights
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain;charset=utf-8'},
      body: JSON.stringify(data),
      signal: controller.signal
    });
    const result = await response.json();
    if (result.ok) {
      form.reset();
      Object.keys(rules).forEach(name => setFieldError(name, ''));
      showResult('success', `<p><strong>Thanks, ${esc(data.name)}. Your message is in.</strong></p>
        <p>Your reference number is <strong class="ref">${esc(result.id)}</strong>. I'll reply to ${esc(data.email)}.</p>`);
    } else if (result.error === 'invalid' && Array.isArray(result.fields)) {
      result.fields.forEach(name => { if (rules[name]) setFieldError(name, 'Please check this field.'); });
      showResult('error', '<p>Some details need another look. Please fix the highlighted fields and send again.</p>');
    } else if (result.error === 'rate_limited') {
      showResult('error', `<p>You've sent a few messages in the last hour, so this one wasn't sent. Please <a href="${esc(mailtoFor(data))}">email me directly</a> instead.</p>`);
    } else {
      throw new Error(result.error || 'unknown');
    }
  } catch (error) {
    showResult('error', `<p><strong>Your message couldn't be sent</strong>, so nothing was saved. Please try again, or <a href="${esc(mailtoFor(data))}">send it by email</a> instead; your details are filled in.</p>`);
  } finally {
    clearTimeout(timer);
    setBusy(false);
  }
});

/* Section pager: one section on screen at a time, switched with tabs, arrows, keys or swipes.
   Each section still scrolls normally, and scrolling past its end moves on to the next one. */
const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tabs a')];
const header = $('.site-header');
const pager = $('#pager');
const prevBtn = $('#pagerPrev');
const nextBtn = $('#pagerNext');
const edgeHint = $('#edgeHint');
let current = -1;
let lastSwitch = 0;

document.documentElement.classList.add('paged');
pager.hidden = false;

const counts = {
  services: `${siteContent.services.length} kinds of work`,
  work: `${siteContent.projects.length} projects`,
  games: `${siteContent.games.length} games`,
  art: 'Illustration, 3D & sketches',
  process: `${siteContent.process.length} steps`,
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

// Every section ends with a next step and the same small footer
const footer = `<footer class="footer wrap">
  <div class="footer-row">
    <p class="footer-name">© ${new Date().getFullYear()} ${esc(siteContent.nameFull)}</p>
    <a class="footer-cta" href="#contact">Work with me →</a>
  </div>
  <ul class="footer-links">
    <li><a href="${esc(mailto)}">${esc(siteContent.email)}</a></li>
    ${siteContent.contact.map(link => `<li><a href="${esc(link.url)}" ${external}>${esc(link.label)}</a></li>`).join('')}
  </ul>
</footer>`;

panels.forEach((panel, i) => {
  panel.tabIndex = -1;
  const next = panels[i + 1];
  const end = next
    ? `<div class="panel-end wrap"><a class="panel-next" href="#${next.id}"><small>Next</small><span>${esc(next.dataset.title)} →</span></a><p class="panel-end-hint">${panel.id === 'contact' ? '' : '<a href="#contact">Ready to talk? Work with me</a> · '}or keep scrolling</p></div>`
    : `<div class="panel-end wrap"><a class="panel-next" href="#${panels[0].id}"><small>That's everything</small><span>Back to start ↺</span></a></div>`;
  panel.insertAdjacentHTML('beforeend', end + footer);
});

/* Menu button (below 900 px the section tabs fold into a dropdown) */
const menuBtn = $('#menuBtn');
const setMenu = (open) => {
  header.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? 'Close' : 'Menu';
};
menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('click', event => {
  if (menuBtn.getAttribute('aria-expanded') !== 'true') return;
  if (event.target.closest('.tabs a') || !event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
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
  touchStart = {x: t.clientX, y: t.clientY, top: atTop(panel), bottom: atBottom(panel), inCarousel: !!event.target.closest('.game-media, .inquiry')};
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
