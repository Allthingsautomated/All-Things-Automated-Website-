// ============================================
// ADMIN DASHBOARD JAVASCRIPT
// ============================================

/* ============================================
   AUTH CHECK
   ============================================ */

function checkAuth() {
  if (localStorage.getItem('ata_admin') !== 'true') {
    window.location.href = 'login.html';
  }
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();

  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('ata_admin');
    window.location.href = 'login.html';
  });

  // Sidebar nav items
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      switchView(item.dataset.view);
    });
  });

  // Initialize views
  initDashboard();
  initInquiries();
  initBlog();
  initSettings();
});

/* ============================================
   VIEW SWITCHING
   ============================================ */

function switchView(viewName) {
  // Hide all views
  document.querySelectorAll('.admin-view').forEach(view => {
    view.style.display = 'none';
  });

  // Show selected view
  document.getElementById(viewName + '-view').style.display = 'block';

  // Update sidebar active state
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

  // Refresh data
  if (viewName === 'dashboard') {
    updateDashboard();
  } else if (viewName === 'inquiries') {
    renderInquiries('all');
  } else if (viewName === 'blog') {
    renderBlog();
  }
}

/* ============================================
   DASHBOARD VIEW
   ============================================ */

function initDashboard() {
  updateDashboard();
}

function updateDashboard() {
  const inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];
  const posts = JSON.parse(localStorage.getItem('ata_posts')) || [];

  const unread = inquiries.filter(q => !q.read).length;
  const published = posts.filter(p => p.status === 'Published').length;

  document.getElementById('totalQuotes').textContent = inquiries.length;
  document.getElementById('unreadQuotes').textContent = unread;
  document.getElementById('publishedPosts').textContent = published;

  // Recent activity
  const recentInquiries = inquiries.slice(-5).reverse();
  const activityList = document.getElementById('activityList');
  activityList.innerHTML = '';

  if (recentInquiries.length === 0) {
    activityList.innerHTML = '<p style="color: #aaa; font-size: 13px;">No recent activity</p>';
    return;
  }

  recentInquiries.forEach(inquiry => {
    const activity = document.createElement('div');
    activity.className = `activity-item ${!inquiry.read ? 'unread' : ''}`;
    activity.innerHTML = `
      <div class="activity-name">${inquiry.name}</div>
      <div class="activity-service">${inquiry.service}</div>
      <div class="activity-date">${inquiry.date}</div>
    `;
    activityList.appendChild(activity);
  });
}

/* ============================================
   INQUIRIES VIEW
   ============================================ */

function initInquiries() {
  // Filter buttons
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderInquiries(btn.dataset.filter);
    });
  });

  // Export CSV button
  document.getElementById('exportBtn').addEventListener('click', exportCSV);

  renderInquiries('all');
}

function renderInquiries(filter) {
  let inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];

  if (filter === 'unread') {
    inquiries = inquiries.filter(q => !q.read);
  } else if (filter === 'read') {
    inquiries = inquiries.filter(q => q.read);
  }

  const table = document.getElementById('inquiriesTable');
  table.innerHTML = '';

  inquiries.forEach((inquiry, index) => {
    const tr = document.createElement('tr');
    const badge = inquiry.read ? '<span class="badge badge-gray">Read</span>' : '<span class="badge badge-blue">New</span>';

    tr.innerHTML = `
      <td><strong>${inquiry.name}</strong></td>
      <td class="text-muted">${inquiry.email}</td>
      <td class="text-muted">${inquiry.phone}</td>
      <td class="text-muted">${inquiry.city}</td>
      <td class="text-muted">${inquiry.service}</td>
      <td class="text-truncate text-muted">${inquiry.message}</td>
      <td class="text-muted" style="font-size: 11px;">${inquiry.date}</td>
      <td>${badge}</td>
      <td>
        <button class="btn btn-text" data-action="mark-read" data-id="${inquiry.id}">Mark Read</button>
        <button class="btn btn-text" data-action="delete" data-id="${inquiry.id}">Delete</button>
      </td>
    `;

    // Add click handler for row expansion
    tr.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      expandInquiryRow(inquiry, tr);
    });

    table.appendChild(tr);
  });

  // Add event listeners to buttons
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === 'mark-read') {
        markInquiryRead(id);
      } else if (action === 'delete') {
        deleteInquiry(id);
      }
    });
  });
}

function expandInquiryRow(inquiry, row) {
  const expanded = row.nextElementSibling;

  if (expanded && expanded.classList.contains('expanded-content')) {
    expanded.remove();
    return;
  }

  // Remove any other expanded rows
  document.querySelectorAll('.expanded-content').forEach(el => el.remove());

  const expandedRow = document.createElement('tr');
  expandedRow.className = 'expanded-content';
  expandedRow.innerHTML = `
    <td colspan="9" style="padding: 20px; background-color: #fafafa;">
      <strong>Full Message:</strong><br><br>
      <p style="line-height: 1.6; color: #666;">${inquiry.message}</p>
    </td>
  `;

  row.insertAdjacentElement('afterend', expandedRow);
}

function markInquiryRead(id) {
  let inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];
  const inquiry = inquiries.find(q => q.id === id);

  if (inquiry) {
    inquiry.read = true;
    localStorage.setItem('ata_inquiries', JSON.stringify(inquiries));
    renderInquiries('all');
    updateDashboard();
  }
}

function deleteInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;

  let inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];
  inquiries = inquiries.filter(q => q.id !== id);
  localStorage.setItem('ata_inquiries', JSON.stringify(inquiries));
  renderInquiries('all');
  updateDashboard();
}

