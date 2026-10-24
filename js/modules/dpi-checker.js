/**
 * js/modules/dpi-checker.js
 * Resolution & DPI Checker
 * User uploads an image → checks pixel dimensions → reports DPI at target print size
 */
export function initDpiChecker() {
  const dropzone = document.getElementById('dpiDropzone');
  const fileInput = document.getElementById('dpiFileInput');

  function analyse(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const pw = img.naturalWidth;
      const ph = img.naturalHeight;
      URL.revokeObjectURL(url);

      document.getElementById('dpiImgInfo').textContent = `${pw} × ${ph} px`;
      document.getElementById('dpiFileName').textContent = file.name;
      document.getElementById('dpiFileSize').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      document.getElementById('dpiPreviewImg').src = URL.createObjectURL(file);
      document.getElementById('dpiResults').classList.remove('hidden');
      document.getElementById('dpiDropPlaceholder').classList.add('hidden');
      document.getElementById('dpiPreviewWrapper').classList.remove('hidden');

      renderDpiTable(pw, ph);
    };
    img.src = url;
  }

  function renderDpiTable(pw, ph) {
    const formats = [
      { label:'A4 (210×297mm)',   wmm:210, hmm:297 },
      { label:'A3 (297×420mm)',   wmm:297, hmm:420 },
      { label:'Poster B2 (500×707mm)', wmm:500, hmm:707 },
      { label:'Instagram 1:1 (15×15cm)', wmm:150, hmm:150 },
      { label:'Business Card (90×55mm)', wmm:90,  hmm:55 },
      { label:'Ukuran Kustom',    wmm: parseFloat(document.getElementById('dpiCustomW')?.value)||100,
                                  hmm: parseFloat(document.getElementById('dpiCustomH')?.value)||100 },
    ];

    const tbody = document.getElementById('dpiTableBody');
    tbody.innerHTML = formats.map(f => {
      const dpiW = Math.round(pw / (f.wmm / 25.4));
      const dpiH = Math.round(ph / (f.hmm / 25.4));
      const dpi  = Math.min(dpiW, dpiH); // constrained by tighter axis
      let cls, status;
      if (dpi >= 300)      { cls = 'text-green-600 dark:text-green-400'; status = '✓ Siap cetak (≥300 DPI)'; }
      else if (dpi >= 150) { cls = 'text-amber-600 dark:text-amber-400'; status = '⚠ Cukup untuk preview (150–299 DPI)'; }
      else                 { cls = 'text-red-600 dark:text-red-400'; status = '✗ Terlalu rendah untuk cetak (<150 DPI)'; }
      return `<tr class="border-b border-gray-100 dark:border-gray-800">
        <td class="py-2 pr-3 text-sm">${f.label}</td>
        <td class="py-2 pr-3 text-sm font-mono">${f.wmm}×${f.hmm}mm</td>
        <td class="py-2 pr-3 text-sm font-bold ${cls}">${dpi} DPI</td>
        <td class="py-2 text-xs ${cls}">${status}</td>
      </tr>`;
    }).join('');
  }

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('border-indigo-500','bg-indigo-50','dark:bg-indigo-900/20'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('border-indigo-500','bg-indigo-50','dark:bg-indigo-900/20'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('border-indigo-500','bg-indigo-50');
    analyse(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', e => analyse(e.target.files[0]));

  ['dpiCustomW','dpiCustomH'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      const img = document.getElementById('dpiPreviewImg');
      if (img.src) {
        const tmp = new Image();
        tmp.onload = () => renderDpiTable(tmp.naturalWidth, tmp.naturalHeight);
        tmp.src = img.src;
      }
    });
  });
}
