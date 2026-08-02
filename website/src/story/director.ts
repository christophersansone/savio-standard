import type { BlockType, Story, StoryBlock } from './types';

/**
 * Automatic adjacency transitions.
 * - pin-over: previous media holds sticky while the next block scrolls over it
 * - crossfade: previous fades/scales out as the next enters
 * - stack: next covers previous with an opaque surface
 */
export type TransitionKind = 'pin-over' | 'crossfade' | 'stack';

export interface DirectorContext {
  index: number;
  prevType?: BlockType;
  nextType?: BlockType;
  /** Role of this block in a transition with the next block. */
  transitionOut: TransitionKind | null;
  /** Role of this block in a transition with the previous block. */
  transitionIn: TransitionKind | null;
}

type PairKey = `${BlockType}>${BlockType}`;

/** Default choreography between adjacent block types. */
const PAIR_TRANSITIONS: Partial<Record<PairKey, TransitionKind>> = {
  'hero>narrative': 'pin-over',
  'photo>quote': 'pin-over',
  'photo>narrative': 'pin-over',
  'statistic>chapter': 'crossfade',
  'narrative>chapter': 'stack',
  'quote>chapter': 'stack',
};

function pairKey(from: BlockType, to: BlockType): PairKey {
  return `${from}>${to}`;
}

export function resolveTransition(
  from: BlockType,
  to: BlockType,
): TransitionKind | null {
  return PAIR_TRANSITIONS[pairKey(from, to)] ?? null;
}

export function getDirectorContext(story: Story, index: number): DirectorContext {
  const prev = story[index - 1] as StoryBlock | undefined;
  const next = story[index + 1] as StoryBlock | undefined;
  const current = story[index] as StoryBlock;

  const transitionOut =
    next && current ? resolveTransition(current.type, next.type) : null;
  const transitionIn =
    prev && current ? resolveTransition(prev.type, current.type) : null;

  return {
    index,
    prevType: prev?.type,
    nextType: next?.type,
    transitionOut,
    transitionIn,
  };
}
