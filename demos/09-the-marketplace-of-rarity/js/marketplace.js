// Countdown timer
function updateCountdown(){const now=new Date();const target=new Date(now.getTime()+2*86400000+14*3600000+37*60000);const diff=target-now;const d=Math.floor(diff/86400000);const h=Math.floor((diff%86400000)/3600000);const m=Math.floor((diff%3600000)/60000);const s=Math.floor((diff%60000)/1000);document.getElementById('cdDays').textContent=String(d).padStart(2,'0');document.getElementById('cdHours').textContent=String(h).padStart(2,'0');document.getElementById('cdMins').textContent=String(m).padStart(2,'0');document.getElementById('cdSecs').textContent=String(s).padStart(2,'0')}
setInterval(updateCountdown,1000);
// Load lots
const statuses=['LIVE','UPCOMING','UPCOMING','SOLD','LIVE','UPCOMING','SOLD','UPCOMING','LIVE','UPCOMING','UPCOMING','SOLD'];
fetch('../shared/data/products.json').then(r=>r.json()).then(products=>{
const grid=document.getElementById('lotsGrid');
products.forEach((p,i)=>{
const status=statuses[i%statuses.length];
const badgeClass=status==='LIVE'?'badge-live':status==='SOLD'?'badge-sold':'badge-upcoming';
const card=document.createElement('a');card.href='detail.html?id='+p.id;card.className='lot-card';
card.innerHTML=`<img src="${p.image}" alt="${p.name}"><div class="info"><div class="lot-num">${p.lotNumber}</div><h3>${p.name}</h3><div class="meta">${p.shape} · ${p.carat}ct · $${p.price.toLocaleString()}</div><span class="badge ${badgeClass}">${status}</span></div>`;
grid.appendChild(card)})})