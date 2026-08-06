import type { DirectedBlockModel } from '../../model';
import type { EffectName } from '../../types';

const TEXT_TYPES = new Set([
  'narrative',
  'quote',
  'chapter',
  'statistic',
  'cta',
]);

/**
 * Default theme maps block type + intent + presentation → concrete effects.
 * Other themes may blur/slide instead without changing stories.
 */
export function resolveMotion(block: DirectedBlockModel): EffectName[] {
  if (block.presentation.effects?.length) {
    return [...block.presentation.effects];
  }

  let motion: EffectName[];

  switch (block.type) {
    case 'hero':
      motion = ['fade', 'reveal', 'zoom'];
      break;
    case 'narrative':
    case 'chapter':
    case 'statistic':
      motion = ['reveal'];
      break;
    case 'quote':
    case 'cta':
      motion = ['fade'];
      break;
    case 'photo': {
      motion =
        block.presentation.layout === 'fullscreen'
          ? ['fade', 'parallax']
          : ['fade'];
      if (
        block.presentation.layout === 'fullscreen' &&
        block.intent.emphasis === 'high'
      ) {
        motion.push('zoom');
      }
      break;
    }
    default:
      motion = ['fade'];
  }

  if (
    TEXT_TYPES.has(block.type) &&
    block.presentation.alignment !== 'center'
  ) {
    motion.push('drift');
  }

  return motion;
}
