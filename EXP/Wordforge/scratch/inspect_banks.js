const fs = require('fs');

global.window = {};
require('../words.js');
const wordsJs = global.window.WORD_BANK || [];
console.log('words.js count:', wordsJs.length);

// Check words in build_dictionary.js
const bText = fs.readFileSync('scratch/build_dictionary.js', 'utf8');
const bMatches = bText.match(/"word":\s*"([^"]+)"|word:\s*"([^"]+)"/g);
console.log('build_dictionary matches:', bMatches ? bMatches.length : 0);

// Check words in expand_word_bank.js
const eText = fs.readFileSync('scratch/expand_word_bank.js', 'utf8');
const eMatches = eText.match(/"word":\s*"([^"]+)"|word:\s*"([^"]+)"/g);
console.log('expand_word_bank matches:', eMatches ? eMatches.length : 0);
