const KEY='swa.mb800.modules.v1';
const notice=document.getElementById('progress-notice');
let done=[];
try{const saved=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(saved))done=saved.filter(x=>typeof x==='string');}catch{if(notice)notice.textContent='Progress storage is unavailable. You can still read every module.';}
const button=document.querySelector('[data-complete-module]');
function render(){
  if(button){const marked=done.includes(button.dataset.completeModule);button.textContent=marked?'Marked complete · Undo':'Mark this module complete';button.setAttribute('aria-pressed',String(marked));}
  document.querySelectorAll('[data-module-slug]').forEach(el=>{const label=el.querySelector('[data-module-state]');if(label)label.textContent=done.includes(el.dataset.moduleSlug)?'Completed':'To study';});
  const progress=document.getElementById('module-progress');if(progress)progress.value=done.length;
  const count=document.getElementById('module-count');if(count)count.textContent=`${done.length} of 8 modules marked complete`;
}
button?.addEventListener('click',()=>{const slug=button.dataset.completeModule;done=done.includes(slug)?done.filter(x=>x!==slug):[...done,slug];try{localStorage.setItem(KEY,JSON.stringify(done));}catch{if(notice)notice.textContent='Could not save progress on this device.';}render();});
document.getElementById('clear-progress')?.addEventListener('click',()=>{done=[];try{localStorage.removeItem(KEY);}catch{}render();if(notice)notice.textContent='Module progress cleared on this device.';});
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
render();
