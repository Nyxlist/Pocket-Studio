/**
 * js/modules/theme.js
 * Theme system:
 *   - Light / Dark toggle (persisted in localStorage)
 *   - Custom accent color picker (5 presets + free pick, persisted)
 *   - Custom body/card background for each mode (persisted)
 *   - Theme panel open/close via header button
 */

// ── Preset palettes ─────────────────────────────────────────────
const PRESETS = [
  { name: 'Indigo (Default)', light: '#6366f1', dark: '#818cf8' },
  { name: 'Violet',           light: '#7c3aed', dark: '#a78bfa' },
  { name: 'Rose',             light: '#e11d48', dark: '#fb7185' },
  { name: 'Amber',            light: '#d97706', dark: '#fbbf24' },
  { name: 'Emerald',          light: '#059669', dark: '#34d399' },
  { name: 'Sky',              light: '#0284c7', dark: '#38bdf8' },
  { name: 'Slate',            light: '#475569', dark: '#94a3b8' },
];

// Derive light variants from a hex accent
function hexToRgb(h) {
  h = h.replace('#','');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function lighten(hex, pct) {
  const [r,g,b] = hexToRgb(hex);
  const f = pct/100;
  return `rgb(${Math.round(r+f*(255-r))},${Math.round(g+f*(255-g))},${Math.round(b+f*(255-b))})`;
}
function darken(hex, pct) {
  const [r,g,b] = hexToRgb(hex);
  const f = 1 - pct/100;
  return `rgb(${Math.round(r*f)},${Math.round(g*f)},${Math.round(b*f)})`;
}

function applyAccent(hex, isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.style.setProperty('--accent',       hex);
    root.style.setProperty('--accent-hover', lighten(hex, 15));
    root.style.setProperty('--accent-light', `rgba(${hexToRgb(hex).join(',')},0.18)`);
    root.style.setProperty('--accent-dark',  lighten(hex, 20));
  } else {
    root.style.setProperty('--accent',       hex);
    root.style.setProperty('--accent-hover', darken(hex, 10));
    root.style.setProperty('--accent-light', `rgba(${hexToRgb(hex).join(',')},0.1)`);
    root.style.setProperty('--accent-dark',  darken(hex, 15));
  }
  // Sync asisten button & send button accent
  document.querySelectorAll('.asisten-btn, #asistenSend').forEach(el => {
    el.style.setProperty('background', hex);
  });
}

function applyBodyBg(hex, card, sidebarHex) {
  const root = document.documentElement;
  root.style.setProperty('--body-bg',        hex);
  root.style.setProperty('--card-bg',        card);
  root.style.setProperty('--sidebar-bg',     sidebarHex);
  document.body.style.backgroundColor = hex;
}

// ── Storage helpers ─────────────────────────────────────────────
const STORE_KEY = 'dkv-theme-v1';
function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function savePrefs(obj) {
  const cur = loadPrefs();
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...cur, ...obj }));
}

// ── Apply full theme from stored prefs ──────────────────────────
function applyStoredTheme() {
  const p = loadPrefs();
  const isDark = p.dark ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;

  if (isDark) { html.classList.add('dark'); }
  else        { html.classList.remove('dark'); }

  const accent = isDark
    ? (p.accentDark  ?? '#818cf8')
    : (p.accentLight ?? '#6366f1');
  applyAccent(accent, isDark);

  if (isDark) {
    applyBodyBg(
      p.bodyBgDark     ?? '#030712',
      p.cardBgDark     ?? '#111827',
      p.sidebarBgDark  ?? '#111827'
    );
  } else {
    applyBodyBg(
      p.bodyBgLight    ?? '#f9fafb',
      p.cardBgLight    ?? '#ffffff',
      p.sidebarBgLight ?? '#ffffff'
    );
  }
}

