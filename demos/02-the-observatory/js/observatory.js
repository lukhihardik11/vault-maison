// Spectral bars
const bars=document.getElementById('spectralBars');
for(let i=0;i<60;i++){const b=document.createElement('div');b.className='spectral-bar';b.style.height=Math.random()*100+20+'px';bars.appendChild(b)}
// Animate readouts
function animateValue(id,start,end,dur){const el=document.getElementById(id);if(!el)return;let s=performance.now();const fmt=end>1000?v=>'$'+Math.round(v).toLocaleString():v=>v.toFixed(1);function step(t){const p=Math.min((t-s)/dur,1);el.textContent=end>1000?Math.round(start+(end-start)*p).toLocaleString():(start+(end-start)*p).toFixed(1);if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
animateValue('marketIdx',0,4287.3,2000);animateValue('avgPrice',0,12450,2000);animateValue('stoneCount',0,12,1500);animateValue('clarityScore',0,97.4,2000);
gsap.from('.data-readout',{opacity:0,y:20,stagger:0.15,duration:0.8,delay:0.3});gsap.from('.hero-main',{opacity:0,x:30,duration:1,delay:0.5})