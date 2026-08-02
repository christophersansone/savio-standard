import type { Story } from '../types';

/**
 * Demo story exercising every v1 block type, effects, and director
 * transitions (hero→narrative pin-over, photo→quote pin-over,
 * statistic→chapter crossfade, narrative→chapter stack).
 */
const sample: Story = [
  {
    type: 'hero',
    title: 'The Problem',
    subtitle: 'Bullying evolved. The Golden Rule became a goal instead of a standard.',
    background: '/images/st-dominic-savio.png',
    alignment: 'center',
    overlay: 'dark',
    effects: ['fade', 'reveal', 'zoom'],
  },
  {
    type: 'narrative',
    width: 'narrow',
    text: 'Catholic grade schools promise a community formed by the Gospel. Yet many families experience something different: social aggression that persists despite everyone\'s good intentions, a school office asked to carry burdens it was never built to carry, and a culture where the kindest families quietly leave.',
    highlight: 'Left alone, a culture doesn\'t hold itself together — it drifts toward whatever its most persistent voices normalize.',
    effects: ['reveal'],
  },
  {
    type: 'photo',
    image: '/images/st-john-bosco.png',
    caption: 'Loneliness leaves no bruises — but the wound is real.',
    alt: 'St. John Bosco',
    layout: 'fullscreen',
    effects: ['fade', 'parallax', 'zoom'],
  },
  {
    type: 'quote',
    quote: 'Nobody pushed me.',
    attribution: 'Fourth grader',
    effects: ['fade'],
  },
  {
    type: 'statistic',
    number: 6,
    label: 'Observable realities',
    description: 'The Case names six structural forces that make culture drift — from outsourcing conflict to the school, to phones industrializing the damage.',
    effects: ['reveal'],
  },
  {
    type: 'chapter',
    title: 'The Missing Piece',
    subtitle: 'Not a new destination — a shared framework for getting there together.',
    effects: ['reveal'],
  },
  {
    type: 'narrative',
    width: 'wide',
    text: 'The Savio Standard is a return to the Golden Rule as the baseline every family lives and expects. Named for St. Dominic Savio — the schoolboy saint who organized his classmates to defend the smallest among them — it is a lay movement of Catholic families choosing to take Christ\'s command seriously.',
    effects: ['reveal'],
  },
  {
    type: 'chapter',
    title: 'How It Works',
    subtitle: 'A standard everyone can point to — and infrastructure that puts it into daily practice.',
    effects: ['reveal'],
  },
  {
    type: 'quote',
    quote: 'I can\'t do big things, but I want everything I do, even the smallest thing, to be for the greater glory of God.',
    attribution: 'St. Dominic Savio',
    background: '/images/st-dominic-savio-original.png',
    effects: ['fade'],
  },
  {
    type: 'photo',
    image: '/images/ven-mama-margherita.png',
    caption: 'Parents are the first educators. Culture is made at home, at parties, and in group chats — not only in the principal\'s office.',
    alt: 'Venerable Mama Margherita',
    layout: 'contained',
    effects: ['fade'],
  },
  {
    type: 'statistic',
    number: 8,
    label: 'Covenant commitments',
    description: 'The Family Covenant translates the Golden Rule into eight concrete promises households make to one another.',
    effects: ['reveal'],
  },
  {
    type: 'chapter',
    title: 'The Path Forward',
    subtitle: 'Covenants activate grade by grade, so no family ever stands alone.',
    effects: ['reveal'],
  },
  {
    type: 'narrative',
    width: 'narrow',
    text: 'A shared language for naming conflict clearly. A parent-to-parent protocol for hard conversations. Formation sessions so the whole community speaks the same terms. Homeroom Hosts and School Leads who keep every family known. Digital oversight norms so no household faces that decision alone.',
    effects: ['reveal'],
  },
  {
    type: 'cta',
    title: 'Anchor your school in the Golden Rule',
    text: 'It is free, it needs no one\'s permission, and it asks nothing the Gospel does not already ask.',
    button: {
      label: 'Read the Case',
      href: '/the-case',
    },
    effects: ['fade'],
  },
];

export default sample;
