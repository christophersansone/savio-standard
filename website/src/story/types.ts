/** Reusable effect names applied via data-effect attributes. */
export type EffectName = 'fade' | 'reveal' | 'parallax' | 'zoom';

/**
 * Forward-compatible theme tokens. v1 styles `default` only;
 * other values are reserved for future presentation layers.
 */
export type StoryTheme =
  | 'default'
  | 'minimal'
  | 'magazine'
  | 'apple'
  | 'annual-report'
  | 'editorial'
  | 'documentary';

export type HeroAlignment = 'left' | 'center' | 'right';
export type HeroOverlay = 'dark' | 'light' | 'none';
export type NarrativeWidth = 'narrow' | 'wide';
export type PhotoLayout = 'fullscreen' | 'contained';

interface BlockBase {
  id?: string;
  effects?: EffectName[];
  /** Reserved — presentation is driven by Story-level theme CSS vars. */
  theme?: StoryTheme;
}

export interface HeroBlock extends BlockBase {
  type: 'hero';
  title: string;
  subtitle?: string;
  background?: string;
  alignment?: HeroAlignment;
  overlay?: HeroOverlay;
}

export interface NarrativeBlock extends BlockBase {
  type: 'narrative';
  text: string;
  width?: NarrativeWidth;
  /** Optional paragraph shown with emphasis after the main text. */
  highlight?: string;
}

export interface QuoteBlock extends BlockBase {
  type: 'quote';
  quote: string;
  attribution?: string;
  background?: string;
}

export interface PhotoBlock extends BlockBase {
  type: 'photo';
  image: string;
  caption?: string;
  alt?: string;
  layout?: PhotoLayout;
}

export interface StatisticBlock extends BlockBase {
  type: 'statistic';
  /** Numeric value to animate toward (e.g. 72). */
  number: number;
  /** Optional prefix/suffix for display (e.g. "%" → "72%"). */
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface ChapterBlock extends BlockBase {
  type: 'chapter';
  title: string;
  subtitle?: string;
}

export interface CtaBlock extends BlockBase {
  type: 'cta';
  title: string;
  text?: string;
  button: {
    label: string;
    href: string;
  };
}

export type StoryBlock =
  | HeroBlock
  | NarrativeBlock
  | QuoteBlock
  | PhotoBlock
  | StatisticBlock
  | ChapterBlock
  | CtaBlock;

export type Story = StoryBlock[];

export type BlockType = StoryBlock['type'];
