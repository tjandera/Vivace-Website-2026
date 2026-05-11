(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const settings = {
    sparkSize: 24,
    sparkRadius: 52,
    sparkCount: 12,
    duration: 620,
    easing: 'ease-out',
    extraScale: 1.25,
  };

  const rootStyles = getComputedStyle(document.documentElement);
  const palette = [
    rootStyles.getPropertyValue('--yellow').trim() || '#F1AD2B',
    rootStyles.getPropertyValue('--red').trim() || '#E23A29',
    rootStyles.getPropertyValue('--green').trim() || '#49AD77',
    rootStyles.getPropertyValue('--blue').trim() || '#3C73D6',
    rootStyles.getPropertyValue('--pink').trim() || '#EA5A89',
  ];

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: '9999',
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let sparks = [];
  let animationId = null;
  let colorIndex = 0;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function ease(t) {
    switch (settings.easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t * (2 - t);
    }
  }

  function draw(timestamp) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    sparks = sparks.filter(spark => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= settings.duration) return false;

      const progress = elapsed / settings.duration;
      const eased = ease(progress);
      const distance = eased * settings.sparkRadius * settings.extraScale;
      const lineLength = settings.sparkSize * (1 - eased);
      const alpha = 1 - eased;

      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = spark.color;
      ctx.lineWidth = 3.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      return true;
    });

    ctx.globalAlpha = 1;
    if (sparks.length) {
      animationId = requestAnimationFrame(draw);
    } else {
      animationId = null;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function sparkAt(x, y, target) {
    const explicitColor = target?.closest?.('[data-spark-color]')?.dataset.sparkColor;
    const color = explicitColor || palette[colorIndex % palette.length];
    colorIndex += 1;

    const now = performance.now();
    const newSparks = Array.from({ length: settings.sparkCount }, (_, i) => ({
      x,
      y,
      color,
      angle: (2 * Math.PI * i) / settings.sparkCount,
      startTime: now,
    }));

    sparks.push(...newSparks);
    if (!animationId) animationId = requestAnimationFrame(draw);
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(resizeCanvas, 100);
  }, { passive: true });

  document.addEventListener('click', event => {
    if (event.button && event.button !== 0) return;
    sparkAt(event.clientX, event.clientY, event.target);
  }, true);

  resizeCanvas();
})();
