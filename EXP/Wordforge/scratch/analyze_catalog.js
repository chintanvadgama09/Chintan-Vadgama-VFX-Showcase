const fs = require('fs');

global.window = {};
require('../word-catalog.js');
const cat = global.window.WORD_CATALOG || [];
console.log('Total catalog words:', cat.length);

// Check short words, digits, weird tokens
let under5 = 0;
let properNouns = 0;
let sampleAdvanced = [];

const commonBoring = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'you', 'not', 'are', 'from',
  'beef', 'neil', 'stores', 'side', 'quote', 'cricket', 'passes', 'durham',
  'hats', 'sellers', 'middle', 'young', 'body', 'rates', 'sell', 'story',
  'recent', 'park', 'give', 'memory', 'social', 'options'
]);

cat.forEach(w => {
  if (w.length < 5) under5++;
  if (w.length >= 7 && (w.endsWith('ous') || w.endsWith('tion') || w.endsWith('ity') || w.endsWith('able') || w.endsWith('ance') || w.endsWith('ence') || w.endsWith('ive') || w.endsWith('ate') || w.endsWith('ite') || w.endsWith('ism') || w.endsWith('ist'))) {
    if (sampleAdvanced.length < 20) sampleAdvanced.push(w);
  }
});

console.log('Words under 5 chars:', under5);
console.log('Sample advanced words in catalog:', sampleAdvanced);
