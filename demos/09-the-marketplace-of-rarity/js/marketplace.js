/* ═══ THE MARKETPLACE OF RARITY — JavaScript ═══ */

function startCountdown() {
  const target = new Date();
  target.setHours(target.getHours() + 23);
  target.setMinutes(target.getMinutes() + 47);
  target.setSeconds(target.getSeconds() + 12);
  function update() {
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const hEl = document.getElementById('cdHours');
    const mEl = document.getElementById('cdMinutes');
    const sEl = document.getElementById('cdSeconds');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

function lotTimer(endMs) {
  const diff = endMs - Date.now();
  if (diff <= 0) return 'Ended';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

const statuses = ['live', 'live', 'upcoming', 'upcoming', 'sold', 'live', 'upcoming', 'sold', 'live', 'upcoming', 'sold', 'upcoming'];
const bidMultipliers = [1.15, 1.22, 1.0, 1.0, 1.35, 1.18, 1.0, 1.28, 1.1, 1.0, 1.42, 1.0];

async function loadLots() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('lotsGrid');
    if (!grid) return;
    const now = Date.now();
    grid.innerHTML = products.slice(0, 6).map((p, i) => {
      const status = statuses[i];
      const bidPrice = Math.round(p.price * bidMultipliers[i]);
      const endTime = now + (3600000 * (2 + i * 3));
      return `
        <a href="detail.html?id=${p.id}" class="lot-card">
          <img class="lot-card-image" src="${p.image}" alt="${p.name}">
          <div class="lot-card-body">
            <div class="lot-card-header">
              <span class="lot-number">Lot ${String(i + 1).padStart(3, '0')}</span>
              <span class="lot-status ${status}">${status === 'live' ? '\u25cf Live' : status === 'sold' ? 'Sold' : 'Upcoming'}</span>
            </div>
            <div class="lot-card-name">${p.name}</div>
            <div class="lot-card-meta">${p.shape} \u00b7 ${p.carat}ct \u00b7 ${p.color}/${p.clarity}</div>
            <div class="lot-card-bid">
              <span class="bid-label">${status === 'sold' ? 'Hammer Price' : 'Current Bid'}</span>
              <span class="bid-amount">$${bidPrice.toLocaleString()}</span>
            </div>
            ${status === 'live' ? `<div class="lot-card-timer" data-end="${endTime}">Closing in ${lotTimer(endTime)}</div>` : ''}
          </div>
        </a>
      `;
    }).join('');
    setInterval(() => {
      document.querySelectorAll('.lot-card-timer').forEach(el => {
        const end = parseInt(el.dataset.end);
        el.textContent = 'Closing in ' + lotTimer(end);
      });
    }, 1000);
    if (typeof gsap !== 'undefined') gsap.fromTo('.lot-card', {opacity:0,y:40}, {opacity:1,y:0,duration:0.6,ease:'power2.out',stagger:0.08});
  } catch (e) { console.error(e); }
}

async function loadListing() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('listingGrid');
    if (!grid) return;
    grid.innerHTML = products.map((p, i) => {
      const status = statuses[i];
      const bidPrice = Math.round(p.price * bidMultipliers[i]);
      return `
        <a href="detail.html?id=${p.id}" class="lot-card">
          <img class="lot-card-image" src="${p.image}" alt="${p.name}">
          <div class="lot-card-body">
            <div class="lot-card-header">
              <span class="lot-number">Lot ${String(i + 1).padStart(3, '0')}</span>
              <span class="lot-status ${status}">${status === 'live' ? '\u25cf Live' : status === 'sold' ? 'Sold' : 'Upcoming'}</span>
            </div>
            <div class="lot-card-name">${p.name}</div>
            <div class="lot-card-meta">${p.shape} \u00b7 ${p.carat}ct</div>
            <div class="lot-card-bid">
              <span class="bid-label">${status === 'sold' ? 'Hammer Price' : 'Current Bid'}</span>
              <span class="bid-amount">$${bidPrice.toLocaleString()}</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
    if (typeof gsap !== 'undefined') gsap.fromTo('.lot-card', {opacity:0,y:40}, {opacity:1,y:0,duration:0.6,ease:'power2.out',stagger:0.06});
  } catch (e) { console.error(e); }
}

async function loadDetail() {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'vm-001';
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const idx = products.findIndex(x => x.id === id);
    const p = idx >= 0 ? products[idx] : products[0];
    const i = idx >= 0 ? idx : 0;
    const status = statuses[i];
    const bidPrice = Math.round(p.price * bidMultipliers[i]);
    document.getElementById('detailImage').src = p.image;
    document.getElementById('detailTitle').textContent = p.name;
    document.getElementById('detailSubtitle').textContent = `${p.shape} \u00b7 ${p.carat} Carat \u00b7 ${p.color}/${p.clarity}`;
    document.getElementById('detailDesc').textContent = p.description;
    document.getElementById('detailBreadcrumb').textContent = p.name;
    document.getElementById('lotBadge').innerHTML = `<span class="lot-number">Lot ${String(i+1).padStart(3,'0')}</span><span class="lot-status ${status}">${status === 'live' ? '\u25cf Live' : status === 'sold' ? 'Sold' : 'Upcoming'}</span>`;
    document.getElementById('bidAmount').textContent = '$' + bidPrice.toLocaleString();
    document.getElementById('bidHistory').textContent = `${3 + i} bids \u00b7 ${2 + i} bidders \u00b7 Estimate: $${p.price.toLocaleString()}\u2013$${Math.round(p.price * 1.5).toLocaleString()}`;
    document.getElementById('detailSpecs').innerHTML = `
      <div class="spec-row"><span class="spec-label">Shape</span><span class="spec-value">${p.shape}</span></div>
      <div class="spec-row"><span class="spec-label">Carat</span><span class="spec-value">${p.carat}</span></div>
      <div class="spec-row"><span class="spec-label">Color</span><span class="spec-value">${p.color}</span></div>
      <div class="spec-row"><span class="spec-label">Clarity</span><span class="spec-value">${p.clarity}</span></div>
      <div class="spec-row"><span class="spec-label">Cut</span><span class="spec-value">${p.cut}</span></div>
      <div class="spec-row"><span class="spec-label">Origin</span><span class="spec-value">${p.origin}</span></div>
      <div class="spec-row"><span class="spec-label">Certificate</span><span class="spec-value">${p.certified} \u2014 ${p.certNumber}</span></div>
    `;
    const ctaBtn = document.getElementById('detailCta');
    if (status === 'sold') { ctaBtn.textContent = 'Sold'; ctaBtn.style.opacity = '0.4'; ctaBtn.style.pointerEvents = 'none'; }
    else if (status === 'upcoming') { ctaBtn.textContent = 'Register to Bid'; }
    else { ctaBtn.textContent = 'Place Bid'; }
    if (typeof gsap !== 'undefined') gsap.fromTo('.detail-info-col > *', {opacity:0,y:30}, {opacity:1,y:0,duration:0.6,ease:'power2.out',stagger:0.08,delay:0.2});
  } catch (e) { console.error(e); }
}

document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  if (document.getElementById('lotsGrid')) loadLots();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();
  if (typeof gsap !== 'undefined' && document.querySelector('.marketplace-hero')) {
    gsap.fromTo('.hero-overline', {opacity:0}, {opacity:1,duration:0.8,ease:'power2.out'});
    gsap.fromTo('.hero-title', {opacity:0,y:30}, {opacity:1,y:0,duration:1,ease:'power2.out',delay:0.2});
    gsap.fromTo('.hero-subtitle', {opacity:0}, {opacity:1,duration:0.8,ease:'power2.out',delay:0.5});
    gsap.fromTo('.hero-countdown', {opacity:0,y:20}, {opacity:1,y:0,duration:0.8,ease:'power2.out',delay:0.7});
    gsap.fromTo('.hero-cta', {opacity:0}, {opacity:1,duration:0.6,ease:'power2.out',delay:1});
  }
});
