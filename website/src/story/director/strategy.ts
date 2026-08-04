import type { BlockType } from '../types';
import type { BlockModel } from '../model';

export type TransitionKind = 'none' | 'pin-over' | 'crossfade' | 'stack';
export type DirectorPacing = 'hold' | 'flow' | 'cut';
export type DirectorSurface =
  | 'inherit'
  | 'paper'
  | 'ink'
  | 'media'
  | 'gradient';

/**
 * Rich transition plan for one adjacency edge.
 * Renderer maps this to layout attrs — no CSS class names here.
 */
export interface DirectorPlan {
  transition: TransitionKind;
  pacing: DirectorPacing;
  /** 0–1 overlap hint (pin-over ≈ 0.45). */
  overlap: number;
  pinning: boolean;
  emphasis: 'low' | 'medium' | 'high';
  surface: DirectorSurface;
}

const NONE: DirectorPlan = {
  transition: 'none',
  pacing: 'flow',
  overlap: 0,
  pinning: false,
  emphasis: 'medium',
  surface: 'inherit',
};

type PairKey = `${BlockType}>${BlockType}`;

const PAIR_PLANS: Partial<Record<PairKey, DirectorPlan>> = {
  'hero>narrative': {
    transition: 'pin-over',
    pacing: 'hold',
    overlap: 0.45,
    pinning: true,
    emphasis: 'high',
    surface: 'gradient',
  },
  'photo>quote': {
    transition: 'pin-over',
    pacing: 'hold',
    overlap: 0.45,
    pinning: true,
    emphasis: 'high',
    surface: 'gradient',
  },
  'photo>narrative': {
    transition: 'pin-over',
    pacing: 'hold',
    overlap: 0.45,
    pinning: true,
    emphasis: 'high',
    surface: 'gradient',
  },
  'statistic>chapter': {
    transition: 'crossfade',
    pacing: 'cut',
    overlap: 0,
    pinning: false,
    emphasis: 'medium',
    surface: 'inherit',
  },
  'narrative>chapter': {
    transition: 'stack',
    pacing: 'flow',
    overlap: 0,
    pinning: false,
    emphasis: 'medium',
    surface: 'paper',
  },
  'quote>chapter': {
    transition: 'stack',
    pacing: 'flow',
    overlap: 0,
    pinning: false,
    emphasis: 'medium',
    surface: 'paper',
  },
};

/** Strategy entry point: resolve choreography from adjacency. */
export function resolve(
  previous: BlockModel | undefined,
  current: BlockModel,
  next: BlockModel | undefined,
): { in: DirectorPlan; out: DirectorPlan } {
  const outKey = next
    ? (`${current.type}>${next.type}` as PairKey)
    : undefined;
  const inKey = previous
    ? (`${previous.type}>${current.type}` as PairKey)
    : undefined;

  return {
    out: (outKey && PAIR_PLANS[outKey]) || NONE,
    in: (inKey && PAIR_PLANS[inKey]) || NONE,
  };
}
