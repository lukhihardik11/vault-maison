/* ═══ THE MODERN MAISON — JavaScript ═══ */

async function loadFeatured() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    grid.innerHTML = products.slice(0, 3).map(p => `
      <a href="detail.html?id=${p.id}" class="featured-card reveal">
        <img class="featured-card-image" src="${p.image}" alt="${p.name}">
        <div class="featured-card-name">${p.name}</div>
        <div class="featured-card-meta">${p.shape} &middot; ${p.carat}ct &middot; ${p.color}/${p.clarity}</div>
        <div class="featured-card-price">$${p.price.toLocaleString()}</div>
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
    grid.innerHTML = products.map(p => `
      <a href="detail.html?id=${p.id}" class="product-card">
        <img class="product-card-image" src="${p.image}" alt="${p.name}">
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-meta">${p.shape} &middot; ${p.carat}ct &middot; ${p.color}/${p.clarity}</div>
        <div class="product-card-price">$${p.price.toLocaleString()}</div>
      </a>
    `).join('');
    if (typeof gsap !== 'undefined') gsap.fromTo('.product-card', {opacity:0,y:40}, {opacity:1,y:0,duration:0.8,ease:'power2.out',stagger:0.1});
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
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', {opacity:0,y:30}, {opacity:1,y:0,duration:0.8,ease:'power2.out',stagger:0.1,delay:0.3});
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('featuredGrid')) loadFeatured();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%'}});
    });
    gsap.utils.toArray('.pillar').forEach((el, i) => {
      gsap.fromTo(el, {opacity:0,y:30}, {opacity:1,y:0,duration:0.8,ease:'power2.out',delay:i*0.15,scrollTrigger:{trigger:el,start:'top 85%'}});
    });
  }
  if (typeof gsap !== 'undefined' && document.querySelector('.hero-content-col')) {
    gsap.fromTo('.hero-content-col > *', {opacity:0,y:30}, {opacity:1,y:0,duration:1,ease:'power2.out',stagger:0.15,delay:0.3});
    gsap.fromTo('.hero-image', {scale:1.1,opacity:0}, {scale:1,opacity:1,duration:1.5,ease:'power2.out'});
  }
});
