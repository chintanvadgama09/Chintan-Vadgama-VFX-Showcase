const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const idRegex = /id=["']([^"']+)["']/g;
const htmlIds = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  htmlIds.add(match[1]);
}

const appJs = fs.readFileSync('app.js', 'utf8');
const domRegex = /\$\(['"]#([^'"]+)['"]\)/g;
const jsIds = new Set();
while ((match = domRegex.exec(appJs)) !== null) {
  jsIds.add(match[1]);
}

const missingIds = [];
jsIds.forEach(id => {
  if (!htmlIds.has(id)) {
    missingIds.push(id);
  }
});

console.log(`Total HTML IDs: ${htmlIds.size}`);
console.log(`Total IDs referenced in app.js: ${jsIds.size}`);
console.log(`Missing IDs in HTML: ${JSON.stringify(missingIds)}`);
