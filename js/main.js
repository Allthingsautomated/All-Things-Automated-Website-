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
    title: 'Smart Lighting System',
    description: 'Full Lutron scene control installed throughout a luxury waterfront residence.',
    location: 'Sarasota, FL',
    price: 'Starting at $2,500',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'lighting'
  },
  {
    title: 'Security Camera Setup',
    description: 'Complete perimeter camera system with smart doorbell and remote monitoring.',
    location: 'Osprey, FL',
    price: 'Starting at $1,800',
    image: 'https://images.unsplash.com/photo-1558002038-1055e4e7e5b0?w=600&q=80',
    category: 'security'
  },
  {
    title: 'Climate Control System',
    description: 'Ecobee multi-zone installation with intelligent scheduling and app control.',
    location: 'Bradenton, FL',
    price: 'Starting at $800',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    category: 'climate'
  },
  {
    title: 'Full Home Automation',
    description: 'Complete smart home integration — lighting, climate, security & entertainment unified.',
    location: 'Venice, FL',
    price: 'Starting at $8,000',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80',
    category: 'automation'
  },
  {
    title: 'Smart Doorbell & Locks',
    description: 'Keyless entry with video doorbell and remote access from anywhere.',
    location: 'North Port, FL',
    price: 'Starting at $600',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    category: 'security'
  },
  {
    title: 'Outdoor Entertainment',
    description: 'Weatherproof speakers, automated outdoor lighting, and patio control system.',
    location: 'Lakewood Ranch, FL',
    price: 'Starting at $3,500',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    category: 'automation'
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
          <a href="services.html" class="btn btn-primary btn-small">View Details</a>
        </div>
        <div class="card-price">${item.price}</div>
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
});

window.addEventListener('resize', updateSlider);
