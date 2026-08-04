import type { DesignTokens } from '../../tokens/types';

/** Default (Savio) token values — parity with the v1 visual system. */
export const defaultTokens: DesignTokens = {
  color: {
    ink: '#232f47',
    inkDeep: '#161f36',
    inkSoft: '#3d4863',
    paper: '#faf8f2',
    paperDeep: '#f1ece0',
    accent: '#a07b2e',
    accentSoft: '#c7a35c',
    line: '#e3dac6',
    onMedia: '#faf8f2',
    overlayDark: 'rgba(22, 31, 54, 0.55)',
    overlayLight: 'rgba(250, 248, 242, 0.72)',
  },
  surface: {
    primary: '#faf8f2',
    secondary: '#f1ece0',
    inverse: '#161f36',
    media: '#161f36',
    gradient:
      'linear-gradient(to bottom, transparent 0%, rgba(22, 31, 54, 0.55) 28%, rgba(22, 31, 54, 0.82) 100%)',
  },
  font: {
    display: "'Lora', Georgia, serif",
    body: "'Source Sans 3 Variable', system-ui, sans-serif",
  },
  headline: {
    hero: 'clamp(2.25rem, 6vw, 3.75rem)',
    section: 'clamp(1.75rem, 4vw, 2.5rem)',
    pullquote: 'clamp(1.5rem, 4vw, 2.25rem)',
    statistic: 'clamp(3.5rem, 12vw, 6rem)',
  },
  body: {
    prose: 'clamp(1.05rem, 2vw, 1.2rem)',
    caption: '0.95rem',
    label: '0.72rem',
  },
  spacing: {
    block: 'clamp(3.5rem, 8vw, 6.5rem)',
    chapter: 'clamp(5rem, 14vw, 9rem)',
    inline: '1.25rem',
    tight: '0.85rem',
    large: '1.75rem',
  },
  measure: {
    narrow: '36rem',
    wide: '48rem',
    hero: '42rem',
  },
  motion: {
    gentle: { distance: '4rem', range: 'entry 0% entry 65%' },
    emphatic: {
      distance: '6.5rem',
      range: 'entry 0% entry 75%',
      scaleFrom: '0.97',
    },
    parallax: { travel: '16%', scale: '1.12' },
    zoom: { to: '1.18' },
    pinExit: { distance: '3rem' },
    overlayRise: { distance: '40vh' },
  },
  shadow: {
    soft: '0 -24px 48px rgba(22, 31, 54, 0.08)',
    none: 'none',
  },
  radius: {
    subtle: '0.25rem',
  },
  layout: {
    pinHeight: '220svh',
    pinPullUp: '-100svh',
    viewport: '100svh',
  },
};
