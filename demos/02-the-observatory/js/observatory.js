/* ═══ THE OBSERVATORY — JavaScript ═══ */

// Typewriter effect for hero title
function typewriterEffect(el, text, speed) {
  el.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Animate counter values
function animateValue(el, start, end, duration, prefix, suffix) {
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * eased;
    el.textContent = prefix + (Number.isInteger(end) ? Math.round(current).toLocaleString() : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Build spectral bars
function buildSpectralBars() {
  const container = document.getElementById('spectralBars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const bar = document.createElement('div');
    bar.className = 'spectral-bar';
    const h = 10 + Math.random() * 180;
    bar.style.height = '0px';
    container.appendChild(bar);
    setTimeout(() => { bar.style.height = h + 'px'; }, i * 20);
  }
}

// Load products
async function loadProducts() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    const featured = products.slice(0, 6);
    grid.innerHTML = featured.map(p => `
      <a href="detail.html?id=${p.id}" class="product-card reveal">
        <img class="product-card-image" src="${p.image}" alt="${p.name}">
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-meta">${p.shape} · ${p.carat}ct · ${p.color}/${p.clarity}</div>
          <div class="product-card-price">$${p.price.toLocaleString()}</div>
        </div>
      </a>
    `).join('');
  } catch (e) { console.error(e); }
}

async function loadListing() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('listingGrid');
    if (!grid) return;
    function render(filter) {
      const filtered = filter === 'all' ? products : products.filter(p => p.shape.toLowerCase().includes(filter));
      grid.innerHTML = filtered.map(p => `
        <a href="detail.html?id=${p.id}" class="product-card">
          <img class="product-card-image" src="${p.image}" alt="${p.name}">
          <div class="product-card-info">
            <div class="product-card-name">${p.name}</div>
            <div class="product-card-meta">${p.shape} · ${p.carat}ct · ${p.color}/${p.clarity}</div>
            <div class="product-card-price">$${p.price.toLocaleString()}</div>
          </div>
        </a>
      `).join('');
      if (typeof gsap !== 'undefined') gsap.fromTo('.product-card', {opacity:0,y:40}, {opacity:1,y:0,duration:0.8,ease:'power2.out',stagger:0.1});
    }
    render('all');
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter);
      });
    });
  } catch (e) { console.error(e); }
}

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'vm-001';
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const p = products.find(x => x.id === id) || products[0];
    const img = document.getElementById('detailImage');
    if (img) img.src = p.image;
    const t = document.getElementById('detailTitle');
    if (t) t.textContent = p.name;
    const s = document.getElementById('detailSubtitle');
    if (s) s.textContent = p.shape + ' · ' + p.carat + ' Carat · ' + p.color + '/' + p.clarity;
    const pr = document.getElementById('detailPrice');
    if (pr) pr.textContent = '$' + p.price.toLocaleString();
    const d = document.getElementById('detailDesc');
    if (d) d.textContent = p.description;
    const sp = document.getElementById('detailSpecs');
    if (sp) sp.innerHTML = `
      <div class="spec-row"><span class="spec-label">Shape</span><span class="spec-value">${p.shape}</span></div>
      <div class="spec-row"><span class="spec-label">Carat</span><span class="spec-value">${p.carat}</span></div>
      <div class="spec-row"><span class="spec-label">Color</span><span class="spec-value">${p.color}</span></div>
      <div class="spec-row"><span class="spec-label">Clarity</span><span class="spec-value">${p.clarity}</span></div>
      <div class="spec-row"><span class="spec-label">Cut</span><span class="spec-value">${p.cut}</span></div>
      <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${p.origin}</span></div>
      <div class="spec-row"><span class="spec-label">Cert</span><span class="spec-value">${p.certified} — ${p.certNumber}</span></div>
    `;
    const bc = document.getElementById('detailBreadcrumb');
    if (bc) bc.textContent = p.name;
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', {opacity:0,y:30}, {opacity:1,y:0,duration:0.8,ease:'power2.out',stagger:0.1,delay:0.3});
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  // Hero animations
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && document.querySelector('.obs-hero')) {
    const text = heroTitle.textContent;
    typewriterEffect(heroTitle, text, 60);
    // Animate KPI readouts
    setTimeout(() => {
      const v1 = document.getElementById('kpi1');
      const v2 = document.getElementById('kpi2');
      const v3 = document.getElementById('kpi3');
      const v4 = document.getElementById('kpi4');
      if (v1) animateValue(v1, 0, 54.27, 2000, '$', 'B');
      if (v2) animateValue(v2, 0, 48500, 2000, '$', '');
      if (v3) animateValue(v3, 0, 12, 1500, '', '');
      if (v4) animateValue(v4, 0, 99.7, 1800, '', '%');
    }, 500);
  }
  buildSpectralBars();
  if (document.getElementById('productGrid')) loadProducts();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%'}});
    });
  }
});
