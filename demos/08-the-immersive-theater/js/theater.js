/* ═══ THE IMMERSIVE THEATER — JavaScript ═══ */

function initLetterReveal() {
  const title = document.getElementById('heroTitle');
  if (!title || typeof gsap === 'undefined') return;
  const text = title.textContent;
  title.innerHTML = text.split('').map(c => c === ' ' ? ' ' : `<span>${c}</span>`).join('');
  gsap.to('#heroTitle span', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.04, delay: 0.5 });
}

async function loadScenes() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const container = document.getElementById('scenes');
    if (!container) return;
    container.innerHTML = products.slice(0, 3).map((p, i) => `
      <section class="scene-section">
        <div class="scene-inner" style="${i % 2 === 1 ? 'direction: rtl;' : ''}">
          <div class="scene-image-wrap" style="direction: ltr;">
            <div class="scene-glow"></div>
            <img class="scene-image" src="${p.image}" alt="${p.name}">
          </div>
          <div class="scene-content" style="direction: ltr;">
            <div class="scene-number">Act ${['I', 'II', 'III'][i]}</div>
            <h2 class="scene-title">${p.name}</h2>
            <p class="scene-desc">${p.description}</p>
            <a href="detail.html?id=${p.id}" class="scene-link">Experience &rarr;</a>
          </div>
        </div>
      </section>
    `).join('');
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.scene-section').forEach(el => {
        gsap.fromTo(el.querySelector('.scene-image'), {opacity:0,scale:0.9}, {opacity:1,scale:1,duration:1.5,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 75%'}});
        gsap.fromTo(el.querySelector('.scene-content'), {opacity:0,y:60}, {opacity:1,y:0,duration:1.2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 75%'},delay:0.3});
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
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-meta">${p.shape} &middot; ${p.carat}ct</div>
          <div class="product-card-price">$${p.price.toLocaleString()}</div>
        </div>
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
  initLetterReveal();
  if (document.getElementById('scenes')) loadScenes();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof gsap !== 'undefined' && document.querySelector('.theater-hero')) {
    gsap.fromTo('.hero-overline', {opacity:0}, {opacity:1,duration:1,ease:'power2.out',delay:0.2});
    gsap.fromTo('.hero-subtitle', {opacity:0,y:20}, {opacity:1,y:0,duration:1,ease:'power2.out',delay:1.5});
    gsap.fromTo('.hero-cta', {opacity:0}, {opacity:1,duration:0.8,ease:'power2.out',delay:2});
  }
});
