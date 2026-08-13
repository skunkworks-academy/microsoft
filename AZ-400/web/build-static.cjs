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

console.log('Microsoft learning hub static artifact created at', out);
