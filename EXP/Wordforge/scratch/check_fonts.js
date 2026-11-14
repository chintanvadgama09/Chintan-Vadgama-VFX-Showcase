const fs = require('fs');
const lines = fs.readFileSync('style-guide.css', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('--f-') || l.includes('font-family')) console.log(`${i+1}: ${l}`);
});
