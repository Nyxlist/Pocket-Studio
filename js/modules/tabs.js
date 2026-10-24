/**
 * js/modules/tabs.js
 * Sidebar navigation with accordion groups
 */
export function initTabs() {
  // ── Accordion groups ────────────────────────────────────────
  document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.nav-group');
      const isOpen = group.classList.contains('open');
      // Close all, open clicked
      document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
      if (!isOpen) group.classList.add('open');
    });
  });

  // ── Nav item click ──────────────────────────────────────────
  function activateTab(tabId) {
    // Hide all content
    document.querySelectorAll('.tab-content').forEach(s => s.classList.remove('active'));
    // Remove all active nav-item
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    // Show target
    const target = document.getElementById('tab-' + tabId);
    if (target) target.classList.add('active');

    // Mark nav item active and open its group
    const btn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
    if (btn) {
      btn.classList.add('active');
      const group = btn.closest('.nav-group');
      if (group) {
        document.querySelectorAll('.nav-group').forEach(g => g.classList.remove('open'));
        group.classList.add('open');
      }
    }

    // Mobile: close sidebar after selection
    if (window.innerWidth < 768) {
      document.querySelector('.sidebar')?.classList.add('collapsed');
      document.querySelector('.sidebar-overlay')?.classList.remove('visible');
    }
  }

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // ── Mobile toggle ───────────────────────────────────────────
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar   = document.querySelector('.sidebar');
  const overlay   = document.querySelector('.sidebar-overlay');

  toggleBtn?.addEventListener('click', () => {
    const collapsed = sidebar.classList.toggle('collapsed');
    overlay?.classList.toggle('visible', !collapsed);
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    overlay.classList.remove('visible');
  });

  // Open first group and activate first tab by default
  document.querySelector('.nav-group')?.classList.add('open');
  const firstItem = document.querySelector('.nav-item[data-tab="font"]');
  if (firstItem) activateTab('font');
}
