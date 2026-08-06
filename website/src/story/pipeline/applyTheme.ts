import type {
  DirectedBlockModel,
  DirectedStoryModel,
  RenderPlan,
  RenderScene,
  RenderSection,
  SectionLayout,
} from '../model';
import { tokensToCssVars } from '../tokens/css';
import type { Theme } from '../themes/types';
import type { DirectorPlan } from '../director/strategy';

function layoutFromDirector(
  out: DirectorPlan,
  incoming: DirectorPlan,
): SectionLayout {
  const layout: SectionLayout = {};

  if (out.transition === 'pin-over' && out.pinning) {
    layout.pin = { height: 'var(--token-layout-pin-height)', sticky: true };
  }

  if (incoming.transition === 'pin-over') {
    layout.pullUp = 'var(--token-layout-pin-pull-up)';
    layout.surface = incoming.surface;
  }

  if (incoming.transition === 'stack') {
    layout.surface = incoming.surface === 'inherit' ? 'paper' : incoming.surface;
  }

  return layout;
}

function sectionFromBlock(block: DirectedBlockModel, theme: Theme): RenderSection {
  const motion = theme.resolveMotion(block);
  const layout = layoutFromDirector(block.director.out, block.director.in);

  const transitionOut =
    block.director.out.transition === 'none'
      ? undefined
      : block.director.out.transition;
  const transitionIn =
    block.director.in.transition === 'none'
      ? undefined
      : block.director.in.transition;

  return {
    id: block.id,
    blockType: block.type,
    sceneId: block.sceneId,
    attrs: {
      'data-block': block.type,
      'data-index': String(block.index),
      'data-align': block.presentation.alignment,
      'data-effect': motion.join(' ') || undefined,
      'data-transition-out': transitionOut,
      'data-transition-in': transitionIn,
      'data-surface': layout.surface,
    },
    layout,
    motion,
    content: block.content,
    presentation: block.presentation,
    director: block.director,
  };
}

/** Directed model + theme → render instructions (incl. design tokens). */
export function applyTheme(
  directed: DirectedStoryModel,
  theme: Theme,
): RenderPlan {
  const scenes: RenderScene[] = directed.scenes.map((scene) => ({
    id: scene.id,
    title: scene.title,
    slug: scene.slug,
    sections: scene.blocks.map((b) => sectionFromBlock(b, theme)),
  }));

  return {
    themeId: theme.id,
    styles: theme.styleIds,
    cssVars: tokensToCssVars(theme.tokens),
    scenes,
  };
}
