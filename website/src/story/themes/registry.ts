import type { StoryTheme } from '../types';
import type { Theme } from './types';
import { defaultTheme } from './default';

const THEMES: Record<string, Theme> = {
  default: defaultTheme,
};

export function getTheme(id: StoryTheme = 'default'): Theme {
  return THEMES[id] ?? defaultTheme;
}
