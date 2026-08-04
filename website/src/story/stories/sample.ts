import type { AuthorStory } from '../types';

/**
 * Reference story — content-first scenes.
 * Presentation/effects mostly inferred; sparse overrides for parity.
 */
const sample: AuthorStory = {
  meta: {
    title: 'The Problem',
    description: 'A sample scrollytelling page for The Savio Standard.',
  },
  scenes: [
    {
      title: 'The Problem',
      slug: 'the-problem',
      blocks: [
        {
          type: 'hero',
          title: 'The Problem',
          subtitle:
            'Bullying evolved. The Golden Rule became a goal instead of a standard.',
          background: '/images/st-dominic-savio.png',
        },
        {
          type: 'narrative',
          text: 'Catholic grade schools promise a community formed by the Gospel. Yet many families experience something different: social aggression that persists despite everyone\'s good intentions, a school office asked to carry burdens it was never built to carry, and a culture where the kindest families quietly leave.',
          highlight:
            'Left alone, a culture doesn\'t hold itself together — it drifts toward whatever its most persistent voices normalize.',
        },
        {
          type: 'photo',
          image: {
            kind: 'image',
            src: '/images/st-john-bosco.png',
            alt: 'St. John Bosco',
          },
          caption: 'Loneliness leaves no bruises — but the wound is real.',
          intent: { emphasis: 'high', focus: 'media' },
          // fullscreen inferred (next is quote); zoom via high emphasis
        },
        {
          type: 'quote',
          quote: 'Nobody pushed me.',
          attribution: 'Fourth grader',
        },
        {
          type: 'statistic',
          number: 6,
          label: 'Observable realities',
          description:
            'The Case names six structural forces that make culture drift — from outsourcing conflict to the school, to phones industrializing the damage.',
        },
      ],
    },
    {
      title: 'The Missing Piece',
      slug: 'the-missing-piece',
      blocks: [
        {
          type: 'chapter',
          title: 'The Missing Piece',
          subtitle:
            'Not a new destination — a shared framework for getting there together.',
        },
        {
          type: 'narrative',
          text: 'The Savio Standard is a return to the Golden Rule as the baseline every family lives and expects. Named for St. Dominic Savio — the schoolboy saint who organized his classmates to defend the smallest among them — it is a lay movement of Catholic families choosing to take Christ\'s command seriously.',
          presentation: { width: 'wide' },
        },
      ],
    },
    {
      title: 'How It Works',
      slug: 'how-it-works',
      blocks: [
        {
          type: 'chapter',
          title: 'How It Works',
          subtitle:
            'A standard everyone can point to — and infrastructure that puts it into daily practice.',
        },
        {
          type: 'quote',
          quote:
            'I can\'t do big things, but I want everything I do, even the smallest thing, to be for the greater glory of God.',
          attribution: 'St. Dominic Savio',
          background: '/images/st-dominic-savio-original.png',
        },
        {
          type: 'photo',
          image: {
            kind: 'image',
            src: '/images/ven-mama-margherita.png',
            alt: 'Venerable Mama Margherita',
          },
          caption:
            'Parents are the first educators. Culture is made at home, at parties, and in group chats — not only in the principal\'s office.',
          presentation: { layout: 'contained' },
        },
        {
          type: 'statistic',
          number: 8,
          label: 'Covenant commitments',
          description:
            'The Family Covenant translates the Golden Rule into eight concrete promises households make to one another.',
        },
        {
          type: 'chapter',
          title: 'The Path Forward',
          subtitle:
            'Covenants activate grade by grade, so no family ever stands alone.',
        },
        {
          type: 'narrative',
          text: 'A shared language for naming conflict clearly. A parent-to-parent protocol for hard conversations. Formation sessions so the whole community speaks the same terms. Homeroom Hosts and School Leads who keep every family known. Digital oversight norms so no household faces that decision alone.',
        },
        {
          type: 'cta',
          title: 'Anchor your school in the Golden Rule',
          text: 'It is free, it needs no one\'s permission, and it asks nothing the Gospel does not already ask.',
          button: {
            label: 'Read the Case',
            href: '/the-case',
          },
        },
      ],
    },
  ],
};

export default sample;
