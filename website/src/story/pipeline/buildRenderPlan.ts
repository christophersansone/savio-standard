import type { RenderPlan } from '../model';
import type { AuthorStory, StoryTheme } from '../types';
import { getTheme } from '../themes/registry';
import { normalize } from './normalize';
import { direct } from './direct';
import { applyTheme } from './applyTheme';

/** Full narrative pipeline: AuthorStory → RenderPlan. */
export function buildRenderPlan(
  story: AuthorStory,
  themeId: StoryTheme = 'default',
): RenderPlan {
  const model = normalize(story);
  const directed = direct(model);
  const theme = getTheme(themeId);
  return applyTheme(directed, theme);
}
