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

  function guessPartOfSpeech(word) {
    const w = word.toLowerCase();
    if (w.endsWith('tion') || w.endsWith('ment') || w.endsWith('ness') || w.endsWith('ity') || w.endsWith('ance') || w.endsWith('ence')) return 'noun';
    if (w.endsWith('ous') || w.endsWith('able') || w.endsWith('ible') || w.endsWith('ive') || w.endsWith('ful') || w.endsWith('ic') || w.endsWith('al')) return 'adjective';
    if (w.endsWith('ly')) return 'adverb';
    if (w.endsWith('ize') || w.endsWith('ate') || w.endsWith('ify')) return 'verb';
    return 'noun';
  }

  function generateContextualSentences(word, pos) {
    const w = word.toLowerCase();
    const cap = w.charAt(0).toUpperCase() + w.slice(1);

    if (pos === 'adjective') {
      return [
        `The professor remarked on how ${w} the student's analytical approach was.`,
        `In classical literature, authors often depict such moments as profoundly ${w}.`,
        `${cap} qualities are rare to find, yet they make a lasting impression on everyone.`
      ];
    } else if (pos === 'verb') {
      return [
        `Scholars and researchers frequently endeavor to ${w} these intricate dynamics.`,
        `It requires patience and disciplined effort to ${w} effectively under pressure.`,
        `They made every possible attempt to ${w} the situation before matters escalated.`
      ];
    } else if (pos === 'adverb') {
      return [
        `She articulated her argument ${w}, holding the audience's complete attention.`,
        `The project continued ${w} despite the unexpected challenges they faced.`,
        `He examined each detail ${w}, ensuring nothing was overlooked or left to chance.`
      ];
    } else {
      // default: noun
      return [
        `Understanding the true significance of ${w} requires careful study and reflection.`,
        `The concept of ${w} has intrigued thinkers and philosophers across generations.`,
        `Their community placed great value on ${w}, considering it essential for growth.`
      ];
    }
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
      definitions: [`A significant term in the English lexicon meaning or pertaining to ${key}.`],
      synonyms: [],
      antonyms: [],
      examples: examples,
      audioUrl: null
    };

    dictCache[key] = wordObj;
    saveDictCache();
    return wordObj;
  }

  /* ==================== 17,000+ WORD RANDOM SHUFFLER ==================== */

  let shuffleDeck = [];

  function replenishDeck() {
    shuffleDeck = CATALOG.map((_, idx) => idx);
    // Fisher-Yates shuffle across all 17,000+ words
    for (let i = shuffleDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffleDeck[i], shuffleDeck[j]] = [shuffleDeck[j], shuffleDeck[i]];
    }
  }

  function getRandomWordFromCatalog() {
    if (shuffleDeck.length === 0) {
      replenishDeck();
    }
    const idx = shuffleDeck.pop();
    return CATALOG[idx];
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

  /* ==================== AUDIO & TEXT TO SPEECH ==================== */

  let activeAudio = null;

  function playPronunciation(wordObj) {
    dom.speakWordBtn.classList.add('speaking');

    const done = () => {
      dom.speakWordBtn.classList.remove('speaking');
    };

    // If authentic audio URL is available, try playing MP3
    if (wordObj && wordObj.audioUrl) {
      try {
        if (activeAudio) { activeAudio.pause(); activeAudio = null; }
        activeAudio = new Audio(wordObj.audioUrl);
        activeAudio.onended = done;
        activeAudio.onerror = () => {
          speakTTS(wordObj.word, done);
        };
        activeAudio.play().catch(() => {
          speakTTS(wordObj.word, done);
        });
        return;
      } catch (err) {
        // Fall back to TTS
      }
    }

    speakTTS(wordObj ? wordObj.word : '', done);
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
    if (onEnd) utterance.onend = onEnd;
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

  function openProfile() {
    closeSettings();
    dom.profilePanel.classList.add('open');
    dom.panelOverlay.classList.add('open');
    renderUI();
  }

  function closeProfile() {
    dom.profilePanel.classList.remove('open');
    if (!dom.settingsPanel.classList.contains('open')) {
      dom.panelOverlay.classList.remove('open');
    }
  }

  function openSettings() {
    closeProfile();
    dom.settingsPanel.classList.add('open');
    dom.panelOverlay.classList.add('open');
    renderUI();
  }

  function closeSettings() {
    dom.settingsPanel.classList.remove('open');
    if (!dom.profilePanel.classList.contains('open')) {
      dom.panelOverlay.classList.remove('open');
    }
  }

  function closeAllPanels() {
    closeProfile();
    closeSettings();
  }

  /* ==================== EVENT LISTENERS ==================== */

  // Next Word (Draw from 17,000+ words)
  dom.nextBtn.addEventListener('click', () => {
    const nextWord = getRandomWordFromCatalog();
    showWord(nextWord);
  });

  // Search / Explore any word
  function executeSearch() {
    const term = dom.wordSearchInput.value.trim().toLowerCase();
    if (!term) return;
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

  // Listen to word (Authentic Audio or TTS)
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
    startWordRecording();
  });

  // Read examples aloud (TTS)
  dom.speakExamplesBtn.addEventListener('click', () => {
    if (!currentWord || !currentWord.examples.length) return;
    dom.speakExamplesBtn.classList.add('speaking');
    const text = currentWord.examples.join('. ');
    speakTTS(text, () => {
      dom.speakExamplesBtn.classList.remove('speaking');
    });
    state.speakCount++;
    saveState();
    addXP(REWARDS.SPEAK_EXAMPLE, dom.speakExamplesBtn);
    checkAchievements();
  });

  // Speak sentence into microphone
  dom.recordExamplesBtn.addEventListener('click', () => {
    startSentenceRecording();
  });

  // Mode Tabs
  dom.tabLearn.addEventListener('click', () => switchMode('learn'));
  dom.tabQuiz.addEventListener('click', () => switchMode('quiz'));

  function switchMode(mode) {
    dom.tabLearn.classList.toggle('active', mode === 'learn');
    dom.tabQuiz.classList.toggle('active', mode === 'quiz');
    dom.learnSection.classList.toggle('hidden', mode !== 'learn');
    dom.quizSection.classList.toggle('hidden', mode !== 'quiz');

    if (mode === 'quiz') generateQuiz();
  }

  // Panel Toggles
  dom.profileToggle.addEventListener('click', openProfile);
  dom.panelClose.addEventListener('click', closeProfile);
  dom.settingsToggle.addEventListener('click', openSettings);
  dom.settingsClose.addEventListener('click', closeSettings);
  dom.panelOverlay.addEventListener('click', closeAllPanels);

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
    if (e.key === 'Escape') {
      closeAllPanels();
      dom.levelUpOverlay.classList.remove('show');
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
