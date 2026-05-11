(() => {
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (!finePointer) return;

  const cursor = document.createElement('img');
  cursor.className = 'glove-cursor';
  cursor.src = '/assets/cursor_glove_cursor.png';
  cursor.alt = '';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);
  document.documentElement.classList.add('glove-cursor-ready');

  let lastX = window.innerWidth / 2;
  let lastY = window.innerHeight / 2;

  function moveTo(x, y) {
    lastX = x;
    lastY = y;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    cursor.classList.add('is-visible');
  }

  function syncTarget(target) {
    const isTextTarget = target?.closest?.('input, textarea, [contenteditable="true"]');
    cursor.classList.toggle('is-text-target', Boolean(isTextTarget));
  }

  document.addEventListener('pointermove', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    moveTo(event.clientX, event.clientY);
    syncTarget(event.target);
  }, { passive: true });

  document.addEventListener('pointerdown', event => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    moveTo(event.clientX, event.clientY);
    cursor.classList.add('is-pressing');
  }, true);

  document.addEventListener('pointerup', () => {
    cursor.classList.remove('is-pressing');
  }, true);

  document.addEventListener('pointerover', event => {
    syncTarget(event.target);
  }, true);

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible', 'is-pressing');
  });

  window.addEventListener('blur', () => {
    cursor.classList.remove('is-visible', 'is-pressing');
  });

  window.addEventListener('hashchange', () => {
    cursor.style.left = `${lastX}px`;
    cursor.style.top = `${lastY}px`;
    cursor.classList.add('is-visible');
  });
})();
