/**
 * js/app.js
 * DKV Pocket Studio — Main Application Entry Point
 * Imports and initialises all feature modules
 */

// ── Core UI ────────────────────────────────────────────────────
import { initTheme }         from './modules/theme.js';
import { initTabs }          from './modules/tabs.js';
import { initAsisten }       from './modules/asisten.js';
import { initReferences }    from './modules/references.js';
import { initI18n }          from './modules/i18n.js';

// ── Original 5 Features ────────────────────────────────────────
import { initFontPairing }   from './modules/font-pairing.js';
import { initContrast, copyHex } from './modules/contrast.js';
import { initCanvasRatio }   from './modules/canvas-ratio.js';
import { initMovements }     from './modules/movements.js';
import { initChecklist }     from './modules/checklist.js';

// ── New 10 Features ────────────────────────────────────────────
import { initBleedCalculator } from './modules/bleed-calculator.js';
import { initColorSpace }      from './modules/color-space.js';
import { initDpiChecker }      from './modules/dpi-checker.js';
import { initBriefGenerator }  from './modules/brief-generator.js';
import { initSelfCritique }    from './modules/self-critique.js';
import { initSquintTest }      from './modules/squint-test.js';
import { initTypeScale }       from './modules/type-scale.js';
import { initFontDirectory }   from './modules/font-directory.js';
import { initCaseStudy }       from './modules/case-study.js';
import { initMockup }          from './modules/mockup.js';

// Expose copyHex globally for inline onclick attributes
window.copyHex = copyHex;

document.addEventListener('DOMContentLoaded', () => {
  // Core
  initTheme();
  initTabs();
  initI18n();

  // Original features
  initFontPairing();
  initContrast();
  initCanvasRatio();
  initMovements();
  initChecklist();

  // New features
  initBleedCalculator();
  initColorSpace();
  initDpiChecker();
  initBriefGenerator();
  initSelfCritique();
  initSquintTest();
  initTypeScale();
  initFontDirectory();
  initCaseStudy();
  initMockup();
  initAsisten();
  initReferences();
});
