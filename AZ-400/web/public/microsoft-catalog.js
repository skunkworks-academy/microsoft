(() => {
  const endpoint = "https://learn.microsoft.com/api/catalog/?locale=en-us";
  const pageSize = 24;
  const starter = [
    ["Microsoft Azure learning paths","Learning path",["Beginner","Intermediate","Advanced"],["Azure"],"Cloud fundamentals, administration, architecture, networking, governance and operations.","https://learn.microsoft.com/training/azure/"],
    ["Azure fundamentals","Certification pathway",["Beginner"],["Azure"],"Foundational cloud concepts, Azure services, management, governance and security.","https://learn.microsoft.com/credentials/certifications/azure-fundamentals/"],
    ["Azure administrator","Certification pathway",["Intermediate"],["Azure"],"Administration skills for identity, governance, storage, compute, networking and monitoring.","https://learn.microsoft.com/credentials/certifications/azure-administrator/"],
    ["Microsoft Security learning","Learning path",["Beginner","Intermediate","Advanced"],["Security","Microsoft Entra","Microsoft Defender","Microsoft Sentinel"],"Security, identity, compliance, threat protection, SIEM, XDR and Zero Trust learning.","https://learn.microsoft.com/training/topics/security"],
    ["Microsoft 365 learning","Learning path",["Beginner","Intermediate"],["Microsoft 365"],"Modern work, collaboration, administration, endpoint and productivity learning.","https://learn.microsoft.com/training/m365/"],
    ["Microsoft Copilot learning","Learning path",["Beginner","Intermediate"],["Microsoft Copilot","Microsoft 365"],"Practical AI fluency and adoption skills for Microsoft Copilot experiences.","https://learn.microsoft.com/training/browse/?terms=copilot"],
    ["Microsoft Power Platform learning","Learning path",["Beginner","Intermediate","Advanced"],["Power Platform"],"Low-code apps, workflow automation, analytics, agents and business process solutions.","https://learn.microsoft.com/training/powerplatform/"],
    ["Power BI learning","Learning path",["Beginner","Intermediate","Advanced"],["Power BI","Power Platform"],"Data modelling, analytics, visualization, DAX and business intelligence.","https://learn.microsoft.com/training/powerplatform/power-bi"],
    ["Azure AI learning","Learning path",["Beginner","Intermediate","Advanced"],["Azure AI","AI"],"Generative AI, Azure AI services, machine learning and responsible AI.","https://learn.microsoft.com/training/azure/ai"],
    ["Microsoft Fabric learning","Learning path",["Beginner","Intermediate","Advanced"],["Microsoft Fabric","Data"],"Analytics, lakehouse, data engineering, data science, warehousing and BI.","https://learn.microsoft.com/training/browse/?products=fabric"],
    ["GitHub learning","Learning path",["Beginner","Intermediate"],["GitHub","DevOps"],"Source control, collaboration, GitHub Actions, security, Copilot and developer workflows.","https://learn.microsoft.com/training/github/"],
    ["Azure DevOps learning","Learning path",["Intermediate","Advanced"],["Azure DevOps","DevOps"],"Plan, build, test, release and operate software with Azure DevOps.","https://learn.microsoft.com/training/browse/?products=azure-devops"],
    ["Dynamics 365 learning","Learning path",["Beginner","Intermediate","Advanced"],["Dynamics 365"],"Role-based learning for customer engagement, finance, supply chain and business applications.","https://learn.microsoft.com/training/dynamics365/"],
    ["Windows Server learning","Learning path",["Beginner","Intermediate","Advanced"],["Windows Server","Hybrid"],"Administration, identity, networking, storage, security and hybrid infrastructure.","https://learn.microsoft.com/training/browse/?products=windows-server"],
    ["PowerShell learning","Learning path",["Beginner","Intermediate"],["PowerShell","Windows Server","Azure"],"Automation and administration across Windows, Azure and Microsoft 365.","https://learn.microsoft.com/training/browse/?terms=powershell"],
    ["Microsoft Applied Skills","Applied Skill",["Intermediate"],["Microsoft Applied Skills"],"Scenario-based credentials that validate targeted practical Microsoft skills.","https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"]
  ].map((x,i)=>({id:`starter-${i}`,title:x[0],type:x[1],level:x[2],products:x[3],summary:x[4],url:x[5],duration:0,popularity:0}));

  const $ = id => document.getElementById(id);
  const els = {grid:$("catalogGrid"),search:$("catalogSearch"),type:$("typeFilter"),level:$("levelFilter"),product:$("productFilter"),sort:$("sortFilter"),status:$("catalogStatus"),badge:$("catalogSourceBadge"),load:$("loadLiveCatalog"),clear:$("clearFilters"),more:$("showMore")};
  if (!els.grid) return;
  let all = starter, filtered = [], visible = pageSize, live = false, loading = false;

  const arr = v => !v ? [] : Array.isArray(v) ? v.filter(Boolean).map(String) : [String(v)];
  const esc = v => String(v ?? "").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const niceType = key => ({modules:"Module",units:"Unit",learningpaths:"Learning path",learningPaths:"Learning path",certifications:"Certification",exams:"Exam",courses:"Instructor-led course",appliedskills:"Applied Skill",appliedSkills:"Applied Skill"}[key] || String(key).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/[-_]/g," "));
  const normalize = (item,key,index) => ({
    id:item.uid||item.id||`${key}-${index}`,
    title:item.title||item.name||"Microsoft Learn content",
    type:niceType(key),
    level:arr(item.levels||item.level||item.level_names),
    products:arr(item.products||item.product),
    summary:String(item.summary||item.description||item.subtitle||item.short_description||"Microsoft Learn content.").replace(/\s+/g," ").trim().slice(0,240),
    url:item.url||item.link||item.web_url||item.learn_url||"https://learn.microsoft.com/training/",
    duration:Number(item.duration_in_minutes||item.durationInMinutes||item.duration||0),
    popularity:Number(item.popularity||0)
  });
  const flatten = payload => Object.entries(payload||{}).flatMap(([key,value])=>Array.isArray(value)?value.filter(x=>x&&typeof x==="object").map((x,i)=>normalize(x,key,i)):[]);
  const unique = values => [...new Set(values.filter(Boolean).map(String))].sort((a,b)=>a.localeCompare(b));
  const fill = (select,values,label) => { const current=select.value; select.innerHTML=`<option value="">${label}</option>`+values.map(v=>`<option value="${esc(v)}">${esc(v)}</option>`).join(""); if([...select.options].some(o=>o.value===current)) select.value=current; };
  const hydrate = () => { fill(els.type,unique(all.map(x=>x.type)),"All content"); fill(els.level,unique(all.flatMap(x=>x.level)),"All levels"); fill(els.product,unique(all.flatMap(x=>x.products)).slice(0,250),"All products"); };
  const terms = () => els.search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const haystack = item => [item.title,item.type,item.summary,...item.level,...item.products].join(" ").toLowerCase();
  const score = (item,ts) => ts.reduce((n,t)=>n+(item.title.toLowerCase().includes(t)?8:0)+(item.products.join(" ").toLowerCase().includes(t)?5:0)+(haystack(item).includes(t)?2:0),0)+(item.popularity||0);
  const duration = n => !n ? "" : n<60 ? `${n} min` : `${Math.floor(n/60)}h${n%60?` ${n%60}m`:""}`;
  const card = item => `<article class="catalog-card"><div class="catalog-card-top"><span class="catalog-type">${esc(item.type)}</span><span class="catalog-duration">${esc(duration(item.duration))}</span></div><h3>${esc(item.title)}</h3><p>${esc(item.summary)}</p><div class="tag-row">${[...item.level.slice(0,1),...item.products.slice(0,2)].map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div><a href="${esc(item.url)}" target="_blank" rel="noopener">Open learning content <span>↗</span></a></article>`;

  function render(){ const shown=filtered.slice(0,visible); els.grid.innerHTML=shown.length?shown.map(card).join(""):`<div class="empty-state"><strong>No matching catalog items.</strong><br>Try a broader search or clear the filters.</div>`; els.status.textContent=`${filtered.length.toLocaleString()} result${filtered.length===1?"":"s"} in the ${live?"Microsoft Learn live catalog":"starter catalog"}.`; els.more.hidden=visible>=filtered.length; }
  function apply(reset=true){ const ts=terms(),type=els.type.value,level=els.level.value,product=els.product.value; filtered=all.filter(item=>{const h=haystack(item);return (!ts.length||ts.every(t=>h.includes(t)))&&(!type||item.type===type)&&(!level||item.level.includes(level))&&(!product||item.products.includes(product));}); if(els.sort.value==="title") filtered.sort((a,b)=>a.title.localeCompare(b.title)); else if(els.sort.value==="duration") filtered.sort((a,b)=>(a.duration||999999)-(b.duration||999999)); else filtered.sort((a,b)=>score(b,ts)-score(a,ts)||a.title.localeCompare(b.title)); if(reset) visible=pageSize; render(); }

  async function loadLive(){ if(loading||live) return; loading=true; els.load.disabled=true; els.load.textContent="Loading catalog…"; els.status.textContent="Connecting to Microsoft Learn catalog data…"; try{ const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),20000); const res=await fetch(endpoint,{headers:{Accept:"application/json"},signal:controller.signal,mode:"cors"}); clearTimeout(timer); if(!res.ok) throw new Error(`HTTP ${res.status}`); const items=flatten(await res.json()); if(items.length<10) throw new Error("Unexpected catalog response"); const seen=new Set(); all=items.filter(i=>{const k=`${i.id}|${i.title}|${i.type}`;if(seen.has(k))return false;seen.add(k);return true;}); live=true; els.badge.textContent="Microsoft Learn live"; els.badge.classList.add("live"); els.load.textContent="Catalog loaded"; hydrate(); apply(); }catch(err){ els.load.disabled=false; els.load.textContent="Retry Microsoft Learn catalog"; els.badge.textContent="Starter catalog — live API unavailable"; els.badge.classList.add("warn"); els.status.textContent="Live Microsoft Learn catalog could not be loaded in this browser. The starter catalog remains searchable."; console.warn(err); }finally{loading=false;} }

  [els.search,els.type,els.level,els.product,els.sort].forEach(c=>c.addEventListener(c===els.search?"input":"change",()=>apply()));
  els.clear.addEventListener("click",()=>{els.search.value="";els.type.value="";els.level.value="";els.product.value="";els.sort.value="relevance";apply();});
  els.load.addEventListener("click",loadLive);
  els.more.addEventListener("click",()=>{visible+=pageSize;render();});
  document.querySelectorAll("[data-seed]").forEach(a=>a.addEventListener("click",()=>{els.search.value=a.dataset.seed||"";apply();}));
  hydrate(); apply();
})();
