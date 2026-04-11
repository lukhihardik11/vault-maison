/* ═══ THE MINIMAL MACHINE — JavaScript ═══ */

async function loadReveals() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const container = document.getElementById('reveals');
    if (!container) return;
    container.innerHTML = products.slice(0, 4).map((p, i) => `
      <section class="snap-section product-reveal">
        <div class="reveal-inner" style="${i % 2 === 1 ? 'direction: rtl;' : ''}">
          <div style="direction: ltr;"><img class="reveal-image" src="${p.image}" alt="${p.name}"></div>
          <div class="reveal-info" style="direction: ltr;">
            <div class="reveal-number">${String(i + 1).padStart(2, '0')} / 04</div>
            <h2 class="reveal-name">${p.name}</h2>
            <div class="reveal-meta">${p.shape} &middot; ${p.carat}ct &middot; ${p.color}/${p.clarity}</div>
            <div class="reveal-price">$${p.price.toLocaleString()}</div>
            <a href="detail.html?id=${p.id}" class="reveal-link">View Details</a>
          </div>
        </div>
      </section>
    `).join('');
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.product-reveal').forEach(el => {
        gsap.fromTo(el.querySelector('.reveal-image'), {opacity:0,scale:0.95}, {opacity:1,scale:1,duration:1.2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 70%'}});
        gsap.fromTo(el.querySelector('.reveal-info'), {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 70%'},delay:0.2});
      });
    }
  } catch (e) { console.error(e); }
}

async function loadListing() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('listingGrid');
    if (!grid) return;
    grid.innerHTML = products.map(p => `
      <a href="detail.html?id=${p.id}" class="product-card">
        <img class="product-card-image" src="${p.image}" alt="${p.name}">
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-meta">${p.shape} &middot; ${p.carat}ct</div>
        <div class="product-card-price">$${p.price.toLocaleString()}</div>
      </a>
    `).join('');
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
    document.getElementById('detailSubtitle').textContent = `${p.shape} \u00b7 ${p.carat} Carat \u00b7 ${p.color}/${p.clarity}`;
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
      <div class="spec-row"><span class="spec-label">Certificate</span><span class="spec-value">${p.certified} \u2014 ${p.certNumber}</span></div>
    `;
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', {opacity:0,y:20}, {opacity:1,y:0,duration:0.6,ease:'power2.out',stagger:0.08,delay:0.2});
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('reveals')) loadReveals();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof gsap !== 'undefined' && document.querySelector('.minimal-hero')) {
    gsap.fromTo('.hero-title', {opacity:0,y:20}, {opacity:1,y:0,duration:1.2,ease:'power2.out'});
    gsap.fromTo('.hero-subtitle', {opacity:0}, {opacity:1,duration:1,ease:'power2.out',delay:0.4});
    gsap.fromTo('.hero-cta', {opacity:0}, {opacity:1,duration:0.8,ease:'power2.out',delay:0.7});
  }
});
