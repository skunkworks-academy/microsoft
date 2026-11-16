export const VERSION = '2026.11.16.1';
export const DOMAIN_LABELS = Object.freeze({setup:'Set up Business Central',financials:'Configure financials',trade:'Configure sales and purchasing',operations:'Perform Business Central operations'});
export const BLUEPRINTS = Object.freeze({exam:{setup:11,financials:16,trade:6,operations:17},practice:{setup:4,financials:7,trade:2,operations:7}});
export function random(seed) {
  let n = seed >>> 0;
  return () => { n += 0x6D2B79F5; let t = n; t = Math.imul(t ^ t >>> 15,t | 1); t ^= t + Math.imul(t ^ t >>> 7,t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function shuffle(items, rng) {
  const result = [...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
export function validateBank(bank) {
  if (!Array.isArray(bank) || bank.length < 100) throw new Error('Practice bank needs at least 100 questions.');
  const ids = new Set();
  for(const q of bank){
    if(ids.has(q.id)||!q.id||!DOMAIN_LABELS[q.domain]||!['single','multiple','order'].includes(q.type)) throw new Error('Invalid or duplicate question: '+q.id);
    ids.add(q.id);
    const opts = q.options?.map(o=>o.id);
    if(!opts||opts.length<3||new Set(opts).size!==opts.length||!q.correct?.length||new Set(q.correct).size!==q.correct.length||q.correct.some(id=>!opts.includes(id))) throw new Error('Invalid answers: '+q.id);
    if(q.type==='single'&&q.correct.length!==1 || q.type==='order'&&q.correct.length!==opts.length || q.type==='multiple'&&(q.correct.length<2||q.correct.length>=opts.length)) throw new Error('Invalid cardinality: '+q.id);
    if(!q.stem||!q.objective||!q.rationale||!q.module||!q.source?.url?.startsWith('https://learn.microsoft.com/')||opts.some(id=>!q.distractors?.[id])) throw new Error('Missing feedback/source: '+q.id);
  }
  return bank;
}
export function createAttempt(bank,mode='exam',seed=1,now=Date.now()) {
  if(!BLUEPRINTS[mode]) throw new Error('Unknown practice mode');
  const rng = random(seed);
  const chosen = Object.entries(BLUEPRINTS[mode]).flatMap(([domain,count])=>{
    const pool=bank.filter(q=>q.domain===domain);
    if(pool.length<count)throw new Error('Insufficient questions for '+domain);
    return shuffle(pool,rng).slice(0,count);
  });
  const questions=shuffle(chosen,rng);
  return {version:VERSION,id:`${now}-${seed>>>0}`,seed:seed>>>0,mode,startedAt:now,deadline:mode==='exam'?now+100*60000:null,questionIds:questions.map(q=>q.id),optionOrder:Object.fromEntries(questions.map(q=>[q.id,shuffle(q.options.map(o=>o.id),rng)])),answers:{},flagged:[],index:0,submittedAt:null};
}
export function isExpired(attempt, now=Date.now()){return attempt.deadline!==null && now>=attempt.deadline;}
export function isCorrect(question, selected=[]) {
  if(selected.length!==question.correct.length)return false;
  return question.type==='order'?selected.every((id,i)=>id===question.correct[i]):question.correct.every(id=>selected.includes(id));
}
export function grade(bank,attempt) {
  const map=new Map(bank.map(q=>[q.id,q]));
  const domains=Object.fromEntries(Object.keys(DOMAIN_LABELS).map(id=>[id,{total:0,correct:0}]));
  const items=attempt.questionIds.map(id=>{
    const q=map.get(id); if(!q)throw new Error('Unknown question');
    const answer=attempt.answers[id]||[], correct=isCorrect(q,answer);
    domains[q.domain].total++; if(correct)domains[q.domain].correct++;
    return {id,correct,answer,unanswered:answer.length===0,flagged:attempt.flagged.includes(id)};
  });
  const correct=items.filter(x=>x.correct).length;
  return {total:items.length,correct,percent:Math.round(correct/items.length*100),unanswered:items.filter(x=>x.unanswered).length,domains,items};
}
export function restoreAttempt(value,bank) {
  if(!value||value.version!==VERSION||!BLUEPRINTS[value.mode]||typeof value.id!=='string'||!Number.isSafeInteger(value.seed)||!Number.isFinite(value.startedAt))return null;
  const expected=createAttempt(bank,value.mode,value.seed,value.startedAt);
  if(JSON.stringify(expected.questionIds)!==JSON.stringify(value.questionIds)||JSON.stringify(expected.optionOrder)!==JSON.stringify(value.optionOrder)||value.deadline!==expected.deadline)return null;
  if(!Number.isInteger(value.index)||value.index<0||value.index>=value.questionIds.length||!Array.isArray(value.flagged)||new Set(value.flagged).size!==value.flagged.length||value.flagged.some(id=>!value.questionIds.includes(id))||typeof value.answers!=='object'||!value.answers)return null;
  if(value.submittedAt!==null&&(!Number.isFinite(value.submittedAt)||value.submittedAt<value.startedAt))return null;
  for(const [id,ans] of Object.entries(value.answers)){
    const q=bank.find(q=>q.id===id);
    if(!q||!value.questionIds.includes(id)||!Array.isArray(ans)||new Set(ans).size!==ans.length||ans.some(v=>!q.options.some(o=>o.id===v))||q.type==='single'&&ans.length>1||q.type==='order'&&ans.length!==q.options.length)return null;
  }
  return value;
}
