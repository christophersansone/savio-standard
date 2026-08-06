import type { MediaInput, StoryMedia } from './media';

/** Low-level motion names — theme implementation detail; optional author override. */
export type EffectName = 'fade' | 'reveal' | 'parallax' | 'zoom' | 'drift';

export type StoryTheme =
  | 'default'
  | 'minimal'
  | 'magazine'
  | 'apple'
  | 'annual-report'
  | 'editorial'
  | 'documentary';

export type BlockType =
  | 'hero'
  | 'narrative'
  | 'quote'
  | 'photo'
  | 'statistic'
  | 'chapter'
  | 'cta';

export type BlockAlignment = 'left' | 'center' | 'right';
/** @deprecated Prefer BlockAlignment */
export type HeroAlignment = BlockAlignment;
export type HeroOverlay = 'dark' | 'light' | 'none';
export type NarrativeWidth = 'narrow' | 'wide';
export type PhotoLayout = 'fullscreen' | 'contained';

export type Emphasis = 'low' | 'medium' | 'high';
export type Pace = 'slow' | 'normal' | 'fast';
export type Mood = 'neutral' | 'solemn' | 'urgent' | 'hopeful';
export type Focus = 'text' | 'media' | 'balanced';

/** Narrative intent — themes interpret these as motion/emphasis. */
export interface AuthorIntent {
  emphasis?: Emphasis;
  pace?: Pace;
  mood?: Mood;
  focus?: Focus;
}

/** Optional presentation escape hatches. Prefer letting the engine infer. */
export interface AuthorPresentation {
  alignment?: BlockAlignment;
  overlay?: HeroOverlay;
  layout?: PhotoLayout;
  width?: NarrativeWidth;
  effects?: EffectName[];
}

interface AuthorBlockBase {
  id?: string;
  intent?: AuthorIntent;
  presentation?: AuthorPresentation;
}

export interface AuthorHeroBlock extends AuthorBlockBase {
  type: 'hero';
  title: string;
  subtitle?: string;
  background?: MediaInput;
}

export interface AuthorNarrativeBlock extends AuthorBlockBase {
  type: 'narrative';
  text: string;
  highlight?: string;
}

export interface AuthorQuoteBlock extends AuthorBlockBase {
  type: 'quote';
  quote: string;
  attribution?: string;
  background?: MediaInput;
}

export interface AuthorPhotoBlock extends AuthorBlockBase {
  type: 'photo';
  image: MediaInput;
  caption?: string;
  alt?: string;
}

export interface AuthorStatisticBlock extends AuthorBlockBase {
  type: 'statistic';
  number: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description?: string;
}

export interface AuthorChapterBlock extends AuthorBlockBase {
  type: 'chapter';
  title: string;
  subtitle?: string;
}

export interface AuthorCtaBlock extends AuthorBlockBase {
  type: 'cta';
  title: string;
  text?: string;
  button: {
    label: string;
    href: string;
  };
}

export type AuthorBlock =
  | AuthorHeroBlock
  | AuthorNarrativeBlock
  | AuthorQuoteBlock
  | AuthorPhotoBlock
  | AuthorStatisticBlock
  | AuthorChapterBlock
  | AuthorCtaBlock;

export interface AuthorScene {
  title?: string;
  slug?: string;
  blocks: AuthorBlock[];
}

/** Public authoring contract. Source-agnostic once normalized. */
export interface AuthorStory {
  meta?: {
    title?: string;
    description?: string;
  };
  scenes: AuthorScene[];
}

/** @deprecated Prefer AuthorStory — kept as alias for imports. */
export type Story = AuthorStory;

export interface ResolvedIntent {
  emphasis: Emphasis;
  pace: Pace;
  mood: Mood;
  focus: Focus;
}

export interface ResolvedPresentation {
  alignment: BlockAlignment;
  overlay: HeroOverlay;
  layout: PhotoLayout;
  width: NarrativeWidth;
  /** Author override only; theme fills motion when absent. */
  effects?: EffectName[];
}

export type {
  StoryMedia,
  MediaInput,
};
