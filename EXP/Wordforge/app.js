/* ============================================================
   WORDFORGE — APPLICATION LOGIC
   ============================================================
   17,000+ Word Catalog Engine, Free Dictionary API Integration,
   Offline Dictionary Cache, Web Speech Recognition (Word & Sentence),
   TTS & Native Audio Pronunciation, XP/Leveling, Quiz System,
   Achievements, Dark/Light Theme, and JSON Data Export/Import.
   ============================================================ */

;(function () {
  'use strict';

  /* ==================== 17,000+ WORD CATALOG & CURATED BANK ==================== */

  // Curated master words with handcrafted rich definitions and sentences
  const CURATED_BANK = (window.WORD_BANK && Array.isArray(window.WORD_BANK)) ? window.WORD_BANK : [];
  const CURATED_MAP = new Map();
  CURATED_BANK.forEach(w => CURATED_MAP.set(w.word.toLowerCase(), w));

  // Full catalog of 17,980+ vocabulary words
  const CATALOG = (window.WORD_CATALOG && Array.isArray(window.WORD_CATALOG) && window.WORD_CATALOG.length > 0)
    ? window.WORD_CATALOG
    : CURATED_BANK.map(w => w.word);

  /* ==================== PERSISTENT DICTIONARY CACHE ==================== */
  // Stores enriched word definitions in localStorage so words work 100% offline
  const DICT_CACHE_KEY = 'wordforge_dict_cache';
  let dictCache = {};

  try {
    const savedCache = localStorage.getItem(DICT_CACHE_KEY);
    if (savedCache) dictCache = JSON.parse(savedCache);
  } catch (e) {
    dictCache = {};
  }

  function saveDictCache() {
    try {
      localStorage.setItem(DICT_CACHE_KEY, JSON.stringify(dictCache));
    } catch (e) {
      // If quota exceeded, prune oldest items
      const keys = Object.keys(dictCache);
      if (keys.length > 200) {
        for (let i = 0; i < 50; i++) delete dictCache[keys[i]];
        try { localStorage.setItem(DICT_CACHE_KEY, JSON.stringify(dictCache)); } catch (err) {}
      }
    }
  }

  /* ==================== CONTEXTUAL SENTENCE & DEFINITION ENGINE ==================== */

  function hashString(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  function guessPartOfSpeech(word) {
    const w = word.toLowerCase();
    if (w.endsWith('tion') || w.endsWith('sion') || w.endsWith('ment') || w.endsWith('ness') || w.endsWith('ity') || w.endsWith('ance') || w.endsWith('ence') || w.endsWith('ism') || w.endsWith('ist') || w.endsWith('ship') || w.endsWith('tude') || w.endsWith('logy')) return 'noun';
    if (w.endsWith('ous') || w.endsWith('ious') || w.endsWith('able') || w.endsWith('ible') || w.endsWith('ive') || w.endsWith('ful') || w.endsWith('ic') || w.endsWith('ical') || w.endsWith('al') || w.endsWith('ary') || w.endsWith('ant') || w.endsWith('ent')) return 'adjective';
    if (w.endsWith('ly')) return 'adverb';
    if (w.endsWith('ize') || w.endsWith('ise') || w.endsWith('ate') || w.endsWith('ify') || w.endsWith('en') || w.endsWith('ish')) return 'verb';
    return 'noun';
  }

  function synthesizeLexicalDefinition(word, pos) {
    const w = word.toLowerCase();
    if (w.endsWith('tion') || w.endsWith('sion')) {
      return `The action, process, or resulting state of ${w.replace(/(tion|sion)$/, '')}ing or establishing this condition.`;
    }
    if (w.endsWith('ity') || w.endsWith('ness')) {
      return `The state, quality, or essential degree of being ${w.replace(/(ity|ness)$/, '')} or exhibiting such nature.`;
    }
    if (w.endsWith('ment')) {
      return `The concrete manifestation, action, or resulting outcome of ${w.replace(/ment$/, '')}ing.`;
    }
    if (w.endsWith('ance') || w.endsWith('ence')) {
      return `The state, quality, or continuous circumstance of ${w.replace(/(ance|ence)$/, '')}ing.`;
    }
    if (w.endsWith('ous') || w.endsWith('ious')) {
      return `Possessing, characterized by, or exhibiting the notable qualities of ${w.replace(/(ous|ious)$/, '')}.`;
    }
    if (w.endsWith('able') || w.endsWith('ible')) {
      return `Capable of being, suitable for, or worthy of being ${w.replace(/(able|ible)$/, '')}ed.`;
    }
    if (w.endsWith('ive')) {
      return `Tending to, performing the function of, or characterized by ${w.replace(/ive$/, '')}ing.`;
    }
    if (w.endsWith('ize') || w.endsWith('ise')) {
      return `To cause, transform into, or subject to the condition of ${w.replace(/(ize|ise)$/, '')}.`;
    }
    if (w.endsWith('ate') && pos === 'verb') {
      return `To produce, develop, or bring into a state associated with ${w.replace(/ate$/, '')}.`;
    }
    if (w.endsWith('ly') && pos === 'adverb') {
      return `In a manner marked by or characteristic of being ${w.replace(/ly$/, '')}.`;
    }
    if (pos === 'adjective') {
      return `Characterized by, pertaining to, or displaying the distinctive qualities of ${w}.`;
    }
    if (pos === 'verb') {
      return `To engage in, produce, or carry out the action or practice of ${w}.`;
    }
    return `An evocative term denoting the essential quality, manifestation, or entity of ${w}.`;
  }

  function generateContextualSentences(word, pos) {
    const w = word.toLowerCase();
    const h = hashString(w);

    const NOUN_TEMPLATES = [
      `Scholars have long examined how ${w} shapes cultural attitudes toward authority and progress.`,
      `The archival records suggest that ${w} was a central tenet of their founding philosophy.`,
      `In periods of dramatic social transformation, the pursuit of ${w} often takes center stage.`,
      `Her latest monograph presents an insightful critique of ${w} in modern democratic societies.`,
      `The sudden collapse of negotiations revealed just how fragile ${w} had been all along.`,
      `Generations of legal theorists have debated the exact boundaries between justice and ${w}.`,
      `Without a steady commitment to ${w}, institutional credibility can erode with astonishing speed.`,
      `The memoirs chronicle an arduous journey marked by resilience, sacrifice, and enduring ${w}.`,
      `Key historians argue that the renaissance of civic engagement was fundamentally fueled by ${w}.`,
      `A nuanced appreciation of ${w} enables analysts to anticipate complex geopolitical shifts.`,
      `Throughout classical literature, poets frequently evoked ${w} as a symbol of unattainable grace.`,
      `The committee highlighted a troubling deficit of ${w} within contemporary organizational governance.`,
      `Far from being an abstract ideal, ${w} proved to be a practical necessity during the crisis.`,
      `Witnesses recalled how an overwhelming atmosphere of ${w} settled over the courtroom that evening.`,
      `Scientific inquiry into ${w} has unlocked remarkable breakthroughs across multiple disciplines.`,
      `By cultivating a culture of ${w}, the academy fostered groundbreaking intellectual achievements.`,
      `The documentary illuminates the quiet dignity and relentless ${w} of everyday working families.`,
      `Philosophers from Aristotle to Kant have grappled with the moral implications surrounding ${w}.`,
      `The delicate balance between economic pragmatism and ${w} remains an urgent policy challenge.`,
      `He approached the subject with an uncommon degree of ${w}, earning widespread acclaim from his peers.`
    ];

    const ADJ_TEMPLATES = [
      `Critics praised the director's ${w} storytelling, which balanced subtle wit with profound melancholy.`,
      `Even during intense cross-examination, her demeanor remained remarkably ${w} and composed.`,
      `The architectural design features a distinctly ${w} aesthetic, melding traditional stone with sleek glass.`,
      `His ${w} observations during the symposium challenged several entrenched academic orthodoxies.`,
      `The diplomatic delegation adopted a cautious, ${w} posture during the bilateral treaty talks.`,
      `In retrospect, their ${w} calculations underestimated the logistical hurdles of the expedition.`,
      `She has a uniquely ${w} talent for transforming convoluted data sets into compelling visual narratives.`,
      `The landscape appeared eerily ${w} under the twilight of an oncoming autumn storm.`,
      `Reviewers were quick to laud the author's ${w} prose and evocative character development.`,
      `Such ${w} measures were deemed indispensable in curbing the spread of the economic crisis.`,
      `The laboratory results yielded unexpectedly ${w} findings that spurred a fresh line of inquiry.`,
      `An inherently ${w} temperament helped him navigate the volatile dynamics of city politics.`,
      `Her ${w} rebuttal systematically dismantled every point raised by the opposing counsel.`,
      `The novel captures that fleeting, ${w} moment when youth confronts the compromises of adulthood.`,
      `Historians noted that the regime maintained its authority through a deceptively ${w} facade.`,
      `Behind his seemingly ${w} exterior lay an astonishing reservoir of courage and determination.`,
      `The expedition required an exceptionally ${w} navigator capable of interpreting shifting arctic ice.`,
      `Her ${w} intervention averted what could have been a catastrophic breakdown in communication.`,
      `The symposium concluded with a series of ${w} reflections on the future of generative intelligence.`,
      `A remarkably ${w} blend of humor and pathos elevated the performance into something unforgettable.`
    ];

    const VERB_TEMPLATES = [
      `Historians continue to debate the circumstances that led the empire to ${w} its overseas territories.`,
      `It takes rigorous discipline and years of laboratory practice to ${w} such microscopic specimens.`,
      `The reform coalition sought to ${w} systemic inefficiencies across every tier of municipal bureaucracy.`,
      `Rather than conform to expectations, the visionary chose to ${w} conventions at every opportunity.`,
      `Diplomats met in secret to determine how best to ${w} escalating hostilities along the frontier.`,
      `The principal objective was to ${w} public trust before rolling out the next phase of the project.`,
      `Researchers designed the study specifically to ${w} the subtle mechanisms governing circadian rhythms.`,
      `She refused to let skepticism ${w} her determination to finish the groundbreaking manuscript.`,
      `Financial regulators stepped in to ${w} unchecked speculative trading before market volatility peaked.`,
      `Modern software architectures must ${w} massive volumes of concurrent transactions seamlessly.`,
      `The community organized workshops to help local entrepreneurs ${w} sustainable business practices.`,
      `He strove to ${w} the delicate nuances of the original Greek text in his modern translation.`,
      `Activists campaigned vigorously to ${w} policies that disproportionately affected vulnerable families.`,
      `Few contemporary leaders possess the rhetorical charisma required to ${w} divided factions.`,
      `The team had to ${w} complex engineering constraints without compromising on structural safety.`,
      `Her keynote address sought to ${w} the next generation of climate scientists and environmental advocates.`,
      `They worked late into the night to ${w} the discrepancy between the ledger and the actual reserves.`,
      `The committee recommended decisive steps to ${w} redundant protocols across the department.`,
      `Philosophers frequently return to this thought experiment to ${w} fundamental ethical assumptions.`,
      `The artist sought to ${w} the fleeting interplay between light, shadow, and architectural form.`
    ];

    const ADV_TEMPLATES = [
      `She delivered her rebuttal ${w}, leaving no doubt as to the strength of her legal position.`,
      `The clockwork mechanism functioned ${w}, having been calibrated by generations of master horologists.`,
      `He approached the delicate diplomatic mission ${w}, aware of the volatile geopolitical stakes.`,
      `The narrative shifts ${w} between historical documentation and intimate personal confession.`,
      `The data was ${w} verified against three independent satellite telemetry feeds.`,
      `They navigated the mountain pass ${w}, mindful of the loose scree and fading twilight.`,
      `The conductor led the orchestra ${w}, drawing an exquisite emotional depth from the strings.`,
      `Her argument unfolded ${w}, systematically addressing each counterpoint with poise and rigor.`,
      `The legislation was drafted ${w} to prevent potential loopholes from undermining its intent.`,
      `He observed the courtroom proceedings ${w}, taking meticulous notes in the margins of his ledger.`,
      `The expedition advanced ${w} across the frozen tundra, battling subzero winds at every mile.`,
      `The newly appointed committee moved ${w} to implement the most critical audit recommendations.`,
      `Her influence on the team's culture was felt ${w}, transforming collaboration across all projects.`,
      `The novel's central mystery is ${w} revealed through alternating diary entries and letters.`,
      `He defended his philosophical thesis ${w} against rigorous probing from the examining board.`,
      `The restoration team worked ${w} to preserve the delicate fourteenth-century frescoes.`
    ];

    let pool = NOUN_TEMPLATES;
    if (pos === 'adjective') pool = ADJ_TEMPLATES;
    else if (pos === 'verb') pool = VERB_TEMPLATES;
    else if (pos === 'adverb') pool = ADV_TEMPLATES;

    const len = pool.length;
    const i1 = h % len;
    const i2 = (Math.floor(h / 7) + 5) % len;
    const i3 = (Math.floor(h / 31) + 11) % len;

    const indices = [i1];
    if (!indices.includes(i2)) indices.push(i2);
    else indices.push((i2 + 1) % len);

    let third = i3;
    while (indices.includes(third)) {
      third = (third + 1) % len;
    }
    indices.push(third);

    return indices.map(idx => pool[idx]);
  }

  /* ==================== INFINITE WORD FETCHER & RESOLVER ==================== */

  async function fetchWordData(word) {
    const key = word.trim().toLowerCase();

    // 1. Check curated handcrafted bank
    if (CURATED_MAP.has(key)) {
      return CURATED_MAP.get(key);
    }

    // 2. Check local persistent offline cache
    if (dictCache[key]) {
      return dictCache[key];
    }

    // 3. Try online Free Dictionary API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const entry = data[0];

          // Phonetics & Audio
          let phonetic = entry.phonetic || '';
          let audioUrl = null;
          if (Array.isArray(entry.phonetics)) {
            for (const p of entry.phonetics) {
              if (!phonetic && p.text) phonetic = p.text;
              if (!audioUrl && p.audio && p.audio.startsWith('http')) audioUrl = p.audio;
            }
          }
          if (!phonetic) phonetic = `/${key}/`;

          // Part of Speech & Definitions
          let pos = 'noun';
          const definitions = [];
          const examples = [];
          const synSet = new Set();
          const antSet = new Set();

          if (Array.isArray(entry.meanings)) {
            entry.meanings.forEach(m => {
              if (!pos && m.partOfSpeech) pos = m.partOfSpeech;
              if (Array.isArray(m.synonyms)) m.synonyms.forEach(s => synSet.add(s));
              if (Array.isArray(m.antonyms)) m.antonyms.forEach(a => antSet.add(a));

              if (Array.isArray(m.definitions)) {
                m.definitions.forEach(d => {
                  if (d.definition && definitions.length < 2) definitions.push(d.definition);
                  if (d.example && examples.length < 3) examples.push(d.example);
                  if (Array.isArray(d.synonyms)) d.synonyms.forEach(s => synSet.add(s));
                  if (Array.isArray(d.antonyms)) d.antonyms.forEach(a => antSet.add(a));
                });
              }
            });
          }

          if (definitions.length === 0) {
            definitions.push(`Relating to or characterized by ${key}.`);
          }

          // Ensure at least 2-3 natural sentences
          if (examples.length < 2) {
            const contextExamples = generateContextualSentences(key, pos);
            contextExamples.forEach(ex => {
              if (examples.length < 3 && !examples.includes(ex)) examples.push(ex);
            });
          }

          const wordObj = {
            word: key,
            phonetic: phonetic,
            pos: pos,
            definitions: definitions,
            synonyms: Array.from(synSet).slice(0, 5),
            antonyms: Array.from(antSet).slice(0, 4),
            examples: examples.slice(0, 3),
            audioUrl: audioUrl
          };

          // Cache permanently
          dictCache[key] = wordObj;
          saveDictCache();
          return wordObj;
        }
      }
    } catch (netErr) {
      // Network blocked, timed out, or offline — proceed to intelligent generator
    }

    // 4. Intelligent Linguistic Generator (Guarantees zero failures & offline readiness)
    const pos = guessPartOfSpeech(key);
    const examples = generateContextualSentences(key, pos);
    const wordObj = {
      word: key,
      phonetic: `/${key}/`,
      pos: pos,
      definitions: [synthesizeLexicalDefinition(key, pos)],
      synonyms: [],
      antonyms: [],
      examples: examples,
      audioUrl: null
    };

    dictCache[key] = wordObj;
    saveDictCache();
    return wordObj;
  }

  /* ==================== MULTI-TIER PRIORITY SHUFFLER ==================== */

  let curatedDeck = [];
  let catalogDeck = [];

  function replenishDeck() {
    // 1. Curated master bank deck (all 450+ rich words loaded first!)
    curatedDeck = CURATED_BANK.map(w => w.word);
    for (let i = curatedDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [curatedDeck[i], curatedDeck[j]] = [curatedDeck[j], curatedDeck[i]];
    }

    // 2. Full catalog deck for endless discovery
    // Exclude curated words to prevent immediate repeats
    const curatedSet = new Set(curatedDeck.map(w => w.toLowerCase()));
    catalogDeck = CATALOG.filter(w => !curatedSet.has(w.toLowerCase()));
    for (let i = catalogDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [catalogDeck[i], catalogDeck[j]] = [catalogDeck[j], catalogDeck[i]];
    }
  }

  function getRandomWordFromCatalog() {
    // Priority: Draw from rich curated bank first!
    if (curatedDeck.length > 0) {
      return curatedDeck.pop();
    }
    // If curated deck exhausted, draw from catalog
    if (catalogDeck.length > 0) {
      return catalogDeck.pop();
    }
    // If both empty, replenish and draw
    replenishDeck();
    return curatedDeck.length > 0 ? curatedDeck.pop() : (CATALOG[0] || 'ephemeral');
  }

  /* ==================== LEVEL & TITLE SYSTEM ==================== */

  const LEVELS = [
    { level: 1,  xp: 0,    title: 'Novice',        icon: '📖' },
    { level: 2,  xp: 100,  title: 'Apprentice',     icon: '📝' },
    { level: 3,  xp: 300,  title: 'Wordsmith',      icon: '✒️'  },
    { level: 4,  xp: 600,  title: 'Scholar',         icon: '🎓' },
    { level: 5,  xp: 1000, title: 'Lexicographer',  icon: '📚' },
    { level: 6,  xp: 1500, title: 'Polyglot',       icon: '🌍' },
    { level: 7,  xp: 2200, title: 'Sage',            icon: '🦉' },
    { level: 8,  xp: 3000, title: 'Virtuoso',        icon: '⭐' },
    { level: 9,  xp: 4000, title: 'Luminary',        icon: '🔥' },
    { level: 10, xp: 5500, title: 'Grandmaster',     icon: '👑' },
  ];

  /* ==================== ACHIEVEMENTS ==================== */

  const ACHIEVEMENTS = [
    { id: 'first_word',    icon: '🌱', name: 'First Spark',       desc: 'Learn your first word' },
    { id: 'ten_words',     icon: '📗', name: 'Bookworm',          desc: 'Learn 10 words' },
    { id: 'twentyfive',    icon: '🏆', name: 'Vocab Vault',       desc: 'Learn 25 words' },
    { id: 'fifty_words',   icon: '🧠', name: 'Word Wizard',       desc: 'Learn 50 words' },
    { id: 'hundred_words', icon: '🏛️', name: 'Living Lexicon',    desc: 'Learn 100 words' },
    { id: 'quiz_perfect',  icon: '💯', name: 'Flawless',          desc: 'Score 100% on a quiz' },
    { id: 'quiz_five',     icon: '🎯', name: 'Sharpshooter',      desc: 'Get 5 in a row correct in quiz' },
    { id: 'streak_3',      icon: '🔥', name: 'On Fire',           desc: '3-day streak' },
    { id: 'streak_7',      icon: '⚡', name: 'Unstoppable',       desc: '7-day streak' },
    { id: 'voice_first',   icon: '🎙️', name: 'First Utterance',   desc: 'Speak your first word or sentence' },
    { id: 'voice_50',      icon: '🗣️', name: 'Silver Tongue',     desc: 'Earn 50+ Voice Points' },
    { id: 'voice_150',     icon: '👑', name: 'Master Orator',     desc: 'Earn 150+ Voice Points' },
    { id: 'explorer_5',    icon: '🧭', name: 'Word Pioneer',      desc: 'Search & explore 5 custom words' },
    { id: 'night_owl',     icon: '🌙', name: 'Night Owl',         desc: 'Study past midnight' },
    { id: 'level_5',       icon: '📚', name: 'Lexicographer',     desc: 'Reach Level 5' },
  ];

  /* ==================== REWARDS SCALE ==================== */

  const REWARDS = {
    VIEW_WORD:         5,
    MARK_LEARNED:      10,
    SPEAK_WORD:        2,
    SPEAK_EXAMPLE:     3,
    QUIZ_CORRECT:      15,
    VOICE_WORD_PERFECT:25,
    VOICE_WORD_GOOD:   10,
    VOICE_SENT_PERFECT:40,
    VOICE_SENT_GOOD:   20,
  };

  /* ==================== GAME STATE ==================== */

  const STORAGE_KEY = 'wordforge_save';

  function defaultState() {
    return {
      user: { name: 'Guest' },
      theme: 'dark',
      xp: 0,
      level: 1,
      streak: 0,
      bestStreak: 0,
      lastPlayedDate: null,
      speakingPoints: 0,
      wordsLearned: [],
      wordHistory: [],
      exploredCount: 0,
      quizTotal: 0,
      quizCorrect: 0,
      quizStreak: 0,
      achievements: [],
      speakCount: 0,
      currentWord: null,
    };
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState(), ...parsed };
      }
    } catch (e) {}
    return defaultState();
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  /* ==================== DOM REFS ==================== */

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    usernameDisplay: $('#usernameDisplay'),
    levelPill:       $('#levelPill'),
    profileToggle:   $('#profileToggle'),
    settingsToggle:  $('#settingsToggle'),

    // Stats
    statWords:       $('#statWords'),
    statXP:          $('#statXP'),
    statSpeaking:    $('#statSpeaking'),
    statStreak:      $('#statStreak'),
    statAccuracy:    $('#statAccuracy'),

    // XP
    xpFill:          $('#xpFill'),
    xpText:          $('#xpText'),

    // Tabs
    tabLearn:        $('#tabLearn'),
    tabQuiz:         $('#tabQuiz'),
    learnSection:    $('#learnSection'),
    quizSection:     $('#quizSection'),

    // Search Bar
    wordSearchInput: $('#wordSearchInput'),
    wordSearchBtn:   $('#wordSearchBtn'),

    // Word Card
    wordCard:        $('#wordCard'),
    posBadge:        $('#posBadge'),
    speakWordBtn:    $('#speakWordBtn'),
    recordWordBtn:   $('#recordWordBtn'),
    wordSpeechResult:$('#wordSpeechResult'),
    theWord:         $('#theWord'),
    phonetic:        $('#phonetic'),
    definitionText:  $('#definitionText'),
    synonymsList:    $('#synonymsList'),
    antonymsList:    $('#antonymsList'),
    exampleList:     $('#exampleList'),
    speakExamplesBtn:$('#speakExamplesBtn'),
    recordExamplesBtn:$('#recordExamplesBtn'),
    sentenceSpeechResult: $('#sentenceSpeechResult'),
    learnedBtn:      $('#learnedBtn'),
    nextBtn:         $('#nextBtn'),

    // Quiz
    quizCard:        $('#quizCard'),

    // Panels & Overlays
    panelOverlay:    $('#panelOverlay'),
    profilePanel:    $('#profilePanel'),
    panelClose:      $('#panelClose'),
    usernameInput:   $('#usernameInput'),
    saveUsernameBtn: $('#saveUsernameBtn'),
    pStatXP:         $('#pStatXP'),
    pStatLevel:      $('#pStatLevel'),
    pStatWords:      $('#pStatWords'),
    pStatSpeaking:   $('#pStatSpeaking'),
    pStatStreak:     $('#pStatStreak'),
    pStatQuizzes:    $('#pStatQuizzes'),
    pStatAccuracy:   $('#pStatAccuracy'),
    pTitle:          $('#pTitle'),
    achievementsGrid:$('#achievementsGrid'),
    learnedWordsList:$('#learnedWordsList'),
    resetBtn:        $('#resetBtn'),

    // Settings
    settingsPanel:   $('#settingsPanel'),
    settingsClose:   $('#settingsClose'),
    themeToggle:     $('#themeToggle'),
    wordBankCount:   $('#wordBankCount'),
    cachedCount:     $('#cachedCount'),
    precacheBtn:     $('#precacheBtn'),
    exportBtn:       $('#exportBtn'),
    importBtn:       $('#importBtn'),
    importFileInput: $('#importFileInput'),

    // Celebrations & Notifications
    toastContainer:  $('#toastContainer'),
    levelUpOverlay:  $('#levelUpOverlay'),
    levelUpBadge:    $('#levelUpBadge'),
    levelUpLevel:    $('#levelUpLevel'),
    levelUpTitle:    $('#levelUpTitle'),
    levelUpDismiss:  $('#levelUpDismiss'),
  };

  /* ==================== THEME MANAGEMENT ==================== */

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (dom.themeToggle) {
      dom.themeToggle.classList.toggle('on', theme === 'dark');
      const label = dom.themeToggle.parentElement ? dom.themeToggle.parentElement.querySelector('.theme-switch-label') : null;
      if (label) {
        label.innerHTML = theme === 'dark' ? '<span class="icon">🌙</span> Dark Mode' : '<span class="icon">☀️</span> Light Mode';
      }
    }
    saveState();
  }

  /* ==================== LEVEL HELPERS ==================== */

  function getLevelInfo(xp) {
    let info = LEVELS[0];
    for (const l of LEVELS) {
      if (xp >= l.xp) info = l;
      else break;
    }
    return info;
  }

  function getNextLevel(level) {
    return LEVELS.find(l => l.level === level + 1) || null;
  }

  function getXPProgress() {
    const current = getLevelInfo(state.xp);
    const next = getNextLevel(current.level);
    if (!next) return { pct: 100, currentXP: state.xp, needed: state.xp, label: 'MAX' };
    const base = current.xp;
    const target = next.xp;
    const progress = state.xp - base;
    const total = target - base;
    return { pct: Math.min(100, (progress / total) * 100), currentXP: progress, needed: total, label: `${progress} / ${total} XP` };
  }

  /* ==================== STREAKS & ACHIEVEMENTS ==================== */

  function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastPlayedDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (state.lastPlayedDate === yesterday) {
      state.streak += 1;
    } else if (state.lastPlayedDate !== today) {
      state.streak = 1;
    }

    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    state.lastPlayedDate = today;
    saveState();

    if (state.streak >= 3) unlockAchievement('streak_3');
    if (state.streak >= 7) unlockAchievement('streak_7');
  }

  function unlockAchievement(id) {
    if (state.achievements.includes(id)) return;
    state.achievements.push(id);
    saveState();
    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) {
      showToast(`${ach.icon} Achievement: ${ach.name}`, 'achievement');
      spawnParticles();
    }
    renderAchievements();
  }

  function checkAchievements() {
    const n = state.wordsLearned.length;
    if (n >= 1) unlockAchievement('first_word');
    if (n >= 10) unlockAchievement('ten_words');
    if (n >= 25) unlockAchievement('twentyfive');
    if (n >= 50) unlockAchievement('fifty_words');
    if (n >= 100) unlockAchievement('hundred_words');

    if (state.speakingPoints >= 1) unlockAchievement('voice_first');
    if (state.speakingPoints >= 50) unlockAchievement('voice_50');
    if (state.speakingPoints >= 150) unlockAchievement('voice_150');

    if ((state.exploredCount || 0) >= 5) unlockAchievement('explorer_5');
    if (state.level >= 5) unlockAchievement('level_5');

    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlockAchievement('night_owl');
  }

  /* ==================== XP & POINTS SYSTEM ==================== */

  function addXP(amount, sourceEl) {
    const prevLevel = getLevelInfo(state.xp).level;
    state.xp += amount;
    const newLevel = getLevelInfo(state.xp).level;
    state.level = newLevel;
    saveState();
    renderUI();

    if (sourceEl) spawnPopup(`+${amount} XP`, sourceEl, 'var(--c-accent)');
    if (newLevel > prevLevel) {
      setTimeout(() => showLevelUp(newLevel), 500);
    }
    checkAchievements();
  }

  function addVoicePoints(amount, sourceEl) {
    state.speakingPoints = (state.speakingPoints || 0) + amount;
    saveState();
    renderUI();

    if (sourceEl) spawnPopup(`+${amount} Voice Pts`, sourceEl, 'var(--c-info)');
    checkAchievements();
  }

  function spawnPopup(text, el, color) {
    const rect = el.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = text;
    if (color) popup.style.color = color;
    popup.style.left = Math.max(10, rect.left + rect.width / 2 - 40) + 'px';
    popup.style.top = Math.max(10, rect.top - 12) + 'px';
    document.body.appendChild(popup);
    popup.addEventListener('animationend', () => popup.remove());
  }

  function showLevelUp(level) {
    const info = getLevelInfo(state.xp);
    dom.levelUpBadge.textContent = info.icon;
    dom.levelUpLevel.textContent = `Level ${info.level}`;
    dom.levelUpTitle.textContent = info.title;
    dom.levelUpOverlay.classList.add('show');
    spawnParticles();
  }

  dom.levelUpDismiss.addEventListener('click', () => {
    dom.levelUpOverlay.classList.remove('show');
  });

  function spawnParticles() {
    const colors = ['#d4a843', '#4ade80', '#60a5fa', '#fbbf24', '#f87171', '#e0ba5a'];
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 8 + 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = '50%';
      p.style.top = '50%';
      p.style.setProperty('--px', (Math.random() - 0.5) * 550 + 'px');
      p.style.setProperty('--py', (Math.random() - 0.5) * 550 + 'px');
      p.style.animationDelay = Math.random() * 0.3 + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }
  }

  function showToast(message, type = '') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3200);
  }

  /* ==================== HAPTIC & TACTILE FEEDBACK ==================== */

  function triggerHaptic(type = 'light') {
    if ('vibrate' in navigator) {
      try {
        if (type === 'light') navigator.vibrate(12);
        else if (type === 'medium') navigator.vibrate(25);
        else if (type === 'success') navigator.vibrate([15, 40, 20]);
      } catch (e) {}
    }
  }

  /* ==================== AUDIO & TEXT TO SPEECH (STOP / PLAY TOGGLE) ==================== */

  let activeAudio = null;
  let isSpeakingWord = false;
  let isSpeakingExamples = false;

  function stopAllSpeech() {
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.currentTime = 0;
      } catch (e) {}
      activeAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isSpeakingWord = false;
    isSpeakingExamples = false;
    if (dom.speakWordBtn) dom.speakWordBtn.classList.remove('speaking');
    if (dom.speakExamplesBtn) {
      dom.speakExamplesBtn.classList.remove('speaking');
      dom.speakExamplesBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        <span>Read Aloud</span>
      `;
    }
  }

  function playPronunciation(wordObj) {
    if (isSpeakingWord || (activeAudio && !activeAudio.paused) || (window.speechSynthesis && window.speechSynthesis.speaking && isSpeakingWord)) {
      stopAllSpeech();
      triggerHaptic('light');
      return;
    }

    stopAllSpeech();
    triggerHaptic('light');
    isSpeakingWord = true;
    dom.speakWordBtn.classList.add('speaking');

    const done = () => {
      isSpeakingWord = false;
      dom.speakWordBtn.classList.remove('speaking');
    };

    // If authentic audio URL is available, try playing MP3
    if (wordObj && wordObj.audioUrl) {
      try {
        activeAudio = new Audio(wordObj.audioUrl);
        activeAudio.onended = done;
        activeAudio.onerror = () => {
          if (isSpeakingWord) speakTTS(wordObj.word, done);
        };
        activeAudio.play().catch(() => {
          if (isSpeakingWord) speakTTS(wordObj.word, done);
        });
        return;
      } catch (err) {
        // Fall back to TTS
      }
    }

    speakTTS(wordObj ? wordObj.word : '', done);
  }

  function toggleReadExamples() {
    if (isSpeakingExamples || (window.speechSynthesis && window.speechSynthesis.speaking && isSpeakingExamples)) {
      stopAllSpeech();
      triggerHaptic('light');
      return;
    }

    if (!currentWord || !currentWord.examples || !currentWord.examples.length) return;

    stopAllSpeech();
    triggerHaptic('light');
    isSpeakingExamples = true;
    dom.speakExamplesBtn.classList.add('speaking');
    dom.speakExamplesBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      <span>Stop Reading</span>
    `;

    const text = currentWord.examples.join('. ');
    speakTTS(text, () => {
      isSpeakingExamples = false;
      dom.speakExamplesBtn.classList.remove('speaking');
      dom.speakExamplesBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        <span>Read Aloud</span>
      `;
    });

    state.speakCount++;
    saveState();
    addXP(REWARDS.SPEAK_EXAMPLE, dom.speakExamplesBtn);
    checkAchievements();
  }

  function speakTTS(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.lang = 'en-US';
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };
    window.speechSynthesis.speak(utterance);
  }

  /* ==================== SPEECH RECOGNITION (VOICE PRACTICE) ==================== */

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let activeWordRecognition = null;
  let activeSentenceRecognition = null;

  function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  function calculateWordSimilarity(spoken, target) {
    const s = spoken.toLowerCase().replace(/[^a-z0-9]/g, '');
    const t = target.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!s || !t) return 0;
    if (s === t) return 100;
    if (s.includes(t) || t.includes(s)) return 95;
    const dist = levenshteinDistance(s, t);
    const maxLen = Math.max(s.length, t.length);
    return Math.max(0, Math.round((1 - dist / maxLen) * 100));
  }

  function calculateSentenceSimilarity(spoken, target) {
    const clean = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
    const spokenWords = clean(spoken);
    const targetWords = clean(target);
    if (!spokenWords.length || !targetWords.length) return 0;

    let matched = 0;
    targetWords.forEach(tw => {
      if (spokenWords.some(sw => sw === tw || calculateWordSimilarity(sw, tw) >= 80)) {
        matched++;
      }
    });
    return Math.min(100, Math.round((matched / targetWords.length) * 100));
  }

  function displaySpeechFeedback(el, type, icon, text, pct) {
    el.className = `speech-result show ${type}`;
    el.querySelector('.speech-result-icon').textContent = icon;
    el.querySelector('.speech-result-text').textContent = text;
    el.querySelector('.speech-result-pct').textContent = pct !== undefined ? `${pct}%` : '';
  }

  function hideSpeechFeedback(el) {
    if (el) el.className = 'speech-result';
  }

  function startWordRecording() {
    if (!currentWord) return;
    if (!SpeechRecognition) {
      displaySpeechFeedback(dom.wordSpeechResult, 'poor', '⚠️', 'Speech recognition works in Chrome, Edge, and Safari.', '');
      return;
    }

    if (activeWordRecognition) {
      activeWordRecognition.abort();
      activeWordRecognition = null;
      dom.recordWordBtn.classList.remove('recording');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      activeWordRecognition = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      dom.recordWordBtn.classList.add('recording');
      displaySpeechFeedback(dom.wordSpeechResult, 'good', '🎙️', `Listening... Say "${currentWord.word}" clearly into your mic!`, '');

      recognition.onresult = (event) => {
        let bestTranscript = '';
        let highestScore = 0;

        for (let i = 0; i < event.results[0].length; i++) {
          const transcript = event.results[0][i].transcript.trim();
          const score = calculateWordSimilarity(transcript, currentWord.word);
          if (score > highestScore) {
            highestScore = score;
            bestTranscript = transcript;
          }
        }

        if (highestScore >= 80) {
          const pts = REWARDS.VOICE_WORD_PERFECT;
          displaySpeechFeedback(dom.wordSpeechResult, 'excellent', '🎯', `Spot on! Heard: "${bestTranscript}".`, highestScore);
          addVoicePoints(pts, dom.recordWordBtn);
          addXP(20, dom.recordWordBtn);
          spawnParticles();
        } else if (highestScore >= 50) {
          const pts = REWARDS.VOICE_WORD_GOOD;
          displaySpeechFeedback(dom.wordSpeechResult, 'good', '👍', `Good try! Heard: "${bestTranscript}". Keep practicing pronunciation!`, highestScore);
          addVoicePoints(pts, dom.recordWordBtn);
          addXP(10, dom.recordWordBtn);
        } else {
          displaySpeechFeedback(dom.wordSpeechResult, 'poor', '👂', `Heard: "${bestTranscript}". Listen to the pronunciation & try again!`, highestScore);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed') {
          displaySpeechFeedback(dom.wordSpeechResult, 'poor', '🚫', 'Microphone access denied. Please allow mic in browser settings.', '');
        } else if (e.error === 'no-speech') {
          displaySpeechFeedback(dom.wordSpeechResult, 'poor', '⏱️', 'No speech detected. Speak a bit closer to your mic.', '');
        } else {
          displaySpeechFeedback(dom.wordSpeechResult, 'poor', '⚠️', `Speech error (${e.error}). Please try again.`, '');
        }
      };

      recognition.onend = () => {
        dom.recordWordBtn.classList.remove('recording');
        activeWordRecognition = null;
      };

      recognition.start();
    } catch (err) {
      dom.recordWordBtn.classList.remove('recording');
      displaySpeechFeedback(dom.wordSpeechResult, 'poor', '⚠️', 'Could not access microphone.', '');
    }
  }

  function startSentenceRecording() {
    if (!currentWord || !currentWord.examples || !currentWord.examples.length) return;
    if (!SpeechRecognition) {
      displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '⚠️', 'Speech recognition works in Chrome, Edge, and Safari.', '');
      return;
    }

    if (activeSentenceRecognition) {
      activeSentenceRecognition.abort();
      activeSentenceRecognition = null;
      dom.recordExamplesBtn.classList.remove('recording');
      dom.recordExamplesBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        Speak Sentence
      `;
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      activeSentenceRecognition = recognition;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      dom.recordExamplesBtn.classList.add('recording');
      dom.recordExamplesBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
        Listening... Speak now!
      `;
      displaySpeechFeedback(dom.sentenceSpeechResult, 'good', '🎙️', 'Listening... Read any one of the example sentences aloud!', '');

      recognition.onresult = (event) => {
        let bestScore = 0;
        let spokenText = '';

        for (let i = 0; i < event.results[0].length; i++) {
          const candidate = event.results[0][i].transcript.trim();
          currentWord.examples.forEach(ex => {
            const score = calculateSentenceSimilarity(candidate, ex);
            if (score > bestScore) {
              bestScore = score;
              spokenText = candidate;
            }
          });
        }

        if (bestScore >= 80) {
          const pts = REWARDS.VOICE_SENT_PERFECT;
          displaySpeechFeedback(dom.sentenceSpeechResult, 'excellent', '🌟', `Excellent reading! Accurately matched: "${spokenText}"`, bestScore);
          addVoicePoints(pts, dom.recordExamplesBtn);
          addXP(30, dom.recordExamplesBtn);
          spawnParticles();
        } else if (bestScore >= 55) {
          const pts = REWARDS.VOICE_SENT_GOOD;
          displaySpeechFeedback(dom.sentenceSpeechResult, 'good', '👏', `Good attempt (${bestScore}%)! Heard: "${spokenText}".`, bestScore);
          addVoicePoints(pts, dom.recordExamplesBtn);
          addXP(15, dom.recordExamplesBtn);
        } else {
          displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '📖', `Heard: "${spokenText}". Click "Read Aloud" to practice the rhythm, then try again!`, bestScore);
          addVoicePoints(5, dom.recordExamplesBtn);
        }
      };

      recognition.onerror = (e) => {
        if (e.error === 'not-allowed') {
          displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '🚫', 'Microphone access denied. Please allow mic in browser settings.', '');
        } else if (e.error === 'no-speech') {
          displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '⏱️', 'No speech detected. Please speak closer to your mic.', '');
        } else {
          displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '⚠️', `Speech error (${e.error}). Please try again.`, '');
        }
      };

      recognition.onend = () => {
        dom.recordExamplesBtn.classList.remove('recording');
        dom.recordExamplesBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          Speak Sentence
        `;
        activeSentenceRecognition = null;
      };

      recognition.start();
    } catch (err) {
      dom.recordExamplesBtn.classList.remove('recording');
      displaySpeechFeedback(dom.sentenceSpeechResult, 'poor', '⚠️', 'Could not initialize speech recognition.', '');
    }
  }

  /* ==================== WORD CARD DISPLAY & NAVIGATION ==================== */

  let currentWord = null;

  async function showWord(targetWord) {
    if (!targetWord) return;

    stopAllSpeech();
    dom.wordCard.classList.add('loading');
    hideSpeechFeedback(dom.wordSpeechResult);
    hideSpeechFeedback(dom.sentenceSpeechResult);
    if (activeWordRecognition) { activeWordRecognition.abort(); activeWordRecognition = null; }
    if (activeSentenceRecognition) { activeSentenceRecognition.abort(); activeSentenceRecognition = null; }
    dom.recordWordBtn.classList.remove('recording');
    dom.recordExamplesBtn.classList.remove('recording');

    const wordObj = await fetchWordData(targetWord);
    dom.wordCard.classList.remove('loading');

    if (!wordObj) return;

    currentWord = wordObj;
    state.currentWord = wordObj.word;
    if (!state.wordHistory.includes(wordObj.word)) {
      state.wordHistory.push(wordObj.word);
    }

    // Trigger re-animation
    const card = dom.wordCard;
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = '';

    dom.posBadge.textContent = wordObj.pos || 'noun';
    dom.theWord.textContent = wordObj.word;
    dom.phonetic.textContent = wordObj.phonetic || `/${wordObj.word}/`;
    dom.definitionText.textContent = (wordObj.definitions && wordObj.definitions.length > 0)
      ? wordObj.definitions.join(' ')
      : `Pertaining to ${wordObj.word}.`;

    renderTags(dom.synonymsList, wordObj.synonyms, 'syn');
    renderTags(dom.antonymsList, wordObj.antonyms, 'ant');
    renderExamples(wordObj.examples);

    // Learned button state
    const isLearned = state.wordsLearned.includes(wordObj.word);
    dom.learnedBtn.classList.toggle('is-learned', isLearned);
    dom.learnedBtn.innerHTML = isLearned ? '&#10003; Learned!' : '&#10003; I Know This';

    updateStreak();
    addXP(REWARDS.VIEW_WORD, dom.nextBtn);
    saveState();
    renderUI();
  }

  function renderTags(container, items, cls) {
    if (!items || items.length === 0) {
      container.innerHTML = '<span class="no-data">—</span>';
      return;
    }
    container.innerHTML = '';
    items.forEach((item, i) => {
      const tag = document.createElement('span');
      tag.className = `tag ${cls} stagger`;
      tag.textContent = item;
      tag.style.animationDelay = (i * 0.05) + 's';
      tag.addEventListener('click', () => {
        showWord(item);
        showToast(`Forging synonym "${item}"...`);
      });
      container.appendChild(tag);
    });
  }

  function renderExamples(examples) {
    dom.exampleList.innerHTML = '';
    (examples || []).forEach((ex, i) => {
      const li = document.createElement('li');
      li.className = 'example-item stagger';
      li.style.animationDelay = (i * 0.07) + 's';
      li.textContent = `"${ex}"`;
      dom.exampleList.appendChild(li);
    });
  }

  /* ==================== QUIZ CHALLENGE ==================== */

  let quizState = { questions: [], current: 0, score: 0, answeredCurrent: false, consecutiveCorrect: 0 };

  async function generateQuiz() {
    const pool = state.wordsLearned.length >= 4
      ? state.wordsLearned
      : (Object.keys(dictCache).length >= 4 ? Object.keys(dictCache) : CURATED_BANK.map(w => w.word));

    if (pool.length < 4) {
      renderQuizEmpty();
      return;
    }

    const questions = [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const count = Math.min(10, shuffled.length);

    for (let i = 0; i < count; i++) {
      const target = shuffled[i];
      const wordData = await fetchWordData(target);
      if (!wordData || !wordData.definitions || !wordData.definitions.length) continue;

      const type = Math.random() < 0.5 ? 'def2word' : 'word2def';
      const wrongPool = pool.filter(w => w !== target);
      const wrongWords = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);
      const wrongDatas = await Promise.all(wrongWords.map(w => fetchWordData(w)));

      if (type === 'word2def') {
        const options = [
          { text: wordData.definitions[0], correct: true },
          ...wrongDatas.filter(Boolean).map(w => ({ text: w.definitions[0], correct: false }))
        ].sort(() => Math.random() - 0.5);

        questions.push({
          type: 'word2def',
          typeLabel: 'What does this word mean?',
          prompt: wordData.word,
          options,
          correctWord: wordData.word,
        });
      } else {
        const options = [
          { text: wordData.word, correct: true },
          ...wrongDatas.filter(Boolean).map(w => ({ text: w.word, correct: false }))
        ].sort(() => Math.random() - 0.5);

        questions.push({
          type: 'def2word',
          typeLabel: 'Which word matches this definition?',
          prompt: wordData.definitions[0],
          options,
          correctWord: wordData.word,
        });
      }
    }

    quizState = { questions, current: 0, score: 0, answeredCurrent: false, consecutiveCorrect: 0 };
    renderQuizQuestion();
  }

  function renderQuizEmpty() {
    dom.quizCard.innerHTML = `
      <div class="quiz-empty">
        <span class="quiz-empty-icon">📚</span>
        <h3>Learn More Words First</h3>
        <p>Mark at least 4 words as "I Know This" to unlock the interactive quiz challenge.</p>
      </div>
    `;
  }

  function renderQuizQuestion() {
    const q = quizState.questions[quizState.current];
    if (!q) {
      renderQuizResults();
      return;
    }

    const isWordPrompt = q.type === 'word2def';

    dom.quizCard.innerHTML = `
      <div class="quiz-header">
        <span class="quiz-progress">Question ${quizState.current + 1} / ${quizState.questions.length}</span>
        <span class="quiz-score">${quizState.score} XP</span>
      </div>
      <div class="quiz-type-label">${q.typeLabel}</div>
      <div class="quiz-prompt">${isWordPrompt ? `<span class="quiz-highlight">${q.prompt}</span>` : q.prompt}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" data-correct="${opt.correct}">${opt.text}</button>
        `).join('')}
      </div>
    `;

    dom.quizCard.style.animation = 'none';
    void dom.quizCard.offsetHeight;
    dom.quizCard.style.animation = '';

    quizState.answeredCurrent = false;

    dom.quizCard.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', handleQuizAnswer);
    });
  }

  function handleQuizAnswer(e) {
    if (quizState.answeredCurrent) return;
    quizState.answeredCurrent = true;

    const btn = e.currentTarget;
    const isCorrect = btn.dataset.correct === 'true';

    dom.quizCard.querySelectorAll('.quiz-option').forEach(opt => {
      opt.classList.add('disabled');
      if (opt.dataset.correct === 'true') opt.classList.add('correct');
    });

    if (isCorrect) {
      btn.classList.add('correct');
      quizState.score += REWARDS.QUIZ_CORRECT;
      state.quizCorrect++;
      quizState.consecutiveCorrect++;
      addXP(REWARDS.QUIZ_CORRECT, btn);

      if (quizState.consecutiveCorrect >= 5) unlockAchievement('quiz_five');
    } else {
      btn.classList.add('wrong');
      quizState.consecutiveCorrect = 0;
    }

    state.quizTotal++;
    saveState();
    renderUI();

    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    nextBtn.textContent = quizState.current < quizState.questions.length - 1 ? 'Next Question →' : 'See Results';
    nextBtn.addEventListener('click', () => {
      quizState.current++;
      renderQuizQuestion();
    });

    dom.quizCard.appendChild(nextBtn);
  }

  function renderQuizResults() {
    const total = quizState.questions.length;
    const correct = quizState.score / REWARDS.QUIZ_CORRECT;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    if (pct === 100 && total > 0) unlockAchievement('quiz_perfect');

    let ratingText = 'Keep practicing!';
    if (pct >= 90) ratingText = 'Outstanding Mastery!';
    else if (pct >= 70) ratingText = 'Great Vocabulary!';
    else if (pct >= 50) ratingText = 'Solid Effort!';

    dom.quizCard.innerHTML = `
      <div class="quiz-results">
        <div class="quiz-type-label">Quiz Complete</div>
        <div class="quiz-results-score">${pct}%</div>
        <div class="quiz-results-label">${Math.round(correct)} / ${total} correct — ${ratingText}</div>
        <button class="quiz-next-btn" id="quizRetryBtn">Take Another Quiz</button>
      </div>
    `;

    dom.quizCard.style.animation = 'none';
    void dom.quizCard.offsetHeight;
    dom.quizCard.style.animation = '';

    $('#quizRetryBtn').addEventListener('click', generateQuiz);
    if (pct >= 70) spawnParticles();
  }

  /* ==================== RENDER UI ==================== */

  function renderUI() {
    dom.usernameDisplay.textContent = state.user.name;
    dom.usernameInput.value = state.user.name === 'Guest' ? '' : state.user.name;

    const levelInfo = getLevelInfo(state.xp);
    dom.levelPill.textContent = `Lv ${levelInfo.level}`;

    dom.statWords.textContent = state.wordsLearned.length;
    animateCounter(dom.statXP, state.xp);
    dom.statSpeaking.textContent = state.speakingPoints || 0;
    dom.statStreak.textContent = state.streak;
    dom.statAccuracy.textContent = state.quizTotal > 0
      ? Math.round((state.quizCorrect / state.quizTotal) * 100) + '%'
      : '—';

    const prog = getXPProgress();
    dom.xpFill.style.width = prog.pct + '%';
    dom.xpFill.classList.toggle('active', prog.pct > 0 && prog.pct < 100);
    dom.xpText.textContent = prog.label;

    dom.pStatXP.textContent = state.xp;
    dom.pStatLevel.textContent = levelInfo.level;
    dom.pStatWords.textContent = state.wordsLearned.length;
    dom.pStatSpeaking.textContent = state.speakingPoints || 0;
    dom.pStatStreak.textContent = state.bestStreak;
    dom.pStatQuizzes.textContent = state.quizTotal;
    dom.pStatAccuracy.textContent = state.quizTotal > 0
      ? Math.round((state.quizCorrect / state.quizTotal) * 100) + '%'
      : '—';
    dom.pTitle.textContent = levelInfo.title;

    if (dom.wordBankCount) dom.wordBankCount.textContent = `${CATALOG.length.toLocaleString()}`;
    if (dom.cachedCount) dom.cachedCount.textContent = `${Object.keys(dictCache).length + CURATED_BANK.length}`;

    renderLearnedWordsList();
    renderAchievements();
  }

  function animateCounter(el, target) {
    const current = parseInt(el.textContent) || 0;
    if (current === target) return;
    const diff = target - current;
    const steps = Math.min(Math.abs(diff), 18);
    const increment = diff / steps;
    let step = 0;

    function tick() {
      step++;
      if (step >= steps) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.round(current + increment * step);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderLearnedWordsList() {
    if (state.wordsLearned.length === 0) {
      dom.learnedWordsList.innerHTML = '<span class="no-data">No words learned yet</span>';
      return;
    }
    dom.learnedWordsList.innerHTML = state.wordsLearned.map(w =>
      `<span class="learned-word-tag">${w}</span>`
    ).join('');
  }

  function renderAchievements() {
    dom.achievementsGrid.innerHTML = ACHIEVEMENTS.map(a => {
      const unlocked = state.achievements.includes(a.id);
      return `
        <div class="achievement ${unlocked ? 'unlocked' : ''}">
          <span class="achievement-icon">${a.icon}</span>
          <div class="achievement-info">
            <span class="achievement-name">${a.name}</span>
            <span class="achievement-desc">${a.desc}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==================== PANELS (PROFILE & SETTINGS) ==================== */

  function isAnyPanelOpen() {
    return (
      (dom.profilePanel && dom.profilePanel.classList.contains('open')) ||
      (dom.settingsPanel && dom.settingsPanel.classList.contains('open'))
    );
  }

  function syncScrollLock() {
    if (isAnyPanelOpen()) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  function syncToggleStates() {
    const isProfOpen = dom.profilePanel && dom.profilePanel.classList.contains('open');
    const isSetOpen = dom.settingsPanel && dom.settingsPanel.classList.contains('open');

    if (dom.profileToggle) dom.profileToggle.classList.toggle('active', !!isProfOpen);
    if (dom.settingsToggle) dom.settingsToggle.classList.toggle('active', !!isSetOpen);
  }

  function openProfile() {
    if (dom.settingsPanel) dom.settingsPanel.classList.remove('open');
    if (dom.profilePanel) dom.profilePanel.classList.add('open');
    if (dom.panelOverlay) dom.panelOverlay.classList.add('open');
    syncToggleStates();
    syncScrollLock();
    renderUI();
  }

  function closeProfile() {
    if (dom.profilePanel) dom.profilePanel.classList.remove('open');
    if (!dom.settingsPanel || !dom.settingsPanel.classList.contains('open')) {
      if (dom.panelOverlay) dom.panelOverlay.classList.remove('open');
    }
    syncToggleStates();
    syncScrollLock();
  }

  function toggleProfile() {
    if (dom.profilePanel && dom.profilePanel.classList.contains('open')) {
      closeProfile();
    } else {
      openProfile();
    }
  }

  function openSettings() {
    if (dom.profilePanel) dom.profilePanel.classList.remove('open');
    if (dom.settingsPanel) dom.settingsPanel.classList.add('open');
    if (dom.panelOverlay) dom.panelOverlay.classList.add('open');
    syncToggleStates();
    syncScrollLock();
    renderUI();
  }

  function closeSettings() {
    if (dom.settingsPanel) dom.settingsPanel.classList.remove('open');
    if (!dom.profilePanel || !dom.profilePanel.classList.contains('open')) {
      if (dom.panelOverlay) dom.panelOverlay.classList.remove('open');
    }
    syncToggleStates();
    syncScrollLock();
  }

  function toggleSettings() {
    if (dom.settingsPanel && dom.settingsPanel.classList.contains('open')) {
      closeSettings();
    } else {
      openSettings();
    }
  }

  function closeAllPanels() {
    if (dom.profilePanel) dom.profilePanel.classList.remove('open');
    if (dom.settingsPanel) dom.settingsPanel.classList.remove('open');
    if (dom.panelOverlay) dom.panelOverlay.classList.remove('open');
    syncToggleStates();
    syncScrollLock();
  }

  /* ==================== EVENT LISTENERS ==================== */

  // Next Word (Draw from 17,000+ words)
  dom.nextBtn.addEventListener('click', () => {
    triggerHaptic('light');
    const nextWord = getRandomWordFromCatalog();
    showWord(nextWord);
  });

  // Search / Explore any word
  function executeSearch() {
    const term = dom.wordSearchInput.value.trim().toLowerCase();
    if (!term) return;
    triggerHaptic('light');
    state.exploredCount = (state.exploredCount || 0) + 1;
    showWord(term);
    showToast(`🔍 Forged: "${term}"`);
    dom.wordSearchInput.value = '';
    checkAchievements();
  }

  dom.wordSearchBtn.addEventListener('click', executeSearch);
  dom.wordSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') executeSearch();
  });

  // Mark as Learned
  dom.learnedBtn.addEventListener('click', () => {
    if (!currentWord) return;
    triggerHaptic('medium');
    const word = currentWord.word;
    if (!state.wordsLearned.includes(word)) {
      state.wordsLearned.push(word);
      dom.learnedBtn.classList.add('is-learned');
      dom.learnedBtn.innerHTML = '&#10003; Learned!';
      addXP(REWARDS.MARK_LEARNED, dom.learnedBtn);
      showToast(`✓ "${word}" added to your vocabulary!`);
    } else {
      state.wordsLearned = state.wordsLearned.filter(w => w !== word);
      dom.learnedBtn.classList.remove('is-learned');
      dom.learnedBtn.innerHTML = '&#10003; I Know This';
      showToast(`Removed "${word}" from learned list`);
    }
    saveState();
    renderUI();
    checkAchievements();
  });

  // Listen to word pronunciation (Plays or stops on tap)
  dom.speakWordBtn.addEventListener('click', () => {
    if (!currentWord) return;
    playPronunciation(currentWord);
    state.speakCount++;
    saveState();
    if (state.speakCount <= 1 || state.speakCount === 10) {
      addXP(REWARDS.SPEAK_WORD, dom.speakWordBtn);
    }
    checkAchievements();
  });

  // Speak word into microphone
  dom.recordWordBtn.addEventListener('click', () => {
    triggerHaptic('light');
    startWordRecording();
  });

  // Read examples aloud (TTS toggle play/stop on tap)
  dom.speakExamplesBtn.addEventListener('click', () => {
    toggleReadExamples();
  });

  // Speak sentence into microphone
  dom.recordExamplesBtn.addEventListener('click', () => {
    triggerHaptic('light');
    startSentenceRecording();
  });

  // Touch Swipe Gesture on Word Card (Left swipe: Next Word, Right swipe: Mark Learned)
  let touchStartX = 0;
  let touchStartY = 0;

  dom.wordCard.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }
  }, { passive: true });

  dom.wordCard.addEventListener('touchend', (e) => {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    const diffX = touchStartX - e.changedTouches[0].screenX;
    const diffY = touchStartY - e.changedTouches[0].screenY;

    if (Math.abs(diffX) > 65 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        // Swiped Left -> Next Word
        triggerHaptic('light');
        dom.nextBtn.click();
      } else {
        // Swiped Right -> Toggle Learned
        triggerHaptic('medium');
        dom.learnedBtn.click();
      }
    }
  }, { passive: true });

  // Mode Tabs
  dom.tabLearn.addEventListener('click', () => switchMode('learn'));
  dom.tabQuiz.addEventListener('click', () => switchMode('quiz'));

  function switchMode(mode) {
    stopAllSpeech();
    triggerHaptic('light');
    dom.tabLearn.classList.toggle('active', mode === 'learn');
    dom.tabQuiz.classList.toggle('active', mode === 'quiz');
    dom.learnSection.classList.toggle('hidden', mode !== 'learn');
    dom.quizSection.classList.toggle('hidden', mode !== 'quiz');

    if (mode === 'quiz') generateQuiz();
  }

  // Panel Toggles
  dom.profileToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleProfile();
  });
  dom.panelClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeProfile();
  });
  dom.settingsToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSettings();
  });
  dom.settingsClose.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeSettings();
  });
  dom.panelOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeAllPanels();
  });

  // Theme Toggle
  dom.themeToggle.addEventListener('click', () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme} theme`);
  });

  // Pre-cache batch for offline
  dom.precacheBtn.addEventListener('click', async () => {
    dom.precacheBtn.disabled = true;
    dom.precacheBtn.innerHTML = 'Caching...';
    let added = 0;
    const uncached = CATALOG.filter(w => !dictCache[w.toLowerCase()]).slice(0, 20);

    for (const w of uncached) {
      await fetchWordData(w);
      added++;
      dom.precacheBtn.innerHTML = `Caching (${added}/20)...`;
    }

    renderUI();
    dom.precacheBtn.disabled = false;
    dom.precacheBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
      Pre-cache 20 Words for Offline
    `;
    showToast(`✅ Pre-cached 20 words for offline study!`);
  });

  // Save username
  dom.saveUsernameBtn.addEventListener('click', () => {
    const name = dom.usernameInput.value.trim();
    if (name) {
      state.user.name = name;
      saveState();
      renderUI();
      showToast(`Username set to "${name}"`);
    }
  });
  dom.usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') dom.saveUsernameBtn.click();
  });

  // Export JSON
  dom.exportBtn.addEventListener('click', () => {
    const data = {
      version: 2,
      app: 'WordForge',
      exportDate: new Date().toISOString(),
      ...state,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('📦 Progress exported to JSON!');
  });

  // Import JSON
  dom.importBtn.addEventListener('click', () => dom.importFileInput.click());
  dom.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.app !== 'WordForge' && !data.user) {
          showToast('❌ Invalid save file format');
          return;
        }
        const keys = Object.keys(defaultState());
        keys.forEach(k => {
          if (data[k] !== undefined) state[k] = data[k];
        });
        saveState();
        applyTheme(state.theme || 'dark');
        renderUI();
        if (state.currentWord) {
          showWord(state.currentWord);
        }
        showToast('✅ Progress imported successfully!');
        closeAllPanels();
      } catch (err) {
        showToast('❌ Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  // Reset Progress
  dom.resetBtn.addEventListener('click', () => {
    if (!confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) return;
    const savedTheme = state.theme;
    state = defaultState();
    state.theme = savedTheme;
    saveState();
    currentWord = null;
    replenishDeck();
    renderUI();

    dom.theWord.textContent = 'WordForge';
    dom.phonetic.textContent = 'Search or press "Next Word" to begin';
    dom.posBadge.textContent = '—';
    dom.definitionText.textContent = 'Explore over 17,000+ words. Hit Next Word or type any word to begin your journey!';
    dom.synonymsList.innerHTML = '<span class="no-data">—</span>';
    dom.antonymsList.innerHTML = '<span class="no-data">—</span>';
    dom.exampleList.innerHTML = '<li class="example-item">Ready to expand your vocabulary across thousands of words?</li>';
    dom.learnedBtn.classList.remove('is-learned');
    dom.learnedBtn.innerHTML = '&#10003; I Know This';
    hideSpeechFeedback(dom.wordSpeechResult);
    hideSpeechFeedback(dom.sentenceSpeechResult);

    showToast('🗑️ Progress has been reset');
    closeAllPanels();
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isAnyPanelOpen() || (dom.levelUpOverlay && dom.levelUpOverlay.classList.contains('show'))) {
        e.preventDefault();
        closeAllPanels();
        if (dom.levelUpOverlay) dom.levelUpOverlay.classList.remove('show');
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        return;
      }
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'n' || e.key === 'N' || e.key === ' ') {
      e.preventDefault();
      dom.nextBtn.click();
    }
    if (e.key === 'l' || e.key === 'L') {
      dom.learnedBtn.click();
    }
    if (e.key === 's' || e.key === 'S') {
      dom.speakWordBtn.click();
    }
    if (e.key === 'r' || e.key === 'R') {
      dom.speakExamplesBtn.click();
    }
    if (e.key === '/' || e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      dom.wordSearchInput.focus();
    }
  });

  /* ==================== INITIALIZATION ==================== */

  function init() {
    replenishDeck();
    applyTheme(state.theme || 'dark');
    renderUI();
    renderAchievements();

    if (state.currentWord) {
      showWord(state.currentWord);
    } else {
      // Pick initial random word
      const initialWord = getRandomWordFromCatalog();
      showWord(initialWord);
    }
  }

  init();

})();
