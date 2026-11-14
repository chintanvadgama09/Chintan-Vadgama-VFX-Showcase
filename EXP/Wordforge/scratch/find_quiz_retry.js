const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('quizRetryBtn')) console.log(`app.js ${i+1}: ${l}`);
});
const hLines = fs.readFileSync('index.html', 'utf8').split('\n');
hLines.forEach((l, i) => {
  if (l.includes('quizRetry') || l.includes('quiz')) console.log(`index.html ${i+1}: ${l}`);
});
