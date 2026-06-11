const cards = [{"label": "Notes", "value": "318", "delta": "+24"}, {"label": "Pinned", "value": "12", "delta": "+1"}, {"label": "Tags", "value": "36", "delta": "+5"}, {"label": "Searches", "value": "842", "delta": "+19%"}];
const rows = [{"title": "Product ideas", "status": "Pinned", "detail": "Collects feature suggestions and validation notes."}, {"title": "Meeting summary", "status": "Updated", "detail": "Action items extracted and assigned."}, {"title": "Reading list", "status": "Tagged", "detail": "Articles grouped by topic and priority."}, {"title": "Launch checklist", "status": "Active", "detail": "Pre-launch tasks tracked in one place."}];
const insights = ["Pinned notes are used most during planning.", "Tagged notes improve retrieval speed.", "Meeting summaries benefit from action-first formatting."];
const storageKey = 'vizvasanlya-notes-app-items';
let saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
let filter = 'all';

const statsEl = document.querySelector('#stats');
const listEl = document.querySelector('#list');
const insightsEl = document.querySelector('#insights');
const form = document.querySelector('#add-item');
const input = document.querySelector('#itemInput');

function renderStats() {
  statsEl.innerHTML = cards.map((item) => `
    <article class="metric">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <em>${item.delta}</em>
    </article>
  `).join('');
}

function renderList() {
  const visible = rows.filter((row) => filter === 'all' || row.status.includes(filter));
  if (!visible.length) {
    listEl.innerHTML = '<p class="empty">No items match this filter yet.</p>';
    return;
  }
  listEl.innerHTML = visible.map((row) => `
    <article class="row">
      <div>
        <h3>${row.title}</h3>
        <p>${row.detail}</p>
      </div>
      <span class="badge">${row.status}</span>
    </article>
  `).join('');
}

function renderInsights() {
  insightsEl.innerHTML = insights.map((item) => `<li>${item}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  saved.unshift({ title: value, status: 'Active', detail: 'Added from the quick capture form.' });
  localStorage.setItem(storageKey, JSON.stringify(saved.slice(0, 10)));
  input.value = '';
  renderList();
});

document.querySelectorAll('.filters button').forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderList();
  });
});

renderStats();
renderList();
renderInsights();
