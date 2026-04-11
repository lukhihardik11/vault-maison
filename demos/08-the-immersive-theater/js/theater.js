// Starfield
const sf=document.getElementById('starfield');
for(let i=0;i<150;i++){const s=document.createElement('div');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.opacity=Math.random()*0.5+0.1;s.style.width=s.style.height=Math.random()*3+1+'px';sf.appendChild(s)}
// Title letter-by-letter reveal
const text='VAULT MAISON';
const container=document.getElementById('titleReveal');
text.split('').forEach((ch,i)=>{const span=document.createElement('span');span.className='letter';span.textContent=ch===' '?'\u00A0':ch;container.appendChild(span);setTimeout(()=>span.classList.add('visible'),200+i*100)});
// GSAP
gsap.from('.hero-text h1',{opacity:0,y:40,duration:1.5,delay:0.5});
gsap.from('.cta',{opacity:0,y:20,duration:1,delay:1})