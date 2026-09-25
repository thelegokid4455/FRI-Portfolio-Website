const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

document.querySelectorAll('[data-content]').forEach(el => {
  const key = el.dataset.content;
  if (siteContent[key] !== undefined) el.textContent = siteContent[key];
});

$('#year').textContent = new Date().getFullYear();

$('#heroMetrics').innerHTML = siteContent.metrics.map(([value,label]) => `
  <div class="metric"><span class="metric-value">${esc(value)}</span><span class="metric-label">${esc(label)}</span></div>
`).join('');

const visualFor = (project, index) => {
  const label = ['SIM / 01','SIM / 02','VR / 03','GAME / 04'][index] || 'PROJECT';
  return `<div class="project-visual">
    <img class="project-image" src="${esc(project.image)}" alt="${esc(project.title)} thumbnail" loading="lazy" decoding="async">
    <div class="project-image-overlay"></div>
    <div class="visual-tag">${esc(label)} · ${esc(project.category)}</div>
  </div>`;
};

$('#projectGrid').innerHTML = siteContent.projects.map((project, i) => `
  <article class="project-card">
    <div>
      ${visualFor(project, i)}
      <div class="project-meta">
        <div><h3 class="project-title">${esc(project.title)}</h3></div>
        <span class="project-year">${esc(project.year)}</span>
      </div>
      <p class="project-desc">${esc(project.description)}</p>
      <div class="tags">${project.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>
  </article>
`).join('');

const gameImagePath = (file) => file
  .replace(/\\/g, '/')
  .split('/')
  .map(part => encodeURIComponent(part))
  .join('/');

const renderGameGallery = async () => {
  const gallery = $('#gameGallery');
  if (!gallery) return;

  try {
    const response = await fetch('assets/itch_media_archive/manifest.json');
    if (!response.ok) throw new Error('Could not load itch.io media manifest.');
    const manifest = await response.json();

    gallery.innerHTML = manifest.projects.map((project, index) => {
      const images = (project.images || []).filter(item => item && item.file);
      if (!images.length) return '';

      return `<article class="game-card" data-game-index="${index}" data-game-url="${esc(project.url || '#')}">
        <div class="game-carousel">
          <div class="game-slides">
            ${images.map((item, imageIndex) => `
              <img class="game-slide${imageIndex === 0 ? ' is-active' : ''}" src="assets/itch_media_archive/${gameImagePath(item.file)}" alt="${esc(project.title)} screenshot ${imageIndex + 1}" loading="${imageIndex === 0 ? 'eager' : 'lazy'}" decoding="async">
            `).join('')}
          </div>
          ${images.length > 1 ? `
            <button class="game-carousel-btn game-carousel-prev" type="button" aria-label="Previous image">‹</button>
            <button class="game-carousel-btn game-carousel-next" type="button" aria-label="Next image">›</button>
            <div class="game-carousel-dots" aria-hidden="true">
              ${images.map((_, imageIndex) => `<span class="game-carousel-dot${imageIndex === 0 ? ' is-active' : ''}"></span>`).join('')}
            </div>
          ` : ''}
        </div>
        <div class="game-card-shade"></div>
        <div class="game-card-title">${esc(project.title)}</div>
        <div class="game-card-link">itch.io ↗</div>
      </article>`;
    }).join('');

    gallery.querySelectorAll('.game-card').forEach(card => {
      const slides = [...card.querySelectorAll('.game-slide')];
      if (slides.length < 2) {
        card.addEventListener('click', () => window.open(card.dataset.gameUrl, '_blank', 'noopener,noreferrer'));
        return;
      }

      const dots = [...card.querySelectorAll('.game-carousel-dot')];
      let current = 0;

      const showSlide = (next) => {
        current = (next + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
      };

      card.querySelector('.game-carousel-prev').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showSlide(current - 1);
      });

      card.querySelector('.game-carousel-next').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showSlide(current + 1);
      });

      let touchStartX = 0;
      card.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, {passive:true});
      card.addEventListener('touchend', event => {
        const delta = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(delta) > 35) {
          event.preventDefault();
          showSlide(current + (delta < 0 ? 1 : -1));
        }
      }, {passive:false});

      card.addEventListener('click', event => {
        if (event.target.closest('.game-carousel-btn')) return;
        window.open(card.dataset.gameUrl, '_blank', 'noopener,noreferrer');
      });
    });
  } catch (error) {
    gallery.innerHTML = '<p class="section-note">Game media could not be loaded right now.</p>';
    console.error(error);
  }
};

renderGameGallery();

$('#experienceTimeline').innerHTML = siteContent.experience.map(item => `
  <article class="timeline-item">
    <div class="experience-visual">
      <img src="${esc(item.visual)}" alt="${esc(item.visualAlt || item.company + ' visual')}" loading="lazy" decoding="async">
      <span class="experience-visual-label">WORK / EXPERIENCE</span>
    </div>
    <div class="experience-copy">
      <div class="period">${esc(item.period)}</div>
      <h3 class="role">${esc(item.role)}</h3>
      <div class="company">${esc(item.company)}</div>
      <p>${esc(item.description)}</p>
    </div>
  </article>
`).join('');

$('#skillsPanel').innerHTML = siteContent.skills.map(([name,desc]) => `
  <article class="skill-group"><h3>${esc(name)}</h3><p>${esc(desc)}</p></article>
`).join('');

$('#facts').innerHTML = siteContent.facts.map(([label,value]) => `
  <div class="fact"><span class="fact-label">${esc(label)}</span><span class="fact-value">${esc(value)}</span></div>
`).join('');

$('#contactLinks').innerHTML = siteContent.contact.map(link => `
  <a class="contact-link" href="${esc(link.url)}" ${link.url.startsWith('mailto:') ? '' : 'target="_blank" rel="noreferrer"'}>${esc(link.label)} ↗</a>
`).join('');
