import type { StoryMedia } from './media';
import type {
  AuthorStory,
  BlockType,
  EffectName,
  ResolvedIntent,
  ResolvedPresentation,
} from './types';
import type { DirectorPlan } from './director/strategy';

export interface StoryMeta {
  title?: string;
  description?: string;
}

export interface HeroContent {
  title: string;
  subtitle?: string;
  background?: StoryMedia;
}

export interface NarrativeContent {
  text: string;
  highlight?: string;
}

export interface QuoteContent {
  quote: string;
  attribution?: string;
  background?: StoryMedia;
}

export interface PhotoContent {
  image: StoryMedia;
  caption?: string;
}

export interface StatisticContent {
  number: number;
  prefix: string;
  suffix: string;
  label: string;
  description?: string;
}

export interface ChapterContent {
  title: string;
  subtitle?: string;
}

export interface CtaContent {
  title: string;
  text?: string;
  button: { label: string; href: string };
}

export type BlockContent =
  | { type: 'hero'; content: HeroContent }
  | { type: 'narrative'; content: NarrativeContent }
  | { type: 'quote'; content: QuoteContent }
  | { type: 'photo'; content: PhotoContent }
  | { type: 'statistic'; content: StatisticContent }
  | { type: 'chapter'; content: ChapterContent }
  | { type: 'cta'; content: CtaContent };

export interface BlockModel {
  id: string;
  type: BlockType;
  sceneId: string;
  /** Global index across all scenes (director adjacency). */
  index: number;
  content: BlockContent['content'];
  intent: ResolvedIntent;
  presentation: ResolvedPresentation;
}

export interface SceneModel {
  id: string;
  title?: string;
  slug: string;
  index: number;
  blocks: BlockModel[];
}

/** Intermediate representation after normalize — source-agnostic. */
export interface StoryModel {
  meta: StoryMeta;
  scenes: SceneModel[];
}

export interface DirectedBlockModel extends BlockModel {
  director: {
    in: DirectorPlan;
    out: DirectorPlan;
  };
}

export interface DirectedSceneModel extends Omit<SceneModel, 'blocks'> {
  blocks: DirectedBlockModel[];
}

export interface DirectedStoryModel {
  meta: StoryMeta;
  scenes: DirectedSceneModel[];
}

export interface SectionLayout {
  pin?: { height: string; sticky: boolean };
  pullUp?: string;
  surface?: DirectorPlan['surface'];
}

/** Layout-agnostic instructions for the Astro renderer. */
export interface RenderSection {
  id: string;
  blockType: BlockType;
  sceneId: string;
  attrs: Record<string, string | undefined>;
  layout: SectionLayout;
  motion: EffectName[];
  content: BlockModel['content'];
  presentation: ResolvedPresentation;
  director: DirectedBlockModel['director'];
}

export interface RenderScene {
  id: string;
  title?: string;
  slug: string;
  sections: RenderSection[];
}

export interface RenderPlan {
  themeId: string;
  styles: string[];
  cssVars: Record<string, string>;
  scenes: RenderScene[];
}

/** Flatten scenes to a linear block list for adjacency. */
export function flattenBlocks(model: StoryModel): BlockModel[] {
  return model.scenes.flatMap((s) => s.blocks);
}

export type { AuthorStory };
