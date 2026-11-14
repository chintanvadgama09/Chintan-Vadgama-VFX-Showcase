const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('speakWordBtn') || l.includes('speakExamplesBtn') || l.includes('speechSynthesis.speak') || l.includes('stopAllSpeech')) {
    console.log(`${i + 1}: ${l}`);
  }
});
