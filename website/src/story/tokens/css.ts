import type { DesignTokens } from './types';

/** Flatten DesignTokens into `--token-*` CSS custom properties. */
export function tokensToCssVars(tokens: DesignTokens): Record<string, string> {
  return {
    '--token-color-ink': tokens.color.ink,
    '--token-color-ink-deep': tokens.color.inkDeep,
    '--token-color-ink-soft': tokens.color.inkSoft,
    '--token-color-paper': tokens.color.paper,
    '--token-color-paper-deep': tokens.color.paperDeep,
    '--token-color-accent': tokens.color.accent,
    '--token-color-accent-soft': tokens.color.accentSoft,
    '--token-color-line': tokens.color.line,
    '--token-color-on-media': tokens.color.onMedia,
    '--token-color-overlay-dark': tokens.color.overlayDark,
    '--token-color-overlay-light': tokens.color.overlayLight,

    '--token-surface-primary': tokens.surface.primary,
    '--token-surface-secondary': tokens.surface.secondary,
    '--token-surface-inverse': tokens.surface.inverse,
    '--token-surface-media': tokens.surface.media,
    '--token-surface-gradient': tokens.surface.gradient,

    '--token-font-display': tokens.font.display,
    '--token-font-body': tokens.font.body,

    '--token-headline-hero': tokens.headline.hero,
    '--token-headline-section': tokens.headline.section,
    '--token-headline-pullquote': tokens.headline.pullquote,
    '--token-headline-statistic': tokens.headline.statistic,

    '--token-body-prose': tokens.body.prose,
    '--token-body-caption': tokens.body.caption,
    '--token-body-label': tokens.body.label,

    '--token-spacing-block': tokens.spacing.block,
    '--token-spacing-chapter': tokens.spacing.chapter,
    '--token-spacing-inline': tokens.spacing.inline,
    '--token-spacing-tight': tokens.spacing.tight,
    '--token-spacing-large': tokens.spacing.large,

    '--token-measure-narrow': tokens.measure.narrow,
    '--token-measure-wide': tokens.measure.wide,
    '--token-measure-hero': tokens.measure.hero,
    '--token-measure-page': tokens.measure.page,

    '--token-motion-gentle-distance': tokens.motion.gentle.distance,
    '--token-motion-gentle-range': tokens.motion.gentle.range,
    '--token-motion-emphatic-distance': tokens.motion.emphatic.distance,
    '--token-motion-emphatic-range': tokens.motion.emphatic.range,
    '--token-motion-emphatic-scale-from': tokens.motion.emphatic.scaleFrom,
    '--token-motion-parallax-travel': tokens.motion.parallax.travel,
    '--token-motion-parallax-scale': tokens.motion.parallax.scale,
    '--token-motion-zoom-to': tokens.motion.zoom.to,
    '--token-motion-drift-distance': tokens.motion.drift.distance,
    '--token-motion-pin-exit-distance': tokens.motion.pinExit.distance,
    '--token-motion-overlay-rise-distance': tokens.motion.overlayRise.distance,

    '--token-shadow-soft': tokens.shadow.soft,
    '--token-shadow-none': tokens.shadow.none,

    '--token-radius-subtle': tokens.radius.subtle,

    '--token-layout-pin-height': tokens.layout.pinHeight,
    '--token-layout-pin-pull-up': tokens.layout.pinPullUp,
    '--token-layout-viewport': tokens.layout.viewport,

    /* Legacy aliases used by existing CSS during/after migration */
    '--story-bg': 'var(--token-surface-primary)',
    '--story-bg-deep': 'var(--token-surface-secondary)',
    '--story-ink': 'var(--token-color-ink)',
    '--story-ink-deep': 'var(--token-color-ink-deep)',
    '--story-ink-soft': 'var(--token-color-ink-soft)',
    '--story-accent': 'var(--token-color-accent)',
    '--story-accent-soft': 'var(--token-color-accent-soft)',
    '--story-line': 'var(--token-color-line)',
    '--story-on-media': 'var(--token-color-on-media)',
    '--story-overlay-dark': 'var(--token-color-overlay-dark)',
    '--story-overlay-light': 'var(--token-color-overlay-light)',
    '--story-font-display': 'var(--token-font-display)',
    '--story-font-body': 'var(--token-font-body)',
    '--story-measure-narrow': 'var(--token-measure-narrow)',
    '--story-measure-wide': 'var(--token-measure-wide)',
    '--story-space-block': 'var(--token-spacing-block)',
    '--story-space-chapter': 'var(--token-spacing-chapter)',
  };
}

export function cssVarsToStyle(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([k, v]) => `${k}:${v}`)
    .join(';');
}
