import type { DirectedBlockModel } from '../model';
import type { DesignTokens } from '../tokens/types';
import type { EffectName, StoryTheme } from '../types';

/**
 * Pluggable theme contract.
 * Component dispatch lives in Astro (Section.astro) for the default theme;
 * tokens + motion are the portable Theme surface.
 */
export interface Theme {
  id: StoryTheme;
  tokens: DesignTokens;
  /** CSS module paths imported by Story.astro for this theme. */
  styleIds: Array<'shell' | 'blocks' | 'effects' | 'transitions'>;
  resolveMotion(block: DirectedBlockModel): EffectName[];
}
