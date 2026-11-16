const fs = require('fs');
const path = require('path');

const here = __dirname;
const repoRoot = path.resolve(here, '..', '..');
const out = path.join(here, 'out');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });

for (const name of ['index.html', '404.html', 'robots.txt', 'CNAME']) {
  const source = path.join(repoRoot, name);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(out, name));
}

const rootAssets = path.join(repoRoot, 'assets');
if (fs.existsSync(rootAssets)) {
  fs.cpSync(rootAssets, path.join(out, 'assets'), { recursive: true });
}

const publicDir = path.join(here, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, out, { recursive: true });
}


// Publish the versioned MB-800 HTML snapshot alongside the existing hub.
const mb800 = path.join(repoRoot, 'MB-800');
if (!fs.existsSync(path.join(mb800, 'index.html'))) throw new Error('MB-800 course snapshot is missing');
fs.cpSync(mb800, path.join(out, 'MB-800'), { recursive: true });

// Publish the preparation course without instructor/source-authoring files.
require('child_process').execFileSync(process.execPath,[path.join(repoRoot,'scripts/build-mb800-prep.mjs')],{stdio:'inherit'});
const prep=path.join(repoRoot,'courses/mb-800-exam-preparation');
fs.cpSync(prep,path.join(out,'courses/mb-800-exam-preparation'),{recursive:true,filter:source=>!source.split(path.sep).includes('content')});
// Keep a complete sitemap for the Microsoft host; the course's own canonicals
// and sitemap deliberately point at the primary Academy publication.
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name.endsWith('.html')&&entry.name!=='404.html')pages.push(path.relative(out,p).split(path.sep).join('/'));}}
walk(out);
fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.map(p=>'<url><loc>https://microsoft.skunkworksacademy.com/'+p.replace(/index\.html$/,'')+'</loc></url>').join('')+'</urlset>');

console.log('Microsoft learning hub and MB-800 static artifact created at', out);
