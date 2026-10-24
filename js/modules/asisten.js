/**
 * js/modules/asisten.js
 * DKV Assistant — contextual chatbot dengan knowledge base fitur DKV Pocket Studio
 */

const KB = {
  // keyword arrays → answer
  kontras: `**WCAG Contrast Checker** bisa membantu! 🎨\nBuka menu **Toolkit → WCAG Contrast**, pilih warna foreground & background, lalu lihat status PASS/FAIL untuk AA dan AAA.\n\n**Tips:** Rasio minimal 4.5:1 untuk teks normal (AA), 7:1 untuk AAA.`,
  wcag: `Standar **WCAG 2.1** terbagi:\n• **AA Normal** → 4.5 : 1\n• **AAA Normal** → 7 : 1\n• **AA Large** (≥18pt bold) → 3 : 1\n• **AAA Large** → 4.5 : 1\n\nGunakan tab **WCAG Contrast** untuk cek otomatis!`,
  font: `**Font Pairing Playground** ada di menu **Toolkit → Font Pairing** 🔤\n\nKamu bisa:\n• Pilih heading & body font dari koleksi Google Fonts\n• Atur size, line-height, letter-spacing\n• Preview live di kanvas sebelah kanan\n\n**Tips pairing:** Serif heading + Sans body = klasik tapi clean.`,
  tipografi: `Untuk tipografi, coba:\n• **Font Pairing** — kombinasi heading & body\n• **Type Scale** (menu Aset) — kalkulator hierarki H1–Caption otomatis berdasarkan rasio matematika\n\n**Rasio populer:** Perfect Fourth (1.333) untuk web, Major Third (1.25) untuk UI.`,
  'type scale': `**Type Scale Calculator** ada di **Aset → Type Scale** 📊\n\nPilih rasio (Golden Ratio, Perfect Fourth, dll.), set base size, dan dapatkan seluruh skala H1–Caption secara otomatis dengan unit px/rem/pt.`,
  bleed: `**Bleed** adalah area lebihan 3–5mm di luar garis potong agar warna tidak putus saat dipotong mesin.\n\nGunakan **Cetak → Bleed & Spine** untuk:\n• Hitung ukuran bleed box otomatis\n• Hitung ketebalan spine buku berdasarkan halaman & GSM\n• Lihat diagram visual Bleed / Trim / Safe Area`,
  spine: `Spine (punggung buku) dihitung dari **jumlah halaman × ketebalan per lembar** berdasarkan gramatur kertas (GSM).\n\nBuka **Cetak → Bleed & Spine**, masukkan jumlah halaman dan GSM kertas untuk estimasi otomatis.`,
  cmyk: `**RGB vs CMYK:**\n• **RGB** = untuk layar/digital (lebih cerah)\n• **CMYK** = untuk cetak (lebih muted)\n\nCek pergeseran warna di **Cetak → RGB→CMYK Sim** sebelum export. Warna neon sangat berisiko bergeser signifikan!`,
  dpi: `**DPI (Dots Per Inch)** menentukan ketajaman cetak:\n• **300 DPI** = standar cetak profesional\n• **150 DPI** = ok untuk banner besar (dilihat jarak jauh)\n• **72 DPI** = hanya untuk layar\n\nUpload gambarmu di **Cetak → DPI Checker** untuk cek resolusi di berbagai format cetak.`,
  resolusi: `Resolusi gambar untuk cetak minimal **300 DPI** pada ukuran cetak yang dituju. Cek pakai **Cetak → DPI Checker** — upload gambar dan lihat hasilnya per format (A4, A3, dll.).`,
  brief: `**Design Brief Generator** menghasilkan brief fiktif acak untuk latihan! 📝\n\nBuka **Asistensi → Brief Generator**, pilih tingkat kesulitan (Easy/Medium/Hard), klik **Generate Brief**. Cocok untuk portofolio dan latihan studio.`,
  asistensi: `Sebelum asistensi dosen, gunakan **Rubrik Dosen** di menu **Asistensi → Rubrik Dosen** 📋\n\n18 checklist mencakup grid, hierarki tipografi, warna, focal point, kerapian file, dan kesesuaian brief. Target 80%+ sebelum kumpul!`,
  rubrik: `**Rubrik Self-Asistensi** punya 18 item dari 6 kategori:\n1. Grid & Komposisi\n2. Hierarki Tipografi\n3. Warna & Kontras\n4. Focal Point & Visual Flow\n5. Kerapian File Kerja\n6. Kesesuaian Brief\n\nBuka **Asistensi → Rubrik Dosen**.`,
  squint: `**Squint Test** = teknik mengaburkan desain untuk cek apakah hierarki & focal point masih terbaca.\n\nBuka **Asistensi → Squint Test**, upload atau paste gambar (Ctrl+V), klik tombol aktifkan. Kalau elemen utama masih menonjol meski blur = hierarki bagus! 👁`,
  mockup: `**Mockup Generator** ada di **Portofolio → Mockup** 🎭\n\nUpload desainmu dan pilih template:\n• 🖼️ Poster Frame\n• 📱 Smartphone\n• 👜 Tote Bag\n• 📦 Packaging Box\n\nVisualisasi instan tanpa perlu Photoshop!`,
  'case study': `**Case Study Builder** ada di **Portofolio → Case Study** 📖\n\nIsi form 8 field (problem, riset, proses, eksekusi, evaluasi...) lalu export langsung ke format **Markdown (.md)** — siap dipaste ke Notion, GitHub, atau portofolio online.`,
  portofolio: `Untuk portofolio, DKV Pocket Studio punya 2 tool:\n• **Case Study Builder** → narasi proyek terstruktur + export Markdown\n• **Mockup Generator** → visualisasi instan di poster/smartphone/tote bag/box\n\nKeduanya di menu **Portofolio**.`,
  lisensi: `**Font Directory** di **Aset → Font Directory** 🗂️ menyediakan daftar font & aset dengan label lisensi:\n• ✓ **Bebas Komersial** (OFL/MIT) — aman untuk TA & pameran\n• ⚠ **Atribusi** — cantumkan kredit\n• ✗ **Non-Komersial** — beli lisensi untuk keperluan komersial\n\nJangan sampai kena masalah hak cipta saat pameran!`,
  rasio: `**Canvas Ratio** ada di **Toolkit → Canvas & Ratio** 📐\n\nFormat tersedia:\n• **Cetak:** A4, A3, Poster B2 dengan konversi pixel @300DPI\n• **Digital:** 1:1, 4:5 (Feed), 9:16 (Story), 16:9, dan lebih\n\nBisa juga input ukuran custom!`,
  canvas: `Gunakan **Toolkit → Canvas & Ratio** untuk panduan ukuran kanvas. Preview visual rasio akan berubah dinamis sesuai pilihan format.`,
  bauhaus: `**Bauhaus** (1919–1933) — ciri khas:\n• Bentuk geometris primer (lingkaran, segitiga, kotak)\n• Warna primer murni: merah, kuning, biru\n• Form follows function\n• Tipografi: Futura, Renner\n\nLihat kartu lengkapnya di **Toolkit → Design Movements** 🖼️`,
  swiss: `**Swiss Style / International Typographic** — ciri:\n• Grid matematis ketat\n• Helvetica / Akzidenz-Grotesk\n• Foto hitam-putih halftone\n• Merah, hitam, putih\n\nBuka **Toolkit → Design Movements** untuk kartu referensi lengkap.`,
  brutalism: `**Brutalism** — ciri kontemporer:\n• Elemen mentah & terbuka (raw HTML feel)\n• Border tebal, box shadow kotak\n• Tipografi oversized\n• Hitam-putih + aksen neon\n\nDetail di **Design Movements** 🖼️`,
  y2k: `**Y2K Aesthetic** — ciri:\n• Chrome & plastik metalik\n• Gradien biru-silver\n• Bubble & gel elements\n• Warna: silver, baby blue, hot pink\n\nBuka **Design Movements** untuk referensi lengkap.`,
  preflight: `**Pre-flight Checklist** ada di **Toolkit → Pre-flight** ✅\n\n12 item yang dicek:\n• Mode warna (CMYK/RGB)\n• Resolusi 300 DPI\n• Bleed 3mm\n• Font di-outline\n• Gambar embed\n• dan lebih...\n\nCentang semua sebelum submit!`,
  checklist: `Gunakan **Pre-flight Checklist** (menu **Toolkit → Pre-flight**) sebelum export. Ada 12 poin penting termasuk bleed, resolusi, font outline, dan mode warna.`,
};

