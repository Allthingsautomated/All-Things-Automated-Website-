// ============================================
// ALL THINGS AUTOMATED - MAIN JAVASCRIPT
// ============================================

/* ============================================
   LOAD CUSTOM LOGO
   ============================================ */

function loadCustomLogo() {
  const customLogo = localStorage.getItem('ata_current_logo');
  if (!customLogo) return;

  try {
    const logoData = JSON.parse(customLogo);
    const logoImages = document.querySelectorAll('img[src*="logo"]');
    logoImages.forEach(img => {
      img.src = logoData.data;
      img.alt = logoData.name;
    });
  } catch (e) {
    console.log('No custom logo set');
  }
}

/* ============================================
   STICKY NAVIGATION
   ============================================ */

function initStickyNav() {
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ============================================
   MOBILE HAMBURGER MENU
   ============================================ */

function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');

  if (!hamburger || !navMobile) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    const isOpen = navMobile.style.display === 'flex';
    navMobile.style.display = isOpen ? 'none' : 'flex';
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.style.display = 'none';
      document.body.style.overflow = '';
    });
  });
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-center a, .nav-mobile a:not(.btn-quote)');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================
   INTERSECTION OBSERVER FOR FADE-IN
   ============================================ */

function initIntersectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

/* ============================================
   PORTFOLIO SLIDER
   ============================================ */

let currentSlideIndex = 0;

function getSlidesToShow() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function initSlider() {
  const prevBtn = document.querySelector('[data-slider="prev"]');
  const nextBtn = document.querySelector('[data-slider="next"]');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Touch/swipe support
  const track = document.querySelector('.slider-track');
  if (track) {
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      isDragging = false;
    }, { passive: true });
  }

  updateSlider();
}

function prevSlide() {
  currentSlideIndex = Math.max(0, currentSlideIndex - 1);
  updateSlider();
}

function nextSlide() {
  const track = document.querySelector('.slider-track');
  if (!track) return;
  const totalCards = track.querySelectorAll('.slider-card').length;
  const slidesToShow = getSlidesToShow();
  const maxSlideIndex = Math.max(0, totalCards - slidesToShow);
  currentSlideIndex = Math.min(maxSlideIndex, currentSlideIndex + 1);
  updateSlider();
}

function updateSlider() {
  const track = document.querySelector('.slider-track');
  if (!track) return;
  const card = track.querySelector('.slider-card');
  if (!card) return;
  const cardWidth = card.offsetWidth;
  const gap = 24;
  const offset = -(currentSlideIndex * (cardWidth + gap));
  track.style.transform = `translateX(${offset}px)`;
}

/* ============================================
   PORTFOLIO DATA & RENDERING
   ============================================ */

const portfolioData = [
  {
    title: 'Whole-Home Lighting Design',
    description: 'Lutron Cas\u00e9ta scene control across every room of a 4,200 sq ft waterfront residence.',
    location: 'Siesta Key, FL',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    category: 'lighting'
  },
  {
    title: 'Estate Security System',
    description: 'Luma 8-camera perimeter system with Ring doorbell and smart locks on a gated property.',
    location: 'Bird Key, FL',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    category: 'security'
  },
  {
    title: 'Multi-Zone Climate',
    description: 'Ecobee Premium with 6 room sensors across a two-story home for perfect comfort.',
    location: 'Lakewood Ranch, FL',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    category: 'climate'
  },
  {
    title: 'Full Home Automation',
    description: 'Control4 whole-home system unifying lighting, climate, audio, and security from one interface.',
    location: 'Casey Key, FL',
    image: 'https://images.unsplash.com/photo-1558882224-dda166ffe592?w=600&q=80',
    category: 'automation'
  },
  {
    title: 'New Construction Pre-Wire',
    description: 'Full smart home pre-wire and Lutron RA3 install for a custom builder\'s luxury spec home.',
    location: 'Osprey, FL',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&q=80',
    category: 'automation'
  },
  {
    title: 'Outdoor Living Automation',
    description: 'Landscape lighting scenes, weatherproof audio, and automated patio shades.',
    location: 'Palmer Ranch, FL',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    category: 'lighting'
  }
];

function renderPortfolioSlider() {
  const track = document.querySelector('.slider-track');
  if (!track) return;

  portfolioData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'slider-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy" />
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-description">${item.description}</div>
        <div class="card-footer">
          <span>${item.location}</span>
          <a href="services.html" style="color:var(--color-primary);font-weight:500;font-size:13px;">View Project &rarr;</a>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  setTimeout(updateSlider, 100);
}

/* ============================================
   CONTACT FORM HANDLING
   ============================================ */

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const city = document.querySelector('input[name="city"]').value.trim();
    const service = document.querySelector('select[name="service"]').value;
    const message = document.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !phone || !city || !message) {
      alert('Please fill in all fields');
      return;
    }

    const inquiry = {
      id: Date.now(),
      name,
      email,
      phone,
      city,
      service,
      message,
      date: new Date().toLocaleDateString(),
      read: false
    };

    let inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];
    inquiries.push(inquiry);
    localStorage.setItem('ata_inquiries', JSON.stringify(inquiries));

    // Send to API for cloud storage
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, address: city, service, message, date: new Date().toISOString(), source: 'contact-form', score: 0, tier: '', status: 'new' })
    }).catch(function() {});

    // Email notification
    fetch('https://formsubmit.co/ajax/romeroj0007@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ _subject: '[CONTACT FORM] ' + name + ' - ' + service, Name: name, Email: email, Phone: phone, City: city, Service: service, Message: message, _template: 'table' })
    }).catch(function() {});

    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 4000);
    }

    form.reset();
  });
}

