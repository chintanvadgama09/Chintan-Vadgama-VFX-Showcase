const fs = require('fs');

global.window = {};
require('../words.js');
const currentWords = global.window.WORD_BANK || [];
const wordMap = new Map();
currentWords.forEach(w => wordMap.set(w.word.toLowerCase(), w));
console.log('Current words in words.js:', wordMap.size);

// Read build_dictionary.js
try {
  const bCode = fs.readFileSync('scratch/build_dictionary.js', 'utf8');
  // Extract newEntries array
  const match = bCode.match(/const newEntries = (\[[\s\S]*?\]);\s*const combined/);
  if (match) {
    const entries = eval(match[1]);
    console.log('Found in build_dictionary.js:', entries.length);
    let added = 0;
    entries.forEach(e => {
      if (!wordMap.has(e.word.toLowerCase())) {
        wordMap.set(e.word.toLowerCase(), e);
        added++;
      }
    });
    console.log('New words added from build_dictionary:', added);
  }
} catch (e) {
  console.log('Error evaluating build_dictionary:', e.message);
}

// Read expand_word_bank.js
try {
  const eCode = fs.readFileSync('scratch/expand_word_bank.js', 'utf8');
  const match = eCode.match(/const extendedWords = (\[[\s\S]*?\]);\s*console\.log/);
  if (match) {
    const entries = eval(match[1]);
    console.log('Found in expand_word_bank.js:', entries.length);
    let added = 0;
    entries.forEach(e => {
      if (!wordMap.has(e.word.toLowerCase())) {
        wordMap.set(e.word.toLowerCase(), e);
        added++;
      }
    });
    console.log('New words added from expand_word_bank:', added);
  }
} catch (e) {
  console.log('Error evaluating expand_word_bank:', e.message);
}

console.log('Total merged count would be:', wordMap.size);
