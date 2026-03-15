/* ============================================
   ATA ADMIN DASHBOARD - FULL CRM & BUSINESS TOOLS
   ============================================ */

// ===== DATA LAYER =====
const DB = {
  get(key) { try { return JSON.parse(localStorage.getItem('ata_' + key)) || []; } catch { return []; } },
  set(key, val) { localStorage.setItem('ata_' + key, JSON.stringify(val)); },
  nextId(key) { const items = this.get(key); return items.length ? Math.max(...items.map(i => i.id || 0)) + 1 : 1; }
};

// ===== TAB NAVIGATION =====
document.querySelectorAll('.sidebar-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('tab-' + item.dataset.tab).classList.add('active');
    refreshAll();
  });
});

// ===== MODAL HELPERS =====
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// ===== FORMAT HELPERS =====
function fmt$(n) { return '$' + Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function statusBadge(status) {
  const map = { lead: 'badge-blue', prospect: 'badge-yellow', active: 'badge-green', completed: 'badge-navy',
    unpaid: 'badge-blue', paid: 'badge-green', overdue: 'badge-red', pending: 'badge-yellow', accepted: 'badge-green', declined: 'badge-red' };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

// ===== DASHBOARD =====
function refreshDashboard() {
  const clients = DB.get('clients');
  const invoices = DB.get('invoices');
  const estimates = DB.get('estimates');
  const leads = DB.get('leads');
  const images = DB.get('images');

  document.getElementById('stat-clients').textContent = clients.length;
  document.getElementById('stat-invoices').textContent = invoices.filter(i => i.status === 'unpaid').length;
  document.getElementById('stat-estimates').textContent = estimates.filter(e => e.status === 'pending').length;
  document.getElementById('stat-leads').textContent = leads.length;

  // Also update dashboard lead count from API
  fetch('/api/leads').then(function(r){return r.json();}).then(function(data){
    if(data.leads && data.leads.length > 0) document.getElementById('stat-leads').textContent = data.leads.length;
  }).catch(function(){});

  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.grand_total || 0), 0);
  const outstanding = invoices.filter(i => i.status !== 'paid').reduce((s, i) => s + (i.grand_total || 0), 0);
  document.getElementById('stat-revenue').textContent = fmt$(paid);
  document.getElementById('stat-outstanding').textContent = fmt$(outstanding);
  document.getElementById('stat-images').textContent = images.length;

  // Recent activity
  const activity = [
    ...clients.map(c => ({ type: 'Client', name: c.name, date: c.created, detail: c.service || '' })),
    ...invoices.map(i => ({ type: 'Invoice', name: i.number + ' - ' + i.client_name, date: i.date, detail: fmt$(i.grand_total) })),
    ...estimates.map(e => ({ type: 'Estimate', name: e.number + ' - ' + e.client_name, date: e.date, detail: fmt$(e.grand_total) })),
    ...leads.map(l => ({ type: 'Lead', name: l.name || l.email, date: l.date, detail: l.source })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  document.getElementById('recent-activity').innerHTML = activity.length ? activity.map(a =>
    `<div class="activity-item"><div class="activity-name">${a.type}: ${a.name}</div><div class="activity-service">${a.detail}</div><div class="activity-date">${fmtDate(a.date)}</div></div>`
  ).join('') : '<p style="text-align:center;padding:40px;">No activity yet. Start by adding clients or creating invoices.</p>';
}

// ===== IMAGE MANAGER =====
const uploadZone = document.getElementById('uploadZone');
const imageInput = document.getElementById('imageInput');

uploadZone?.addEventListener('click', () => imageInput.click());
uploadZone?.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone?.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone?.addEventListener('drop', e => { e.preventDefault(); uploadZone.classList.remove('dragover'); handleFiles(e.dataTransfer.files); });
imageInput?.addEventListener('change', e => handleFiles(e.target.files));

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      const images = DB.get('images');
      images.push({ id: DB.nextId('images'), name: file.name, data: e.target.result, category: 'unassigned', uploaded: new Date().toISOString() });
      DB.set('images', images);
      refreshImages();
    };
    reader.readAsDataURL(file);
  });
}

function refreshImages() {
  const images = DB.get('images');
  const filter = document.getElementById('imageFilter')?.value || 'all';
  const filtered = filter === 'all' ? images : images.filter(i => i.category === filter);

  document.getElementById('imageGrid').innerHTML = filtered.length ? filtered.map(img =>
    `<div class="image-card">
      <img src="${img.data}" alt="${img.name}">
      <div class="image-card-info">
        <h4>${img.name}</h4>
        <p>Category: <select onchange="updateImageCategory(${img.id}, this.value)" style="padding:2px 4px;font-size:11px;border:1px solid #ddd;border-radius:4px;margin:0;">
          ${['unassigned','hero','services','portfolio','about'].map(c => `<option value="${c}" ${img.category===c?'selected':''}>${c}</option>`).join('')}
        </select></p>
      </div>
      <div class="image-card-actions">
        <button class="btn btn-sm btn-gray" onclick="copyImageUrl(${img.id})">Copy URL</button>
        <button class="btn btn-sm" style="color:#C0392B;" onclick="deleteImage(${img.id})">Delete</button>
      </div>
    </div>`
  ).join('') : '<p style="grid-column:1/-1;text-align:center;padding:40px;">No images uploaded yet. Drag and drop or click above to add images.</p>';
}

