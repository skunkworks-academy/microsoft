import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {validateBank,BLUEPRINTS} from '../courses/mb-800-exam-preparation/assets/exam-engine.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'courses/mb-800-exam-preparation');
const modules=JSON.parse(fs.readFileSync(path.join(dir,'content/modules.json'),'utf8'));
const bank=validateBank(JSON.parse(fs.readFileSync(path.join(dir,'assets/questions.json'),'utf8')));
assert.equal(modules.length,8);assert.equal(new Set(modules.map(m=>m.slug)).size,8);
assert.deepEqual(bank,JSON.parse(fs.readFileSync(path.join(dir,'content/questions.json'),'utf8')),'Generated question bank drift');
const moduleSlugs=new Set(modules.map(m=>m.slug));
for(const q of bank)assert(moduleSlugs.has(q.module),`Missing remediation module ${q.module}`);
const counts=Object.fromEntries(Object.keys(BLUEPRINTS.exam).map(d=>[d,bank.filter(q=>q.domain===d).length]));
assert.deepEqual(counts,{setup:22,financials:33,trade:12,operations:33});
assert(bank.filter(q=>q.type==='multiple').length>=15);assert(bank.filter(q=>q.type==='order').length>=6);
assert(new Set(bank.filter(q=>q.caseStudy).map(q=>q.caseStudy.id)).size>=2);
for(const m of modules){assert(m.objectives.length>=3&&m.sections.length>=3&&m.lab.steps.length>=4&&m.lab.expected.length>=2&&m.lab.evidence.length>=2&&m.checks.length>=2&&m.sources.length>=2,`Module lacks teaching evidence: ${m.slug}`);for(const section of m.sections)assert(!/<(?:script|iframe|object|embed|form)\b|\bon[a-z]+\s*=|javascript:/i.test(section.html),'Unsafe authored HTML: '+m.slug);}
const routes=['',...moduleSlugs,'study-plan','mock-exam'];
const urls=[];
for(const slug of routes){
  const file=path.join(dir,slug,'index.html'),html=fs.readFileSync(file,'utf8');
  assert.equal((html.match(/<main\b/g)||[]).length,1);
  assert(html.includes('data-swa-owned-course-shell="MB-800-PREP"'));
  assert.equal((html.match(/skunkworks-ui\.js/g)||[]).length,1);
  assert.equal((html.match(/skunkworks-footer\.js/g)||[]).length,1);
  assert(html.includes('academy-brand-theme.css'));assert(html.includes('course-registration/?course=MB-800-PREP'));
  const canonical='https://www.skunkworksacademy.com/courses/mb-800-exam-preparation/'+(slug?slug+'/':'');
  assert(html.includes(`<link rel="canonical" href="${canonical}">`));urls.push(canonical);
  for(const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
    const href=match[1].split(/[?#]/)[0];if(/^(https?:|mailto:|data:)/.test(href))continue;
    const target=path.resolve(path.dirname(file),decodeURIComponent(href));
    assert(target===dir||target.startsWith(dir+'/'),'Local link leaves course: '+href);
    assert(fs.existsSync(target),'Broken local link: '+file+' -> '+href);
  }
}
const sitemap=fs.readFileSync(path.join(dir,'sitemap.xml'),'utf8');for(const url of urls)assert.equal(sitemap.split('<loc>'+url+'</loc>').length-1,1);
assert.equal((sitemap.match(/<loc>/g)||[]).length,11);
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));assert.equal(manifest.courses[0].courseId,'MB-800-PREP');assert.equal(manifest.courses[0].modules.length,8);
const words=modules.reduce((sum,m)=>sum+JSON.stringify(m).replace(/<[^>]*>/g,' ').split(/\s+/).length,0);
console.log(JSON.stringify({pages:routes.length,modules:modules.length,questions:bank.length,domainCounts:counts,questionTypes:Object.fromEntries(['single','multiple','order'].map(t=>[t,bank.filter(q=>q.type===t).length])),approximateContentWords:words,checks:modules.reduce((s,m)=>s+m.checks.length,0)},null,2));
