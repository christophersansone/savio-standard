import { resolve } from '../director/strategy';
import type {
  DirectedBlockModel,
  DirectedStoryModel,
  StoryModel,
} from '../model';
import { flattenBlocks } from '../model';

/** Attach director in/out plans to every block via adjacency strategy. */
export function direct(model: StoryModel): DirectedStoryModel {
  const flat = flattenBlocks(model);

  const directedFlat: DirectedBlockModel[] = flat.map((block, i) => ({
    ...block,
    director: resolve(flat[i - 1], block, flat[i + 1]),
  }));

  const byScene = new Map<string, DirectedBlockModel[]>();
  for (const block of directedFlat) {
    const list = byScene.get(block.sceneId) ?? [];
    list.push(block);
    byScene.set(block.sceneId, list);
  }

  return {
    meta: model.meta,
    scenes: model.scenes.map((scene) => ({
      ...scene,
      blocks: byScene.get(scene.id) ?? [],
    })),
  };
}
