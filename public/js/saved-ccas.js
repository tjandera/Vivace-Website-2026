(() => {
  const STORAGE_KEY = 'vivaceSavedCcas';
  const ccas        = window.VIVACE_CCAS || [];
  const ccaById     = new Map(ccas.map(cca => [cca.id, cca]));

  function readSaved() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(value)) return [];
      return value.filter(id => typeof id === 'string');
    } catch {
      return [];
    }
  }

  function writeSaved(ids) {
    const clean = Array.from(new Set(ids.filter(Boolean)));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    } catch {
      return readSaved();
    }
    return clean;
  }

  function isSaved(id)    { return readSaved().includes(id); }
  function removeSaved(id){ writeSaved(readSaved().filter(item => item !== id)); syncSavedUi(); }
  function clearSaved()   { writeSaved([]); syncSavedUi(); }

  function toggleSaved(id) {
    const saved = readSaved();
    writeSaved(saved.includes(id) ? saved.filter(item => item !== id) : saved.concat(id));
    syncSavedUi();
  }

  function updateButtons(saved) {
    document.querySelectorAll('[data-save-cca]').forEach(button => {
      const id     = button.dataset.saveCca;
      const active = saved.includes(id);
      button.classList.toggle('saved', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.textContent = active
        ? (button.dataset.savedLabel || 'Saved')
        : (button.dataset.saveLabel  || 'Save');
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[char]));
  }

  function receiptItem(id, index) {
    const cca  = ccaById.get(id);
    const name = cca ? cca.name : id;
    const meta = cca ? `${cca.categoryShort} / ${cca.cluster} / ${cca.booth}` : 'Saved CCA';
    const href = `/cca/${encodeURIComponent(id)}`;
    return `
      <li class="receipt-item">
        <span class="receipt-num">${String(index + 1).padStart(2, '0')}</span>
        <span>
          <span class="receipt-name">${escapeHtml(name)}</span>
          <span class="receipt-meta">${escapeHtml(meta)}</span>
        </span>
        <span class="receipt-row-actions">
          <a class="receipt-link" href="${href}">Open</a>
          <button class="receipt-remove" type="button" data-remove-saved="${escapeHtml(id)}">Remove</button>
        </span>
      </li>`;
  }

  function renderReceipts(saved) {
    document.querySelectorAll('[data-saved-count]').forEach(el => {
      el.textContent = `${saved.length} saved`;
    });
    document.querySelectorAll('[data-saved-nav-count]').forEach(el => {
      el.textContent = saved.length;
    });
    document.querySelectorAll('[data-saved-empty]').forEach(el => {
      el.hidden = saved.length > 0;
    });
    document.querySelectorAll('[data-clear-saved]').forEach(el => {
      el.hidden = saved.length === 0;
    });
    document.querySelectorAll('[data-print-saved]').forEach(el => {
      el.hidden = saved.length === 0;
    });
    document.querySelectorAll('[data-saved-list]').forEach(list => {
      list.innerHTML = saved.map(receiptItem).join('');
    });
  }

  function syncSavedUi() {
    const saved = readSaved();
    updateButtons(saved);
    renderReceipts(saved);
  }

  document.addEventListener('click', event => {
    const saveBtn = event.target.closest('[data-save-cca]');
    if (saveBtn) {
      event.preventDefault();
      event.stopPropagation();
      toggleSaved(saveBtn.dataset.saveCca);
      return;
    }
    const removeBtn = event.target.closest('[data-remove-saved]');
    if (removeBtn) {
      event.preventDefault();
      removeSaved(removeBtn.dataset.removeSaved);
      return;
    }
    if (event.target.closest('[data-clear-saved]')) {
      event.preventDefault();
      clearSaved();
      return;
    }
    if (event.target.closest('[data-print-saved]')) {
      event.preventDefault();
      window.print();
    }
  });

  window.addEventListener('storage', event => {
    if (event.key === STORAGE_KEY) syncSavedUi();
  });

  window.VivaceSaved = { read: readSaved, write: writeSaved, isSaved, toggle: toggleSaved, remove: removeSaved, clear: clearSaved, sync: syncSavedUi };

  syncSavedUi();
})();
