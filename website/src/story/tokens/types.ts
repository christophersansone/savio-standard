/**
 * Semantic design tokens. Themes supply values; blocks consume names only
 * (via CSS custom properties emitted from these values).
 */
export interface DesignTokens {
  color: {
    ink: string;
    inkDeep: string;
    inkSoft: string;
    paper: string;
    paperDeep: string;
    accent: string;
    accentSoft: string;
    line: string;
    onMedia: string;
    overlayDark: string;
    overlayLight: string;
  };
  surface: {
    primary: string;
    secondary: string;
    inverse: string;
    media: string;
    gradient: string;
  };
  font: {
    display: string;
    body: string;
  };
  headline: {
    hero: string;
    section: string;
    pullquote: string;
    statistic: string;
  };
  body: {
    prose: string;
    caption: string;
    label: string;
  };
  spacing: {
    block: string;
    chapter: string;
    inline: string;
    tight: string;
    large: string;
  };
  measure: {
    narrow: string;
    wide: string;
    hero: string;
    /** Centered content rail; side-aligned copy stays inside this. */
    page: string;
  };
  motion: {
    gentle: { distance: string; range: string };
    emphatic: { distance: string; range: string; scaleFrom: string };
    parallax: { travel: string; scale: string };
    zoom: { to: string };
    drift: { distance: string };
    pinExit: { distance: string };
    overlayRise: { distance: string };
  };
  shadow: {
    soft: string;
    none: string;
  };
  radius: {
    subtle: string;
  };
  layout: {
    pinHeight: string;
    pinPullUp: string;
    viewport: string;
  };
}
