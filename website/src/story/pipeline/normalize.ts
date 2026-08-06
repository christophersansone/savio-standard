import { toStoryMedia } from '../media';
import type {
  BlockModel,
  SceneModel,
  StoryModel,
} from '../model';
import type {
  AuthorBlock,
  AuthorScene,
  AuthorStory,
  BlockAlignment,
  BlockType,
  ResolvedIntent,
  ResolvedPresentation,
} from '../types';

const TEXT_BLOCK_TYPES = new Set<BlockType>([
  'narrative',
  'quote',
  'chapter',
  'statistic',
  'cta',
]);

function isTextBlock(type: BlockType): boolean {
  return TEXT_BLOCK_TYPES.has(type);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);
}

function defaultIntent(): ResolvedIntent {
  return {
    emphasis: 'medium',
    pace: 'normal',
    mood: 'neutral',
    focus: 'balanced',
  };
}

function resolveIntent(block: AuthorBlock): ResolvedIntent {
  const base = defaultIntent();
  return {
    emphasis: block.intent?.emphasis ?? base.emphasis,
    pace: block.intent?.pace ?? base.pace,
    mood: block.intent?.mood ?? base.mood,
    focus: block.intent?.focus ?? base.focus,
  };
}

function extractContent(block: AuthorBlock): BlockModel['content'] {
  switch (block.type) {
    case 'hero':
      return {
        title: block.title,
        subtitle: block.subtitle,
        background: toStoryMedia(block.background),
      };
    case 'narrative':
      return {
        text: block.text,
        highlight: block.highlight,
      };
    case 'quote':
      return {
        quote: block.quote,
        attribution: block.attribution,
        background: toStoryMedia(block.background),
      };
    case 'photo':
      return {
        image: toStoryMedia(block.image, {
          alt: block.alt ?? block.caption,
          treatment: 'cover',
        })!,
        caption: block.caption,
      };
    case 'statistic':
      return {
        number: block.number,
        prefix: block.prefix ?? '',
        suffix: block.suffix ?? '',
        label: block.label,
        description: block.description,
      };
    case 'chapter':
      return {
        title: block.title,
        subtitle: block.subtitle,
      };
    case 'cta':
      return {
        title: block.title,
        text: block.text,
        button: block.button,
      };
  }
}

type FlatAuthor = {
  scene: AuthorScene;
  sceneIndex: number;
  block: AuthorBlock;
  blockIndexInScene: number;
};

function flattenAuthor(story: AuthorStory): FlatAuthor[] {
  const out: FlatAuthor[] = [];
  story.scenes.forEach((scene, sceneIndex) => {
    scene.blocks.forEach((block, blockIndexInScene) => {
      out.push({ scene, sceneIndex, block, blockIndexInScene });
    });
  });
  return out;
}

function inferAlignment(
  block: AuthorBlock,
  textAlignIndex: number,
): BlockAlignment {
  if (block.presentation?.alignment) {
    return block.presentation.alignment;
  }
  if (isTextBlock(block.type)) {
    return textAlignIndex % 2 === 0 ? 'left' : 'right';
  }
  return 'center';
}

function inferPresentation(
  block: AuthorBlock,
  next: AuthorBlock | undefined,
  textAlignIndex: number,
): ResolvedPresentation {
  const p = block.presentation;

  let layout: ResolvedPresentation['layout'] = p?.layout ?? 'contained';
  if (!p?.layout && block.type === 'photo') {
    if (next?.type === 'quote' || next?.type === 'narrative') {
      layout = 'fullscreen';
    }
  }

  let overlay: ResolvedPresentation['overlay'] = p?.overlay ?? 'none';
  if (!p?.overlay && block.type === 'hero') {
    const hasMedia =
      typeof block.background === 'string'
        ? Boolean(block.background)
        : Boolean(block.background?.src);
    overlay = hasMedia ? 'dark' : 'none';
  }

  return {
    alignment: inferAlignment(block, textAlignIndex),
    overlay,
    layout,
    width: p?.width ?? 'narrow',
    effects: p?.effects,
  };
}

/**
 * AuthorStory → StoryModel.
 * Fills IDs, media, intent/presentation defaults. No director/theme knowledge.
 */
export function normalize(author: AuthorStory): StoryModel {
  if (!author) {
    throw new Error(
      'Story data is undefined. Check that the story module has a default export (the file may be empty or unsaved).',
    );
  }
  if (!author.scenes?.length) {
    throw new Error('Story must include at least one scene.');
  }

  const flat = flattenAuthor(author);
  const sceneBuckets = new Map<number, BlockModel[]>();
  let textAlignIndex = 0;

  flat.forEach((entry, globalIndex) => {
    const next = flat[globalIndex + 1]?.block;
    const id =
      entry.block.id ??
      `${entry.scene.slug ?? `scene-${entry.sceneIndex + 1}`}-${entry.block.type}-${entry.blockIndexInScene + 1}`;

    const sceneId =
      entry.scene.slug ??
      (entry.scene.title
        ? slugify(entry.scene.title)
        : `scene-${entry.sceneIndex + 1}`);

    const currentTextIndex = textAlignIndex;
    if (isTextBlock(entry.block.type) && !entry.block.presentation?.alignment) {
      textAlignIndex += 1;
    }

    const model: BlockModel = {
      id,
      type: entry.block.type,
      sceneId,
      index: globalIndex,
      content: extractContent(entry.block),
      intent: resolveIntent(entry.block),
      presentation: inferPresentation(entry.block, next, currentTextIndex),
    };

    const list = sceneBuckets.get(entry.sceneIndex) ?? [];
    list.push(model);
    sceneBuckets.set(entry.sceneIndex, list);
  });

  const scenes: SceneModel[] = author.scenes.map((scene, sceneIndex) => {
    const slug =
      scene.slug ??
      (scene.title ? slugify(scene.title) : `scene-${sceneIndex + 1}`);
    return {
      id: slug,
      title: scene.title,
      slug,
      index: sceneIndex,
      blocks: sceneBuckets.get(sceneIndex) ?? [],
    };
  });

  // Re-stamp sceneId from resolved scene id (slug)
  for (const scene of scenes) {
    for (const block of scene.blocks) {
      block.sceneId = scene.id;
    }
  }

  return {
    meta: {
      title: author.meta?.title,
      description: author.meta?.description,
    },
    scenes,
  };
}