function exportCSV() {
  const inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];

  if (inquiries.length === 0) {
    alert('No inquiries to export');
    return;
  }

  let csv = 'Name,Email,Phone,City,Service,Message,Date\n';

  inquiries.forEach(inquiry => {
    csv += `"${inquiry.name}","${inquiry.email}","${inquiry.phone}","${inquiry.city}","${inquiry.service}","${inquiry.message}","${inquiry.date}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ata_inquiries_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

/* ============================================
   BLOG VIEW
   ============================================ */

let currentEditingPostId = null;

function initBlog() {
  // New post button
  document.getElementById('newPostBtn').addEventListener('click', () => {
    currentEditingPostId = null;
    openEditorPanel('New Post');
    document.getElementById('editorForm').reset();
  });

  // Panel close button
  document.getElementById('panelClose').addEventListener('click', closeEditorPanel);
  document.getElementById('panelCancel').addEventListener('click', closeEditorPanel);

  // Editor form submit
  document.getElementById('editorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    savePost();
  });

  // Status toggle
  document.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-status]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  renderBlog();
}

function renderBlog() {
  const posts = JSON.parse(localStorage.getItem('ata_posts')) || [];
  const table = document.getElementById('blogTable');
  table.innerHTML = '';

  posts.forEach(post => {
    const tr = document.createElement('tr');
    const badge = post.status === 'Published'
      ? '<span class="badge badge-blue">Published</span>'
      : '<span class="badge badge-gray">Draft</span>';

    tr.innerHTML = `
      <td><strong>${post.title}</strong></td>
      <td>${post.category}</td>
      <td>${badge}</td>
      <td style="font-size: 11px;">${post.date}</td>
      <td>
        <button class="btn btn-text" data-action="edit" data-id="${post.id}">Edit</button>
        <button class="btn btn-text" data-action="delete" data-id="${post.id}">Delete</button>
      </td>
    `;

    table.appendChild(tr);
  });

  // Add event listeners
  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === 'edit') {
        editPost(id);
      } else if (action === 'delete') {
        deletePost(id);
      }
    });
  });
}

function openEditorPanel(title) {
  document.getElementById('editorTitle').textContent = title;
  document.getElementById('editorPanel').classList.add('open');
}

function closeEditorPanel() {
  document.getElementById('editorPanel').classList.remove('open');
}

function savePost() {
  const title = document.getElementById('postTitle').value.trim();
  const category = document.getElementById('postCategory').value;
  const status = document.querySelector('[data-status].active').dataset.status;
  const content = document.getElementById('postContent').value.trim();

  if (!title || !content) {
    alert('Please fill in all fields');
    return;
  }

  let posts = JSON.parse(localStorage.getItem('ata_posts')) || [];

  if (currentEditingPostId) {
    // Edit existing post
    const post = posts.find(p => p.id === currentEditingPostId);
    if (post) {
      post.title = title;
      post.category = category;
      post.status = status;
      post.content = content;
    }
  } else {
    // Create new post
    const newPost = {
      id: Date.now(),
      title,
      category,
      status,
      content,
      date: new Date().toLocaleDateString()
    };
    posts.push(newPost);
  }

  localStorage.setItem('ata_posts', JSON.stringify(posts));
  closeEditorPanel();
  renderBlog();
  updateDashboard();
}

function editPost(id) {
  const posts = JSON.parse(localStorage.getItem('ata_posts')) || [];
  const post = posts.find(p => p.id === id);

  if (post) {
    currentEditingPostId = id;
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postContent').value = post.content;

    // Set status toggle
    document.querySelectorAll('[data-status]').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.status === post.status) {
        btn.classList.add('active');
      }
    });

    openEditorPanel('Edit Post');
  }
}

function deletePost(id) {
  if (!confirm('Delete this post?')) return;

  let posts = JSON.parse(localStorage.getItem('ata_posts')) || [];
  posts = posts.filter(p => p.id !== id);
  localStorage.setItem('ata_posts', JSON.stringify(posts));
  renderBlog();
  updateDashboard();
}

/* ============================================
   SETTINGS VIEW
   ============================================ */

function initSettings() {
  const settingsForm = document.getElementById('settingsForm');
  const passwordForm = document.getElementById('passwordForm');

  // Load settings from localStorage
  const settings = JSON.parse(localStorage.getItem('ata_settings')) || {};

  if (settings.businessName) document.getElementById('businessName').value = settings.businessName;
  if (settings.tagline) document.getElementById('tagline').value = settings.tagline;
  if (settings.phone) document.getElementById('phone').value = settings.phone;
  if (settings.email) document.getElementById('email').value = settings.email;
  if (settings.serviceArea) document.getElementById('serviceArea').value = settings.serviceArea;

  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const settings = {
      businessName: document.getElementById('businessName').value,
      tagline: document.getElementById('tagline').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      serviceArea: document.getElementById('serviceArea').value
    };

    localStorage.setItem('ata_settings', JSON.stringify(settings));
    alert('Settings saved!');
  });

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const current = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmPassword').value;

    if (current !== 'ATA2025!') {
      alert('Current password is incorrect');
      return;
    }

    if (newPass !== confirm) {
      alert('New passwords do not match');
      return;
    }

    if (newPass.length < 6) {
      alert('New password must be at least 6 characters');
      return;
    }

    // Store new password in localStorage
    localStorage.setItem('ata_admin_password', newPass);
    alert('Password updated!');
    passwordForm.reset();
  });
}
