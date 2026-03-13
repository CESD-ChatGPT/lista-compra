const STORAGE_KEY = 'lista-compra-items';

const CATEGORY_LABELS = {
  frutas:     'Frutas y Verduras',
  lacteos:    'Lácteos',
  carnes:     'Carnes y Pescados',
  panaderia:  'Panadería',
  bebidas:    'Bebidas',
  limpieza:   'Limpieza',
  congelados: 'Congelados',
  otros:      'Otros',
};

let items = load();
let currentFilter = 'all';

// --- Persistence ---

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// --- Render ---

function render() {
  const list = document.getElementById('itemList');
  const actionsBar = document.getElementById('actionsBar');
  const summary = document.getElementById('summary');

  const visible = items.filter(item => {
    if (currentFilter === 'pending') return !item.done;
    if (currentFilter === 'done') return item.done;
    return true;
  });

  list.innerHTML = '';

  visible.forEach(item => {
    const li = document.createElement('li');
    li.className = 'item' + (item.done ? ' done' : '');
    li.dataset.id = item.id;

    li.innerHTML = `
      <div class="item-check" data-action="toggle" title="Marcar como comprado"></div>
      <div class="item-text">
        <div class="item-name">${escapeHtml(item.name)}</div>
        <div class="item-category">
          <span class="badge badge-${item.category}">${CATEGORY_LABELS[item.category] || 'Otros'}</span>
        </div>
      </div>
      <button class="btn-delete" data-action="delete" title="Eliminar">✕</button>
    `;

    list.appendChild(li);
  });

  // Summary
  const pending = items.filter(i => !i.done).length;
  const total = items.length;
  if (total === 0) {
    summary.textContent = 'Lista vacía';
  } else {
    summary.textContent = `${pending} de ${total} artículo${total !== 1 ? 's' : ''} pendiente${pending !== 1 ? 's' : ''}`;
  }

  // Actions bar
  const hasDone = items.some(i => i.done);
  actionsBar.style.display = total > 0 ? 'flex' : 'none';
  document.getElementById('clearDone').style.display = hasDone ? '' : 'none';
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- Actions ---

function addItem(name, category) {
  name = name.trim();
  if (!name) return;
  items.unshift({ id: Date.now(), name, category, done: false });
  save();
  render();
}

function toggleItem(id) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    save();
    render();
  }
}

function deleteItem(id) {
  items = items.filter(i => i.id !== id);
  save();
  render();
}

function clearDone() {
  items = items.filter(i => !i.done);
  save();
  render();
}

function clearAll() {
  if (!confirm('¿Seguro que quieres vaciar toda la lista?')) return;
  items = [];
  save();
  render();
}

// --- Event Listeners ---

document.getElementById('addForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('itemInput');
  const select = document.getElementById('categorySelect');
  addItem(input.value, select.value);
  input.value = '';
  input.focus();
});

document.getElementById('itemList').addEventListener('click', e => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const id = Number(target.closest('.item').dataset.id);
  if (target.dataset.action === 'toggle') toggleItem(id);
  if (target.dataset.action === 'delete') deleteItem(id);
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

document.getElementById('clearDone').addEventListener('click', clearDone);
document.getElementById('clearAll').addEventListener('click', clearAll);

// --- Init ---
render();
