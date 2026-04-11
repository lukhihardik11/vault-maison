/* ═══ THE SALON — JavaScript ═══ */

const chatResponses = [
  "I appreciate your interest. Based on what you have shared, I would suggest exploring our round brilliant collection. The fire and scintillation are truly extraordinary.",
  "An excellent choice. For a 2-carat stone in that range, I would recommend the Sovereign Round. It has exceptional light performance and comes with a GIA certification.",
  "Of course. The Sovereign Round is sourced from Botswana and features D color with VVS1 clarity. It is among the finest stones in our current collection.",
  "I understand completely. Let me arrange a private viewing at your convenience. Our salon is available Tuesday through Saturday, by appointment.",
  "You are most welcome. I will have the stone prepared for your viewing. Is there anything else I can assist you with today?"
];
let responseIndex = 0;

function addMessage(text, type) {
  const messages = document.getElementById('chatMessages');
  if (!messages) return;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + type;
  bubble.textContent = text;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  if (typeof gsap !== 'undefined') gsap.fromTo(bubble, {opacity:0,y:10}, {opacity:1,y:0,duration:0.4,ease:'power2.out'});
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  if (!messages) return;
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  addMessage(input.value.trim(), 'user');
  input.value = '';
  showTyping();
  setTimeout(() => {
    hideTyping();
    addMessage(chatResponses[responseIndex % chatResponses.length], 'ai');
    responseIndex++;
  }, 1500 + Math.random() * 1000);
}

async function loadRecommendations() {
  try {
    const res = await fetch('../shared/data/products.json');
    const products = await res.json();
    const grid = document.getElementById('recoGrid');
    if (!grid) return;
    const matches = ['98% Match', '95% Match', '92% Match'];
    grid.innerHTML = products.slice(0, 3).map((p, i) => `
      <a href="detail.html?id=${p.id}" class="reco-card reveal">
        <img class="reco-card-image" src="${p.image}" alt="${p.name}">
        <div class="reco-card-info">
          <div class="reco-card-name">${p.name}</div>
          <div class="reco-card-meta">${p.shape} &middot; ${p.carat}ct</div>
          <div class="reco-card-price">$${p.price.toLocaleString()}</div>
          <div class="reco-card-match">${matches[i]}</div>
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
    grid.innerHTML = products.map(p => `
      <a href="detail.html?id=${p.id}" class="product-card">
        <img class="product-card-image" src="${p.image}" alt="${p.name}">
        <div class="product-card-info">
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-meta">${p.shape} &middot; ${p.carat}ct &middot; ${p.color}/${p.clarity}</div>
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
  // Chat setup
  const sendBtn = document.getElementById('chatSend');
  const chatInput = document.getElementById('chatInput');
  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

  // Auto-start conversation
  if (document.getElementById('chatMessages')) {
    setTimeout(() => addMessage("Welcome to The Salon. I am your personal concierge. How may I assist you in finding the perfect stone today?", 'ai'), 800);
  }

  if (document.getElementById('recoGrid')) loadRecommendations();
  if (document.getElementById('listingGrid')) loadListing();
  if (document.getElementById('detailImage')) loadDetail();

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, {opacity:0,y:40}, {opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%'}});
    });
  }
  if (typeof gsap !== 'undefined' && document.querySelector('.salon-hero')) {
    gsap.fromTo('.salon-hero > *', {opacity:0,y:30}, {opacity:1,y:0,duration:1,ease:'power2.out',stagger:0.15});
  }
});
