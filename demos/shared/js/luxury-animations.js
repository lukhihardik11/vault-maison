/* ═══ LUXURY ANIMATIONS JS ═══ */
/* Shared scroll reveal + image lazy-load + scroll progress */

// Intersection Observer for scroll reveals
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 150); // Stagger reveals
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Image lazy loading with fade-in
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('visible');
      }
      imageObserver.unobserve(img);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.luxury-image[data-src]').forEach(img => imageObserver.observe(img));

// Scroll progress indicator
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }, { passive: true });
}

// Nav background on scroll
const nav = document.querySelector('.luxury-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}
