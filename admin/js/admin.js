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
  initMedia();
  initSettings();
  initFileUpload();
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
  } else if (viewName === 'media') {
    renderMediaLibrary();
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
  const image = document.getElementById('postImage').dataset.imageData || null;

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
      if (image) post.image = image;
    }
  } else {
    // Create new post
    const newPost = {
      id: Date.now(),
      title,
      category,
      status,
      content,
      image: image,
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

    // Set image if exists
    if (post.image) {
      document.getElementById('postImage').dataset.imageData = post.image;
      const postImagePreviewImg = document.getElementById('postImagePreviewImg');
      postImagePreviewImg.src = post.image;
      document.getElementById('postImagePreview').style.display = 'block';
    }

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
   FILE UPLOAD
   ============================================ */

function initFileUpload() {
  const logoUploadInput = document.getElementById('logoUpload');
  const logoDropZone = document.getElementById('logoDropZone');
  const logoPreview = document.getElementById('logoPreview');
  const logoPreviewImg = document.getElementById('logoPreviewImg');

  if (!logoUploadInput) return;

  // Click to upload
  logoDropZone.addEventListener('click', () => logoUploadInput.click());

  // Drag and drop
  logoDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    logoDropZone.style.background = '#f0f4ff';
  });

  logoDropZone.addEventListener('dragleave', () => {
    logoDropZone.style.background = 'transparent';
  });

  logoDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    logoDropZone.style.background = 'transparent';
    if (e.dataTransfer.files.length) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });

  logoUploadInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleFileUpload(e.target.files[0]);
    }
  });

  // Load existing files
  loadUploadedFiles();
}

function handleFileUpload(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert('File too large. Max 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const fileData = {
      name: file.name,
      type: file.type,
      size: file.size,
      data: e.target.result,
      uploadedAt: new Date().toLocaleString(),
      id: Date.now()
    };

    let uploads = JSON.parse(localStorage.getItem('ata_uploads')) || [];
    uploads.push(fileData);
    localStorage.setItem('ata_uploads', JSON.stringify(uploads));

    // Show preview
    const logoPreview = document.getElementById('logoPreview');
    const logoPreviewImg = document.getElementById('logoPreviewImg');
    logoPreviewImg.src = fileData.data;
    logoPreview.style.display = 'block';

    loadUploadedFiles();
    alert('File uploaded successfully!');
  };
  reader.readAsDataURL(file);
}

function loadUploadedFiles() {
  const uploads = JSON.parse(localStorage.getItem('ata_uploads')) || [];
  const filesList = document.getElementById('uploadedFilesList');

  if (uploads.length === 0) {
    filesList.innerHTML = 'No files uploaded yet';
    return;
  }

  filesList.innerHTML = '';
  uploads.forEach(file => {
    const div = document.createElement('div');
    div.style.cssText = 'padding: 12px; background: #f9f9f9; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;';

    const info = document.createElement('div');
    info.innerHTML = `
      <div style="font-weight: 500; margin-bottom: 4px;">${file.name}</div>
      <div style="font-size: 11px; color: #999;">Uploaded: ${file.uploadedAt}</div>
    `;

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '8px';

    const useBtn = document.createElement('button');
    useBtn.className = 'btn btn-small btn-primary';
    useBtn.textContent = 'Use as Logo';
    useBtn.onclick = () => setAsLogo(file.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-small btn-gray';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteUpload(file.id);

    actions.appendChild(useBtn);
    actions.appendChild(deleteBtn);

    div.appendChild(info);
    div.appendChild(actions);
    filesList.appendChild(div);
  });
}

function setAsLogo(fileId) {
  const uploads = JSON.parse(localStorage.getItem('ata_uploads')) || [];
  const file = uploads.find(f => f.id === fileId);

  if (file) {
    localStorage.setItem('ata_current_logo', JSON.stringify(file));
    alert(`Logo set to "${file.name}" - changes will show throughout the site!`);
    // Reload page to show changes
    setTimeout(() => location.reload(), 500);
  }
}

function deleteUpload(fileId) {
  if (!confirm('Delete this file?')) return;

  let uploads = JSON.parse(localStorage.getItem('ata_uploads')) || [];
  uploads = uploads.filter(f => f.id !== fileId);
  localStorage.setItem('ata_uploads', JSON.stringify(uploads));
  loadUploadedFiles();
}

/* ============================================
   MEDIA LIBRARY
   ============================================ */

function initMedia() {
  const uploadMediaBtn = document.getElementById('uploadMediaBtn');
  const mediaUploadArea = document.getElementById('mediaUploadArea');
  const mediaUpload = document.getElementById('mediaUpload');
  const mediaDropZone = document.getElementById('mediaDropZone');
  const cancelUploadBtn = document.getElementById('cancelUploadBtn');
  const confirmUploadBtn = document.getElementById('confirmUploadBtn');

  uploadMediaBtn.addEventListener('click', () => {
    mediaUploadArea.style.display = 'block';
  });

  cancelUploadBtn.addEventListener('click', () => {
    mediaUploadArea.style.display = 'none';
    mediaUpload.value = '';
    document.getElementById('mediaUploadProgress').style.display = 'none';
    confirmUploadBtn.style.display = 'none';
  });

  // Click to upload
  mediaDropZone.addEventListener('click', () => mediaUpload.click());

  // Drag and drop
  mediaDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    mediaDropZone.style.background = '#f0f4ff';
  });

  mediaDropZone.addEventListener('dragleave', () => {
    mediaDropZone.style.background = 'transparent';
  });

  mediaDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    mediaDropZone.style.background = 'transparent';
    if (e.dataTransfer.files.length) {
      mediaUpload.files = e.dataTransfer.files;
      confirmUploadBtn.style.display = 'inline-block';
    }
  });

  mediaUpload.addEventListener('change', () => {
    if (mediaUpload.files.length) {
      confirmUploadBtn.style.display = 'inline-block';
    }
  });

  confirmUploadBtn.addEventListener('click', () => {
    if (mediaUpload.files.length) {
      uploadMediaFile(mediaUpload.files[0]);
    }
  });

  // Post image upload
  const postImageDropZone = document.getElementById('postImageDropZone');
  const postImage = document.getElementById('postImage');

  if (postImageDropZone) {
    postImageDropZone.addEventListener('click', () => postImage.click());

    postImageDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      postImageDropZone.style.background = '#f0f4ff';
    });

    postImageDropZone.addEventListener('dragleave', () => {
      postImageDropZone.style.background = 'transparent';
    });

    postImageDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      postImageDropZone.style.background = 'transparent';
      if (e.dataTransfer.files.length) {
        handlePostImageUpload(e.dataTransfer.files[0]);
      }
    });

    postImage.addEventListener('change', (e) => {
      if (e.target.files.length) {
        handlePostImageUpload(e.target.files[0]);
      }
    });
  }

  renderMediaLibrary();
}

