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

/* Header shadow + back to top */
const header = $('.site-header');
const backToTop = $('#backToTop');
const onScroll = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 8);
  backToTop.classList.toggle('is-visible', window.scrollY > 900);
};
window.addEventListener('scroll', onScroll, {passive: true});
onScroll();
backToTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

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
