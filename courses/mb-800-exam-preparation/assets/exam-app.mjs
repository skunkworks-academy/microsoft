import {VERSION,DOMAIN_LABELS,validateBank,createAttempt,grade,restoreAttempt,isExpired} from './exam-engine.mjs';
const CURRENT='swa.mb800.attempt.v1', HISTORY='swa.mb800.history.v1';
const root=document.getElementById('exam-app');
const el=(tag,text,attrs={})=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
function button(text,fn,secondary=false){const n=el('button',text,{type:'button',class:'bc-button'+(secondary?' bc-button-secondary':'')});n.addEventListener('click',fn);return n;}
function para(text,cls){return el('p',text,cls?{class:cls}:{});}
function actions(...nodes){const n=el('div',undefined,{class:'bc-actions'});n.append(...nodes);return n;}
let bank,attempt=null,pendingAttempt=null,history=[],timer=null,storageOK=true,closing=false;
function read(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch{storageOK=false;return null;}}
function save(){try{if(attempt)localStorage.setItem(CURRENT,JSON.stringify(attempt));else localStorage.removeItem(CURRENT);localStorage.setItem(HISTORY,JSON.stringify(history.slice(0,10)));}catch{storageOK=false;}setStorageNotice();}
function setStorageNotice(){const n=document.getElementById('storage-notice');if(n)n.textContent=storageOK?'Saved only in this browser. Use Clear practice data on a shared device.':'Browser storage is unavailable or full. Keep this page open and export your results before leaving.';}
function heading(text){const n=el('h2',text,{tabindex:'-1'});return n;}
function focusHeading(){const h=root.querySelector('h2');h?.focus({preventScroll:true});h?.scrollIntoView({block:'start',behavior:'instant'});}
function shell(title){root.replaceChildren();const h=heading(title);root.append(h);return root;}
function intro(){
  if(attempt&&!attempt.submittedAt&&isExpired(attempt)){finish(true);return;}
  clearInterval(timer);shell('Choose your practice session');
  root.append(para('These original Academy questions support learning. The public practice bank and answer explanations are inspectable; this is a formative exercise, without proctoring or an official certification score.'));
  root.append(para('Each question is worth one point. Multiple-answer and sequence items require the complete correct response. There is no partial credit and no negative marking.'));
  const cards=el('div',undefined,{class:'bc-grid'});
  for(const[mode,title,description]of [['exam','Timed mock exam','50 questions · 100 minutes · skill-weighted selection. No explanations until you submit. The timer continues if you leave or close this tab.'],['practice','Focused practice','20 questions · untimed · skill-weighted selection. Review all explanations after submission.']]){
    const card=el('section',undefined,{class:'bc-card'});card.append(el('h3',title),para(description),button(mode==='exam'?'Start 100-minute mock':'Start untimed practice',()=>start(mode)));cards.append(card);
  }
  root.append(cards);
  if(attempt&&!attempt.submittedAt){const clock=para('','bc-timer');clock.id='exam-timer';clock.setAttribute('role','timer');clock.setAttribute('aria-label','Current attempt time remaining');root.append(clock,actions(button('Resume current attempt',()=>{renderQuestion();tick();}),button('Discard current attempt',()=>confirmDiscard(),true)));timer=setInterval(tick,1000);tick();}
  root.append(para('The mock uses 11 setup, 16 financials, 6 sales/purchasing setup and 17 operations questions. Microsoft does not publish its live question pool or exact exam length in questions; 50 is this Academy simulation’s design choice.'));
  if(history.length){const section=el('section',undefined,{class:'bc-section'});section.append(el('h3','Your completed attempts on this device'));const list=el('ul');for(const item of history){const score=grade(bank,item);const li=el('li');li.append(button(`${new Date(item.submittedAt).toLocaleString()} · ${score.percent}% · ${item.mode==='exam'?'Timed mock':'Untimed practice'}`,()=>{if(attempt&&!attempt.submittedAt)pendingAttempt=attempt;attempt=item;renderResults();},true));list.append(li);}section.append(list);root.append(section);}
  root.append(actions(button('Clear practice data',()=>{const box=confirmBox('Clear attempts and result history from this browser?',()=>{attempt=null;history=[];save();intro();},()=>intro());root.append(box);box.querySelector('button')?.focus();},true)));
  root.append(para('', 'bc-storage'));root.lastChild.id='storage-notice';setStorageNotice();
}
function confirmBox(message,yes,no){const box=el('section',undefined,{class:'bc-dialog',role:'region','aria-label':'Confirm action'});box.append(para(message),actions(button('Confirm',yes),button('Cancel',no,true)));return box;}
function confirmDiscard(){root.append(confirmBox('Discard your unfinished attempt? Completed attempts remain in history.',()=>{attempt=null;save();intro();},()=>intro()));}
function start(mode){if(attempt&&!attempt.submittedAt){root.append(confirmBox('Starting a new session discards your unfinished attempt. Continue?',()=>{attempt=null;start(mode);},()=>intro()));return;}
  const seed=crypto.getRandomValues(new Uint32Array(1))[0];attempt=createAttempt(bank,mode,seed);save();renderQuestion();tick();focusHeading();
}
function expired(){if(!attempt||attempt.submittedAt)return false;if(isExpired(attempt)){finish(true);return true;}return false;}
function current(){return bank.find(q=>q.id===attempt.questionIds[attempt.index]);}
function persistAnswer(q,value){if(expired())return;attempt.answers[q.id]=value;save();updateMap();}
function updateMap(){
  root.querySelectorAll('[data-qid]').forEach(b=>{const id=b.dataset.qid,answered=Boolean(attempt.answers[id]?.length),flagged=attempt.flagged.includes(id);b.dataset.answered=answered;b.dataset.flagged=flagged;b.setAttribute('aria-label',`Question ${Number(b.textContent)}${answered?', answered':', unanswered'}${flagged?', flagged':''}`);});
  const status=document.getElementById('answer-count');if(status)status.textContent=`${Object.values(attempt.answers).filter(a=>a.length).length} answered of ${attempt.questionIds.length}. ${attempt.flagged.length} flagged.`;
}
function renderQuestion(){
  if(expired())return;clearInterval(timer);timer=setInterval(tick,1000);const q=current();shell(`Question ${attempt.index+1} of ${attempt.questionIds.length}`);
  const layout=el('div',undefined,{class:'bc-exam-grid'}),main=el('div'),aside=el('aside',undefined,{class:'bc-card','aria-label':'Attempt navigation'});
  main.append(para(DOMAIN_LABELS[q.domain]+' · '+q.objective,'bc-muted'));
  if(q.caseStudy){const c=el('section',undefined,{class:'bc-case','aria-label':'Case study context'});c.append(el('h3',q.caseStudy.title),para(q.caseStudy.scenario));main.append(c);}
  const field=el('fieldset'),legend=el('legend',q.stem);field.append(legend);
  const instructions=q.type==='multiple'?`Select exactly ${q.correct.length} answers.`:q.type==='order'?'Put all steps in order using the Up and Down buttons. Then select Confirm sequence.':'Select one answer.';
  field.append(para(instructions,'bc-muted'));
  if(q.type==='order')renderOrder(field,q);
  else for(const id of attempt.optionOrder[q.id]){
    const option=q.options.find(o=>o.id===id),label=el('label',undefined,{class:'bc-option'}),input=el('input',undefined,{type:q.type==='single'?'radio':'checkbox',name:'answer',value:id});input.checked=Boolean(attempt.answers[q.id]?.includes(id));
    input.addEventListener('change',()=>{const selected=[...field.querySelectorAll('input:checked')].map(n=>n.value);persistAnswer(q,selected);});label.append(input,el('span',option.text));field.append(label);
  }
  main.append(field);
  const flagged=attempt.flagged.includes(q.id),flag=button(flagged?'Flagged · Remove flag':'Flag for review',()=>{if(expired())return;attempt.flagged=flagged?attempt.flagged.filter(id=>id!==q.id):[...attempt.flagged,q.id];save();renderQuestion();},true);flag.setAttribute('aria-pressed',String(flagged));
  const prev=button('Previous question',()=>navigate(attempt.index-1),true);prev.disabled=attempt.index===0;
  const next=button(attempt.index===attempt.questionIds.length-1?'Review before submitting':'Next question',()=>attempt.index===attempt.questionIds.length-1?review():navigate(attempt.index+1));
  main.append(actions(prev,next),actions(flag,button('Clear answer',()=>{if(expired())return;delete attempt.answers[q.id];save();renderQuestion();},true)));
  const clock=para('','bc-timer');clock.id='exam-timer';clock.setAttribute('role','timer');clock.setAttribute('aria-label','Time remaining');aside.append(clock);
  const announce=para('','bc-status');announce.id='timer-announcement';announce.setAttribute('aria-live','polite');aside.append(announce);
  const status=para('','bc-status');status.id='answer-count';aside.append(status,el('h3','Question navigator'));
  const map=el('div',undefined,{class:'bc-map'});attempt.questionIds.forEach((id,i)=>{const b=button(String(i+1),()=>navigate(i),true);b.className='';b.dataset.qid=id;if(i===attempt.index)b.setAttribute('aria-current','true');map.append(b);});aside.append(map,para('Bold: answered. Underline: flagged.','bc-muted'),actions(button('Review and submit',review),button('Practice centre',intro,true)));
  layout.append(main,aside);root.append(layout,para('','bc-storage'));root.lastChild.id='storage-notice';updateMap();setStorageNotice();tick();
}
function renderOrder(field,q){
  let order=[...(attempt.answers[q.id]||attempt.optionOrder[q.id])];
  const list=el('ol',undefined,{class:'bc-order'}),status=para(attempt.answers[q.id]?'Sequence confirmed. Changes are saved automatically.':'Move a step to save your answer, or confirm the displayed sequence.','bc-status');status.setAttribute('aria-live','polite');
  function draw(focusId,direction){list.replaceChildren();order.forEach((id,i)=>{const li=el('li');li.append(el('span',`${i+1}. ${q.options.find(o=>o.id===id).text}`));for(const[dir,delta]of [['Up',-1],['Down',1]]){const b=el('button',dir,{type:'button','aria-label':`${dir}: ${q.options.find(o=>o.id===id).text}`});b.disabled=i+delta<0||i+delta>=order.length;b.dataset.optionId=id;b.dataset.direction=dir;b.addEventListener('click',()=>{if(expired())return;[order[i],order[i+delta]]=[order[i+delta],order[i]];persistAnswer(q,[...order]);status.textContent='Sequence saved.';draw(id,dir);});li.append(b);}list.append(li);});if(focusId){const b=[...list.querySelectorAll('button')].find(b=>b.dataset.optionId===focusId&&b.dataset.direction===direction);if(b&&!b.disabled)b.focus();else list.querySelector('button:not(:disabled)')?.focus();}}
  draw();field.append(list,button('Confirm sequence',()=>{persistAnswer(q,[...order]);status.textContent='Sequence confirmed and saved.';},true),status);
}
function navigate(index){if(expired())return;attempt.index=index;save();renderQuestion();focusHeading();}
function tick(){if(expired())return;const clock=document.getElementById('exam-timer');if(!clock)return;if(!attempt.deadline){clock.textContent='Untimed practice';return;}
  const seconds=Math.max(0,Math.ceil((attempt.deadline-Date.now())/1000));clock.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} remaining`;
  if(seconds<=600){const n=document.getElementById('timer-announcement');if(n&&!n.textContent)n.textContent='Less than 10 minutes remain. Use Review and submit to check unanswered questions.';}
}
function review(){if(expired())return;shell('Review your attempt');const total=attempt.questionIds.length,answered=Object.values(attempt.answers).filter(a=>a.length).length;root.append(para(`${answered} of ${total} answered. ${total-answered} unanswered. ${attempt.flagged.length} flagged. No answers are revealed until submission.`));
  const clock=para('','bc-timer');clock.id='exam-timer';clock.setAttribute('role','timer');clock.setAttribute('aria-label','Time remaining');root.append(clock);tick();
  const list=el('ol');attempt.questionIds.forEach((id,i)=>{const item=el('li');const state=(attempt.answers[id]?.length?'Answered':'Unanswered')+(attempt.flagged.includes(id)?' · Flagged':'');item.append(button(`Question ${i+1} · ${state}`,()=>navigate(i),true));list.append(item);});
  root.append(actions(button('Submit and see results',()=>{if(expired())return;const box=confirmBox(`Submit ${total} questions with ${total-answered} unanswered? Your answers will be locked.`,()=>finish(false),review);root.prepend(box);box.querySelector('button').focus();}),button('Return to question',renderQuestion,true)),list);focusHeading();
}
function finish(timeout){if(!attempt||attempt.submittedAt||closing)return;closing=true;attempt.submittedAt=Date.now();attempt.timedOut=Boolean(timeout);history=[attempt,...history.filter(x=>x.id!==attempt.id)].slice(0,10);save();clearInterval(timer);renderResults();closing=false;focusHeading();}
function exportReport(){const report={courseId:'MB-800-PREP',bankVersion:VERSION,notice:'Academy formative practice. Raw percentage, not a Microsoft scaled score. Public original question bank. No certification award.',attempt,result:grade(bank,attempt)};const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),a=el('a',undefined,{href:url,download:`MB-800-practice-${attempt.id}.json`});document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function renderResults(){
  clearInterval(timer);const result=grade(bank,attempt);shell('Your practice results');root.append(para(`${result.percent}%`,'bc-result-score'),para(`${result.correct} correct of ${result.total}. ${result.unanswered} unanswered. ${attempt.timedOut?'Time expired and the attempt was submitted automatically.':'Submitted '+new Date(attempt.submittedAt).toLocaleString()+'.'}`));
  root.append(para(result.percent>=80?'You met the Academy practice benchmark of 80%. Use the domain review and labs to confirm practical understanding before booking.':'Your next step is targeted revision. Revisit the weakest domains and complete the linked labs before another timed attempt.','bc-callout'));
  root.append(para('This raw percentage does not translate to Microsoft’s scaled score of 700. The Academy benchmark is a study aid and does not predict an exam result.'));
  const table=el('table'),thead=el('thead'),row=el('tr');for(const label of ['Skill area','Result','Revision'])row.append(el('th',label,{scope:'col'}));thead.append(row);table.append(thead);const body=el('tbody');
  const moduleMap={setup:'module-01-foundations',financials:'module-03-financial-setup',trade:'module-05-trade-configuration',operations:'module-06-sales-purchasing'};
  for(const[id,s]of Object.entries(result.domains)){const tr=el('tr');tr.append(el('th',DOMAIN_LABELS[id],{scope:'row'}),el('td',`${s.correct}/${s.total} (${Math.round(s.correct/s.total*100)}%)`));const td=el('td');td.append(el('a','Revisit this skill area',{href:`../${moduleMap[id]}/`}));tr.append(td);body.append(tr);}table.append(body);const scroll=el('div',undefined,{class:'bc-table-scroll',tabindex:'0','aria-label':'Domain results'});scroll.append(table);root.append(scroll);
  root.append(actions(button('Export results (JSON)',exportReport),button('Print review',()=>window.print(),true),button(pendingAttempt?'Return to current session':'Choose another session',()=>{const latest=restoreAttempt(read(CURRENT),bank);attempt=latest&&!latest.submittedAt?latest:null;pendingAttempt=null;intro();focusHeading();},true)));
  const filterWrap=el('div',undefined,{class:'bc-review-filter'}),label=el('label','Review questions',{for:'review-filter'}),filter=el('select',undefined,{id:'review-filter'});for(const[value,text]of [['all','All questions'],['incorrect','Incorrect and unanswered'],['flagged','Flagged questions'],['unanswered','Unanswered questions']])filter.append(el('option',text,{value}));filterWrap.append(label,filter);root.append(filterWrap);
  const reviewRoot=el('section',undefined,{'aria-label':'Answer explanations'});root.append(reviewRoot);
  function draw(){reviewRoot.replaceChildren();const items=result.items.filter(x=>filter.value==='all'||filter.value==='incorrect'&&!x.correct||filter.value==='flagged'&&x.flagged||filter.value==='unanswered'&&x.unanswered);if(!items.length)reviewRoot.append(para('No questions match this filter.'));for(const item of items){const q=bank.find(q=>q.id===item.id),article=el('article',undefined,{class:'bc-review-item'});article.append(el('h3',`Question ${attempt.questionIds.indexOf(q.id)+1} · ${item.correct?'Correct':item.unanswered?'Unanswered':'Incorrect'}`));if(q.caseStudy)article.append(para(q.caseStudy.title+': '+q.caseStudy.scenario,'bc-case'));article.append(para(q.stem));const text=ids=>ids.length?ids.map(id=>q.options.find(o=>o.id===id).text).join(q.type==='order'?' → ':'; '):'No answer';article.append(para('Your answer: '+text(item.answer)),para('Correct answer: '+text(q.correct),'bc-correct'),para(q.rationale,'bc-feedback'));const list=el('ul');for(const option of q.options)list.append(el('li',option.text+' — '+q.distractors[option.id]));article.append(list,el('a','Revise the related module',{href:`../${q.module}/`}),document.createTextNode(' · '),el('a',q.source.title,{href:q.source.url,target:'_blank',rel:'noopener noreferrer'}));reviewRoot.append(article);}}
  filter.addEventListener('change',draw);draw();root.append(para('','bc-storage'));root.lastChild.id='storage-notice';setStorageNotice();
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&attempt&&!attempt.submittedAt)tick();});
window.addEventListener('storage',event=>{if(event.key===CURRENT&&attempt&&!attempt.submittedAt){clearInterval(timer);root.replaceChildren(heading('This attempt changed in another tab'),para('Reload to continue with the latest saved attempt. Use one active tab for practice.'),button('Reload saved attempt',()=>location.reload()));attempt=null;}});
try{
  const response=await fetch(new URL('./questions.json',import.meta.url),{cache:'no-cache'});if(!response.ok)throw new Error('Question bank could not be loaded');bank=validateBank(await response.json());
  attempt=restoreAttempt(read(CURRENT),bank);const savedHistory=read(HISTORY);history=Array.isArray(savedHistory)?savedHistory.map(x=>restoreAttempt(x,bank)).filter(x=>x?.submittedAt).slice(0,10):[];
  if(attempt?.submittedAt)renderResults();else if(attempt){renderQuestion();tick();}else intro();
}catch(error){root.replaceChildren(heading('Practice could not load'),para('Reload this page to try again. Your saved browser data has not been deleted.'),para(error.message),el('a','Return to the study guide',{href:'../'}));}
