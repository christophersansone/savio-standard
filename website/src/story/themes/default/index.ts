import type { Theme } from '../types';
import { resolveMotion } from './motion';
import { defaultTokens } from './tokens';

export const defaultTheme: Theme = {
  id: 'default',
  tokens: defaultTokens,
  styleIds: ['shell', 'blocks', 'effects', 'transitions'],
  resolveMotion,
};
