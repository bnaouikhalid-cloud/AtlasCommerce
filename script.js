/* ============================================
   BAITA VALTELLINA — Interactive Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu if open
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  });

  // ── NAVIGATION SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check

  // ── MOBILE MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });

  // ── HERO PARALLAX ──
  const heroImg = document.getElementById('heroImg');

  function handleParallax() {
    if (window.innerWidth < 768) return;
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById('hero').offsetHeight;
    if (scrollY <= heroHeight) {
      const parallaxOffset = scrollY * 0.35;
      heroImg.style.transform = `translateY(${parallaxOffset}px) scale(1.05)`;
    }
  }

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ── SCROLL REVEAL (Intersection Observer) ──
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── BOOKING WIDGET DATE DEFAULTS ──
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  // Set default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  function formatDate(date) {
    return date.toISOString().split('T')[0];
  }

  checkinInput.value = formatDate(tomorrow);
  checkinInput.min = formatDate(today);
  checkoutInput.value = formatDate(nextWeek);
  checkoutInput.min = formatDate(tomorrow);

  // Validate checkout > checkin
  checkinInput.addEventListener('change', () => {
    const ci = new Date(checkinInput.value);
    const minCo = new Date(ci);
    minCo.setDate(minCo.getDate() + 1);
    checkoutInput.min = formatDate(minCo);
    if (new Date(checkoutInput.value) <= ci) {
      checkoutInput.value = formatDate(minCo);
    }
  });

  // ── GALLERY LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const galleryItems = document.querySelectorAll('.gallery__item');

  let currentGalleryIndex = 0;
  const galleryImages = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push({
      src: img.src,
      alt: img.alt
    });

    item.addEventListener('click', () => {
      currentGalleryIndex = index;
      openLightbox();
    });
  });

  function openLightbox() {
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
  }

  function prevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].alt;
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // ── COUNTER ANIMATION (For Review Section) ──
  const scoreEl = document.querySelector('.reviews__score');
  if (scoreEl) {
    let counted = false;
    const scoreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          animateCounter(scoreEl, 0, 4.9, 1500);
          scoreObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    scoreObserver.observe(scoreEl);
  }

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = start + (end - start) * eased;
      el.textContent = value.toFixed(1);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ── BOOKING BUTTON RIPPLE EFFECT ──
  const bookingBtn = document.getElementById('bookingBtn');
  bookingBtn.addEventListener('click', function(e) {
    // Create the ripple visual on form submit
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      width: 100px;
      height: 100px;
      left: ${e.clientX - rect.left - 50}px;
      top: ${e.clientY - rect.top - 50}px;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ── AMENITY BADGE STAGGER ANIMATION ──
  const amenities = document.querySelectorAll('.amenity-badge');
  amenities.forEach((badge, i) => {
    badge.style.transitionDelay = `${i * 80}ms`;
  });

  // ── NAV ACTIVE LINK HIGHLIGHTING ──
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav__link');

  function highlightNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

});
