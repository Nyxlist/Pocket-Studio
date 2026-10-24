/**
 * js/modules/case-study.js
 * Case Study Builder / Markdown Exporter
 * Structured form → export to Markdown or copy to clipboard
 */
export function initCaseStudy() {
  const form    = document.getElementById('caseStudyForm');
  const preview = document.getElementById('csMdPreview');
  const mdOut   = document.getElementById('csMdOutput');

  const FIELDS = [
    { id:'csProjectName', label:'Nama Proyek', placeholder:'Contoh: Rebranding Warung Kopi Nusantara' },
    { id:'csClient', label:'Klien / Brief', placeholder:'Siapa kliennya? Apa yang mereka minta?' },
    { id:'csProblem', label:'Problem Statement', placeholder:'Masalah desain apa yang ingin dipecahkan?' },
    { id:'csResearch', label:'Riset Target Audiens', placeholder:'Siapa target audiens? Temuan riset?' },
    { id:'csMoodboard', label:'Moodboard & Referensi Visual', placeholder:'Deskripsikan referensi visual, warna, dan tone...' },
    { id:'csProcess', label:'Proses & Sketsa', placeholder:'Jelaskan tahapan eksplorasi, sketsa, hingga revisi...' },
    { id:'csFinal', label:'Eksekusi & Hasil Akhir', placeholder:'Apa solusi desain finalnya? Screenshot/mockup?' },
    { id:'csEval', label:'Evaluasi & Refleksi', placeholder:'Apa yang berhasil? Apa yang akan diubah jika diulang?' },
  ];

  // Render form fields
  if (form) {
    form.innerHTML = FIELDS.map(f => `
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1" for="${f.id}">${f.label}</label>
        <textarea id="${f.id}" rows="3" placeholder="${f.placeholder}"
          class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"></textarea>
      </div>`).join('') +
      `<div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Tags / Kategori</label>
        <input type="text" id="csTags" placeholder="Contoh: branding, packaging, typography" class="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>`;
  }

  function buildMarkdown() {
    const vals = Object.fromEntries(FIELDS.map(f => [f.id, document.getElementById(f.id)?.value?.trim() ?? '']));
    const tags = document.getElementById('csTags')?.value?.trim() ?? '';
    const date = new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
    return [
      `# ${vals.csProjectName || 'Nama Proyek'}`,
      ``,
      `> **Klien:** ${vals.csClient || '—'}  `,
      `> **Tanggal Dokumentasi:** ${date}  `,
      tags ? `> **Tags:** ${tags}` : '',
      ``,
      `---`,
      ``,
      `## 🎯 Problem Statement`,
      ``,
      vals.csProblem || '_Belum diisi._',
      ``,
      `## 🔍 Riset Target Audiens`,
      ``,
      vals.csResearch || '_Belum diisi._',
      ``,
      `## 🖼️ Moodboard & Referensi Visual`,
      ``,
      vals.csMoodboard || '_Belum diisi._',
      ``,
      `## ✏️ Proses & Sketsa`,
      ``,
      vals.csProcess || '_Belum diisi._',
      ``,
      `## 🎨 Eksekusi & Hasil Akhir`,
      ``,
      vals.csFinal || '_Belum diisi._',
      ``,
      `## 📊 Evaluasi & Refleksi`,
      ``,
      vals.csEval || '_Belum diisi._',
      ``,
      `---`,
      ``,
      `*Dibuat dengan DKV Pocket Studio*`,
    ].filter(l => l !== undefined && l !== null).join('\n');
  }

  document.getElementById('csPreviewBtn')?.addEventListener('click', () => {
    const md = buildMarkdown();
    mdOut.textContent = md;
    preview.classList.remove('hidden');
  });

  document.getElementById('csCopyBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(buildMarkdown()).then(() => {
      const btn = document.getElementById('csCopyBtn');
      btn.textContent = '✓ Tersalin!';
      setTimeout(() => btn.textContent = '📋 Salin Markdown', 2000);
    });
  });

  document.getElementById('csDownloadBtn')?.addEventListener('click', () => {
    const md   = buildMarkdown();
    const name = (document.getElementById('csProjectName')?.value?.trim() || 'case-study').toLowerCase().replace(/\s+/g,'-');
    const blob = new Blob([md], { type:'text/markdown' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = name + '.md';
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