document.getElementById('imageFilter')?.addEventListener('change', refreshImages);

function updateImageCategory(id, cat) {
  const images = DB.get('images');
  const img = images.find(i => i.id === id);
  if (img) { img.category = cat; DB.set('images', images); }
}

function copyImageUrl(id) {
  const img = DB.get('images').find(i => i.id === id);
  if (img) { navigator.clipboard?.writeText(img.data); alert('Image data URL copied to clipboard!'); }
}

function deleteImage(id) {
  if (!confirm('Delete this image?')) return;
  DB.set('images', DB.get('images').filter(i => i.id !== id));
  refreshImages();
}

// ===== CRM =====
let clientFilter = 'all';

function openClientModal(id) {
  document.getElementById('clientModalTitle').textContent = id ? 'Edit Client' : 'Add Client';
  if (id) {
    const c = DB.get('clients').find(x => x.id === id);
    if (!c) return;
    document.getElementById('clientId').value = c.id;
    document.getElementById('clientName').value = c.name;
    document.getElementById('clientEmail').value = c.email;
    document.getElementById('clientPhone').value = c.phone;
    document.getElementById('clientStatus').value = c.status;
    document.getElementById('clientAddress').value = c.address;
    document.getElementById('clientService').value = c.service;
    document.getElementById('clientValue').value = c.value;
    document.getElementById('clientNotes').value = c.notes;
  } else {
    ['clientId','clientName','clientEmail','clientPhone','clientAddress','clientValue','clientNotes'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('clientStatus').value = 'lead';
    document.getElementById('clientService').value = '';
  }
  openModal('clientModal');
}

function saveClient() {
  const clients = DB.get('clients');
  const id = document.getElementById('clientId').value;
  const data = {
    name: document.getElementById('clientName').value,
    email: document.getElementById('clientEmail').value,
    phone: document.getElementById('clientPhone').value,
    status: document.getElementById('clientStatus').value,
    address: document.getElementById('clientAddress').value,
    service: document.getElementById('clientService').value,
    value: parseFloat(document.getElementById('clientValue').value) || 0,
    notes: document.getElementById('clientNotes').value,
  };
  if (!data.name) return alert('Name is required');
  if (id) {
    const idx = clients.findIndex(c => c.id == id);
    if (idx >= 0) { clients[idx] = { ...clients[idx], ...data }; }
  } else {
    data.id = DB.nextId('clients');
    data.created = new Date().toISOString();
    clients.push(data);
  }
  DB.set('clients', clients);
  closeModal('clientModal');
  refreshCRM();
}

function deleteClient(id) {
  if (!confirm('Delete this client?')) return;
  DB.set('clients', DB.get('clients').filter(c => c.id !== id));
  refreshCRM();
}

function filterClients(filter, btn) {
  clientFilter = filter;
  document.querySelectorAll('.filter-row .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  refreshCRM();
}

function refreshCRM() {
  const clients = DB.get('clients');
  let filtered = clientFilter === 'all' ? clients : clients.filter(c => c.status === clientFilter);
  if (clientSearchQuery) {
    filtered = filtered.filter(c =>
      (c.name || '').toLowerCase().includes(clientSearchQuery) ||
      (c.phone || '').toLowerCase().includes(clientSearchQuery) ||
      (c.service || '').toLowerCase().includes(clientSearchQuery) ||
      (c.email || '').toLowerCase().includes(clientSearchQuery)
    );
  }

  document.getElementById('clientsTable').innerHTML = filtered.length ? filtered.map(c =>
    `<tr>
      <td><strong>${c.name}</strong></td>
      <td class="text-muted">${c.email || '-'}</td>
      <td class="text-muted">${c.phone || '-'}</td>
      <td>${statusBadge(c.status)}</td>
      <td>${c.value ? fmt$(c.value) : '-'}</td>
      <td>
        <button class="btn btn-text" onclick="openClientModal(${c.id})">Edit</button>
        <button class="btn btn-text" style="color:#C0392B" onclick="deleteClient(${c.id})">Del</button>
      </td>
    </tr>`
  ).join('') : '<tr><td colspan="6" style="text-align:center;padding:40px;">No clients yet</td></tr>';

  // Pipeline
  ['lead','prospect','active','completed'].forEach(status => {
    const col = document.getElementById('pipe-' + status);
    const items = clients.filter(c => c.status === status);
    col.innerHTML = items.map(c =>
      `<div class="pipeline-card" onclick="openClientModal(${c.id})">
        <h5>${c.name}</h5>
        <p>${c.service || 'No service'}</p>
        ${c.value ? `<div class="amount">${fmt$(c.value)}</div>` : ''}
      </div>`
    ).join('') || '<p style="font-size:11px;color:#aaa;text-align:center;">Empty</p>';
  });

  // Populate client dropdowns
  populateClientDropdowns();
}

function populateClientDropdowns() {
  const clients = DB.get('clients');
  ['invClient', 'estClient'].forEach(selId => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    const current = sel.value;
    sel.innerHTML = '<option value="">Select client</option>' +
      clients.map(c => `<option value="${c.id}" ${c.id == current ? 'selected' : ''}>${c.name}</option>`).join('');
  });
}

// ===== INVOICES =====
function openInvoiceModal() {
  document.getElementById('invId').value = '';
  document.getElementById('invNumber').value = 'INV-2026-' + String(DB.get('invoices').length + 1).padStart(3, '0');
  document.getElementById('invDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById('invAddress').value = '';
  document.getElementById('invDeposit').value = '0';
  document.getElementById('invStatus').value = 'unpaid';
  document.getElementById('invDue').value = 'Due Upon Receipt';
  document.getElementById('invPayment').value = 'Check, Zelle, or Cash';
  document.getElementById('invLaborItems').innerHTML = `<div class="form-row" style="grid-template-columns: 3fr 1fr 1fr;"><input type="text" placeholder="Description" class="inv-labor-desc"><input type="text" placeholder="Hrs" class="inv-labor-qty"><input type="text" placeholder="Rate" class="inv-labor-rate" value="90"></div>`;
  document.getElementById('invMaterialItems').innerHTML = `<div class="form-row" style="grid-template-columns: 3fr 1fr;"><input type="text" placeholder="Item description" class="inv-mat-desc"><input type="text" placeholder="Amount" class="inv-mat-amt"></div>`;
  populateClientDropdowns();
  openModal('invoiceModal');
}

function addInvLaborRow() {
  const div = document.createElement('div');
  div.className = 'form-row'; div.style.gridTemplateColumns = '3fr 1fr 1fr';
  div.innerHTML = '<input type="text" placeholder="Description" class="inv-labor-desc"><input type="text" placeholder="Hrs" class="inv-labor-qty"><input type="text" placeholder="Rate" class="inv-labor-rate" value="90">';
  document.getElementById('invLaborItems').appendChild(div);
}

function addInvMatRow() {
  const div = document.createElement('div');
  div.className = 'form-row'; div.style.gridTemplateColumns = '3fr 1fr';
  div.innerHTML = '<input type="text" placeholder="Item description" class="inv-mat-desc"><input type="text" placeholder="Amount" class="inv-mat-amt">';
  document.getElementById('invMaterialItems').appendChild(div);
}

function saveInvoice() {
  const invoices = DB.get('invoices');
  const clientId = document.getElementById('invClient').value;
  const client = DB.get('clients').find(c => c.id == clientId);

  const labor_items = [];
  const descs = document.querySelectorAll('.inv-labor-desc');
  const qtys = document.querySelectorAll('.inv-labor-qty');
  const rates = document.querySelectorAll('.inv-labor-rate');
  descs.forEach((d, i) => {
    if (d.value.trim()) {
      const qty = parseFloat(qtys[i].value) || 0;
      const rate = parseFloat(rates[i].value) || 90;
      labor_items.push({ desc: d.value, qty, rate, amount: qty * rate });
    }
  });

  const material_items = [];
  const matDescs = document.querySelectorAll('.inv-mat-desc');
  const matAmts = document.querySelectorAll('.inv-mat-amt');
  matDescs.forEach((d, i) => {
    if (d.value.trim()) {
      material_items.push({ desc: d.value, amount: parseFloat(matAmts[i].value) || 0 });
    }
  });

  const labor_total = labor_items.reduce((s, i) => s + i.amount, 0);
  const material_total = material_items.reduce((s, i) => s + i.amount, 0);
  const grand_total = labor_total + material_total;
  const deposit = parseFloat(document.getElementById('invDeposit').value) || 0;

  const invoice = {
    id: DB.nextId('invoices'),
    number: document.getElementById('invNumber').value,
    date: document.getElementById('invDate').value,
    client_id: clientId,
    client_name: client?.name || 'Unknown',
    address: document.getElementById('invAddress').value || client?.address || '',
    status: document.getElementById('invStatus').value,
    due_date: document.getElementById('invDue').value,
    payment_methods: document.getElementById('invPayment').value,
    labor_items, material_items,
    labor_total, material_total, grand_total, deposit,
    created: new Date().toISOString()
  };

  invoices.push(invoice);
  DB.set('invoices', invoices);
  closeModal('invoiceModal');
  generateInvoicePDF(invoice);
  refreshInvoices();
}

function refreshInvoices() {
  const invoices = DB.get('invoices');
  const paid = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + (i.grand_total || 0), 0);
  const unpaid = invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + (i.grand_total || 0), 0);
  const overdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + (i.grand_total || 0), 0);

  document.getElementById('inv-paid').textContent = fmt$(paid);
  document.getElementById('inv-unpaid').textContent = fmt$(unpaid);
  document.getElementById('inv-overdue').textContent = fmt$(overdue);

  document.getElementById('invoicesTable').innerHTML = invoices.length ? invoices.sort((a, b) => new Date(b.created) - new Date(a.created)).map(inv =>
    `<tr>
      <td><strong>${inv.number}</strong></td>
      <td>${inv.client_name}</td>
      <td class="text-muted">${inv.date}</td>
      <td>${fmt$(inv.grand_total)}</td>
      <td>${statusBadge(inv.status)}</td>
      <td>
        <button class="btn btn-text" onclick="generateInvoicePDF(DB.get('invoices').find(i=>i.id===${inv.id}))">PDF</button>
        <button class="btn btn-text" onclick="toggleInvoiceStatus(${inv.id})">Toggle</button>
        <button class="btn btn-text" style="color:#C0392B" onclick="deleteInvoice(${inv.id})">Del</button>
      </td>
    </tr>`
  ).join('') : '<tr><td colspan="6" style="text-align:center;padding:40px;">No invoices yet</td></tr>';
}

