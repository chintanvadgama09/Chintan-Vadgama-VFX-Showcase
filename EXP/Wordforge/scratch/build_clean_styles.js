const fs = require('fs');

const cleanCss = `/* ============================================================
   WORDFORGE — COMPONENT STYLES & ANIMATIONS
   ============================================================
   All layout, component, and animation styles.
   Uses tokens from style-guide.css exclusively.
   ============================================================ */

/* ==================== GLOBAL SCROLL LOCK ==================== */

body.no-scroll {
  overflow: hidden !important;
  touch-action: none;
}

/* ==================== LAYOUT ==================== */

#app {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--sp-4);
  padding-bottom: var(--sp-20);
  position: relative;
}

/* ==================== HEADER ==================== */

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
  padding: 0 var(--sp-2);
  position: sticky;
  top: 0;
  background: var(--c-bg);
  z-index: var(--z-sticky);
  border-bottom: 1px solid var(--c-border);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}

.brand-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-accent);
  color: var(--c-text-inverse);
  border-radius: var(--r-md);
  font-weight: var(--fw-bold);
  font-size: var(--fs-sm);
  font-family: var(--f-display);
}

.brand-name {
  font-family: var(--f-display);
  font-size: var(--fs-lg);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-tight);
  color: var(--c-text);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
}

.settings-toggle {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
  transition: all var(--dur-normal) var(--ease-out);
  background: var(--c-bg-raised);
  cursor: pointer;
  touch-action: manipulation;
}
.settings-toggle:hover {
  border-color: var(--c-border-hover);
  color: var(--c-text);
  background: var(--c-bg-elevated);
}
.settings-toggle:active {
  transform: scale(0.94);
}
.settings-toggle.active {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: var(--c-accent-dim);
}
.settings-toggle svg {
  pointer-events: none;
}

.profile-toggle {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-1) var(--sp-3);
  border-radius: var(--r-full);
  border: 1px solid var(--c-border);
  transition: all var(--dur-normal) var(--ease-out);
  background: var(--c-bg-raised);
  cursor: pointer;
  touch-action: manipulation;
}
.profile-toggle:hover {
  border-color: var(--c-border-hover);
  background: var(--c-bg-elevated);
}
.profile-toggle:active {
  transform: scale(0.96);
}
.profile-toggle.active {
  border-color: var(--c-accent);
  background: var(--c-accent-dim);
}

.username-display {
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text-secondary);
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level-pill {
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  background: var(--c-accent-dim);
  color: var(--c-accent);
  padding: 2px 8px;
  border-radius: var(--r-full);
}

/* ==================== STATS STRIP ==================== */

.stats-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--sp-2);
  padding: var(--sp-3) 0 var(--sp-4) 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--sp-2) var(--sp-1);
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  transition: border-color var(--dur-fast);
}
.stat-item:hover {
  border-color: var(--c-border-hover);
}

.stat-num {
  font-family: var(--f-mono);
  font-size: var(--fs-md);
  font-weight: var(--fw-bold);
  color: var(--c-text);
  line-height: 1.2;
}

.stat-lbl {
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  margin-top: 2px;
}

.stat-item.streak .stat-num {
  color: var(--c-warning);
}
.stat-item.voice .stat-num {
  color: var(--c-info);
}

/* ==================== XP BAR ==================== */

.xp-bar-wrapper {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: 0 0 var(--sp-3) 0;
}

.xp-bar {
  flex: 1;
  height: 6px;
  background: var(--c-bg-elevated);
  border-radius: var(--r-full);
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--c-accent) 0%, var(--c-accent-hover) 100%);
  border-radius: var(--r-full);
  transition: width var(--dur-slow) var(--ease-out);
  box-shadow: var(--shadow-accent);
}

.xp-text {
  font-family: var(--f-mono);
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  min-width: 90px;
  text-align: right;
}

/* ==================== MODE TABS ==================== */

.mode-tabs {
  display: flex;
  gap: var(--sp-1);
  padding: 3px;
  background: var(--c-bg-raised);
  border-radius: var(--r-lg);
  border: 1px solid var(--c-border);
  margin-bottom: var(--sp-3);
}

.mode-tab {
  flex: 1;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--r-md);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--c-text-muted);
  transition: all var(--dur-normal) var(--ease-out);
  text-align: center;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  cursor: pointer;
}
.mode-tab:hover {
  color: var(--c-text-secondary);
}
.mode-tab.active {
  background: var(--c-bg-card);
  color: var(--c-accent);
  box-shadow: var(--shadow-sm);
}

/* ==================== SEARCH BAR ==================== */

.search-bar-wrap {
  margin-bottom: var(--sp-4);
  animation: fadeUp var(--dur-normal) var(--ease-out) both;
}

.search-input-group {
  display: flex;
  align-items: center;
  position: relative;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-xl);
  padding: 4px 6px 4px var(--sp-4);
  transition: all var(--dur-normal) var(--ease-out);
}
.search-input-group:focus-within {
  border-color: var(--c-accent);
  box-shadow: var(--shadow-accent);
}

.search-icon {
  color: var(--c-text-muted);
  flex-shrink: 0;
  margin-right: var(--sp-2);
}

.search-input-group input {
  flex: 1;
  background: transparent;
  border: none;
  padding: var(--sp-2) 0;
  font-size: var(--fs-sm);
  color: var(--c-text);
  outline: none;
}
.search-input-group input::placeholder {
  color: var(--c-text-muted);
}

.search-btn {
  padding: var(--sp-2) var(--sp-4);
  background: var(--c-accent-dim);
  color: var(--c-accent);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  border-radius: var(--r-lg);
  transition: all var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.search-btn:hover {
  background: var(--c-accent);
  color: var(--c-text-inverse);
}

/* ==================== WORD CARD ==================== */

.word-card {
  background: var(--c-bg-card);
  border-radius: var(--r-xl);
  border: 1px solid var(--c-border);
  padding: var(--card-padding);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
  animation: cardEnter var(--dur-slow) var(--ease-out) both;
}

.word-card.loading {
  position: relative;
  pointer-events: none;
}
.word-card.loading::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, var(--c-accent-dim) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: var(--r-xl);
  pointer-events: none;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-4);
}

.pos-badge {
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--c-text-muted);
  background: var(--c-bg-elevated);
  padding: 3px 10px;
  border-radius: var(--r-full);
  border: 1px solid var(--c-border);
}

.speak-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
  transition: all var(--dur-normal) var(--ease-out);
  background: var(--c-bg-elevated);
  cursor: pointer;
}
.speak-btn:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: var(--c-accent-dim);
}
.speak-btn:active {
  transform: scale(0.92);
}
.speak-btn svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
  pointer-events: none;
}

/* Speech Recording */
.record-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
  transition: all var(--dur-normal) var(--ease-out);
  background: var(--c-bg-elevated);
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
}
.record-btn:hover {
  border-color: var(--c-error);
  color: var(--c-error);
  background: var(--c-error-dim);
}
.record-btn:active {
  transform: scale(0.92);
}
.record-btn.recording {
  border-color: var(--c-error);
  color: #fff;
  background: var(--c-error);
  animation: recordPulse 1.2s ease infinite;
}
.record-btn svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
  pointer-events: none;
}

.record-examples-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-2);
  padding: var(--sp-2) var(--sp-4);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text-muted);
  border: 1px solid var(--c-border);
  border-radius: var(--r-full);
  background: var(--c-bg-raised);
  transition: all var(--dur-normal) var(--ease-out);
  cursor: pointer;
}
.record-examples-btn:hover {
  color: var(--c-error);
  border-color: var(--c-error);
  background: var(--c-error-dim);
}
.record-examples-btn.recording {
  color: #fff;
  background: var(--c-error);
  border-color: var(--c-error);
  animation: recordPulse 1.2s ease infinite;
}
.record-examples-btn svg {
  pointer-events: none;
}

/* Speech Result Feedback */
.speech-result {
  display: none;
  align-items: center;
  gap: var(--sp-2);
  margin-top: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--r-lg);
  font-size: var(--fs-sm);
  animation: fadeUp var(--dur-normal) var(--ease-out) both;
}
.speech-result.show {
  display: flex;
}
.speech-result.excellent {
  background: var(--c-success-dim);
  border: 1px solid rgba(74, 222, 128, 0.2);
  color: var(--c-success);
}
.speech-result.good {
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  color: var(--c-warning);
}
.speech-result.poor {
  background: var(--c-error-dim);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: var(--c-error);
}

.speech-result-icon {
  font-size: var(--fs-lg);
  flex-shrink: 0;
}
.speech-result-text {
  flex: 1;
  line-height: var(--lh-normal);
}
.speech-result-pct {
  font-family: var(--f-mono);
  font-weight: var(--fw-bold);
  font-size: var(--fs-md);
}

.speech-unsupported {
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  font-style: italic;
  margin-top: var(--sp-2);
  padding: var(--sp-2) var(--sp-3);
  background: var(--c-bg-elevated);
  border-radius: var(--r-md);
}

/* Word Body */
.word-body {
  text-align: center;
  padding: var(--sp-4) 0;
}

.the-word {
  font-family: var(--f-display);
  font-size: var(--fs-4xl);
  font-weight: var(--fw-regular);
  letter-spacing: var(--ls-tight);
  color: var(--c-text);
  line-height: 1.1;
  animation: wordReveal var(--dur-slow) var(--ease-spring) both;
}

.phonetic {
  font-family: var(--f-mono);
  font-size: var(--fs-sm);
  color: var(--c-accent);
  margin-top: var(--sp-2);
  display: inline-block;
  padding: 2px var(--sp-3);
  background: var(--c-accent-dim);
  border-radius: var(--r-full);
}

.card-divider {
  height: 1px;
  background: var(--c-border);
  margin: var(--sp-4) 0;
}

/* Definition Section */
.definition-section {
  padding: var(--sp-2) 0;
}

.section-label {
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--c-text-muted);
  margin-bottom: var(--sp-2);
}

.definition-text {
  font-size: var(--fs-md);
  line-height: var(--lh-relaxed);
  color: var(--c-text);
}

/* Synonyms & Antonyms */
.relations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4);
  padding: var(--sp-4) 0;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-1);
}

.tag {
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  padding: 3px 10px;
  border-radius: var(--r-full);
  transition: all var(--dur-fast);
  cursor: pointer;
  animation: tagPop var(--dur-normal) var(--ease-spring) both;
}
.tag.synonym {
  background: var(--c-accent-dim);
  color: var(--c-accent);
  border: 1px solid rgba(212, 168, 67, 0.2);
}
.tag.synonym:hover {
  background: var(--c-accent);
  color: var(--c-text-inverse);
}
.tag.antonym {
  background: rgba(255, 255, 255, 0.04);
  color: var(--c-text-secondary);
  border: 1px solid var(--c-border);
}
.tag.antonym:hover {
  background: var(--c-bg-elevated);
  color: var(--c-text);
}

.no-data {
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  font-style: italic;
}

/* Examples Section */
.examples-section {
  padding: var(--sp-3) 0;
  border-top: 1px solid var(--c-border);
}

.examples-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-3);
}

.speak-examples-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-1) var(--sp-3);
  border-radius: var(--r-full);
  border: 1px solid var(--c-border);
  font-size: var(--fs-xs);
  color: var(--c-text-secondary);
  background: var(--c-bg-raised);
  transition: all var(--dur-fast);
  cursor: pointer;
}
.speak-examples-btn:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: var(--c-accent-dim);
}
.speak-examples-btn svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
  pointer-events: none;
}

.example-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.example-item {
  font-size: var(--fs-sm);
  line-height: var(--lh-normal);
  color: var(--c-text-secondary);
  padding: var(--sp-3);
  background: var(--c-bg-raised);
  border-radius: var(--r-md);
  border-left: 2px solid var(--c-accent);
  animation: fadeUp var(--dur-normal) var(--ease-out) both;
}
.example-item:nth-child(2) {
  animation-delay: 0.08s;
}
.example-item:nth-child(3) {
  animation-delay: 0.16s;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: var(--sp-3);
  margin-top: var(--sp-6);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--c-border);
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: var(--sp-3) var(--sp-5);
  border-radius: var(--r-lg);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wide);
  transition: all var(--dur-normal) var(--ease-out);
  cursor: pointer;
}
.btn svg {
  pointer-events: none;
}

.btn-learned {
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
}
.btn-learned:hover {
  border-color: var(--c-success);
  color: var(--c-success);
  background: var(--c-success-dim);
}
.btn-learned.is-learned {
  background: var(--c-success-dim);
  border-color: var(--c-success);
  color: var(--c-success);
}

.btn-next {
  background: var(--c-accent);
  color: var(--c-text-inverse);
  box-shadow: var(--shadow-sm);
}
.btn-next:hover {
  background: var(--c-accent-hover);
  box-shadow: var(--shadow-accent);
}

/* ==================== QUIZ SECTION ==================== */

.quiz-card {
  background: var(--c-bg-card);
  border-radius: var(--r-xl);
  border: 1px solid var(--c-border);
  padding: var(--card-padding);
  box-shadow: var(--shadow-md);
  animation: cardEnter var(--dur-slow) var(--ease-out) both;
}

.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--sp-6);
}

.quiz-progress {
  font-size: var(--fs-sm);
  font-family: var(--f-mono);
  color: var(--c-text-muted);
}

.quiz-score {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--c-accent);
}

.quiz-type-label {
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--c-text-muted);
  margin-bottom: var(--sp-2);
}

.quiz-prompt {
  font-family: var(--f-display);
  font-size: var(--fs-2xl);
  color: var(--c-text);
  line-height: var(--lh-tight);
  margin-bottom: var(--sp-6);
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
  margin-bottom: var(--sp-6);
}

.quiz-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4);
  background: var(--c-bg-raised);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  font-size: var(--fs-sm);
  color: var(--c-text);
  text-align: left;
  transition: all var(--dur-fast) var(--ease-out);
  cursor: pointer;
}
.quiz-option:hover {
  border-color: var(--c-border-hover);
  background: var(--c-bg-elevated);
}
.quiz-option.correct {
  background: var(--c-success-dim);
  border-color: var(--c-success);
  color: var(--c-success);
}
.quiz-option.incorrect {
  background: var(--c-error-dim);
  border-color: var(--c-error);
  color: var(--c-error);
}
.quiz-option:disabled {
  cursor: default;
}

.quiz-feedback {
  padding: var(--sp-4);
  border-radius: var(--r-lg);
  font-size: var(--fs-sm);
  margin-bottom: var(--sp-6);
  display: none;
  animation: fadeUp var(--dur-normal) var(--ease-out) both;
}
.quiz-feedback.show {
  display: block;
}
.quiz-feedback.correct {
  background: var(--c-success-dim);
  border: 1px solid rgba(74, 222, 128, 0.2);
  color: var(--c-success);
}
.quiz-feedback.incorrect {
  background: var(--c-error-dim);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: var(--c-error);
}

.quiz-actions {
  display: flex;
  justify-content: flex-end;
}

.quiz-results {
  text-align: center;
  padding: var(--sp-8) var(--sp-4);
}

.quiz-results-title {
  font-family: var(--f-display);
  font-size: var(--fs-3xl);
  color: var(--c-text);
  margin-bottom: var(--sp-2);
}

.quiz-results-score {
  font-family: var(--f-mono);
  font-size: var(--fs-4xl);
  font-weight: var(--fw-bold);
  color: var(--c-accent);
  margin-bottom: var(--sp-2);
}

.quiz-results-label {
  font-size: var(--fs-sm);
  color: var(--c-text-secondary);
  margin-bottom: var(--sp-6);
}

/* ==================== COMMON PANELS & DRAWERS (PROFILE & SETTINGS) ==================== */

.panel-overlay {
  position: fixed;
  inset: 0;
  background: var(--c-bg-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: var(--z-overlay);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}
.panel-overlay.open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.profile-panel,
.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(440px, 92vw);
  height: 100vh;
  height: 100dvh;
  background: var(--c-bg-raised);
  border-left: 1px solid var(--c-border);
  box-shadow: -10px 0 35px rgba(0, 0, 0, 0.55);
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* Closed State: fully off-screen, non-blocking, zero interference */
  transform: translateX(105%);
  visibility: hidden;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.22s ease,
              visibility 0.32s ease;
}

.profile-panel.open,
.settings-panel.open {
  transform: translateX(0);
  visibility: visible;
  pointer-events: auto;
  opacity: 1;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-4) var(--sp-6);
  border-bottom: 1px solid var(--c-border);
  background: var(--c-bg-raised);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.panel-title {
  font-family: var(--f-display);
  font-size: var(--fs-xl);
  font-weight: var(--fw-regular);
  color: var(--c-text);
  margin: 0;
}

.panel-close {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--r-md);
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);
  flex-shrink: 0;
  touch-action: manipulation;
}
.panel-close:hover {
  background: var(--c-bg-card);
  border-color: var(--c-border-hover);
  color: var(--c-text);
}
.panel-close:active {
  transform: scale(0.92);
}
.panel-close svg {
  pointer-events: none;
  width: 18px;
  height: 18px;
}

.panel-body {
  padding: var(--sp-6);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--sp-6);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--c-border-hover) transparent;
}

.panel-section {
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}

.panel-section-title {
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--c-text-muted);
}

.panel-input-group {
  display: flex;
  gap: var(--sp-2);
}
.panel-input-group input {
  flex: 1;
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: var(--sp-2) var(--sp-3);
  font-size: var(--fs-sm);
  color: var(--c-text);
  outline: none;
  transition: all var(--dur-fast) var(--ease-out);
}
.panel-input-group input:focus {
  border-color: var(--c-accent);
  box-shadow: var(--shadow-accent);
  background: var(--c-bg-input);
}
.panel-input-group .save-btn {
  padding: var(--sp-2) var(--sp-4);
  background: var(--c-accent-dim);
  color: var(--c-accent);
  border: 1px solid transparent;
  border-radius: var(--r-md);
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: all var(--dur-fast) var(--ease-out);
  touch-action: manipulation;
}
.panel-input-group .save-btn:hover {
  background: var(--c-accent);
  color: var(--c-text-inverse);
}
.panel-input-group .save-btn:active {
  transform: scale(0.95);
}

/* Profile Stats Grid */
.profile-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-2);
}
.profile-stat {
  padding: var(--sp-3);
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: border-color var(--dur-fast);
}
.profile-stat:first-child {
  grid-column: span 2;
  background: linear-gradient(135deg, var(--c-bg-card) 0%, var(--c-bg-elevated) 100%);
  border-color: var(--c-border-accent);
}
.profile-stat:first-child .profile-stat-val {
  color: var(--c-accent);
  font-size: var(--fs-2xl);
}
.profile-stat-val {
  font-family: var(--f-mono);
  font-size: var(--fs-xl);
  font-weight: var(--fw-bold);
  color: var(--c-text);
  line-height: 1.2;
}
.profile-stat-lbl {
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: var(--ls-wide);
  margin-top: 2px;
}

/* Achievements */
.achievements-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--sp-2);
}
.achievement {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-4);
  background: var(--c-bg-card);
  border-radius: var(--r-md);
  border: 1px solid var(--c-border);
  opacity: 0.45;
  transition: all var(--dur-normal) var(--ease-out);
}
.achievement.unlocked {
  opacity: 1;
  border-color: var(--c-border-accent);
  background: linear-gradient(135deg, var(--c-bg-card), var(--c-bg-elevated));
}
.achievement-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-bg-raised);
  border-radius: var(--r-md);
}
.achievement-info {
  min-width: 0;
  flex: 1;
}
.achievement-name {
  font-size: var(--fs-sm);
  font-weight: var(--fw-semibold);
  color: var(--c-text);
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.achievement-desc {
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  display: block;
  white-space: normal;
  line-height: 1.4;
  margin-top: 2px;
}

/* Learned Words List */
.learned-words-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2);
  max-height: 160px;
  overflow-y: auto;
  padding: var(--sp-2);
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
}
.learned-word-tag {
  font-size: var(--fs-xs);
  padding: 3px 10px;
  background: var(--c-accent-dim);
  color: var(--c-accent);
  border-radius: var(--r-full);
  font-weight: var(--fw-medium);
  border: 1px solid rgba(212, 168, 67, 0.2);
}

/* Data Actions */
.data-actions {
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
}
.data-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  padding: var(--sp-3);
  border-radius: var(--r-md);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  border: 1px solid var(--c-border);
  background: var(--c-bg-card);
  color: var(--c-text-secondary);
  transition: all var(--dur-fast) var(--ease-out);
  cursor: pointer;
  touch-action: manipulation;
  width: 100%;
}
.data-btn:hover {
  border-color: var(--c-border-hover);
  color: var(--c-text);
  background: var(--c-bg-elevated);
}
.data-btn:active {
  transform: scale(0.98);
}
.data-btn svg {
  pointer-events: none;
}
.data-btn.danger {
  border-color: rgba(248, 113, 113, 0.2);
  background: var(--c-error-dim);
  color: var(--c-error);
}
.data-btn.danger:hover {
  border-color: var(--c-error);
  background: rgba(248, 113, 113, 0.2);
  color: #fff;
}

.hidden-input {
  display: none;
}

/* Theme Switch Row */
.theme-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-3);
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
}
.theme-switch-label {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text);
}
.theme-switch-label .icon {
  font-size: var(--fs-md);
}
.toggle-track {
  width: 44px;
  height: 24px;
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: var(--r-full);
  position: relative;
  cursor: pointer;
  transition: all var(--dur-normal) var(--ease-out);
  flex-shrink: 0;
  touch-action: manipulation;
}
.toggle-track:hover {
  border-color: var(--c-border-hover);
}
.toggle-track.on {
  background: var(--c-accent-dim);
  border-color: var(--c-accent);
}
.toggle-knob {
  width: 18px;
  height: 18px;
  background: var(--c-text-secondary);
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: all var(--dur-normal) var(--ease-spring);
}
.toggle-track.on .toggle-knob {
  transform: translateX(20px);
  background: var(--c-accent);
}

/* Word Counter Badge */
.word-counter {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  padding: var(--sp-3);
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  font-size: var(--fs-xs);
  color: var(--c-text-muted);
  line-height: 1.5;
}
.word-counter strong {
  color: var(--c-accent);
  font-family: var(--f-mono);
}

/* Shortcut Keys List */
.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: var(--sp-1);
  background: var(--c-bg-card);
  border: 1px solid var(--c-border);
  border-radius: var(--r-md);
  padding: var(--sp-2) var(--sp-3);
}
.shortcut-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sp-2) 0;
  font-size: var(--fs-sm);
  color: var(--c-text-secondary);
  border-bottom: 1px solid var(--c-border);
}
.shortcut-row:last-child {
  border-bottom: none;
}
.shortcut-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 24px;
  padding: 0 8px;
  font-family: var(--f-mono);
  font-size: var(--fs-xs);
  font-weight: var(--fw-semibold);
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border-hover);
  border-radius: var(--r-sm);
  color: var(--c-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* ==================== TOAST ==================== */

.toast-container {
  position: fixed;
  bottom: var(--sp-6);
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--sp-2);
  align-items: center;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-3) var(--sp-5);
  background: var(--c-bg-elevated);
  border: 1px solid var(--c-border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-lg);
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--c-text);
  pointer-events: auto;
  animation: toastIn var(--dur-slow) var(--ease-spring) both;
  white-space: nowrap;
}
.toast.achievement {
  border-color: var(--c-border-accent);
  box-shadow: var(--shadow-glow);
}
.toast.out {
  animation: toastOut var(--dur-normal) var(--ease-out) both;
}
.toast-icon {
  font-size: var(--fs-lg);
}

/* ==================== LEVEL UP OVERLAY ==================== */

.level-up-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--c-bg-overlay);
  z-index: var(--z-modal);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-slow) var(--ease-out);
}
.level-up-overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.level-up-content {
  text-align: center;
  animation: levelUpBounce var(--dur-slowest) var(--ease-spring) both;
}

.level-up-badge {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--sp-5);
  background: var(--c-accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--fs-3xl);
  box-shadow: var(--shadow-glow);
  animation: levelUpGlow 2s ease infinite;
}

.level-up-text {
  font-size: var(--fs-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--c-accent);
  font-weight: var(--fw-semibold);
  margin-bottom: var(--sp-2);
}

.level-up-level {
  font-family: var(--f-display);
  font-size: var(--fs-3xl);
  color: var(--c-text);
}

.level-up-title {
  font-size: var(--fs-md);
  color: var(--c-text-secondary);
  margin-top: var(--sp-1);
  margin-bottom: var(--sp-6);
}

.level-up-dismiss {
  padding: var(--sp-2) var(--sp-8);
  border-radius: var(--r-full);
  background: var(--c-accent);
  color: var(--c-text-inverse);
  font-weight: var(--fw-semibold);
  font-size: var(--fs-sm);
  transition: all var(--dur-fast);
  cursor: pointer;
}
.level-up-dismiss:hover {
  background: var(--c-accent-hover);
}

/* ==================== XP POPUP ==================== */

.xp-popup {
  position: fixed;
  font-family: var(--f-mono);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  color: var(--c-accent);
  pointer-events: none;
  z-index: var(--z-tooltip);
  animation: xpFloat 1.2s var(--ease-out) forwards;
}

/* ==================== PARTICLES ==================== */

.particle {
  position: fixed;
  pointer-events: none;
  z-index: var(--z-overlay);
  border-radius: 50%;
  animation: particleFly 1s var(--ease-out) forwards;
}

/* ==================== UTILITY ==================== */

.hidden { display: none !important; }

/* ==================== KEYFRAMES ==================== */

@keyframes cardEnter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wordReveal {
  0% {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes tagPop {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-6px); }
  30% { transform: translateX(5px); }
  45% { transform: translateX(-4px); }
  60% { transform: translateX(3px); }
  75% { transform: translateX(-2px); }
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes toastOut {
  to {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
}

@keyframes levelUpBounce {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes levelUpGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(212,168,67,0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(212,168,67,0.5), 0 0 60px rgba(212,168,67,0.2);
  }
}

@keyframes xpFloat {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(1.3);
  }
}

@keyframes particleFly {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--px), var(--py)) scale(0);
  }
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

@keyframes recordPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(248, 113, 113, 0);
  }
}

.skeleton {
  background: linear-gradient(90deg, var(--c-bg-elevated) 25%, var(--c-bg-card) 50%, var(--c-bg-elevated) 75%);
  background-size: 400px 100%;
  animation: shimmer 1.5s ease infinite;
  border-radius: var(--r-md);
}

/* ============================================================
   RESPONSIVE (PHONE & MOBILE VIEWPORTS)
   ============================================================
   Must remain at the very end of this stylesheet to properly
   override desktop base styles without cascade conflicts.
   ============================================================ */

@media (max-width: 600px) {
  :root {
    --card-padding: var(--sp-4);
    --header-h: 52px;
  }

  body.no-scroll {
    overflow: hidden !important;
    touch-action: none;
  }

  #app {
    padding: 0 var(--sp-3);
    padding-bottom: 84px;
  }

  .app-header {
    height: var(--header-h);
    padding: 0 var(--sp-1);
  }

  .brand-name {
    font-size: 1.15rem;
  }

  .header-right {
    gap: var(--sp-2);
  }

  .settings-toggle {
    width: 38px;
    height: 38px;
  }

  .profile-toggle {
    padding: 4px 10px;
    font-size: 0.8rem;
  }

  /* Compact Stats Strip on Mobile */
  .stats-strip {
    grid-template-columns: repeat(5, 1fr);
    gap: 3px;
    padding: var(--sp-1) 0 var(--sp-2) 0;
  }

  .stat-item {
    padding: 4px 1px;
    border-radius: var(--r-sm);
  }

  .stat-num {
    font-size: 0.82rem;
  }

  .stat-lbl {
    font-size: 0.52rem;
    letter-spacing: 0.02em;
  }

  .xp-bar-wrapper {
    padding: 0 0 var(--sp-2) 0;
    gap: var(--sp-2);
  }
  .xp-text {
    font-size: 0.65rem;
    min-width: 70px;
  }

  .mode-tabs {
    margin-bottom: var(--sp-2);
  }
  .mode-tab {
    padding: 6px var(--sp-2);
    font-size: 0.75rem;
  }

  .search-bar-wrap {
    margin-bottom: var(--sp-3);
  }

  /* Dramatic Hero Word on Mobile */
  .the-word {
    font-size: 2.6rem;
    line-height: 1.1;
  }

  .phonetic {
    font-size: 0.8rem;
    padding: 2px 10px;
  }

  .definition-text {
    font-size: 0.98rem;
    line-height: 1.6;
  }

  .relations-grid {
    grid-template-columns: 1fr;
    gap: var(--sp-3);
    padding: var(--sp-4) var(--card-padding) 0;
  }

  .example-item {
    font-size: 0.86rem;
    padding: 10px 12px;
  }

  /* Mobile Sticky Action Bar for Thumb Access */
  .card-actions {
    position: sticky;
    bottom: 0;
    background: var(--c-bg-card);
    padding: var(--sp-3) var(--card-padding);
    margin-top: var(--sp-3);
    border-top: 1px solid var(--c-border);
    z-index: var(--z-sticky);
    box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.25);
  }

  .btn {
    padding: 11px 14px;
    font-size: 0.88rem;
  }

  .quiz-prompt {
    font-size: var(--fs-xl);
  }

  /* Tactile Mobile Touch Feedback */
  button, .tag, .quiz-option {
    touch-action: manipulation;
  }
  button:active, .tag:active, .quiz-option:active {
    transform: scale(0.95);
    opacity: 0.85;
  }

  /* ==================== MOBILE BOTTOM SHEET DRAWERS ==================== */
  .profile-panel,
  .settings-panel {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    max-width: 100vw;
    height: 86vh;
    height: 86dvh;
    max-height: 86vh;
    max-height: 86dvh;
    border-left: none;
    border-top: 1px solid var(--c-border);
    border-radius: 24px 24px 0 0;
    box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.75);

    /* Fully tucked below screen when closed */
    transform: translateY(105%);
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
    transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.22s ease,
                visibility 0.32s ease;
  }

  .profile-panel.open,
  .settings-panel.open {
    transform: translateY(0);
    visibility: visible;
    pointer-events: auto;
    opacity: 1;
  }

  .panel-header {
    padding: 22px var(--sp-5) var(--sp-3) var(--sp-5);
    position: relative;
  }

  /* Sleek bottom sheet pull handle indicator */
  .panel-header::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 4px;
    border-radius: 2px;
    background: var(--c-text-muted);
    opacity: 0.6;
  }

  .panel-close {
    width: 40px;
    height: 40px;
  }

  .panel-body {
    padding: var(--sp-4) var(--sp-5) var(--sp-12) var(--sp-5);
    gap: var(--sp-5);
    -webkit-overflow-scrolling: touch;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
`;

fs.writeFileSync('styles.css', cleanCss, 'utf8');
console.log('Successfully wrote clean, restructured styles.css!');
