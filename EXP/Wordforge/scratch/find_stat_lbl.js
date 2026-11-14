const fs = require('fs');
const lines = fs.readFileSync('styles.css', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('.stat-lbl')) console.log(`${i+1}: ${l}`);
});