function toggleInvoiceStatus(id) {
  const invoices = DB.get('invoices');
  const inv = invoices.find(i => i.id === id);
  if (!inv) return;
  const cycle = { unpaid: 'paid', paid: 'overdue', overdue: 'unpaid' };
  inv.status = cycle[inv.status] || 'unpaid';
  DB.set('invoices', invoices);
  refreshInvoices();
  refreshDashboard();
}

function deleteInvoice(id) {
  if (!confirm('Delete this invoice?')) return;
  DB.set('invoices', DB.get('invoices').filter(i => i.id !== id));
  refreshInvoices();
}

// ===== INVOICE PDF GENERATION =====
function generateInvoicePDF(inv) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'letter');
  const W = 215.9, H = 279.4;
  const NAVY = [44, 62, 80], BLUE = [41, 128, 185], GREEN = [39, 174, 96], RED = [192, 57, 43], LGRAY = [242, 243, 244], WHITE = [255, 255, 255];

  // Header bar
  doc.setFillColor(...NAVY); doc.rect(0, 0, W, 28, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...WHITE);
  doc.text('ALL THINGS AUTOMATED', 15, 13);
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text('Intelligent Automation for Modern Living', 15, 19);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(18);
  doc.text('INVOICE', W - 15, 13, { align: 'right' });
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text(inv.date + '  |  ' + inv.number, W - 15, 19, { align: 'right' });

  // Client info bar
  let y = 32;
  doc.setFillColor(234, 240, 246); doc.rect(0, y, W, 18, 'F');
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.text('BILL TO', 15, y + 5);
  doc.setFontSize(9); doc.setTextColor(0); doc.setFont('helvetica', 'bold'); doc.text(inv.client_name, 15, y + 11);
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.setFont('helvetica', 'normal'); doc.text('PROJECT ADDRESS', 80, y + 5);
  doc.setFontSize(8); doc.setTextColor(0); doc.text(inv.address || '-', 80, y + 11);
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.text('PREPARED BY', 150, y + 5);
  doc.setFontSize(8); doc.setTextColor(0); doc.text('Jorge | 941-263-5325', 150, y + 11);

  // Status badge
  const statusColors = { unpaid: BLUE, paid: GREEN, overdue: RED };
  const sc = statusColors[inv.status] || BLUE;
  doc.setFillColor(...sc); doc.roundedRect(W - 40, y + 3, 25, 8, 2, 2, 'F');
  doc.setFontSize(7); doc.setTextColor(...WHITE); doc.setFont('helvetica', 'bold');
  doc.text(inv.status.toUpperCase(), W - 27.5, y + 8.5, { align: 'center' });

  // Labor table
  y = 56;
  doc.setFillColor(...NAVY); doc.rect(10, y, W - 20, 8, 'F');
  doc.setTextColor(...WHITE); doc.setFontSize(9); doc.text('Scope of Work', 15, y + 5.5);
  y += 10;
  doc.setFillColor(52, 73, 94); doc.rect(10, y, W - 20, 7, 'F');
  doc.setFontSize(7); doc.setTextColor(...WHITE);
  doc.text('DESCRIPTION', 15, y + 5); doc.text('QTY', 140, y + 5); doc.text('RATE', 160, y + 5); doc.text('AMOUNT', 185, y + 5);
  y += 7;

  inv.labor_items.forEach((item, i) => {
    if (i % 2 === 0) { doc.setFillColor(249, 249, 249); doc.rect(10, y, W - 20, 7, 'F'); }
    doc.setTextColor(0); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    doc.text(item.desc, 15, y + 5);
    doc.text(String(item.qty), 142, y + 5);
    doc.text(fmt$(item.rate), 160, y + 5);
    doc.text(fmt$(item.amount), 185, y + 5);
    y += 7;
  });

  // Materials
  if (inv.material_items?.length) {
    y += 4;
    doc.setFillColor(...NAVY); doc.rect(10, y, W - 20, 8, 'F');
    doc.setTextColor(...WHITE); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('Materials & Supplies', 15, y + 5.5);
    y += 10;
    doc.setFillColor(52, 73, 94); doc.rect(10, y, W - 20, 7, 'F');
    doc.setFontSize(7); doc.setTextColor(...WHITE);
    doc.text('ITEM', 15, y + 5); doc.text('AMOUNT', 185, y + 5);
    y += 7;

    inv.material_items.forEach((item, i) => {
      if (i % 2 === 0) { doc.setFillColor(249, 249, 249); doc.rect(10, y, W - 20, 7, 'F'); }
      doc.setTextColor(0); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      doc.text(item.desc, 15, y + 5);
      doc.text(fmt$(item.amount), 185, y + 5);
      y += 7;
    });
  }

  // Totals
  y += 6;
  doc.setFillColor(...LGRAY); doc.rect(120, y, W - 130, 7, 'F');
  doc.setTextColor(0); doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text('Subtotal', 125, y + 5); doc.text(fmt$(inv.grand_total), 185, y + 5);
  y += 8;

  if (inv.deposit > 0) {
    doc.setFillColor(...LGRAY); doc.rect(120, y, W - 130, 7, 'F');
    doc.text('Deposit Applied', 125, y + 5); doc.text('-' + fmt$(inv.deposit), 185, y + 5);
    y += 8;
  }

  doc.setFillColor(...BLUE); doc.rect(120, y, W - 130, 9, 'F');
  doc.setTextColor(...WHITE); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
  doc.text('Balance Due', 125, y + 6.5); doc.text(fmt$(inv.grand_total - (inv.deposit || 0)), 185, y + 6.5);

  // Payment info box
  y += 16;
  doc.setFillColor(...LGRAY); doc.rect(10, y, W - 20, 20, 'F');
  doc.setTextColor(0); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
  doc.text('Payment Information', 15, y + 6);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
  doc.text('Due: ' + inv.due_date + '  |  Accepted: ' + inv.payment_methods, 15, y + 12);
  doc.text('Jorge@allthingsautomated.org  |  941-263-5325', 15, y + 17);

  // Footer
  doc.setFillColor(...NAVY); doc.rect(0, H - 12, W, 12, 'F');
  doc.setTextColor(...WHITE); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
  doc.text('All Things Automated  |  Sarasota, FL  |  itsallthingsautomated.com  |  941-263-5325', W / 2, H - 5, { align: 'center' });

  doc.save(inv.number + '.pdf');
}

