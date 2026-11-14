const fs = require('fs');

const sg = fs.readFileSync('style-guide.css', 'utf8');
const styles = fs.readFileSync('styles.css', 'utf8');

const varMatches = styles.match(/var\(--([a-zA-Z0-9_-]+)\)/g) || [];
const usedVars = new Set(varMatches.map(v => v.replace(/var\(|\)/g, '')));

const definedVars = new Set();
const defMatches = sg.match(/--([a-zA-Z0-9_-]+)\s*:/g) || [];
defMatches.forEach(d => {
  definedVars.add(d.replace(/:/g, '').trim());
});

// Also local / runtime variables defined in styles.css or keyframes
const localVars = new Set(['--px', '--py', '--card-padding', '--header-h']);

const missing = [];
usedVars.forEach(v => {
  if (!definedVars.has(v) && !localVars.has(v)) {
    missing.push(v);
  }
});

console.log(`Total CSS vars used: ${usedVars.size}`);
console.log(`Defined in style-guide: ${definedVars.size}`);
console.log(`Undefined vars: ${JSON.stringify(missing)}`);
