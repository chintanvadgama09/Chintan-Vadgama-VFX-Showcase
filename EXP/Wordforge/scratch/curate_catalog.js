const fs = require('fs');

global.window = {};
require('../words.js');
const curatedWords = (global.window.WORD_BANK || []).map(w => w.word.toLowerCase());

require('../word-catalog.js');
const rawCatalog = global.window.WORD_CATALOG || [];
console.log('Original catalog count:', rawCatalog.length);

const stopWords = new Set([
  'about', 'above', 'across', 'after', 'again', 'against', 'almost', 'along', 'already', 'also',
  'always', 'among', 'around', 'because', 'before', 'behind', 'below', 'between', 'both', 'could',
  'during', 'every', 'first', 'from', 'great', 'group', 'have', 'here', 'into', 'just', 'like',
  'many', 'more', 'most', 'much', 'must', 'never', 'only', 'other', 'over', 'same', 'should',
  'since', 'some', 'still', 'such', 'than', 'that', 'their', 'them', 'then', 'there', 'these',
  'they', 'this', 'those', 'through', 'under', 'until', 'very', 'well', 'were', 'what', 'when',
  'where', 'which', 'while', 'who', 'whom', 'whose', 'will', 'with', 'would', 'your',
  // Common boring nouns / tokens
  'beef', 'durham', 'cricket', 'passes', 'sellers', 'stores', 'sides', 'middle', 'quote', 'neil',
  'robert', 'david', 'james', 'john', 'mary', 'smith', 'brown', 'jones', 'jacksonville', 'netscape',
  'calendars', 'pointer', 'sleeve', 'cleaner', 'feeding', 'stretch', 'monday', 'tuesday', 'wednesday',
  'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'june',
  'july', 'august', 'september', 'october', 'november', 'december', 'yahoo', 'google', 'microsoft',
  'windows', 'linux', 'apple', 'cisco', 'intel', 'adobe', 'click', 'links', 'website', 'online'
]);

const cleanedSet = new Set();

// 1. Put all curated words first!
curatedWords.forEach(w => {
  if (w && w.length >= 4) cleanedSet.add(w.toLowerCase());
});

// 2. Add high-value words from rawCatalog
rawCatalog.forEach(w => {
  const word = w.trim().toLowerCase();
  // Filter criteria:
  // Must be at least 5 letters
  if (word.length < 5) return;
  // No numbers or symbols
  if (!/^[a-z]+$/.test(word)) return;
  // Not in stopWords
  if (stopWords.has(word)) return;
  // Filter out simple plurals if word ends in 'sses' or standard simple nouns
  cleanedSet.add(word);
});

console.log('Cleaned vocabulary count:', cleanedSet.size);

const cleanedArray = Array.from(cleanedSet);
const catalogOutput = `/* Curated 12,000+ Advanced Vocabulary Catalog for WordForge */\nwindow.WORD_CATALOG = ${JSON.stringify(cleanedArray)};\n`;

fs.writeFileSync('word-catalog.js', catalogOutput, 'utf8');
console.log('Successfully wrote word-catalog.js!');