// ===== ESTIMATES =====
function openEstimateModal() {
  document.getElementById('estId').value = '';
  document.getElementById('estNumber').value = 'ELE-2026-' + String(DB.get('estimates').length + 1).padStart(3, '0');
  document.getElementById('estDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  document.getElementById('estAddress').value = '';
  document.getElementById('estStatus').value = 'pending';
  document.getElementById('estNotes').value = 'Standard ceiling heights ≤10ft; existing wiring functional and up to code.\nEstimate valid for 30 days from date of issue.';
  document.getElementById('estLaborItems').innerHTML = `<div class="form-row" style="grid-template-columns: 3fr 1fr 1fr;"><input type="text" placeholder="Description" class="est-labor-desc"><input type="text" placeholder="Hrs" class="est-labor-qty"><input type="text" placeholder="Rate" class="est-labor-rate" value="90"></div>`;
  document.getElementById('estMaterialItems').innerHTML = `<div class="form-row" style="grid-template-columns: 3fr 1fr;"><input type="text" placeholder="Item description" class="est-mat-desc"><input type="text" placeholder="Amount" class="est-mat-amt"></div>`;
  populateClientDropdowns();
  openModal('estimateModal');
}

function addEstLaborRow() {
  const div = document.createElement('div');
  div.className = 'form-row'; div.style.gridTemplateColumns = '3fr 1fr 1fr';
  div.innerHTML = '<input type="text" placeholder="Description" class="est-labor-desc"><input type="text" placeholder="Hrs" class="est-labor-qty"><input type="text" placeholder="Rate" class="est-labor-rate" value="90">';
  document.getElementById('estLaborItems').appendChild(div);
}

function addEstMatRow() {
  const div = document.createElement('div');
  div.className = 'form-row'; div.style.gridTemplateColumns = '3fr 1fr';
  div.innerHTML = '<input type="text" placeholder="Item description" class="est-mat-desc"><input type="text" placeholder="Amount" class="est-mat-amt">';
  document.getElementById('estMaterialItems').appendChild(div);
}

function saveEstimate() {
  const estimates = DB.get('estimates');
  const clientId = document.getElementById('estClient').value;
  const client = DB.get('clients').find(c => c.id == clientId);

  const labor_items = [];
  document.querySelectorAll('.est-labor-desc').forEach((d, i) => {
    if (d.value.trim()) {
      const qty = parseFloat(document.querySelectorAll('.est-labor-qty')[i].value) || 0;
      const rate = parseFloat(document.querySelectorAll('.est-labor-rate')[i].value) || 90;
      labor_items.push({ desc: d.value, qty, rate, amount: qty * rate });
    }
  });

  const material_items = [];
  document.querySelectorAll('.est-mat-desc').forEach((d, i) => {
    if (d.value.trim()) {
      material_items.push({ desc: d.value, amount: parseFloat(document.querySelectorAll('.est-mat-amt')[i].value) || 0 });
    }
  });

  const labor_total = labor_items.reduce((s, i) => s + i.amount, 0);
  const material_total = material_items.reduce((s, i) => s + i.amount, 0);

  const estimate = {
    id: DB.nextId('estimates'),
    number: document.getElementById('estNumber').value,
    date: document.getElementById('estDate').value,
    client_id: clientId,
    client_name: client?.name || 'Unknown',
    address: document.getElementById('estAddress').value || client?.address || '',
    status: document.getElementById('estStatus').value,
    notes: document.getElementById('estNotes').value,
    labor_items, material_items,
    labor_total, material_total,
    grand_total: labor_total + material_total,
    created: new Date().toISOString()
  };

  estimates.push(estimate);
  DB.set('estimates', estimates);
  closeModal('estimateModal');
  generateEstimatePDF(estimate);
  refreshEstimates();
}

function refreshEstimates() {
  const estimates = DB.get('estimates');
  document.getElementById('estimatesTable').innerHTML = estimates.length ? estimates.sort((a, b) => new Date(b.created) - new Date(a.created)).map(est =>
    `<tr>
      <td><strong>${est.number}</strong></td>
      <td>${est.client_name}</td>
      <td class="text-muted">${est.date}</td>
      <td>${fmt$(est.grand_total)}</td>
      <td>${statusBadge(est.status)}</td>
      <td>
        <button class="btn btn-text" onclick="generateEstimatePDF(DB.get('estimates').find(e=>e.id===${est.id}))">PDF</button>
        <button class="btn btn-text" style="color:#C0392B" onclick="deleteEstimate(${est.id})">Del</button>
      </td>
    </tr>`
  ).join('') : '<tr><td colspan="6" style="text-align:center;padding:40px;">No estimates yet</td></tr>';
}

function deleteEstimate(id) {
  if (!confirm('Delete this estimate?')) return;
  DB.set('estimates', DB.get('estimates').filter(e => e.id !== id));
  refreshEstimates();
}

// ===== ESTIMATE PDF GENERATION =====
function generateEstimatePDF(est) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'letter');
  const W = 215.9, H = 279.4;
  const NAVY = [44, 62, 80], BLUE = [41, 128, 185], LGRAY = [242, 243, 244], WHITE = [255, 255, 255];

  // Header
  doc.setFillColor(...NAVY); doc.rect(0, 0, W, 28, 'F');
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(...WHITE);
  doc.text('ALL THINGS AUTOMATED', 15, 13);
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text('Intelligent Automation for Modern Living', 15, 19);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
  doc.text('ESTIMATE', W - 15, 13, { align: 'right' });
  doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text(est.date + '  |  ' + est.number, W - 15, 19, { align: 'right' });

  // Client bar
  let y = 32;
  doc.setFillColor(234, 240, 246); doc.rect(0, y, W, 18, 'F');
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.text('CLIENT', 15, y + 5);
  doc.setFontSize(9); doc.setTextColor(0); doc.setFont('helvetica', 'bold'); doc.text(est.client_name, 15, y + 11);
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.setFont('helvetica', 'normal'); doc.text('PROJECT ADDRESS', 80, y + 5);
  doc.setFontSize(8); doc.setTextColor(0); doc.text(est.address || '-', 80, y + 11);
  doc.setFontSize(7); doc.setTextColor(127, 140, 141); doc.text('PREPARED BY', 150, y + 5);
  doc.setFontSize(8); doc.setTextColor(0); doc.text('Jorge | 941-263-5325', 150, y + 11);

  // Labor table
  y = 56;
  doc.setFillColor(...NAVY); doc.rect(10, y, W - 20, 8, 'F');
  doc.setTextColor(...WHITE); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
  doc.text('Scope of Work & Estimate', 15, y + 5.5);
  y += 10;
  doc.setFillColor(52, 73, 94); doc.rect(10, y, W - 20, 7, 'F');
  doc.setFontSize(7); doc.setTextColor(...WHITE);
  doc.text('DESCRIPTION', 15, y + 5); doc.text('QTY', 140, y + 5); doc.text('RATE', 160, y + 5); doc.text('AMOUNT', 185, y + 5);
  y += 7;

  est.labor_items.forEach((item, i) => {
    if (i % 2 === 0) { doc.setFillColor(249, 249, 249); doc.rect(10, y, W - 20, 7, 'F'); }
    doc.setTextColor(0); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
    doc.text(item.desc, 15, y + 5);
    doc.text(String(item.qty), 142, y + 5);
    doc.text(fmt$(item.rate), 160, y + 5);
    doc.text(fmt$(item.amount), 185, y + 5);
    y += 7;
  });

  // Materials
  if (est.material_items?.length) {
    y += 4;
    doc.setFillColor(...NAVY); doc.rect(10, y, W - 20, 8, 'F');
    doc.setTextColor(...WHITE); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
    doc.text('Materials & Supplies', 15, y + 5.5);
    y += 10;
    doc.setFillColor(52, 73, 94); doc.rect(10, y, W - 20, 7, 'F');
    doc.setFontSize(7); doc.setTextColor(...WHITE);
    doc.text('ITEM', 15, y + 5); doc.text('AMOUNT', 185, y + 5);
    y += 7;

    est.material_items.forEach((item, i) => {
      if (i % 2 === 0) { doc.setFillColor(249, 249, 249); doc.rect(10, y, W - 20, 7, 'F'); }
      doc.setTextColor(0); doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
      doc.text(item.desc, 15, y + 5);
      doc.text(fmt$(item.amount), 185, y + 5);
      y += 7;
    });
  }

  // Total
  y += 4;
  doc.setFillColor(...BLUE); doc.rect(10, y, W - 20, 9, 'F');
  doc.setTextColor(...WHITE); doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
  doc.text('Total Project Cost', 15, y + 6.5); doc.text(fmt$(est.grand_total), 185, y + 6.5);

  // Notes
  if (est.notes) {
    y += 16;
    doc.setFillColor(...NAVY); doc.rect(10, y, W - 20, 8, 'F');
    doc.setTextColor(...WHITE); doc.setFontSize(9);
    doc.text('Notes & Assumptions', 15, y + 5.5);
    y += 12;
    doc.setTextColor(0); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
    const lines = doc.splitTextToSize(est.notes, W - 40);
    doc.text(lines, 15, y);
  }

  // Footer
  doc.setFillColor(...NAVY); doc.rect(0, H - 12, W, 12, 'F');
  doc.setTextColor(...WHITE); doc.setFontSize(7); doc.setFont('helvetica', 'normal');
  doc.text('All Things Automated  |  Sarasota, FL  |  itsallthingsautomated.com  |  941-263-5325', W / 2, H - 5, { align: 'center' });

  doc.save(est.number + '.pdf');
}

