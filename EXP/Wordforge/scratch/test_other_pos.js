const fs = require('fs');

const appJsCode = fs.readFileSync('app.js', 'utf8');
const hashFnMatch = appJsCode.match(/function hashString[\s\S]*?function generateContextualSentences[\s\S]*?return indices\.map\(idx => pool\[idx\]\);\s*\}/);

eval(hashFnMatch[0]);

console.log('--- TESTING ADJECTIVES ---');
const adjs = ['ubiquitous', 'resilient', 'ephemeral', 'magnanimous', 'clandestine'];
adjs.forEach(adj => {
  console.log(`[${adj}]:`);
  generateContextualSentences(adj, 'adjective').forEach(s => console.log('  ', s));
});

console.log('\n--- TESTING VERBS ---');
const verbs = ['acquiesce', 'obfuscate', 'ameliorate', 'castigate', 'mitigate'];
verbs.forEach(v => {
  console.log(`[${v}]:`);
  generateContextualSentences(v, 'verb').forEach(s => console.log('  ', s));
});
