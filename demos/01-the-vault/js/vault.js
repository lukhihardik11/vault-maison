// VAULT DOOR INTERACTION
const overlay = document.getElementById('vaultOverlay');
const mainContent = document.getElementById('mainContent');
const circle = document.querySelector('.vault-circle');
let pressTimer = null;
let isOpen = false;

function openVault() {
  if (isOpen) return;
  isOpen = true;
  overlay.classList.add('hidden');
  setTimeout(() => { mainContent.classList.add('visible'); }, 400);
}

circle.addEventListener('mousedown', () => {
  circle.classList.add('pressing');
  pressTimer = setTimeout(openVault, 1500);
});
circle.addEventListener('mouseup', () => {
  circle.classList.remove('pressing');
  clearTimeout(pressTimer);
});
circle.addEventListener('mouseleave', () => {
  circle.classList.remove('pressing');
  clearTimeout(pressTimer);
});
circle.addEventListener('touchstart', (e) => {
  e.preventDefault();
  circle.classList.add('pressing');
  pressTimer = setTimeout(openVault, 1500);
});
circle.addEventListener('touchend', () => {
  circle.classList.remove('pressing');
  clearTimeout(pressTimer);
});

// LOAD FEATURED PRODUCTS
fetch('../shared/data/products.json')
  .then(r => r.json())
  .then(products => {
    const grid = document.getElementById('featuredGrid');
    const featured = products.slice(0, 3);
    featured.forEach(p => {
      const card = document.createElement('a');
      card.href = 'detail.html?id=' + p.id;
      card.className = 'stone-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <div class="stone-card-info">
          <h4>${p.name}</h4>
          <div class="stone-meta">${p.shape} · ${p.carat}ct · ${p.color} · ${p.clarity}</div>
          <div class="stone-price">$${p.price.toLocaleString()}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  });

// GSAP ANIMATIONS
gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, delay: 0.5 });
gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.8 });
gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 1, delay: 1.1 });
