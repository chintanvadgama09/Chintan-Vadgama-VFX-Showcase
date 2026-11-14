const fs = require('fs');

const css = fs.readFileSync('styles.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, i) => {
  if (line.trim().startsWith('/* ====')) {
    console.log(`${i + 1}: ${line.trim()}`);
  }
});
