/* ═══ THE GALLERY — JavaScript ═══ */

async function loadExhibitions() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const container = document.getElementById('exhibitions');
    if (!container) return;
    const featured = products.slice(0, 4);
    container.innerHTML = featured.map((p, i) => `
      <div class="exhibit-row reveal">
        <div class="exhibit-image-wrap">
          <img class="exhibit-image luxury-image" data-src="${p.image}" alt="${p.name}">
        </div>
        <div class="exhibit-content">
          <div class="exhibit-number">Exhibition ${String(i + 1).padStart(2, '0')}</div>
          <h2 class="exhibit-name">${p.name}</h2>
          <p class="exhibit-desc">${p.description}</p>
          <a href="detail.html?id=${p.id}" class="exhibit-link">View Work &rarr;</a>
        </div>
      </div>
    `).join('');
    // Re-init image observer
    document.querySelectorAll('.luxury-image[data-src]').forEach(img => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('visible');
            obs.unobserve(img);
          }
        });
      }, { threshold: 0.1 });
      obs.observe(img);
    });
    // GSAP reveals
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.exhibit-row').forEach(row => {
        gsap.fromTo(row, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: row, start: 'top 80%' } });
      });
    }
  } catch (e) { console.error(e); }
}

async function loadGalleryGrid() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
      <a href="detail.html?id=${p.id}" class="gallery-item">
        <img class="gallery-item-image" src="${p.image}" alt="${p.name}">
        <div class="gallery-item-info">
          <div class="gallery-item-name">${p.name}</div>
          <div class="gallery-item-meta">${p.shape} &middot; ${p.carat}ct</div>
          <div class="gallery-item-price">$${p.price.toLocaleString()}</div>
        </div>
      </a>
    `).join('');
    // Dim effect using Anime.js
    grid.addEventListener('mouseenter', () => grid.classList.add('has-hover'));
    grid.addEventListener('mouseleave', () => grid.classList.remove('has-hover'));
    // GSAP stagger
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.gallery-item', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 });
    }
  } catch (e) { console.error(e); }
}

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'vm-001';
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const p = products.find(x => x.id === id) || products[0];
    document.getElementById('detailImage').src = p.image;
    document.getElementById('detailTitle').textContent = p.name;
    document.getElementById('detailSubtitle').textContent = `${p.shape} · ${p.carat} Carat · ${p.color}/${p.clarity}`;
    document.getElementById('detailPrice').textContent = '$' + p.price.toLocaleString();
    document.getElementById('detailDesc').textContent = p.description;
    document.getElementById('detailBreadcrumb').textContent = p.name;
    document.getElementById('detailSpecs').innerHTML = `
      <div class="spec-row"><span class="spec-label">Shape</span><span class="spec-value">${p.shape}</span></div>
      <div class="spec-row"><span class="spec-label">Carat</span><span class="spec-value">${p.carat}</span></div>
      <div class="spec-row"><span class="spec-label">Color</span><span class="spec-value">${p.color}</span></div>
      <div class="spec-row"><span class="spec-label">Clarity</span><span class="spec-value">${p.clarity}</span></div>
      <div class="spec-row"><span class="spec-label">Cut</span><span class="spec-value">${p.cut}</span></div>
      <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${p.origin}</span></div>
      <div class="spec-row"><span class="spec-label">Certificate</span><span class="spec-value">${p.certified} — ${p.certNumber}</span></div>
    `;
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.3 });
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('exhibitions')) loadExhibitions();
  if (document.getElementById('galleryGrid')) loadGalleryGrid();
  if (document.getElementById('detailImage')) loadDetail();
  // Hero entrance
  if (typeof gsap !== 'undefined' && document.querySelector('.gallery-hero')) {
    gsap.fromTo('.gallery-hero > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.15 });
  }
});
