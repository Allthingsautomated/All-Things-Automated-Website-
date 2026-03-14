// ============================================
// ALL THINGS AUTOMATED - MAIN JAVASCRIPT
// ============================================

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
    navMobile.style.display = navMobile.style.display === 'flex' ? 'none' : 'flex';
  });

  // Close menu when a link is clicked
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMobile.style.display = 'none';
    });
  });
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-center a, .nav-mobile a');

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
    threshold: 0.1
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

/* ============================================
   PORTFOLIO SLIDER
   ============================================ */

let currentSlideIndex = 0;
const slidesToShow = 3;

function initSlider() {
  const prevBtn = document.querySelector('[data-slider="prev"]');
  const nextBtn = document.querySelector('[data-slider="next"]');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  updateSlider();
}

function prevSlide() {
  const track = document.querySelector('.slider-track');
  const totalCards = track.querySelectorAll('.slider-card').length;
  const maxSlideIndex = Math.max(0, totalCards - slidesToShow);

  currentSlideIndex = Math.max(0, currentSlideIndex - 1);
  updateSlider();
}

function nextSlide() {
  const track = document.querySelector('.slider-track');
  const totalCards = track.querySelectorAll('.slider-card').length;
  const maxSlideIndex = Math.max(0, totalCards - slidesToShow);

  currentSlideIndex = Math.min(maxSlideIndex, currentSlideIndex + 1);
  updateSlider();
}

function updateSlider() {
  const track = document.querySelector('.slider-track');
  const cardWidth = track.querySelector('.slider-card').offsetWidth;
  const gap = 20;
  const offset = -(currentSlideIndex * (cardWidth + gap));

  track.style.transform = `translateX(${offset}px)`;
}

/* ============================================
   PORTFOLIO CARDS
   ============================================ */

const portfolioData = [
  {
    title: 'Smart Lighting System',
    description: 'Full Lutron scene control installed throughout a luxury residence.',
    location: 'Sarasota, FL',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    featured: false
  },
  {
    title: 'Security Camera Setup',
    description: 'Ring camera perimeter install with smart doorbell and remote access.',
    location: 'Osprey, FL',
    image: 'https://images.unsplash.com/photo-1558002038-1055e4e7e5b0?w=500&q=80',
    featured: true
  },
  {
    title: 'Full Home Automation',
    description: 'Complete smart home integration — lighting, climate, security unified.',
    location: 'Venice, FL',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80',
    featured: false
  },
  {
    title: 'Smart Thermostat Install',
    description: 'Ecobee system with multi-zone climate scheduling and app control.',
    location: 'Bradenton, FL',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    featured: false
  },
  {
    title: 'Smart Doorbell & Locks',
    description: 'Keyless entry with video doorbell and remote access from anywhere.',
    location: 'North Port, FL',
    image: 'https://images.unsplash.com/photo-1558618047-3c2f8f60bcce?w=500&q=80',
    featured: false
  },
  {
    title: 'Outdoor Security System',
    description: 'Full perimeter Arlo camera system with motion alerts and cloud storage.',
    location: 'Lakewood Ranch, FL',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80',
    featured: false
  }
];

function renderPortfolioSlider() {
  const track = document.querySelector('.slider-track');
  if (!track) return;

  portfolioData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'slider-card card';

    const isFeatured = item.featured;
    const buttonClass = isFeatured ? 'btn-blue' : 'btn-dark';

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="card-image" />
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-description">${item.description}</div>
        <div class="card-footer">
          <span>${item.location}</span>
          <button class="btn btn-small ${buttonClass}">View More</button>
        </div>
      </div>
    `;

    track.appendChild(card);
  });

  setTimeout(() => {
    updateSlider();
  }, 100);
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

    // Create inquiry object
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

    // Get existing inquiries from localStorage
    let inquiries = JSON.parse(localStorage.getItem('ata_inquiries')) || [];
    inquiries.push(inquiry);
    localStorage.setItem('ata_inquiries', JSON.stringify(inquiries));

    // Show success message
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
      successMsg.classList.add('show');
      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 4000);
    }

    // Reset form
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
    // Clear default posts and add saved posts
    blogGrid.innerHTML = '';
    publishedPosts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div style="background: linear-gradient(135deg, #e8f4f0 0%, #eef6fb 50%, #fdf6ee 100%); height: 180px; display: flex; align-items: center; justify-content: center; border-radius: 16px 16px 0 0;">
          <span style="color: #ccc; font-size: 36px;">📄</span>
        </div>
        <div class="card-content">
          <span class="badge-category">${post.category || 'Tips'}</span>
          <div class="card-title">${post.title}</div>
          <div class="card-description">${post.content.substring(0, 80)}...</div>
          <a href="#" style="color: #3A7FC1; font-weight: 500; font-size: 12px;">Read More →</a>
        </div>
      `;
      blogGrid.appendChild(card);
    });
  }
}

/* ============================================
   INITIALIZATION
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initHamburger();
  setActiveNav();
  initIntersectionObserver();
  initSlider();
  renderPortfolioSlider();
  initContactForm();
  loadBlogPosts();
});

// Update slider on window resize
window.addEventListener('resize', updateSlider);