// ===== LEADS =====
let leadFilter = 'all';

function filterLeads(filter, btn) {
  leadFilter = filter;
  document.querySelectorAll('#tab-leads .pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  refreshLeads();
}

function tierBadge(tier) {
  const map = { hot: 'badge-red', warm: 'badge-yellow', cold: 'badge-gray' };
  return tier ? `<span class="badge ${map[tier] || 'badge-gray'}">${tier}</span>` : '-';
}

function sourceBadge(source) {
  const map = { 'google-landing': 'badge-green', 'popup': 'badge-blue', 'footer': 'badge-blue', 'contact-form': 'badge-navy' };
  const labels = { 'google-landing': 'Landing Page', 'popup': 'Popup', 'footer': 'Footer', 'contact-form': 'Contact' };
  return `<span class="badge ${map[source] || 'badge-gray'}">${labels[source] || source}</span>`;
}

function refreshLeads() {
  // Try to load from API first, fall back to localStorage
  fetch('/api/leads')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.leads && data.leads.length > 0) {
        renderLeads(data.leads);
      } else {
        renderLeads(DB.get('leads'));
      }
    })
    .catch(function() {
      renderLeads(DB.get('leads'));
    });
}

function renderLeads(leads) {

  // Stats
  document.getElementById('leads-total').textContent = leads.length;
  document.getElementById('leads-hot').textContent = leads.filter(l => l.tier === 'hot').length;
  document.getElementById('leads-warm').textContent = leads.filter(l => l.tier === 'warm').length;
  document.getElementById('leads-cold').textContent = leads.filter(l => l.tier === 'cold' || !l.tier).length;
  document.getElementById('leads-landing').textContent = leads.filter(l => l.source === 'google-landing').length;
  document.getElementById('leads-website').textContent = leads.filter(l => l.source !== 'google-landing').length;

  // Filter
  let filtered = leads;
  if (leadFilter === 'hot') filtered = leads.filter(l => l.tier === 'hot');
  else if (leadFilter === 'warm') filtered = leads.filter(l => l.tier === 'warm');
  else if (leadFilter === 'cold') filtered = leads.filter(l => l.tier === 'cold' || !l.tier);
  else if (leadFilter === 'google-landing') filtered = leads.filter(l => l.source === 'google-landing');
  else if (leadFilter === 'website') filtered = leads.filter(l => l.source !== 'google-landing');

  document.getElementById('leadsTable').innerHTML = filtered.length ? filtered.sort((a, b) => new Date(b.received || b.date) - new Date(a.received || a.date)).map(l =>
    `<tr>
      <td><strong>${l.name || '-'}</strong></td>
      <td>${l.email}</td>
      <td>${l.phone || '-'}</td>
      <td>${sourceBadge(l.source)}</td>
      <td>${l.score ? tierBadge(l.tier) + ' <small style="color:#888">(' + l.score + ')</small>' : '-'}</td>
      <td>${l.service || '-'}</td>
      <td>${l.budget || '-'}</td>
      <td>${l.timeline || '-'}</td>
      <td class="text-muted">${fmtDate(l.received || l.date)}</td>
      <td>
        <button class="btn btn-text" onclick="convertLeadToClient('${l.email}','${(l.name || '').replace(/'/g, "\'")}')">Add to CRM</button>
      </td>
    </tr>`
  ).join('') : '<tr><td colspan="10" style="text-align:center;padding:40px;">No leads captured yet. Leads from your landing page and website will appear here.</td></tr>';
}