// ── Build theme panel HTML ──────────────────────────────────────
function buildThemePanel(container) {
  const isDark = document.documentElement.classList.contains('dark');
  const p = loadPrefs();
  const curAccent = isDark ? (p.accentDark ?? '#818cf8') : (p.accentLight ?? '#6366f1');

  container.innerHTML = `
    <div class="flex items-center justify-between mb-5">
      <div>
        <p class="font-display font-bold text-sm">Kustomisasi Tampilan</p>
        <p class="text-xs text-gray-400 mt-0.5">Preferensi disimpan otomatis</p>
      </div>
      <button id="themePanelClose" class="w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Mode toggle -->
    <div class="mb-6">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Mode Tampilan</p>
      <div class="flex gap-2">
        <button id="tpLight" class="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${!isDark ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}">
          ☀️ Light
        </button>
        <button id="tpDark" class="flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${isDark ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}">
          🌙 Dark
        </button>
      </div>
    </div>

    <!-- Accent presets -->
    <div class="mb-5">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Warna Aksen</p>
      <div class="flex gap-2 flex-wrap mb-3">
        ${PRESETS.map(pr => {
          const clr = isDark ? pr.dark : pr.light;
          const sel = clr.toLowerCase() === curAccent.toLowerCase();
          return `<button class="theme-swatch ${sel ? 'selected' : ''}" style="background:${clr}" data-light="${pr.light}" data-dark="${pr.dark}" title="${pr.name}"></button>`;
        }).join('')}
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs text-gray-500 whitespace-nowrap">Custom:</label>
        <input type="color" id="tpAccentPicker" value="${curAccent}" class="w-10 h-8 rounded cursor-pointer border border-gray-200 dark:border-gray-700 flex-shrink-0"/>
        <span class="text-xs font-mono text-gray-400" id="tpAccentHex">${curAccent}</span>
      </div>
    </div>

    <!-- Background colors -->
    <div class="mb-5">
      <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Warna Background</p>
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <label class="text-xs text-gray-500 w-20 flex-shrink-0">Body BG</label>
          <input type="color" id="tpBodyBg" value="${isDark ? (p.bodyBgDark ?? '#030712') : (p.bodyBgLight ?? '#f9fafb')}" class="w-10 h-7 rounded cursor-pointer border border-gray-200 dark:border-gray-700"/>
          <span class="text-xs font-mono text-gray-400" id="tpBodyBgHex"></span>
        </div>
        <div class="flex items-center gap-3">
          <label class="text-xs text-gray-500 w-20 flex-shrink-0">Card BG</label>
          <input type="color" id="tpCardBg" value="${isDark ? (p.cardBgDark ?? '#111827') : (p.cardBgLight ?? '#ffffff')}" class="w-10 h-7 rounded cursor-pointer border border-gray-200 dark:border-gray-700"/>
          <span class="text-xs font-mono text-gray-400" id="tpCardBgHex"></span>
        </div>
        <div class="flex items-center gap-3">
          <label class="text-xs text-gray-500 w-20 flex-shrink-0">Sidebar BG</label>
          <input type="color" id="tpSidebarBg" value="${isDark ? (p.sidebarBgDark ?? '#111827') : (p.sidebarBgLight ?? '#ffffff')}" class="w-10 h-7 rounded cursor-pointer border border-gray-200 dark:border-gray-700"/>
          <span class="text-xs font-mono text-gray-400" id="tpSidebarBgHex"></span>
        </div>
      </div>
    </div>

    <!-- Reset -->
    <button id="tpReset" class="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">↺ Reset ke Default</button>

    <!-- Dot-color sync note -->
    <p class="text-xs text-gray-300 dark:text-gray-700 mt-4 text-center">Preferensi disimpan di browser &amp; tidak hilang saat refresh.</p>
  `;

  // Close button
  document.getElementById('themePanelClose')?.addEventListener('click', closeThemePanel);

  // Mode buttons
  document.getElementById('tpLight')?.addEventListener('click', () => { toggleMode(false); buildThemePanel(container); });
  document.getElementById('tpDark')?.addEventListener('click',  () => { toggleMode(true);  buildThemePanel(container); });

  // Preset swatches
  container.querySelectorAll('.theme-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      const isDarkNow = document.documentElement.classList.contains('dark');
      const hex = isDarkNow ? sw.dataset.dark : sw.dataset.light;
      applyAccent(hex, isDarkNow);
      isDarkNow ? savePrefs({ accentDark: hex }) : savePrefs({ accentLight: hex });
      buildThemePanel(container);
    });
  });

  // Custom accent picker
  const accentPicker = document.getElementById('tpAccentPicker');
  accentPicker?.addEventListener('input', () => {
    const isDarkNow = document.documentElement.classList.contains('dark');
    const hex = accentPicker.value;
    document.getElementById('tpAccentHex').textContent = hex;
    applyAccent(hex, isDarkNow);
    isDarkNow ? savePrefs({ accentDark: hex }) : savePrefs({ accentLight: hex });
    // deselect all swatches
    container.querySelectorAll('.theme-swatch').forEach(s => s.classList.remove('selected'));
  });

  // BG pickers
  function bindBgPicker(id, hexId, lightKey, darkKey, cssVar) {
    const el = document.getElementById(id);
    const hexEl = document.getElementById(hexId);
    if (!el || !hexEl) return;
    hexEl.textContent = el.value;
    el.addEventListener('input', () => {
      hexEl.textContent = el.value;
      const isDarkNow = document.documentElement.classList.contains('dark');
      document.documentElement.style.setProperty(cssVar, el.value);
      if (cssVar === '--body-bg') document.body.style.backgroundColor = el.value;
      if (cssVar === '--sidebar-bg') {
        document.querySelectorAll('.sidebar, .theme-panel').forEach(s => s.style.background = el.value);
      }
      isDarkNow ? savePrefs({ [darkKey]: el.value }) : savePrefs({ [lightKey]: el.value });
    });
  }
  bindBgPicker('tpBodyBg',    'tpBodyBgHex',    'bodyBgLight',    'bodyBgDark',    '--body-bg');
  bindBgPicker('tpCardBg',    'tpCardBgHex',    'cardBgLight',    'cardBgDark',    '--card-bg');
  bindBgPicker('tpSidebarBg', 'tpSidebarBgHex', 'sidebarBgLight', 'sidebarBgDark', '--sidebar-bg');

  // Reset
  document.getElementById('tpReset')?.addEventListener('click', () => {
    localStorage.removeItem(STORE_KEY);
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
    applyStoredTheme();
    buildThemePanel(container);
  });
}

