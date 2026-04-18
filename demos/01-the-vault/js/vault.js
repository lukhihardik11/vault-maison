/* ═══ THE VAULT — JavaScript ═══ */

// ═══ VAULT GATE: Press & Hold Mechanism ═══
const gate = document.getElementById('vaultGate');
if (gate) {
  const circle = document.getElementById('progressCircle');
  const radial = document.getElementById('gateRadial');
  const circumference = 2 * Math.PI * 109;
  let pressTimer = null;
  let progress = 0;
  const HOLD_DURATION = 2000;
  const TICK = 16;

  function startPress(e) {
    gate.classList.add('pressing');
    if (radial) {
      const rect = gate.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX) || rect.width / 2);
      const y = (e.clientY || (e.touches && e.touches[0].clientY) || rect.height / 2);
      radial.style.left = x + 'px';
      radial.style.top = y + 'px';
    }
    pressTimer = setInterval(() => {
      progress += TICK;
      const pct = Math.min(progress / HOLD_DURATION, 1);
      if (circle) circle.style.strokeDashoffset = circumference * (1 - pct);
      if (pct >= 1) { clearInterval(pressTimer); openVault(); }
    }, TICK);
  }

  function endPress() {
    gate.classList.remove('pressing');
    clearInterval(pressTimer);
    const currentProgress = progress;
    const rewindStart = performance.now();
    function rewind(now) {
      const elapsed = now - rewindStart;
      const pct = Math.max(0, 1 - elapsed / 400);
      progress = currentProgress * pct;
      if (circle) circle.style.strokeDashoffset = circumference * (1 - (progress / HOLD_DURATION));
      if (pct > 0) requestAnimationFrame(rewind);
      else progress = 0;
    }
    requestAnimationFrame(rewind);
  }

  function openVault() {
    const tl = gsap.timeline();
    tl.to(gate, { scale: 1.05, duration: 0.3, ease: 'power2.in' })
      .to(gate, {
        opacity: 0, scale: 1.2, duration: 1.2, ease: 'power4.out',
        onComplete: () => {
          gate.classList.add('opened');
          gsap.fromTo('.vault-hero', { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' });
          gsap.fromTo('.reveal', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', stagger: 0.15, delay: 0.5 });
        }
      });
  }

  gate.addEventListener('mousedown', startPress);
  gate.addEventListener('mouseup', endPress);
  gate.addEventListener('mouseleave', endPress);
  gate.addEventListener('touchstart', startPress, { passive: true });
  gate.addEventListener('touchend', endPress);
  gate.addEventListener('touchcancel', endPress);
}

// ═══ PRODUCT GRID ═══
async function loadProducts() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const featured = products.slice(0, 6);
    grid.innerHTML = featured.map(p => `
      <a href="detail.html?id=${p.id}" class="product-card reveal">
        <img class="product-card-image" src="../shared/images/${p.image}" alt="${p.name}">
        <div class="product-card-overlay">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-meta">${p.cut} &middot; ${p.carat} ct</div>
          <div class="product-card-price">${p.price}</div>
        </div>
      </a>
    `).join('');
  } catch (e) { console.error('Failed to load products:', e); }
}

// ═══ LISTING PAGE ═══
async function loadListing() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('listingGrid');
    if (!grid) return;
    function renderProducts(filter) {
      const filtered = filter === 'all' ? products : products.filter(p => p.cut.toLowerCase() === filter);
      grid.innerHTML = filtered.map(p => `
        <a href="detail.html?id=${p.id}" class="product-card">
          <img class="product-card-image" src="../shared/images/${p.image}" alt="${p.name}">
          <div class="product-card-overlay">
            <div class="product-card-name">${p.name}</div>
            <div class="product-card-meta">${p.cut} &middot; ${p.carat} ct</div>
            <div class="product-card-price">${p.price}</div>
          </div>
        </a>
      `).join('');
      gsap.fromTo('.product-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 });
    }
    renderProducts('all');
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.filter);
      });
    });
  } catch (e) { console.error('Failed to load listing:', e); }
}

// ═══ DETAIL PAGE ═══
async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const product = products.find(p => p.id === id) || products[0];
    const img = document.getElementById('detailImage');
    const title = document.getElementById('detailTitle');
    const subtitle = document.getElementById('detailSubtitle');
    const price = document.getElementById('detailPrice');
    const desc = document.getElementById('detailDesc');
    const specs = document.getElementById('detailSpecs');
    if (img) img.src = '../shared/images/' + product.image;
    if (title) title.textContent = product.name;
    if (subtitle) subtitle.textContent = product.cut + ' \u00B7 ' + product.carat + ' Carat';
    if (price) price.textContent = product.price;
    if (desc) desc.textContent = product.description;
    if (specs) {
      specs.innerHTML = `
        <div class="spec-row"><span class="spec-label">Cut</span><span class="spec-value">${product.cut}</span></div>
        <div class="spec-row"><span class="spec-label">Carat</span><span class="spec-value">${product.carat}</span></div>
        <div class="spec-row"><span class="spec-label">Color</span><span class="spec-value">${product.color}</span></div>
        <div class="spec-row"><span class="spec-label">Clarity</span><span class="spec-value">${product.clarity}</span></div>
        <div class="spec-row"><span class="spec-label">Certification</span><span class="spec-value">${product.certification}</span></div>
        <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${product.origin}</span></div>
      `;
    }
    gsap.fromTo('.detail-info-col > *', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1, delay: 0.3 });
  } catch (e) { console.error('Failed to load detail:', e); }
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productGrid')) loadProducts();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.trust-item').forEach((item, i) => {
      gsap.fromTo(item, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: i * 0.15, scrollTrigger: { trigger: item, start: 'top 85%' } });
    });
  }
});
