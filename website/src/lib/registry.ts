/**
 * The route registry: maps site routes to repository documents.
 * This is the single place to add a page when a new document lands in the repo.
 */

export type Section = 'Start Here' | 'For Families' | 'For Communities' | 'The Project';

export interface Doc {
  /** URL path, without leading slash */
  slug: string;
  /** collection name */
  collection: 'content' | 'docs';
  /** entry id within the collection (filename without extension) */
  id: string;
  /** path within the repository, for "suggest an edit" links */
  srcPath: string;
  title: string;
  description: string;
  section: Section;
  /** show on the home page document grid */
  featured?: boolean;
}

export const REPO_URL = 'https://github.com/christophersansone/savio-standard';

export const docs: Doc[] = [
  {
    slug: 'plan',
    collection: 'docs',
    id: 'strategic-plan',
    srcPath: 'docs/strategic-plan.md',
    title: 'The Strategic Plan',
    description:
      'Who we are, why we exist, and how this works — the problem we are naming, the theory of change, the six pillars, and the year-one pilot.',
    section: 'Start Here',
    featured: true,
  },
  {
    slug: 'covenant',
    collection: 'content',
    id: 'covenant',
    srcPath: 'content/covenant.md',
    title: 'The Family Covenant',
    description:
      'Eight commitments, signed as a household and renewed each year. Private until eight families in a grade have signed — no family stands alone.',
    section: 'For Families',
    featured: true,
  },
  {
    slug: 'manifesto',
    collection: 'content',
    id: 'manifesto-parents',
    srcPath: 'content/manifesto-parents.md',
    title: 'The Parents’ Manifesto',
    description:
      'The truths we hold self-evident, and the expectations we state plainly — beginning with ourselves.',
    section: 'For Families',
    featured: true,
  },
  {
    slug: 'manifesto/community',
    collection: 'content',
    id: 'manifesto-community',
    srcPath: 'content/manifesto-community.md',
    title: 'The Community Manifesto',
    description:
      'The same truths as shared affirmations — for parents, teachers, staff, administration, and clergy to sign together.',
    section: 'For Families',
  },
  {
    slug: 'protocol',
    collection: 'content',
    id: 'parent-to-parent-protocol',
    srcPath: 'content/parent-to-parent-protocol.md',
    title: 'The Parent-to-Parent Protocol',
    description:
      'How to approach another parent, how to receive one, and what to do when the conversation gets stuck — with scripts.',
    section: 'For Families',
    featured: true,
  },
  {
    slug: 'glossary',
    collection: 'content',
    id: 'glossary',
    srcPath: 'content/glossary.md',
    title: 'The Glossary',
    description:
      'A shared language that turns “drama” into specific, discussable behavior — taught to parents and children alike.',
    section: 'For Families',
  },
  {
    slug: 'roles',
    collection: 'content',
    id: 'roles-and-responsibilities',
    srcPath: 'content/roles-and-responsibilities.md',
    title: 'Roles & Responsibilities',
    description:
      'The six volunteer roles of a Savio Community — the pitch, the duties, the time, and the term for each.',
    section: 'For Communities',
  },
  {
    slug: 'facilitators',
    collection: 'content',
    id: 'facilitator-onboarding',
    srcPath: 'content/facilitator-onboarding.md',
    title: 'Facilitator Onboarding',
    description:
      'The method, the scripts, the hard moments, and the bright lines — for the volunteers who hold the room.',
    section: 'For Communities',
  },
  {
    slug: 'commitment',
    collection: 'docs',
    id: 'stewardship-commitment',
    srcPath: 'docs/stewardship-commitment.md',
    title: 'The Stewardship Commitment',
    description:
      'Eleven public promises that bind the steward and any successor — beginning with: free for families, forever.',
    section: 'The Project',
  },
  {
    slug: 'stewardship',
    collection: 'docs',
    id: 'stewardship-and-operations',
    srcPath: 'docs/stewardship-and-operations.md',
    title: 'Stewardship & Operations',
    description:
      'How the organization behind the framework operates: the bright line, licensing, terms, and money.',
    section: 'The Project',
  },
  {
    slug: 'why-a-steward',
    collection: 'docs',
    id: 'why-a-steward',
    srcPath: 'docs/why-a-steward.md',
    title: 'Why a Steward?',
    description:
      'A plain answer for contributors about who owns what, and why that protects the mission.',
    section: 'The Project',
  },
  {
    slug: 'contribute',
    collection: 'docs',
    id: 'working-with-this-repo',
    srcPath: 'docs/working-with-this-repo.md',
    title: 'How to Contribute',
    description:
      'Why the project lives in a Git repository, and how to propose a change — no experience required.',
    section: 'The Project',
  },
];

export const bySlug = (slug: string) => docs.find((d) => d.slug === slug);

/** filename (no extension) -> site route, used by the markdown link rewriter */
export const routeByFile: Record<string, string> = Object.fromEntries(
  docs.map((d) => [d.id, '/' + d.slug])
);