function uploadMediaFile(file) {
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    alert('File too large. Max 2MB.');
    return;
  }

  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  const reader = new FileReader();
  reader.onprogress = (e) => {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      document.getElementById('progressBar').style.width = percentComplete + '%';
    }
  };

  reader.onload = (e) => {
    const mediaData = {
      name: file.name,
      type: file.type,
      size: file.size,
      data: e.target.result,
      uploadedAt: new Date().toLocaleString(),
      id: Date.now()
    };

    let media = JSON.parse(localStorage.getItem('ata_media')) || [];
    media.push(mediaData);
    localStorage.setItem('ata_media', JSON.stringify(media));

    // Reset form
    document.getElementById('mediaUpload').value = '';
    document.getElementById('mediaUploadProgress').style.display = 'none';
    document.getElementById('mediaUploadArea').style.display = 'none';
    document.getElementById('confirmUploadBtn').style.display = 'none';

    renderMediaLibrary();
    alert('Image uploaded successfully!');
  };

  document.getElementById('mediaUploadProgress').style.display = 'block';
  reader.readAsDataURL(file);
}

function handlePostImageUpload(file) {
  if (file.size > 2 * 1024 * 1024) {
    alert('File too large. Max 2MB.');
    return;
  }

  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('postImage').dataset.imageData = e.target.result;
    document.getElementById('postImagePreviewImg').src = e.target.result;
    document.getElementById('postImagePreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function renderMediaLibrary() {
  const media = JSON.parse(localStorage.getItem('ata_media')) || [];
  const mediaGrid = document.getElementById('mediaGrid');
  mediaGrid.innerHTML = '';

  if (media.length === 0) {
    mediaGrid.innerHTML = '<div style="text-align: center; padding: 24px; color: #999; grid-column: 1/-1;">No images yet. Upload one to get started.</div>';
    return;
  }

  media.forEach(file => {
    const div = document.createElement('div');
    div.style.cssText = 'position: relative; border-radius: 8px; overflow: hidden; background: #f0f0f0; aspect-ratio: 1;';

    const img = document.createElement('img');
    img.src = file.data;
    img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; cursor: pointer;';
    img.title = file.name;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: none; flex-direction: column; justify-content: center; align-items: center; gap: 8px;';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-small btn-primary';
    copyBtn.textContent = 'Copy URL';
    copyBtn.onclick = () => copyMediaUrl(file.id);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-small btn-gray';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteMedia(file.id);

    overlay.appendChild(copyBtn);
    overlay.appendChild(deleteBtn);

    div.appendChild(img);
    div.appendChild(overlay);

    div.addEventListener('mouseenter', () => {
      overlay.style.display = 'flex';
    });

    div.addEventListener('mouseleave', () => {
      overlay.style.display = 'none';
    });

    mediaGrid.appendChild(div);
  });
}

function copyMediaUrl(fileId) {
  const media = JSON.parse(localStorage.getItem('ata_media')) || [];
  const file = media.find(f => f.id === fileId);

  if (file) {
    const url = file.data;
    navigator.clipboard.writeText(url).then(() => {
      alert('Image URL copied to clipboard!');
    });
  }
}

function deleteMedia(fileId) {
  if (!confirm('Delete this image?')) return;

  let media = JSON.parse(localStorage.getItem('ata_media')) || [];
  media = media.filter(f => f.id !== fileId);
  localStorage.setItem('ata_media', JSON.stringify(media));
  renderMediaLibrary();
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
