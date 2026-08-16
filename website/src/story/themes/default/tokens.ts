import type { DesignTokens } from '../../tokens/types';

/**
 * Default (Savio) token values.
 *
 * Colour, type, radius and elevation are aligned with The Savio Standard
 * Design System (Claude Design) — the same navy / warm-paper / gold scales the
 * marketing pages use, so a story reads as the same brand.
 *
 * Motion is deliberately NOT design-system-aligned: the DS motion rules govern
 * UI transitions on marketing and portal surfaces, where the brand is steady on
 * purpose. The story engine is a separate, cinematic register and keeps its own
 * parallax / zoom / pin behaviour — see ./motion.ts.
 */
export const defaultTokens: DesignTokens = {
  color: {
    ink: '#132643', // navy-800
    inkDeep: '#0b1729', // navy-900
    inkSoft: '#5f5c55', // paper-600 — warm neutral, never a cool grey
    paper: '#f5f3ed', // paper-200
    paperDeep: '#e1ded7', // paper-300
    accent: '#e0af3b', // gold-400
    accentSoft: '#efcb77', // gold-300
    line: '#e1ded7', // paper-300
    onMedia: '#fcfbf8', // paper-100
    overlayDark: 'rgba(11, 23, 41, 0.55)',
    overlayLight: 'rgba(252, 251, 248, 0.72)',
  },
  surface: {
    primary: '#f5f3ed',
    secondary: '#ffffff',
    inverse: '#0b1729',
    media: '#0b1729',
    gradient:
      'linear-gradient(to bottom, transparent 0%, rgba(11, 23, 41, 0.55) 28%, rgba(11, 23, 41, 0.82) 100%)',
  },
  font: {
    display: "'Bitter', Georgia, 'Times New Roman', serif",
    body: "'Source Sans 3 Variable', 'Source Sans 3', 'Helvetica Neue', Arial, sans-serif",
  },
  headline: {
    /** Tops out at the DS display size (66px). */
    hero: 'clamp(2.5rem, 6vw, 4.125rem)',
    /** Tops out at the DS h2 size (33px). */
    section: 'clamp(1.75rem, 4vw, 2.0625rem)',
    /** Tops out at the DS quote size (27px). */
    pullquote: 'clamp(1.5rem, 4vw, 1.6875rem)',
    /** Full-bleed story stats stay outsized — no DS equivalent. */
    statistic: 'clamp(3.5rem, 12vw, 6rem)',
  },
  body: {
    prose: 'clamp(1.0625rem, 2vw, 1.1875rem)',
    caption: '0.9375rem',
    label: '0.75rem',
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
    /** 1080px — matches the design system's content container. */
    page: '67.5rem',
  },
  motion: {
    gentle: { distance: '4rem', range: 'cover 0% cover 33.333%' },
    emphatic: {
      distance: '6.5rem',
      range: 'cover 0% cover 33.333%',
      scaleFrom: '0.97',
    },
    parallax: { travel: '16%', scale: '1.12' },
    zoom: { to: '1.18' },
    drift: { distance: '2rem' },
    pinExit: { distance: '3rem' },
    overlayRise: { distance: '40vh' },
  },
  shadow: {
    soft: '0 -24px 48px rgba(11, 23, 41, 0.08)',
    none: 'none',
  },
  radius: {
    /** DS --radius-sm (5px). */
    subtle: '0.3125rem',
  },
  layout: {
    pinHeight: '220svh',
    pinPullUp: '-100svh',
    viewport: '100svh',
  },
};
