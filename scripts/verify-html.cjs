const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('index.html')) {
      results.push(file);
    }
  });
  return results;
}

const clientDir = path.resolve(__dirname, '../build/client');
const files = walk(clientDir);

console.log('--- PRERENDERED HTML VERIFICATION ---');
files.forEach((f) => {
  const html = fs.readFileSync(f, 'utf8');
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);
  const metaRobots = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["'](.*?)["']/);
  const jsonLd = html.includes('application/ld+json');
  const rel = f.replace(clientDir, '');
  console.log(`PAGE: ${rel}`);
  console.log(`  H1: ${h1Match ? h1Match[1] : 'MISSING'}`);
  console.log(`  ROBOTS: ${metaRobots ? metaRobots[1] : 'NONE'}`);
  console.log(`  JSON-LD: ${jsonLd ? 'PRESENT' : 'NONE'}`);
});

const robots = fs.readFileSync(path.join(clientDir, 'robots.txt'), 'utf8');
console.log('\n--- ROBOTS.TXT ---');
console.log(robots.trim());

const sitemap = fs.readFileSync(path.join(clientDir, 'sitemap.xml'), 'utf8');
console.log('\n--- SITEMAP.XML ---');
console.log(sitemap.trim());
