const fs = require('fs');

global.window = {};
require('../words.js');
require('../word-catalog.js');

const CURATED_BANK = global.window.WORD_BANK || [];
const CATALOG = global.window.WORD_CATALOG || [];

console.log('Curated bank size:', CURATED_BANK.length);
console.log('Catalog size:', CATALOG.length);

// Run the shuffler logic from app.js
let curatedDeck = [];
let catalogDeck = [];

function replenishDeck() {
  curatedDeck = CURATED_BANK.map(w => w.word);
  for (let i = curatedDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [curatedDeck[i], curatedDeck[j]] = [curatedDeck[j], curatedDeck[i]];
  }

  const curatedSet = new Set(curatedDeck.map(w => w.toLowerCase()));
  catalogDeck = CATALOG.filter(w => !curatedSet.has(w.toLowerCase()));
  for (let i = catalogDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [catalogDeck[i], catalogDeck[j]] = [catalogDeck[j], catalogDeck[i]];
  }
}

function getRandomWordFromCatalog() {
  if (curatedDeck.length > 0) return curatedDeck.pop();
  if (catalogDeck.length > 0) return catalogDeck.pop();
  replenishDeck();
  return curatedDeck.length > 0 ? curatedDeck.pop() : CATALOG[0];
}

replenishDeck();

console.log('\n--- DRAWING FIRST 15 RANDOM WORDS ---');
const sampleWords = [];
for (let i = 0; i < 15; i++) {
  const w = getRandomWordFromCatalog();
  sampleWords.push(w);
}
console.log(sampleWords);

// Test generateContextualSentences
const appJsCode = fs.readFileSync('app.js', 'utf8');
const hashFnMatch = appJsCode.match(/function hashString[\s\S]*?function generateContextualSentences[\s\S]*?return indices\.map\(idx => pool\[idx\]\);\s*\}/);

if (!hashFnMatch) {
  console.error('Could not extract sentence generator from app.js');
  process.exit(1);
}

eval(hashFnMatch[0]);

console.log('\n--- TESTING SENTENCE UNIQUENESS ACROSS 10 NOUNS ---');
const testNouns = ['epiphany', 'solitude', 'melancholy', 'panacea', 'serendipity', 'hubris', 'paradox', 'alchemy', 'veracity', 'resonance'];
const allSentences = new Set();
let totalSentences = 0;

testNouns.forEach(noun => {
  const s = generateContextualSentences(noun, 'noun');
  console.log(`\n[${noun.toUpperCase()}]:`);
  s.forEach(sent => {
    console.log(`  - "${sent}"`);
    allSentences.add(sent);
    totalSentences++;
  });
});

console.log(`\nTotal generated sentences: ${totalSentences}`);
console.log(`Unique generated sentences: ${allSentences.size}`);
if (totalSentences === allSentences.size) {
  console.log('✅ 100% UNIQUE! ZERO REPETITIONS!');
} else {
  console.log('❌ Detected duplicate sentence templates!');
}
