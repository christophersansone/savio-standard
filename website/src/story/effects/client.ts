/**
 * Minimal client bootstrap for the story engine.
 * Scroll effects are CSS-driven; this only handles statistic counters
 * and a ready flag for progressive enhancement.
 */

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function animateCount(el: HTMLElement, target: number, durationMs: number) {
  const prefix = el.dataset.countPrefix ?? '';
  const suffix = el.dataset.countSuffix ?? '';
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    // Ease-out cubic
    const eased = 1 - (1 - t) ** 3;
    const value = Math.round(target * eased);
    el.textContent = `${prefix}${value}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function initStatisticCounters(root: ParentNode) {
  const nodes = root.querySelectorAll<HTMLElement>('[data-count-to]');
  if (!nodes.length) return;

  const reduced = prefersReducedMotion();

  // With JS available, reset to zero so counting is visible.
  // Without JS, the HTML already contains the final value.
  nodes.forEach((el) => {
    if (reduced) return;
    const prefix = el.dataset.countPrefix ?? '';
    const suffix = el.dataset.countSuffix ?? '';
    el.textContent = `${prefix}0${suffix}`;
  });

  const reveal = (el: HTMLElement) => {
    if (el.dataset.countDone === '1') return;
    el.dataset.countDone = '1';
    const target = Number(el.dataset.countTo);
    if (!Number.isFinite(target)) return;

    const prefix = el.dataset.countPrefix ?? '';
    const suffix = el.dataset.countSuffix ?? '';

    if (reduced) {
      el.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    animateCount(el, target, 1200);
  };

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(reveal);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.4 },
  );

  nodes.forEach((el) => io.observe(el));
}

function initStories() {
  const stories = document.querySelectorAll<HTMLElement>('[data-story]');
  stories.forEach((story) => {
    story.dataset.storyReady = 'true';
    initStatisticCounters(story);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStories, { once: true });
} else {
  initStories();
}
