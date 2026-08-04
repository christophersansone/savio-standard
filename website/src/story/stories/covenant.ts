import type { AuthorStory } from '../types';

const covenantStory: AuthorStory = {
  meta: {
    title: 'The Family Covenant',
    description:
      'Eight promises households make to one another — signed privately, renewed each school year.',
  },

  scenes: [
    {
      title: 'Opening',
      slug: 'opening',
      blocks: [
        {
          type: 'hero',
          title: 'One page. Signed as a household.',
          subtitle: 'The Savio Standard · Renewed each school year.',
          background: '/images/ven-mama-margherita.png',
          intent: {
            emphasis: 'high',
            mood: 'solemn',
          },
        },
        {
          type: 'narrative',
          text: 'This is not a policy handbook. It is a household promise — beginning with ourselves and our children — to live Christ’s command every day, and to hold ourselves to it before we ask it of anyone else.',
        },
      ],
    },

    {
      title: 'The Standard',
      slug: 'the-standard',
      blocks: [
        {
          type: 'quote',
          quote:
            'In everything, do to others what you would have them do to you, for this sums up the Law and the Prophets.',
          attribution: 'Jesus Christ (Matthew 7:12)',
          intent: {
            emphasis: 'high',
          },
        },
        {
          type: 'narrative',
          text: 'Christ gave His followers a remarkably simple standard: treat every person as we ourselves would hope to be treated.',
          highlight:
            'We believe this is more than a worthy aspiration. It is the ordinary expectation of Christian discipleship.',
        },
      ],
    },

    {
      title: 'Why It Matters',
      slug: 'why-it-matters',
      blocks: [
        {
          type: 'chapter',
          title: 'Made in the image of God',
          subtitle:
            'How our children treat one another is among the clearest expressions of what we are teaching them.',
        },
        {
          type: 'narrative',
          text: 'As parents at school, we believe our children are made in the image of God. The covenant that follows is our household’s promise to live that truth in ordinary ways — on the playground, in the group chat, at the dinner table, and when another parent knocks on the door.',
        },
      ],
    },

    {
      title: 'Eight Promises',
      slug: 'eight-promises',
      blocks: [
        {
          type: 'statistic',
          number: 8,
          label: 'Household commitments',
          description:
            'Concrete promises every participating family makes to every other family.',
        },
        {
          type: 'narrative',
          text: 'Not slogans. Not aspirations filed away after orientation night. Eight practices that make the Golden Rule predictable between households.',
        },
      ],
    },

    {
      title: 'How We Hold the Line',
      slug: 'hold-the-line',
      blocks: [
        {
          type: 'chapter',
          title: 'The standard. Humility. Directness.',
          subtitle: 'Three promises about how conflict gets handled.',
        },
        {
          type: 'narrative',
          text: 'We hold the Golden Rule as the standard of conduct for our children and ourselves — not an aspiration, but a standard.',
          highlight:
            'We accept that our child is capable of unkindness, exclusion, and cruelty, as all children are.',
        },
        {
          type: 'narrative',
          text: 'If another parent approaches us about our child’s behavior, our first response will be to listen, thank them, and seek the truth — not to deny, dismiss, or retaliate.',
        },
        {
          type: 'quote',
          quote:
            'If we have a concern about another covenant family’s child, we will bring it privately, charitably, and promptly to those parents — never to the bleachers, the group chat, or the rumor mill.',
          attribution: 'Matthew 18, lived between households',
        },
      ],
    },

    {
      title: 'How We Form Children',
      slug: 'form-children',
      blocks: [
        {
          type: 'photo',
          image: {
            kind: 'image',
            src: '/images/st-dominic-savio.png',
            alt: 'St. Dominic Savio',
          },
          caption:
            'Include the excluded. Refuse to be an audience for cruelty. Speak up when someone is mistreated.',
          intent: {
            emphasis: 'high',
            focus: 'media',
          },
        },
        {
          type: 'narrative',
          text: 'We will actively teach our children these habits — and when our child harms another, we will require genuine repair: apology, restitution, and changed behavior.',
          highlight:
            'We will follow through on consequences at home even when the school does not.',
        },
      ],
    },

    {
      title: 'How We Show Up',
      slug: 'show-up',
      blocks: [
        {
          type: 'chapter',
          title: 'Digital oversight. Presence. Prayer.',
          subtitle: 'Three promises about the ordinary life of a school year.',
        },
        {
          type: 'narrative',
          text: 'Technology access is earned, not entitled. Devices are filtered, supervised, and age-appropriate. Messaging is open to parental review. Devices stay out of bedrooms overnight. No unrestricted, unsupervised access.',
        },
        {
          type: 'narrative',
          text: 'We will show up — to homeroom and grade gatherings, to formation nights when we can, and for one another’s families in times of difficulty.',
          highlight:
            'And we will pray regularly for the children of this school by name and grade — including, especially, the ones who are hardest to love.',
        },
      ],
    },

    {
      title: 'How Signing Works',
      slug: 'how-signing-works',
      blocks: [
        {
          type: 'statistic',
          number: 8,
          label: 'Families to activate a grade',
          description:
            'Until then, your signature stays private. No family stands alone.',
        },
        {
          type: 'narrative',
          text: 'When eight families in the same grade have signed, all eight are notified and introduced to one another. Until then, no one knows you have signed. Once a grade activates, new signers join immediately.',
        },
        {
          type: 'narrative',
          text: 'Signing is free, and always will be. The covenant is renewed each school year — a choice made freshly every fall. A covenant signed once and forgotten is a signed PDF; a covenant renewed annually is a practice.',
          highlight:
            'Signing is a signal, not a shield. The Golden Rule expectation applies to every family — signed or not. What signing changes is the conversation.',
        },
      ],
    },

    {
      title: 'Sign',
      slug: 'sign',
      blocks: [
        {
          type: 'hero',
          title: 'Hold yourselves to it first.',
          subtitle:
            'Then ask it of one another — household by household, grade by grade.',
          background: '/images/st-john-bosco.png',
          intent: {
            emphasis: 'high',
            mood: 'hopeful',
          },
        },
        {
          type: 'cta',
          title: 'Read the full Family Covenant.',
          text: 'One page. Eight commitments. Signed as a household, renewed each school year.',
          button: {
            label: 'Open the Family Covenant',
            href: '/covenant',
          },
        },
      ],
    },
  ],
};

export default covenantStory;