function convertLeadToClient(email, name) {
  document.getElementById('clientName').value = name;
  document.getElementById('clientEmail').value = email;
  document.getElementById('clientStatus').value = 'lead';
  document.getElementById('clientId').value = '';
  document.getElementById('clientModalTitle').textContent = 'Add Client from Lead';
  openModal('clientModal');
}

function exportLeads() {
  function doExport(leads) {
    if (!leads.length) return alert('No leads to export');
    const csv = 'Name,Email,Phone,Source,Score,Tier,Service,Budget,Timeline,Address,UTM Source,UTM Medium,UTM Campaign,Date\n' + leads.map(l =>
      `"${l.name || ''}","${l.email}","${l.phone || ''}","${l.source}","${l.score || ''}","${l.tier || ''}","${l.service || ''}","${l.budget || ''}","${l.timeline || ''}","${l.address || ''}","${l.utm_source || ''}","${l.utm_medium || ''}","${l.utm_campaign || ''}","${l.received || l.date}"`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ata-leads-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
  }
  fetch('/api/leads')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      doExport(data.leads && data.leads.length > 0 ? data.leads : DB.get('leads'));
    })
    .catch(function() { doExport(DB.get('leads')); });
}

// ===== SEARCHABLE CLIENT DROPDOWN =====
function filterClientDropdown(prefix) {
  const input = document.getElementById(prefix + 'ClientSearch');
  const results = document.getElementById(prefix + 'ClientResults');
  if (!input || !results) return;
  const query = input.value.toLowerCase().trim();
  const clients = DB.get('clients');
  const filtered = query ? clients.filter(c =>
    (c.name || '').toLowerCase().includes(query) ||
    (c.phone || '').toLowerCase().includes(query) ||
    (c.service || '').toLowerCase().includes(query) ||
    (c.address || '').toLowerCase().includes(query)
  ) : clients.slice(0, 50);

  if (filtered.length === 0) {
    results.innerHTML = '<div style="padding:10px;color:#999;font-size:13px;">No clients found</div>';
  } else {
    results.innerHTML = filtered.slice(0, 50).map(c =>
      `<div style="padding:8px 12px;cursor:pointer;border-bottom:1px solid #f0f0f0;font-size:13px;"
        onmousedown="selectClient('${prefix}',${c.id},'${(c.name || '').replace(/'/g, "\\'")}')"
        onmouseover="this.style.background='#f0f7ff'" onmouseout="this.style.background='#fff'">
        <strong>${c.name}</strong>${c.phone ? ' &middot; ' + c.phone : ''}${c.service ? ' &middot; <span style=color:#999>' + c.service + '</span>' : ''}
      </div>`
    ).join('');
  }
  results.style.display = 'block';
}