/* ============================================
   LOAD BLOG POSTS FROM LOCALSTORAGE
   ============================================ */

function loadBlogPosts() {
  const blogGrid = document.querySelector('.blog-grid');
  if (!blogGrid) return;

  const savedPosts = JSON.parse(localStorage.getItem('ata_posts')) || [];
  const publishedPosts = savedPosts.filter(p => p.status === 'Published');

  if (publishedPosts.length > 0) {
    blogGrid.innerHTML = '';
    publishedPosts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card';
      card.innerHTML = `
        <div class="blog-card-image" style="background: linear-gradient(135deg, rgba(58,127,193,0.15), rgba(8,11,20,0.9)); display:flex;align-items:center;justify-content:center;">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M16 4h16l8 8v28c0 2-1 3-3 3H15c-2 0-3-1-3-3V7c0-2 1-3 3-3Z" stroke="#3A7FC1" stroke-width="2" stroke-linejoin="round"/><path d="M28 4v8h8M18 24h12M18 30h12" stroke="#3A7FC1" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <div class="blog-card-content">
          <span class="badge-category">${post.category || 'Tips'}</span>
          <h3>${post.title}</h3>
          <p>${post.content.substring(0, 100)}...</p>
          <a href="#">Read More &rarr;</a>
        </div>
      `;
      blogGrid.appendChild(card);
    });
  }
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================
   LEAD CAPTURE POPUP
   ============================================ */

function initLeadCapture() {
  // Don't show on contact page or if already dismissed/subscribed
  if (window.location.pathname.includes('contact')) return;
  if (localStorage.getItem('ata_lead_dismissed')) return;
  if (localStorage.getItem('ata_lead_subscribed')) return;

  // Show popup after 45 seconds or 60% scroll
  let popupShown = false;

  function showPopup() {
    if (popupShown) return;
    popupShown = true;

    const overlay = document.createElement('div');
    overlay.className = 'lead-overlay';
    overlay.innerHTML = `
      <div class="lead-popup">
        <button class="lead-close" aria-label="Close">&times;</button>
        <div class="lead-popup-content">
          <div class="lead-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#3A7FC1" stroke-width="1.5" width="48" height="48">
              <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>
            </svg>
          </div>
          <h3>Get Smart Home Tips & Exclusive Offers</h3>
          <p>Join homeowners across the Gulf Coast who get our monthly insights on automation, energy savings, and home security.</p>
          <form class="lead-form" id="leadCaptureForm">
            <input type="text" name="lead_name" placeholder="Your name" required>
            <input type="email" name="lead_email" placeholder="Your email" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
          <p class="lead-privacy">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Close handlers
    overlay.querySelector('.lead-close').addEventListener('click', () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
      localStorage.setItem('ata_lead_dismissed', Date.now());
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
        localStorage.setItem('ata_lead_dismissed', Date.now());
      }
    });

    // Form submission
    overlay.querySelector('#leadCaptureForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.lead_name.value.trim();
      const email = e.target.lead_email.value.trim();

      // Store lead
      let leads = JSON.parse(localStorage.getItem('ata_leads')) || [];
      leads.push({ name, email, date: new Date().toISOString(), source: 'popup' });
      localStorage.setItem('ata_leads', JSON.stringify(leads));
      localStorage.setItem('ata_lead_subscribed', 'true');

      // Send to API
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, date: new Date().toISOString(), source: 'popup', status: 'new' })
      }).catch(function() {});

      // Email notification
      fetch('https://formsubmit.co/ajax/romeroj0007@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: '[POPUP LEAD] ' + name, Name: name, Email: email, _template: 'table' })
      }).catch(function() {});

      // Show success
      overlay.querySelector('.lead-popup-content').innerHTML = `
        <div class="lead-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#3A7FC1" stroke-width="2" width="48" height="48">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3>You're In!</h3>
        <p>Thanks, ${name}! You'll receive our next smart home update straight to your inbox.</p>
      `;
      setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      }, 3000);
    });
  }

  // Timer trigger (45 seconds)
  setTimeout(showPopup, 45000);

  // Scroll trigger (60% page)
  window.addEventListener('scroll', function scrollTrigger() {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
    if (scrollPercent > 0.6) {
      showPopup();
      window.removeEventListener('scroll', scrollTrigger);
    }
  });
}

/* ============================================
   FOOTER NEWSLETTER FORM
   ============================================ */

function initFooterNewsletter() {
  const form = document.querySelector('.footer-newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    if (!email) return;

    let leads = JSON.parse(localStorage.getItem('ata_leads')) || [];
    leads.push({ name: '', email, date: new Date().toISOString(), source: 'footer' });
    localStorage.setItem('ata_leads', JSON.stringify(leads));
    localStorage.setItem('ata_lead_subscribed', 'true');

    // Send to API
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email, date: new Date().toISOString(), source: 'footer', status: 'new' })
    }).catch(function() {});

    // Email notification
    fetch('https://formsubmit.co/ajax/romeroj0007@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ _subject: '[NEWSLETTER] New subscriber', Email: email, _template: 'table' })
    }).catch(function() {});

    form.innerHTML = '<p style="color: var(--color-primary); font-weight: 500;">Subscribed! Welcome aboard.</p>';
  });
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadCustomLogo();
  initStickyNav();
  initHamburger();
  setActiveNav();
  initIntersectionObserver();
  initSlider();
  renderPortfolioSlider();
  initContactForm();
  loadBlogPosts();
  initSmoothScroll();
  initLeadCapture();
  initFooterNewsletter();
});

window.addEventListener('resize', updateSlider);
