const msgs=document.getElementById('chatMessages');
const input=document.getElementById('chatInput');
const send=document.getElementById('chatSend');
const responses=['I would recommend exploring our round brilliant collection — they offer the most fire and scintillation.','Our emerald cuts are particularly stunning this season. Shall I show you a few?','For that budget range, I would suggest looking at our 1-2 carat range in VS clarity.','Excellent taste. Let me pull up some options for you. Please visit our collection page.','Each stone comes with full GIA certification and our white-glove delivery service.'];
let ri=0;
function addMsg(text,type){const d=document.createElement('div');d.className='msg '+type;d.innerHTML='<div class="bubble">'+text+'</div>';msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function handleSend(){const t=input.value.trim();if(!t)return;addMsg(t,'user');input.value='';setTimeout(()=>{addMsg(responses[ri%responses.length],'advisor');ri++},800)}
send.addEventListener('click',handleSend);
input.addEventListener('keydown',e=>{if(e.key==='Enter')handleSend()})