// ── Panel open / close ──────────────────────────────────────────
function openThemePanel() {
  const panel   = document.getElementById('themePanel');
  const overlay = document.getElementById('themePanelOverlay');
  const content = document.getElementById('themePanelContent');
  buildThemePanel(content);
  panel?.classList.remove('translate-x-full');
  panel?.classList.add('translate-x-0');
  overlay?.classList.remove('hidden');
}
function closeThemePanel() {
  const panel   = document.getElementById('themePanel');
  const overlay = document.getElementById('themePanelOverlay');
  panel?.classList.add('translate-x-full');
  panel?.classList.remove('translate-x-0');
  overlay?.classList.add('hidden');
}

// ── Mode toggle ─────────────────────────────────────────────────
function toggleMode(dark) {
  const html = document.documentElement;
  const sun  = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');
  if (dark) {
    html.classList.add('dark');
    sun?.classList.remove('hidden');
    moon?.classList.add('hidden');
  } else {
    html.classList.remove('dark');
    sun?.classList.add('hidden');
    moon?.classList.remove('hidden');
  }
  savePrefs({ dark });
  // Re-apply accent for new mode
  const p = loadPrefs();
  const accent = dark ? (p.accentDark ?? '#818cf8') : (p.accentLight ?? '#6366f1');
  applyAccent(accent, dark);
  if (dark) {
    applyBodyBg(p.bodyBgDark ?? '#030712', p.cardBgDark ?? '#111827', p.sidebarBgDark ?? '#111827');
  } else {
    applyBodyBg(p.bodyBgLight ?? '#f9fafb', p.cardBgLight ?? '#ffffff', p.sidebarBgLight ?? '#ffffff');
  }
}

// ── Export ──────────────────────────────────────────────────────
export function initTheme() {
  // Apply saved prefs immediately
  applyStoredTheme();

  // Header theme-toggle button now just toggles mode
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    toggleMode(!isDark);
  });

  // Theme customizer button
  document.getElementById('themeCustomizeBtn')?.addEventListener('click', openThemePanel);

  // Overlay click closes panel
  document.getElementById('themePanelOverlay')?.addEventListener('click', closeThemePanel);
}
