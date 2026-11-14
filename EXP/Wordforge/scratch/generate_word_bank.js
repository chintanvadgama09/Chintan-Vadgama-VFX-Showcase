const fs = require('fs');

// Load existing 112 curated words
global.window = global;
require('./words.js');
const existingBank = global.WORD_BANK || [];
console.log('Existing bank length:', existingBank.length);

const existingWords = new Set(existingBank.map(w => w.word.toLowerCase()));

// We will build a vast vocabulary corpus of advanced, literary, intellectual, and GRE/SAT words
// Each with real definitions, real IPA phonetic, real synonyms, antonyms, and 2-3 genuine sentences!