const CHIPS_DEFAULT = ['Cara cek kontras WCAG', 'Apa itu bleed cetak?', 'Tips font pairing', 'Squint test itu apa?', 'Cara export case study'];

const FALLBACK = [
  'Hmm, saya belum paham pertanyaan itu. Coba tanya tentang: **kontras, bleed, font, DPI, mockup, brief, atau rubrik**. 😊',
  'Pertanyaan yang menarik! Sayangnya saya hanya paham topik seputar fitur DKV Pocket Studio. Coba tanya yang lebih spesifik?',
  'Belum ada jawaban untuk itu. Coba cek langsung di tab yang relevan, atau tanya tentang fitur aplikasi ini. 🎨',
];

function findAnswer(q) {
  const lower = q.toLowerCase();
  for (const [key, answer] of Object.entries(KB)) {
    if (lower.includes(key)) return answer;
  }
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)];
}

// Simple markdown bold to <strong>
function renderMd(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

export function initAsisten() {
  const btn     = document.getElementById('asistenBtn');
  const panel   = document.getElementById('asistenPanel');
  const msgs    = document.getElementById('asistenMessages');
  const input   = document.getElementById('asistenInput');
  const sendBtn = document.getElementById('asistenSend');
  const chipsEl = document.getElementById('asistenChips');

  if (!btn || !panel) return;

  // Toggle panel
  btn.addEventListener('click', () => {
    panel.classList.toggle('hidden-panel');
    if (!panel.classList.contains('hidden-panel')) {
      input.focus();
    }
  });

  const MSG_BOT  = 'msg-bot self-start max-w-[88%] text-[13px] leading-snug px-3 py-2 rounded-xl rounded-bl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100';
  const MSG_USER = 'msg-user self-end max-w-[88%] text-[13px] leading-snug px-3 py-2 rounded-xl rounded-br bg-indigo-600 text-white';

  function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = type === 'user' ? MSG_USER : MSG_BOT;
    div.innerHTML = renderMd(text);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = MSG_BOT + ' msg-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMsg(text, 'user');
    input.value = '';
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMsg(findAnswer(text), 'bot');
    }, 600 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });

  // Chips
  function renderChips(chips) {
    chipsEl.innerHTML = '';
    chips.forEach(c => {
      const chip = document.createElement('button');
      chip.className = 'text-[11px] px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 cursor-pointer whitespace-nowrap hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors';
      chip.textContent = c;
      chip.addEventListener('click', () => { sendMessage(c); renderChips(CHIPS_DEFAULT); });
      chipsEl.appendChild(chip);
    });
  }
  renderChips(CHIPS_DEFAULT);

  // Welcome message
  setTimeout(() => {
    addMsg('Halo! Saya Asisten DKV 👋\nTanya apa saja seputar fitur aplikasi ini — kontras warna, bleed cetak, font pairing, DPI, dan lainnya.', 'bot');
  }, 300);
}
