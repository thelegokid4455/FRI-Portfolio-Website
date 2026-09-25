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

const visualFor = (accent, category, index) => {
  const ring = accent === 'blue' ? 'var(--accent-2)' : 'var(--accent)';
  const label = ['SIM / 01','SIM / 02','VR / 03','GAME / 04'][index] || 'PROJECT';
  return `<div class="project-visual">
    <div class="visual-grid"></div>
    <div class="visual-ring" style="border-color:${ring};"></div>
    <div class="visual-tag">${esc(label)} · ${esc(category)}</div>
    <div class="visual-bar"><span></span><span></span><span></span></div>
  </div>`;
};

$('#projectGrid').innerHTML = siteContent.projects.map((project, i) => `
  <article class="project-card">
    <div>
      ${visualFor(project.accent, project.category, i)}
      <div class="project-meta">
        <div><h3 class="project-title">${esc(project.title)}</h3></div>
        <span class="project-year">${esc(project.year)}</span>
      </div>
      <p class="project-desc">${esc(project.description)}</p>
      <div class="tags">${project.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>
    </div>
    <div class="project-links">${project.links.map(l => `<a class="project-link" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)} ↗</a>`).join('')}</div>
  </article>
`).join('');

$('#experienceTimeline').innerHTML = siteContent.experience.map(item => `
  <article class="timeline-item">
    <div class="period">${esc(item.period)}</div>
    <div><h3 class="role">${esc(item.role)}</h3><div class="company">${esc(item.company)}</div><p>${esc(item.description)}</p></div>
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
