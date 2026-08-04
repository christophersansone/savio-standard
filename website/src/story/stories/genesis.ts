import type { AuthorStory } from '../types';

const genesisStory: AuthorStory = {
  meta: {
    title: 'Till and Keep',
    description:
      'The first vocation God gave man still echoes in every Catholic school.',
  },

  scenes: [
    {
      title: 'The Garden',

      blocks: [
        {
          type: 'hero',

          title: 'The first thing God planted was a garden.',

          subtitle:
            'Long before kingdoms, cities, or nations, God began with a place where life could flourish.',

          background: '/images/st-dominic-savio.png', //'/images/garden-sunrise.jpg',

          intent: {
            emphasis: 'high',
            mood: 'solemn',
          },
        },

        {
          type: 'narrative',

          text: 'Genesis tells us that God planted the Garden of Eden. It was not an accident of nature. It was prepared intentionally, filled with beauty, purpose, and life.',
        },
      ],
    },

    {
      title: 'The First Commission',

      blocks: [
        {
          type: 'chapter',

          title: 'A Job Before a Fall',

          subtitle:
            'Before sin entered the world, God entrusted Adam with a mission.',
        },

        {
          type: 'quote',

          quote:
            'The Lord God took the man and put him in the garden of Eden to till it and keep it.',

          attribution: 'Genesis 2:15',
        },

        {
          type: 'narrative',

          text: 'The first vocation of man was not simply to enjoy the garden. It was to care for it.',
        },
      ],
    },

    {
      title: 'Till and Keep',

      blocks: [
        {
          type: 'statistic',

          number: 2,

          label: 'Sacred responsibilities',

          description: 'Scripture summarizes Adam’s mission with two verbs.',
        },

        {
          type: 'narrative',

          text: '"Till" means to cultivate—to help life grow. "Keep" means to guard—to protect from danger, corruption, and evil. Every healthy garden needs both.',
        },
      ],
    },

    {
      title: 'A Forgotten Meaning',

      blocks: [
        {
          type: 'photo',

          image: '/images/st-dominic-savio.png', //'/images/school-playground.jpg',

          caption:
            'A school is more than a building. It is a place where young lives grow.',
        },

        {
          type: 'narrative',

          text: 'The word kindergarten literally means "garden of children." We speak the word every day without remembering the picture it paints.',
        },
      ],
    },

    {
      title: 'Your Garden',

      blocks: [
        {
          type: 'hero',

          title: 'God has planted another garden.',

          subtitle: 'This time, it is filled with children.',

          background: '/images/st-dominic-savio.png', //'/images/classroom.jpg',

          intent: {
            emphasis: 'high',
            mood: 'hopeful',
          },
        },

        {
          type: 'narrative',

          text: 'God has planted your son and your daughter within a school community. And just as He placed Adam in the first garden, He has placed you here—not merely to observe, but to till and to keep.',
        },
      ],
    },

    {
      title: 'When Gardens Are Neglected',

      blocks: [
        {
          type: 'narrative',

          text: 'Gardens do not remain beautiful by accident. Left unattended, weeds spread. The strongest plants crowd out the weakest. Small damage becomes normal until no one remembers what the garden once looked like.',
        },

        {
          type: 'quote',

          quote:
            'Cultures drift toward whatever their most persistent voices normalize.',

          attribution: 'The Savio Standard',
        },

        {
          type: 'narrative',

          text: 'School communities are no different. Exclusion grows quietly. Gossip becomes entertainment. Parents withdraw. Responsibility shifts to teachers and principals. The garden slowly loses the care it was created to receive.',
        },
      ],
    },

    {
      title: 'The Invitation',

      blocks: [
        {
          type: 'chapter',

          title: 'The Savio Standard',

          subtitle: 'Parents reclaiming the first vocation together.',
        },

        {
          type: 'narrative',

          text: 'The Savio Standard gives families a common language, shared commitments, and practical ways to cultivate authentic friendship while protecting every child from the subtle forms of harm that policies alone cannot prevent.',
        },

        {
          type: 'photo',

          image: '/images/st-dominic-savio.png', //'/images/st-dominic-savio.png',

          caption:
            'A culture is strongest when ordinary families choose to care for it together.',
        },
      ],
    },

    {
      title: 'Answer the Call',

      blocks: [
        {
          type: 'hero',

          title: 'The garden has been entrusted to you.',

          subtitle: 'Will you till it? Will you keep it?',

          background: '/images/st-dominic-savio.png', //'/images/catholic-school.jpg',

          intent: {
            emphasis: 'high',
            mood: 'hopeful',
          },
        },

        {
          type: 'cta',

          title: 'Become part of the culture your children deserve.',

          text: 'Visit saviostandard.org. Read The Case. Sign the Family Covenant. Help cultivate a school where every child is known, protected, and loved.',

          button: {
            label: 'Begin at SavioStandard.org',
            href: 'https://saviostandard.org',
          },
        },
      ],
    },
  ],
};

export default genesisStory;
