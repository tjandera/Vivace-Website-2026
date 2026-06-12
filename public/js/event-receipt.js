'use strict';

(function () {
  const lines  = Array.from(document.querySelectorAll('.rl'));
  const cta    = document.getElementById('event-cta');
  const head   = document.getElementById('printer-head');
  const barcode= document.getElementById('receipt-barcode');
  const feed   = document.getElementById('receipt-feed');
  const wrap   = document.querySelector('.receipt-wrap');
  const led    = document.getElementById('rm-led');

  createBarcodeBars();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (feed && wrap) {
      feed.style.transition = 'none';
      feed.style.height = wrap.offsetHeight + 'px';
      feed.classList.add('is-printed');
    }
    lines.forEach(l => l.classList.add('is-printed'));
    if (cta) cta.classList.add('is-visible');
    if (led) led.classList.add('is-done');
    drawBarcode(0);
    return;
  }

  const PRINT_START    = 320;
  const PRINT_DURATION = Math.max(5000, lines.length * 68);

  setTimeout(() => {
    const receiptHeight = wrap ? wrap.offsetHeight : 0;
    if (feed && receiptHeight) {
      feed.style.setProperty('--receipt-print-duration', PRINT_DURATION + 'ms');
      feed.classList.add('is-printing');
      feed.style.height = receiptHeight + 'px';
    }
    if (head) head.style.opacity = '1';
    if (led)  led.classList.add('is-printing');
  }, PRINT_START);

  scheduleBottomUpPrint();

  const allDone = PRINT_START + PRINT_DURATION + 220;

  setTimeout(() => {
    if (head) head.style.opacity = '0';
    if (feed) { feed.classList.remove('is-printing'); feed.classList.add('is-printed'); }
    if (led)  { led.classList.remove('is-printing');  led.classList.add('is-done'); }
  }, allDone);

  setTimeout(() => {
    if (cta) cta.classList.add('is-visible');
  }, allDone + 500);

  function scheduleBottomUpPrint() {
    if (!wrap) {
      lines.slice().reverse().forEach((line, i) => {
        setTimeout(() => line.classList.add('is-printed'), PRINT_START + i * 68);
      });
      return;
    }
    const receiptHeight = wrap.offsetHeight || 1;
    const wrapTop = wrap.getBoundingClientRect().top;
    lines.forEach((line) => {
      const lineRect = line.getBoundingClientRect();
      const lineBottom = lineRect.bottom - wrapTop;
      const distanceFromBottom = Math.max(0, receiptHeight - lineBottom);
      const progress = Math.min(1, distanceFromBottom / receiptHeight);
      const delay = PRINT_START + progress * PRINT_DURATION;
      setTimeout(() => {
        line.classList.add('is-printed');
        if (line.id === 'receipt-barcode-wrap') drawBarcode(80);
      }, delay);
    });
  }

  function createBarcodeBars() {
    if (!barcode || barcode.children.length) return;
    const widths = [2,1,3,1,2,1,4,1,1,3,2,1,2,1,3,1,1,4,2,1,3,1,2,1,1,3,1,2,4,1,2,1,3,1];
    widths.forEach((w) => {
      const bar = document.createElement('span');
      bar.style.width = (w * 3) + 'px';
      barcode.appendChild(bar);
    });
  }

  function drawBarcode(startDelay) {
    if (!barcode) return;
    Array.from(barcode.children).forEach((bar, i) => {
      setTimeout(() => bar.classList.add('is-drawn'), startDelay + i * 35);
    });
  }
}());
