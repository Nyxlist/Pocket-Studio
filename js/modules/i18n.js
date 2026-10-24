/**
 * js/modules/i18n.js
 * Bilingual support: Bahasa Indonesia (id) ↔ English (en)
 * - Flag emoji shown in the toggle button reflects current language
 * - Preference persisted to localStorage
 * - All translatable strings carry a data-i18n="key" attribute in HTML;
 *   placeholders that need innerHTML (HTML tags) use data-i18n-html="key"
 */

export const STRINGS = {
  // ── Navigation groups ────────────────────────────────────────
  'nav.toolkit':    { id: 'Toolkit Harian',        en: 'Daily Toolkit' },
  'nav.print':      { id: 'Pra-Cetak & Produksi',  en: 'Pre-Print & Production' },
  'nav.assist':     { id: 'Asistensi & Review',     en: 'Assistance & Review' },
  'nav.asset':      { id: 'Tipografi & Aset',       en: 'Typography & Assets' },
  'nav.portfolio':  { id: 'Portofolio',             en: 'Portfolio' },
  // ── Nav items ────────────────────────────────────────────────
  'nav.font':       { id: 'Font Pairing',           en: 'Font Pairing' },
  'nav.contrast':   { id: 'WCAG Contrast',          en: 'WCAG Contrast' },
  'nav.canvas':     { id: 'Canvas & Ratio',         en: 'Canvas & Ratio' },
  'nav.movements':  { id: 'Design Movements',       en: 'Design Movements' },
  'nav.checklist':  { id: 'Pre-flight',             en: 'Pre-flight' },
  'nav.bleed':      { id: 'Bleed & Spine',          en: 'Bleed & Spine' },
  'nav.colorspace': { id: 'RGB→CMYK Sim',           en: 'RGB→CMYK Sim' },
  'nav.dpi':        { id: 'DPI Checker',            en: 'DPI Checker' },
  'nav.brief':      { id: 'Brief Generator',        en: 'Brief Generator' },
  'nav.rubrik':     { id: 'Rubrik Dosen',           en: 'Grading Rubric' },
  'nav.squint':     { id: 'Squint Test',            en: 'Squint Test' },
  'nav.typescale':  { id: 'Type Scale',             en: 'Type Scale' },
  'nav.fontdir':    { id: 'Font Directory',         en: 'Font Directory' },
  'nav.casestudy':  { id: 'Case Study',             en: 'Case Study' },
  'nav.mockup':     { id: 'Mockup',                 en: 'Mockup' },
  'nav.references': { id: 'Referensi Desain',       en: 'Design References' },
  'nav.customtheme':{ id: 'Kustomisasi Tema',       en: 'Customise Theme' },
  // ── Section headings ─────────────────────────────────────────
  'h.font':        { id: 'Font Pairing Playground',                      en: 'Font Pairing Playground' },
  'h.font.sub':    { id: 'Pilih kombinasi font heading & body, lihat preview langsung.', en: 'Pick a heading & body font combination and see a live preview.' },
  'h.contrast':    { id: 'Palette & WCAG Contrast Checker',              en: 'Palette & WCAG Contrast Checker' },
  'h.contrast.sub':{ id: 'Uji kombinasi warna teks dan latar terhadap standar aksesibilitas WCAG 2.1.', en: 'Test your text and background colour combination against WCAG 2.1 accessibility standards.' },
  'h.canvas':      { id: 'Canvas Aspect Ratio & Grid Guide',             en: 'Canvas Aspect Ratio & Grid Guide' },
  'h.canvas.sub':  { id: 'Referensi ukuran kanvas standar DKV dengan kalkulator rasio visual dinamis.', en: 'Standard DKV canvas sizes with a dynamic visual ratio calculator.' },
  'h.movements':   { id: 'Design Movements Cheat Sheet',                 en: 'Design Movements Cheat Sheet' },
  'h.movements.sub':{ id: 'Referensi cepat karakteristik gaya visual untuk presentasi konsep tugas.', en: 'Quick-reference visual style characteristics for concept presentations.' },
  'h.checklist':   { id: 'Project Pre-flight Checklist',                 en: 'Project Pre-flight Checklist' },
  'h.checklist.sub':{ id: 'Pastikan semua poin ini terpenuhi sebelum export, cetak, atau submit.', en: 'Make sure all these points are met before exporting, printing, or submitting.' },
  'h.bleed':       { id: 'Kalkulator Bleed, Margin & Spine',             en: 'Bleed, Margin & Spine Calculator' },
  'h.bleed.sub':   { id: 'Hitung otomatis bleed, safety area, dan ketebalan punggung buku/katalog.', en: 'Automatically calculate bleed, safety area, and book/catalogue spine thickness.' },
  'h.colorspace':  { id: 'RGB → CMYK Color Space Simulator',             en: 'RGB → CMYK Color Space Simulator' },
  'h.colorspace.sub':{ id: 'Estimasi pergeseran warna dari layar RGB ke simulasi CMYK sebelum diekspor.', en: 'Estimate colour shift from RGB screen to CMYK simulation before exporting.' },
  'h.dpi':         { id: 'Resolution & DPI Checker',                     en: 'Resolution & DPI Checker' },
  'h.dpi.sub':     { id: 'Upload gambar untuk cek apakah resolusinya mencukupi standar cetak 300 DPI.', en: 'Upload an image to check whether its resolution meets the 300 DPI print standard.' },
  'h.brief':       { id: 'Design Brief Generator & Randomizer',          en: 'Design Brief Generator & Randomiser' },
  'h.brief.sub':   { id: 'Generate brief proyek fiktif acak untuk latihan studio atau bahan portofolio.', en: 'Generate random fictional project briefs for studio practice or portfolio building.' },
  'h.rubrik':      { id: 'Rubrik Self-Asistensi Dosen',                  en: 'Self-Assessment Grading Rubric' },
  'h.rubrik.sub':  { id: 'Checklist evaluasi menyeluruh sebelum mengumpulkan karya ke dosen.', en: 'A thorough evaluation checklist before submitting work to your lecturer.' },
  'h.squint':      { id: 'Squint Test / Blur Filter Mode',               en: 'Squint Test / Blur Filter Mode' },
  'h.squint.sub':  { id: 'Blur desainmu untuk mengecek apakah focal point dan hierarki tetap terbaca.', en: 'Blur your design to check whether the focal point and hierarchy remain legible.' },
  'h.typescale':   { id: 'Typography Scale & Hierarchy Calculator',      en: 'Typography Scale & Hierarchy Calculator' },
  'h.typescale.sub':{ id: 'Generator skala tipografi matematis — Golden Ratio, Perfect Fourth, dan lainnya.', en: 'Mathematical typography scale generator — Golden Ratio, Perfect Fourth, and more.' },
  'h.fontdir':     { id: 'Free Commercial Font & Asset Directory',       en: 'Free Commercial Font & Asset Directory' },
  'h.fontdir.sub': { id: 'Kurasi font & aset dengan label lisensi jelas — aman untuk pameran & tugas akhir.', en: 'Curated fonts & assets with clear licence labels — safe for exhibitions & final projects.' },
  'h.casestudy':   { id: 'Case Study Builder / Markdown Exporter',       en: 'Case Study Builder / Markdown Exporter' },
  'h.casestudy.sub':{ id: 'Susun narasi proyek desainmu secara terstruktur, lalu export ke format Markdown.', en: 'Structure your design project narrative, then export to Markdown format.' },
  'h.mockup':      { id: 'Interactive Mockup Generator',                 en: 'Interactive Mockup Generator' },
  'h.mockup.sub':  { id: 'Visualisasi instan desainmu di berbagai objek tanpa perlu buka file PSD.', en: 'Instantly visualise your design on various objects without opening a PSD file.' },
  'h.references':  { id: 'Referensi Desain Eksternal',                   en: 'External Design References' },
  'h.references.sub':{ id: 'Kurasi website terpilih untuk inspirasi, tipografi, warna, aset, dan belajar desain.', en: 'Curated websites for inspiration, typography, colour, assets, and design learning.' },
  // ── Common labels ────────────────────────────────────────────
  'label.settings':       { id: 'Pengaturan', en: 'Settings' },
  'label.preview':        { id: 'Live Preview', en: 'Live Preview' },
  'label.headingFont':    { id: 'Heading Font', en: 'Heading Font' },
  'label.bodyFont':       { id: 'Body Font', en: 'Body Font' },
  'label.headingSize':    { id: 'Heading Size', en: 'Heading Size' },
  'label.bodySize':       { id: 'Body Size', en: 'Body Size' },
  'label.lineHeight':     { id: 'Line Height', en: 'Line Height' },
  'label.letterSpacing':  { id: 'Letter Spacing', en: 'Letter Spacing' },
  'label.pickColor':      { id: 'Pilih Warna', en: 'Pick Colour' },
  'label.fgColor':        { id: 'Foreground (Teks)', en: 'Foreground (Text)' },
  'label.bgColor':        { id: 'Background (Latar)', en: 'Background' },
  'label.quickPairs':     { id: 'Quick Pairs', en: 'Quick Pairs' },
  'label.results':        { id: 'Hasil Analisis', en: 'Analysis Results' },
  'label.ratio':          { id: 'Rasio Kontras', en: 'Contrast Ratio' },
  'label.printStd':       { id: 'Standar Cetak (300 DPI)', en: 'Print Standard (300 DPI)' },
  'label.digital':        { id: 'Digital Media', en: 'Digital Media' },
  'label.custom':         { id: 'Custom', en: 'Custom' },
  'label.ratioPreview':   { id: 'Preview Rasio', en: 'Ratio Preview' },
  'label.search':         { id: 'Cari gaya desain...', en: 'Search design styles...' },
  'label.searchRef':      { id: 'Cari nama situs atau topik...', en: 'Search site name or topic...' },
  'label.searchFont':     { id: 'Cari font...', en: 'Search fonts...' },
  'label.allLicence':     { id: 'Semua Lisensi', en: 'All Licences' },
  'label.freeCommercial': { id: '✓ Bebas Komersial', en: '✓ Free Commercial' },
  'label.attribution':    { id: '⚠ Atribusi', en: '⚠ Attribution' },
  'label.nonCommercial':  { id: '✗ Non-Komersial', en: '✗ Non-Commercial' },
  'label.projectReady':   { id: 'Kesiapan Proyek', en: 'Project Readiness' },
  'label.quickNotes':     { id: 'Catatan Cepat', en: 'Quick Notes' },
  'label.forPrint':       { id: '🖨️ Cetak', en: '🖨️ Print' },
  'label.forDigital':     { id: '🖥️ Digital', en: '🖥️ Digital' },
  'label.checkAll':       { id: '✓ Semua', en: '✓ Check All' },
  'label.reset':          { id: '↺ Reset', en: '↺ Reset' },
  'label.input':          { id: 'Input Dokumen', en: 'Document Input' },
  'label.trimW':          { id: 'Lebar Trim (mm)', en: 'Trim Width (mm)' },
  'label.trimH':          { id: 'Tinggi Trim (mm)', en: 'Trim Height (mm)' },
  'label.bleedAmt':       { id: 'Bleed (mm)', en: 'Bleed (mm)' },
  'label.safetyMargin':   { id: 'Safety Margin (mm)', en: 'Safety Margin (mm)' },
  'label.spineBook':      { id: 'Spine Buku', en: 'Book Spine' },
  'label.pages':          { id: 'Jumlah Halaman', en: 'Number of Pages' },
  'label.gsm':            { id: 'Gramatur (GSM)', en: 'Paper Weight (GSM)' },
  'label.results2':       { id: 'Hasil', en: 'Results' },
  'label.difficulty':     { id: 'Tingkat Kesulitan', en: 'Difficulty Level' },
  'label.generate':       { id: '🎲 Generate', en: '🎲 Generate' },
  'label.readyScore':     { id: 'Skor Kesiapan', en: 'Readiness Score' },
  'label.upload':         { id: 'Upload Desain', en: 'Upload Design' },
  'label.mockupType':     { id: 'Tipe Mockup', en: 'Mockup Type' },
  'label.bgColor2':       { id: 'Warna Background', en: 'Background Colour' },
  'label.mdPreview':      { id: 'Markdown Preview', en: 'Markdown Preview' },
  'label.form':           { id: 'Form Case Study', en: 'Case Study Form' },
  'label.baseSize':       { id: 'Base Size', en: 'Base Size' },
  'label.ratio2':         { id: 'Ratio', en: 'Ratio' },
  'label.unitOut':        { id: 'Unit Output', en: 'Output Unit' },
  'label.typeScale':      { id: 'Skala Tipografi', en: 'Typography Scale' },
  'label.fontTypo':       { id: 'Font Tipografi', en: 'Typography Fonts' },
  'label.assetDir':       { id: 'Aset Ilustrasi, Ikon & Foto', en: 'Illustration, Icon & Photo Assets' },
  'label.bleedBox':       { id: 'Bleed Box', en: 'Bleed Box' },
  'label.trimBox':        { id: 'Trim Box (potong final)', en: 'Trim Box (final cut)' },
  'label.safeArea':       { id: 'Safe Area', en: 'Safe Area' },
  'label.spine':          { id: 'Spine / Punggung', en: 'Spine / Backbone' },
  'label.screenRgb':      { id: 'Layar (RGB)', en: 'Screen (RGB)' },
  'label.simCmyk':        { id: 'Simulasi (CMYK)', en: 'Simulation (CMYK)' },
  'label.simShift':       { id: 'Simulasi Pergeseran', en: 'Shift Simulation' },
  'label.dpiResults':     { id: 'Hasil DPI per Format', en: 'DPI Results per Format' },
  'label.targetCustom':   { id: 'Target Custom', en: 'Custom Target' },
  'label.clickDrop':      { id: 'Klik atau seret gambar ke sini', en: 'Click or drag an image here' },
  'label.supported':      { id: 'JPG, PNG, WebP', en: 'JPG, PNG, WebP' },
  'label.squintDrop':     { id: 'Klik atau seret gambar', en: 'Click or drag an image' },
  'label.squintPaste':    { id: 'Atau paste (Ctrl+V)', en: 'Or paste (Ctrl+V)' },
  'label.squintIntensity':{ id: 'Intensitas Blur', en: 'Blur Intensity' },
  'label.squintActivate': { id: '🫣 Aktifkan Squint Test', en: '🫣 Activate Squint Test' },
  'label.squintDeactivate':{ id: '👁 Tampilkan Normal', en: '👁 Show Normal' },
  'label.preview2':       { id: 'Pratinjau', en: 'Preview' },
  'label.mockupDrop':     { id: 'Klik atau seret gambar desain', en: 'Click or drag your design image' },
  'label.applyBtn':       { id: 'Oke', en: 'Apply' },
  'label.copyBtn':        { id: 'Copy', en: 'Copy' },
  'label.mdCopy':         { id: '📋 Salin', en: '📋 Copy' },
  'label.mdDown':         { id: '⬇ .md', en: '⬇ .md' },
  'label.mdPreviewBtn':   { id: '👁 Preview', en: '👁 Preview' },
  'label.mdEmpty':        { id: 'Klik "Preview" untuk melihat output.', en: 'Click "Preview" to see the output.' },
  // ── Checklist quick notes ────────────────────────────────────
  'note.print.title':     { id: '🖨️ Cetak', en: '🖨️ Print' },
  'note.print.1':         { id: '300 DPI minimal', en: 'Minimum 300 DPI' },
  'note.print.2':         { id: 'Mode CMYK', en: 'CMYK colour mode' },
  'note.print.3':         { id: 'Bleed 3mm', en: '3mm bleed' },
  'note.print.4':         { id: 'Font di-outline', en: 'Fonts outlined' },
  'note.print.5':         { id: 'Safety margin 5mm', en: '5mm safety margin' },
  'note.digital.title':   { id: '🖥️ Digital', en: '🖥️ Digital' },
  'note.digital.1':       { id: 'Mode RGB (sRGB)', en: 'RGB (sRGB) colour mode' },
  'note.digital.2':       { id: '72–150 PPI untuk layar', en: '72–150 PPI for screen' },
  'note.digital.3':       { id: 'PNG/JPG sesuai kebutuhan', en: 'PNG/JPG as needed' },
  'note.digital.4':       { id: 'File <1MB untuk web', en: 'File <1MB for web' },
  // ── Asisten ──────────────────────────────────────────────────
  'asisten.title':        { id: 'Asisten DKV', en: 'DKV Assistant' },
  'asisten.sub':          { id: 'Tanya apa saja seputar desain', en: 'Ask anything about design' },
  'asisten.placeholder':  { id: 'Tanya sesuatu...', en: 'Ask something...' },
  // ── Type scale table headers ─────────────────────────────────
  'ts.step':   { id: 'Step',      en: 'Step' },
  'ts.label':  { id: 'Label',     en: 'Label' },
  'ts.size':   { id: 'Ukuran',    en: 'Size' },
  'ts.lh':     { id: 'Line H.',   en: 'Line H.' },
  'ts.preview':{ id: 'Preview',   en: 'Preview' },
  // ── DPI table ────────────────────────────────────────────────
  'dpi.format':  { id: 'Format',  en: 'Format' },
  'dpi.size':    { id: 'Ukuran',  en: 'Size' },
  'dpi.dpi':     { id: 'DPI',     en: 'DPI' },
  'dpi.status':  { id: 'Status',  en: 'Status' },
  'dpi.note':    { id: '💡 Standar cetak profesional: <strong>300 DPI</strong>. Banner besar: 72–150 DPI ok.', en: '💡 Professional print standard: <strong>300 DPI</strong>. Large banners: 72–150 DPI is ok.' },
  // ── Movements filter ─────────────────────────────────────────
  'filter.all':          { id: 'Semua',        en: 'All' },
  'filter.modern':       { id: 'Modern',       en: 'Modern' },
  'filter.retro':        { id: 'Retro',        en: 'Retro' },
  'filter.contemporary': { id: 'Kontemporer',  en: 'Contemporary' },
};