function selectClient(prefix, id, name) {
  document.getElementById(prefix + 'ClientSearch').value = name;
  document.getElementById(prefix + 'Client').value = id;
  document.getElementById(prefix + 'ClientResults').style.display = 'none';
  // Auto-fill address if available
  const client = DB.get('clients').find(c => c.id === id);
  if (client) {
    const addrField = document.getElementById(prefix + 'Address');
    if (addrField && client.address) addrField.value = client.address;
    if (addrField && !client.address && client.notes && client.notes.includes('Job/Location')) addrField.value = client.name;
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.client-search-wrap')) {
    document.querySelectorAll('.client-search-results').forEach(r => r.style.display = 'none');
  }
});

// ===== CLIENT SEARCH (CRM TABLE) =====
let clientSearchQuery = '';
function searchClients(query) {
  clientSearchQuery = query.toLowerCase().trim();
  refreshCRM();
}

// ===== QB CSV IMPORT =====
function openQBImportModal() {
  document.getElementById('qbCsvFile').value = '';
  document.getElementById('qbImportPreview').innerHTML = '';
  openModal('qbImportModal');
}

function processQBImport() {
  const file = document.getElementById('qbCsvFile').files[0];
  if (!file) return alert('Please select a CSV file');
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return alert('CSV file appears empty');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
    const nameIdx = headers.findIndex(h => h.includes('customer') || h.includes('name') || h === 'client');
    const compIdx = headers.findIndex(h => h.includes('company'));
    const phoneIdx = headers.findIndex(h => h.includes('phone'));
    const emailIdx = headers.findIndex(h => h.includes('email'));
    const balIdx = headers.findIndex(h => h.includes('balance') || h.includes('open'));

    if (nameIdx < 0) return alert('Could not find a Name/Customer column in the CSV. Headers found: ' + headers.join(', '));

    const clients = DB.get('clients');
    const existingNames = new Set(clients.map(c => c.name.toLowerCase()));
    let nextId = clients.length ? Math.max(...clients.map(c => c.id || 0)) + 1 : 1;
    let imported = 0;

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].match(/(".*?"|[^,]*)/g)?.map(c => c.trim().replace(/^"|"$/g, '')) || [];
      const name = cols[nameIdx] || '';
      if (!name || existingNames.has(name.toLowerCase())) continue;
      existingNames.add(name.toLowerCase());
      clients.push({
        id: nextId++, name: name,
        email: emailIdx >= 0 ? (cols[emailIdx] || '') : '',
        phone: phoneIdx >= 0 ? (cols[phoneIdx] || '') : '',
        status: 'active',
        address: '',
        service: compIdx >= 0 ? (cols[compIdx] || '') : '',
        value: 0,
        notes: 'Imported from QuickBooks CSV' + (balIdx >= 0 && cols[balIdx] && cols[balIdx] !== '$0.00' ? ' | QB Balance: ' + cols[balIdx] : ''),
        created: new Date().toISOString(),
        qb_imported: true
      });
      imported++;
    }
    DB.set('clients', clients);
    closeModal('qbImportModal');
    refreshCRM();
    refreshDashboard();
    alert('Imported ' + imported + ' new clients from QuickBooks! (' + (lines.length - 1 - imported) + ' duplicates skipped)');
  };
  reader.readAsText(file);
}

// ===== REFRESH ALL =====
function refreshAll() {
  refreshDashboard();
  refreshImages();
  refreshCRM();
  refreshInvoices();
  refreshEstimates();
  refreshLeads();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', refreshAll);
