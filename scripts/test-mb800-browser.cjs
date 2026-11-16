/* Run with the project's installed browser. Saves screenshots and axe evidence. */
const {createRequire}=require('node:module');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const requireWeb=createRequire(path.resolve(__dirname,'../AZ-400/web/package.json'));
const {chromium}=requireWeb('@playwright/test');
const axePath=requireWeb.resolve('axe-core/axe.min.js');
const base=(process.env.MB800_TEST_ORIGIN||'http://127.0.0.1:4173').replace(/\/$/,'');
const route='/courses/mb-800-exam-preparation/';
const modules=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../courses/mb-800-exam-preparation/content/modules.json')));
const evidence=path.resolve(__dirname,'../test-results/mb800');fs.mkdirSync(evidence,{recursive:true});
(async()=>{
  const browser=await chromium.launch({headless:true});let page;const report=[];
  try{
    for(const width of [390,768,1440])for(const theme of ['light','dark']){
      const context=await browser.newContext({viewport:{width,height:1000},colorScheme:theme});
      await context.addInitScript(mode=>localStorage.setItem('swa-theme',mode),theme);page=await context.newPage();
      for(const slug of ['',...modules.map(m=>m.slug+'/'),'study-plan/','mock-exam/']){
        const errors=[];page.on('pageerror',e=>errors.push(e.message));const response=await page.goto(base+route+slug);
        assert(response.ok(),slug+' HTTP');await page.locator('.swa-global-nav').waitFor();await page.locator('.swa-global-footer').waitFor();
        assert.equal(await page.locator('.swa-global-nav').count(),1);assert.equal(await page.locator('.swa-global-footer').count(),1);
        assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').count(),1);
        assert(await page.locator('a[href*="course-registration/?course=MB-800-PREP"]').count()>0);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Horizontal overflow '+slug);
        await page.addScriptTag({path:axePath});const result=await page.evaluate(()=>axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
        report.push({width,theme,slug,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary,checks:n.any.map(c=>({id:c.id,data:c.data}))}))}))});
        if(result.violations.length)await page.screenshot({path:path.join(evidence,`failure-${width}-${theme}-${slug.replaceAll('/','')||'overview'}.png`),fullPage:true});
        assert.equal(result.violations.length,0,JSON.stringify(report.at(-1)));
        assert.deepEqual(errors,[],'Page script errors '+slug);
        if(!slug||slug==='mock-exam/'||slug===modules[0].slug+'/')await page.screenshot({path:path.join(evidence,`${slug.replaceAll('/','')||'overview'}-${width}-${theme}.png`),fullPage:true});
      }
      await page.goto(base+route+'mock-exam/');await page.getByRole('button',{name:'Start 100-minute mock',exact:true}).click();
      await page.getByRole('heading',{name:'Question 1 of 50',exact:true}).waitFor();assert.match(await page.getByRole('timer').textContent(),/remaining/);
      const inputs=page.locator('fieldset input');if(await inputs.count())await inputs.first().check();else await page.getByRole('button',{name:'Confirm sequence',exact:true}).click();
      await page.getByRole('button',{name:'Flag for review',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Flagged · Remove flag',exact:true}).waitFor();
      await page.getByRole('button',{name:'Review and submit',exact:true}).click();await page.getByRole('timer').waitFor();await page.getByRole('button',{name:'Submit and see results',exact:true}).click();await page.getByRole('button',{name:'Confirm',exact:true}).click();
      await page.getByRole('heading',{name:'Your practice results',exact:true}).waitFor();assert.equal(await page.locator('.bc-review-item').count(),50);
      await page.addScriptTag({path:axePath});const resultsAxe=await page.evaluate(()=>axe.run(document.querySelector('main')));assert.equal(resultsAxe.violations.length,0,JSON.stringify(resultsAxe.violations.map(v=>v.id)));
      await context.close();
    }
    console.log('Verified 66 route/theme/viewport combinations and six complete practice workflows.');
  }finally{fs.writeFileSync(path.join(evidence,'accessibility.json'),JSON.stringify(report,null,2));await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
