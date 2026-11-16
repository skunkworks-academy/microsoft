import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import {createAttempt} from '../courses/mb-800-exam-preparation/assets/exam-engine.mjs';
const require=createRequire(new URL('../AZ-400/web/package.json',import.meta.url));
const {JSDOM}=require('jsdom');
const bank=JSON.parse(fs.readFileSync(new URL('../courses/mb-800-exam-preparation/content/questions.json',import.meta.url)));
const original={window:global.window,document:global.document,localStorage:global.localStorage,fetch:global.fetch,setInterval:global.setInterval,clearInterval:global.clearInterval};
let dom,serial=0,intervals=new Map(),timerId=0;
async function load(saved={},blockedStorage=false){
  dom?.window.close();intervals.clear();
  dom=new JSDOM('<main><div id="exam-app"></div></main>',{url:'https://www.skunkworksacademy.com/courses/mb-800-exam-preparation/mock-exam/'});
  dom.window.HTMLElement.prototype.scrollIntoView=function(){};
  for(const[key,value]of Object.entries(saved))dom.window.localStorage.setItem(key,value);
  global.window=dom.window;global.document=dom.window.document;global.localStorage=blockedStorage?{getItem(){throw Error('disabled');},setItem(){throw Error('disabled');},removeItem(){throw Error('disabled');}}:dom.window.localStorage;
  global.fetch=async()=>({ok:true,json:async()=>bank});
  global.setInterval=fn=>{const id=++timerId;intervals.set(id,fn);return id;};global.clearInterval=id=>intervals.delete(id);
  await import('../courses/mb-800-exam-preparation/assets/exam-app.mjs?test='+ ++serial);
}
const root=()=>document.getElementById('exam-app');
function click(text){const b=[...root().querySelectorAll('button')].find(b=>b.textContent===text);assert(b,'Missing button '+text);b.click();}
function snapshot(){return Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]));}
after(()=>{dom?.window.close();Object.assign(global,original);});
test('student can start, answer, flag, resume and submit for complete review',async()=>{
  await load();click('Start 100-minute mock');assert.equal(intervals.size,1,'Only one countdown interval');
  assert.match(root().textContent,/Question 1 of 50/);assert.match(document.getElementById('exam-timer').textContent,/100:00/);
  let a=JSON.parse(localStorage.getItem('swa.mb800.attempt.v1')),q=bank.find(q=>q.id===a.questionIds[0]);
  assert(!root().textContent.includes(q.rationale),'No feedback before submission');
  if(q.type==='order')click('Confirm sequence');else{const input=root().querySelector('input');input.checked=true;input.dispatchEvent(new window.Event('change'));}
  click('Flag for review');assert.equal(intervals.size,1);click('Next question');assert.equal(intervals.size,1);
  const saved=snapshot();await load(saved);assert.match(root().textContent,/Question 2 of 50/);
  click('Review and submit');assert(root().querySelector('[role=timer]'),'Countdown remains visible during review');assert.match(root().textContent,/1 of 50 answered/);
  click('Submit and see results');click('Confirm');assert.equal(intervals.size,0);assert.match(root().textContent,/Your practice results/);assert.equal(root().querySelectorAll('.bc-review-item').length,50);assert(root().textContent.includes(q.rationale));
  assert.match(root().textContent,/does not translate to Microsoft/);assert(root().querySelector('a[href*="module-"]'));
  const filter=document.getElementById('review-filter');filter.value='unanswered';filter.dispatchEvent(new window.Event('change'));assert.equal(root().querySelectorAll('.bc-review-item').length,49);
  const completed=snapshot();await load(completed);assert.match(root().textContent,/Your practice results/);
});
test('expired suspended attempt submits automatically before further input',async()=>{
  const a=createAttempt(bank,'exam',123,Date.now()-6000001);await load({'swa.mb800.attempt.v1':JSON.stringify(a)});
  assert.match(root().textContent,/Time expired/);assert.match(root().textContent,/0 correct of 50/);assert.equal(root().querySelectorAll('input').length,0);assert.equal(intervals.size,0);
});
test('sequence and multi selection retain cardinality and explicit learner actions',async()=>{
  const a=createAttempt(bank,'practice',8);const order=bank.find(q=>q.type==='order'&&a.questionIds.includes(q.id));
  assert(order);a.index=a.questionIds.indexOf(order.id);await load({'swa.mb800.attempt.v1':JSON.stringify(a)});
  assert.match(root().textContent,/Move a step to save/);click('Confirm sequence');assert.equal(JSON.parse(localStorage.getItem('swa.mb800.attempt.v1')).answers[order.id].length,order.options.length);
  assert(root().querySelector('button[aria-label^="Down:"]'));root().querySelector('button[aria-label^="Down:"]').click();assert.match(root().textContent,/Sequence saved/);
});
test('blocked storage and corrupt saved data still allow a new practice session',async()=>{
  await load({},true);assert.match(root().textContent,/storage is unavailable/);click('Start untimed practice');assert.match(root().textContent,/Question 1 of 20/);
  await load({'swa.mb800.attempt.v1':'{"bad":true}'});assert.match(root().textContent,/Choose your practice session/);
});
test('multiple-answer controls save the complete selected set',async()=>{
  const a=createAttempt(bank,'practice',8),q=bank.find(q=>q.type==='multiple'&&a.questionIds.includes(q.id));assert(q);a.index=a.questionIds.indexOf(q.id);await load({'swa.mb800.attempt.v1':JSON.stringify(a)});
  for(const id of q.correct){const input=root().querySelector(`input[value="${id}"]`);assert.equal(input.type,'checkbox');input.checked=true;input.dispatchEvent(new window.Event('change'));}
  const saved=JSON.parse(localStorage.getItem('swa.mb800.attempt.v1'));assert.deepEqual([...saved.answers[q.id]].sort(),[...q.correct].sort());assert.match(root().textContent,new RegExp('Select exactly '+q.correct.length+' answers'));
});
test('reviewing history preserves an unfinished attempt',async()=>{
  const old=createAttempt(bank,'practice',1,Date.now()-10000);old.submittedAt=Date.now()-5000;
  const active=createAttempt(bank,'exam',2);await load({'swa.mb800.attempt.v1':JSON.stringify(active),'swa.mb800.history.v1':JSON.stringify([old])});
  click('Practice centre');assert.equal(intervals.size,1);const historyButton=[...root().querySelectorAll('button')].find(b=>b.textContent.includes('0%')&&b.textContent.includes('Untimed practice'));assert(historyButton);historyButton.click();assert.match(root().textContent,/Your practice results/);
  click('Return to current session');assert.match(root().textContent,/Resume current attempt/);assert.equal(JSON.parse(localStorage.getItem('swa.mb800.attempt.v1')).id,active.id);click('Resume current attempt');assert.match(root().textContent,/Question 1 of 50/);
});
test('leaving stale completed results preserves a newer attempt from another tab',async()=>{
  const old=createAttempt(bank,'practice',11,Date.now()-10000);old.submittedAt=Date.now()-5000;await load({'swa.mb800.attempt.v1':JSON.stringify(old),'swa.mb800.history.v1':JSON.stringify([old])});
  const newer=createAttempt(bank,'exam',22);newer.index=4;localStorage.setItem('swa.mb800.attempt.v1',JSON.stringify(newer));
  click('Choose another session');assert.equal(JSON.parse(localStorage.getItem('swa.mb800.attempt.v1')).id,newer.id);click('Resume current attempt');assert.match(root().textContent,/Question 5 of 50/);
});
test('starting a session from stale results preserves another tab’s completed report',async()=>{
  const now=Date.now(),old=createAttempt(bank,'practice',31,now-20000);old.submittedAt=now-15000;
  await load({'swa.mb800.attempt.v1':JSON.stringify(old),'swa.mb800.history.v1':JSON.stringify([old])});
  const newer=createAttempt(bank,'practice',32,now-10000);newer.submittedAt=now-5000;
  // Simulate tab B completing while tab A still displays its older results.
  // Deliberately omit the event: save must read durable state independently.
  localStorage.setItem('swa.mb800.attempt.v1',JSON.stringify(newer));
  localStorage.setItem('swa.mb800.history.v1',JSON.stringify([newer,old]));
  click('Choose another session');click('Start untimed practice');
  assert.deepEqual(JSON.parse(localStorage.getItem('swa.mb800.history.v1')).map(x=>x.id),[newer.id,old.id]);
  click('Practice centre');assert.equal([...root().querySelectorAll('button')].filter(b=>b.textContent.includes('Untimed practice')&&b.textContent.includes('0%')).length,2);
});
test('completion merges latest valid reports by ID and timestamp and retains the newest ten',async()=>{
  const now=Date.now(),active=createAttempt(bank,'practice',40,now-1000);
  await load({'swa.mb800.attempt.v1':JSON.stringify(active)});
  const reports=Array.from({length:12},(_,i)=>{const report=createAttempt(bank,'practice',100+i,now-30000+i*1000);report.submittedAt=now-20000+i*1000;return report;});
  const duplicate=structuredClone(reports[11]);duplicate.submittedAt+=500;
  localStorage.setItem('swa.mb800.history.v1',JSON.stringify([{bad:true},...reports,duplicate]));
  click('Review and submit');click('Submit and see results');click('Confirm');
  const saved=JSON.parse(localStorage.getItem('swa.mb800.history.v1'));
  assert.equal(saved.length,10);assert.equal(new Set(saved.map(x=>x.id)).size,10);assert.equal(saved[0].id,active.id);
  assert.equal(saved.find(x=>x.id===duplicate.id).submittedAt,duplicate.submittedAt);
  assert(saved.every((item,i)=>i===0||saved[i-1].submittedAt>=item.submittedAt));
  assert(!saved.some(x=>x.id===reports[0].id));
});
test('history storage events refresh the practice list and an external clear stays empty',async()=>{
  const now=Date.now(),old=createAttempt(bank,'practice',51,now-20000);old.submittedAt=now-15000;
  await load({'swa.mb800.history.v1':JSON.stringify([old])});
  assert.match(root().textContent,/Your completed attempts on this device/);
  localStorage.removeItem('swa.mb800.history.v1');
  window.dispatchEvent(new window.StorageEvent('storage',{key:'swa.mb800.history.v1',newValue:null}));
  assert(!root().textContent.includes('Your completed attempts on this device'));
  click('Start untimed practice');assert.equal(localStorage.getItem('swa.mb800.history.v1'),null);
});
test('explicit clear removes history and ordinary saves do not resurrect old reports',async()=>{
  const now=Date.now(),old=createAttempt(bank,'practice',61,now-20000);old.submittedAt=now-15000;
  await load({'swa.mb800.history.v1':JSON.stringify([old])});
  click('Clear practice data');click('Confirm');
  assert.equal(localStorage.getItem('swa.mb800.history.v1'),null);assert.equal(localStorage.getItem('swa.mb800.attempt.v1'),null);
  assert(!root().textContent.includes('Your completed attempts on this device'));
  click('Start untimed practice');click('Next question');click('Practice centre');
  assert.equal(localStorage.getItem('swa.mb800.history.v1'),null);
  assert(!root().textContent.includes('Your completed attempts on this device'));
});
