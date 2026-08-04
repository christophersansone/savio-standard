import type { DirectedBlockModel } from '../../model';
import type { EffectName } from '../../types';

/**
 * Default theme maps block type + intent + presentation → concrete effects.
 * Other themes may blur/slide instead without changing stories.
 */
export function resolveMotion(block: DirectedBlockModel): EffectName[] {
  if (block.presentation.effects?.length) {
    return [...block.presentation.effects];
  }

  switch (block.type) {
    case 'hero':
      return ['fade', 'reveal', 'zoom'];
    case 'narrative':
    case 'chapter':
    case 'statistic':
      return ['reveal'];
    case 'quote':
    case 'cta':
      return ['fade'];
    case 'photo': {
      const motion: EffectName[] =
        block.presentation.layout === 'fullscreen'
          ? ['fade', 'parallax']
          : ['fade'];
      if (
        block.presentation.layout === 'fullscreen' &&
        block.intent.emphasis === 'high'
      ) {
        motion.push('zoom');
      }
      return motion;
    }
    default:
      return ['fade'];
  }
}
