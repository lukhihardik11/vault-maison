/* ═══ THE ARCHIVE — JavaScript ═══ */

const timelineData = [
  { date: "2.5 Billion Years Ago", event: "Carbon Crystallization", desc: "Deep within the Earth's mantle, at temperatures exceeding 2,000°F and pressures of 725,000 pounds per square inch, carbon atoms begin their slow transformation into diamond." },
  { date: "100 Million Years Ago", event: "Volcanic Journey", desc: "Kimberlite eruptions carry the diamond toward the surface at speeds approaching 40 miles per hour, a violent birth from the deep earth." },
  { date: "1888", event: "Discovery at Kimberley", desc: "The great diamond fields of South Africa yield their treasures. A new chapter in the story of light begins." },
  { date: "1953", event: "The Modern Cut", desc: "Marcel Tolkowsky's mathematical ideal is refined. The round brilliant cut achieves its modern proportions, maximizing fire and brilliance." },
  { date: "2026", event: "Your Chapter", desc: "The stone arrives at Vault Maison. Its provenance is verified, its story documented, and it awaits the next custodian of its legacy." }
];

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  container.innerHTML = timelineData.map(t => `
    <div class="timeline-entry reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-date">${t.date}</div>
      <h3 class="timeline-event">${t.event}</h3>
      <p class="timeline-desc">${t.desc}</p>
    </div>
  `).join('');
}

async function loadProvenance() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('provenanceGrid');
    if (!grid) return;
    grid.innerHTML = products.slice(0, 3).map(p => `
      <a href="detail.html?id=${p.id}" class="provenance-card reveal">
        <img class="provenance-card-image" src="${p.image}" alt="${p.name}">
        <div class="provenance-card-name">${p.name}</div>
        <div class="provenance-card-origin">Origin: ${p.origin}</div>
        <div class="provenance-card-meta">${p.shape} &middot; ${p.carat}ct &middot; ${p.certified}</div>
        <div class="provenance-card-price">$${p.price.toLocaleString()}</div>
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
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-meta">${p.shape} &middot; ${p.carat}ct &middot; Origin: ${p.origin}</div>
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
    document.getElementById('provenanceStory').innerHTML = `This ${p.shape.toLowerCase()} diamond was sourced from ${p.origin} and has been certified by ${p.certified} under certificate number ${p.certNumber}. Its journey from the earth to your hands spans billions of years, each moment adding to its singular story.`;
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', {opacity:0,y:30}, {opacity:1,y:0,duration:0.8,ease:'power2.out',stagger:0.1,delay:0.3});
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  renderTimeline();
  if (document.getElementById('provenanceGrid')) loadProvenance();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%'}});
    });
    gsap.utils.toArray('.timeline-entry').forEach((el, i) => {
      gsap.fromTo(el, {opacity:0,x:-30}, {opacity:1,x:0,duration:0.8,ease:'power2.out',delay:i*0.1,scrollTrigger:{trigger:el,start:'top 85%'}});
    });
  }
  if (typeof gsap !== 'undefined' && document.querySelector('.archive-hero')) {
    gsap.fromTo('.archive-hero > *', {opacity:0,y:30}, {opacity:1,y:0,duration:1,ease:'power2.out',stagger:0.15});
  }
});
