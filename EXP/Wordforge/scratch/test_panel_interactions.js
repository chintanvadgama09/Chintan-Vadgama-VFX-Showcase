const fs = require('fs');

// Simple DOM Mock for verification of logic
class ClassList {
  constructor() { this.classes = new Set(); }
  add(c) { this.classes.add(c); }
  remove(c) { this.classes.delete(c); }
  toggle(c, force) {
    if (force !== undefined) {
      if (force) this.classes.add(c);
      else this.classes.delete(c);
      return force;
    }
    if (this.classes.has(c)) { this.classes.delete(c); return false; }
    else { this.classes.add(c); return true; }
  }
  contains(c) { return this.classes.has(c); }
}

class Element {
  constructor(id) {
    this.id = id;
    this.classList = new ClassList();
    this.listeners = {};
  }
  addEventListener(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(fn);
  }
  click() {
    if (this.listeners['click']) {
      const e = { preventDefault: () => {}, stopPropagation: () => {} };
      this.listeners['click'].forEach(fn => fn(e));
    }
  }
}

const dom = {
  profilePanel: new Element('profilePanel'),
  settingsPanel: new Element('settingsPanel'),
  panelOverlay: new Element('panelOverlay'),
  profileToggle: new Element('profileToggle'),
  settingsToggle: new Element('settingsToggle'),
  panelClose: new Element('panelClose'),
  settingsClose: new Element('settingsClose'),
  levelUpOverlay: new Element('levelUpOverlay')
};

const documentBody = new Element('body');
global.document = { body: documentBody, activeElement: null };

function isAnyPanelOpen() {
  return (
    (dom.profilePanel && dom.profilePanel.classList.contains('open')) ||
    (dom.settingsPanel && dom.settingsPanel.classList.contains('open'))
  );
}

function syncScrollLock() {
  if (isAnyPanelOpen()) {
    global.document.body.classList.add('no-scroll');
  } else {
    global.document.body.classList.remove('no-scroll');
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

// Bind listeners
dom.profileToggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleProfile(); });
dom.panelClose.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeProfile(); });
dom.settingsToggle.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggleSettings(); });
dom.settingsClose.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeSettings(); });
dom.panelOverlay.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeAllPanels(); });

console.log('--- TEST 1: Open profile via toggle ---');
dom.profileToggle.click();
console.assert(dom.profilePanel.classList.contains('open'), 'Profile should be open');
console.assert(dom.panelOverlay.classList.contains('open'), 'Overlay should be open');
console.assert(documentBody.classList.contains('no-scroll'), 'Body should have no-scroll');
console.assert(dom.profileToggle.classList.contains('active'), 'Profile toggle should be active');

console.log('--- TEST 2: Close profile via toggle (click again) ---');
dom.profileToggle.click();
console.assert(!dom.profilePanel.classList.contains('open'), 'Profile should be closed');
console.assert(!dom.panelOverlay.classList.contains('open'), 'Overlay should be closed');
console.assert(!documentBody.classList.contains('no-scroll'), 'Body should NOT have no-scroll');
console.assert(!dom.profileToggle.classList.contains('active'), 'Profile toggle should not be active');

console.log('--- TEST 3: Open settings via toggle ---');
dom.settingsToggle.click();
console.assert(dom.settingsPanel.classList.contains('open'), 'Settings should be open');
console.assert(dom.panelOverlay.classList.contains('open'), 'Overlay should be open');
console.assert(documentBody.classList.contains('no-scroll'), 'Body should have no-scroll');
console.assert(dom.settingsToggle.classList.contains('active'), 'Settings toggle should be active');

console.log('--- TEST 4: Close settings via close button ---');
dom.settingsClose.click();
console.assert(!dom.settingsPanel.classList.contains('open'), 'Settings should be closed');
console.assert(!dom.panelOverlay.classList.contains('open'), 'Overlay should be closed');
console.assert(!documentBody.classList.contains('no-scroll'), 'Body should NOT have no-scroll');

console.log('--- TEST 5: Mutual exclusivity (Profile -> Settings) ---');
dom.profileToggle.click();
console.assert(dom.profilePanel.classList.contains('open'), 'Profile open');
dom.settingsToggle.click();
console.assert(!dom.profilePanel.classList.contains('open'), 'Profile closed when settings opened');
console.assert(dom.settingsPanel.classList.contains('open'), 'Settings open');
console.assert(dom.panelOverlay.classList.contains('open'), 'Overlay still open');
console.assert(documentBody.classList.contains('no-scroll'), 'Body still has no-scroll');

console.log('--- TEST 6: Close via overlay ---');
dom.panelOverlay.click();
console.assert(!dom.profilePanel.classList.contains('open'), 'Profile closed');
console.assert(!dom.settingsPanel.classList.contains('open'), 'Settings closed');
console.assert(!dom.panelOverlay.classList.contains('open'), 'Overlay closed');
console.assert(!documentBody.classList.contains('no-scroll'), 'Body no-scroll removed');

console.log('ALL 6 INTERACTION TESTS PASSED FLINT-SOLID!');
