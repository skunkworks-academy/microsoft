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

console.log('Microsoft learning hub and MB-800 static artifact created at', out);
