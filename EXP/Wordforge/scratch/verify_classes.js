const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const classRegex = /class=["']([^"']+)["']/g;
let match;
const allClasses = new Set();
while ((match = classRegex.exec(html)) !== null) {
  match[1].split(/\s+/).forEach(c => {
    if (c.trim()) allClasses.add(c.trim());
  });
}

const css = fs.readFileSync('styles.css', 'utf8');
const missing = [];
allClasses.forEach(c => {
  if (!css.includes(`.${c}`)) {
    missing.push(c);
  }
});

console.log(`Total HTML classes: ${allClasses.size}`);
console.log(`Classes not found in styles.css: ${JSON.stringify(missing)}`);