const STORE_KEY_LANG = 'dkv-lang-v1';

function getLang() {
  return localStorage.getItem(STORE_KEY_LANG) || 'id';
}

function setLang(lang) {
  localStorage.setItem(STORE_KEY_LANG, lang);
}

export function t(key) {
  const lang = getLang();
  return STRINGS[key]?.[lang] ?? STRINGS[key]?.id ?? key;
}

/** Translate all elements with data-i18n or data-i18n-html attributes */
function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = STRINGS[key]?.[lang] ?? STRINGS[key]?.id ?? key;
    // For inputs with placeholder, translate placeholder
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = STRINGS[key]?.[lang] ?? STRINGS[key]?.id ?? key;
    el.innerHTML = val;
  });
  // Update html lang attribute
  document.documentElement.lang = lang;
}

/** Update the flag button to show the CURRENT language flag */
function updateLangBtn(lang) {
  const btn   = document.getElementById('langToggleBtn');
  const flag  = document.getElementById('langFlag');
  const label = document.getElementById('langLabel');
  if (!btn || !flag) return;
  if (lang === 'id') {
    flag.textContent  = '🇮🇩';
    if (label) label.textContent = 'ID';
    btn.title = 'Switch to English';
  } else {
    flag.textContent  = '🇬🇧';
    if (label) label.textContent = 'EN';
    btn.title = 'Ganti ke Bahasa Indonesia';
  }
}

export function initI18n() {
  const btn = document.getElementById('langToggleBtn');
  if (!btn) return;

  // Apply persisted language on load
  const current = getLang();
  applyTranslations(current);
  updateLangBtn(current);

  btn.addEventListener('click', () => {
    const was  = getLang();
    const next = was === 'id' ? 'en' : 'id';
    setLang(next);
    applyTranslations(next);
    updateLangBtn(next);
  });
}
