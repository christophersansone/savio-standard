import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The canonical markdown lives at the repository root, one level above /website.
// The website holds no copies of anything.

const content = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content' }),
  schema: z.object({}).passthrough(), // repo markdown carries no frontmatter (yet)
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../docs' }),
  schema: z.object({}).passthrough(),
});

export const collections = { content, docs };
