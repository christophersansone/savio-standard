import type { AuthorStory } from '../types';

const savioStory: AuthorStory = {
  meta: {
    title: "The Savio Standard",
    description: "A movement to restore the Golden Rule as the shared culture of Catholic schools."
  },

  scenes: [

    //
    // Scene 1
    //

    {
      title: "The Problem",

      blocks: [

        {
          type: "hero",

          title: "We solved bullying.",

          subtitle: "Or so we thought.",

          background: "/images/hallway.jpg",

          intent: {
            emphasis: "high",
            mood: "solemn"
          }
        },

        {
          type: "narrative",

          text:
            "Catholic schools have invested enormous effort into preventing obvious bullying. Yet many children still come home feeling isolated, excluded, or invisible.",

          highlight:
            "The wound often isn't violence. It's belonging."
        },

        {
          type: "photo",

          image: "/images/lunch-table.jpg",

          caption:
            "No bruises. No incident report. Still deeply painful."
        }

      ]
    },

    //
    // Scene 2
    //

    {
      title: "A Different Kind of Harm",

      blocks: [

        {
          type: "quote",

          quote:
            "Nobody was mean to me. They just acted like I wasn't there.",

          attribution: "Fourth grader",

          intent: {
            emphasis: "high"
          }
        },

        {
          type: "narrative",

          text:
            "Children have become remarkably good at avoiding behavior adults recognize while still communicating rejection to one another."
        }

      ]
    },

    //
    // Scene 3
    //

    {
      title: "Why It Happens",

      blocks: [

        {
          type: "statistic",

          number: 6,

          label: "Structural forces",

          description:
            "The Case identifies six forces that naturally cause culture to drift unless families actively shape it."
        },

        {
          type: "narrative",

          text:
            "Parents outsource conflict. Phones industrialize social dynamics. Schools inherit problems they cannot solve alone. Good intentions slowly lose to gravity."
        }

      ]
    },

    //
    // Scene 4
    //

    {
      title: "The Missing Piece",

      blocks: [

        {
          type: "chapter",

          title: "The Missing Piece",

          subtitle:
            "Not another policy. A shared standard."
        },

        {
          type: "narrative",

          text:
            "The Savio Standard asks families to reclaim something Christianity has always taught: the Golden Rule is not merely an aspiration. It is the minimum standard of membership in a Catholic community."
        }

      ]
    },

    //
    // Scene 5
    //

    {
      title: "Why Savio?",

      blocks: [

        {
          type: "photo",

          image: "/images/st-dominic-savio.png",

          caption:
            "A boy who organized his classmates to protect the smallest among them."
        },

        {
          type: "quote",

          quote:
            "Death rather than sin.",

          attribution: "St. Dominic Savio"
        }

      ]
    },

    //
    // Scene 6
    //

    {
      title: "A Movement",

      blocks: [

        {
          type: "narrative",

          text:
            "The Savio Standard is not a curriculum. It is not a discipline program. It is not another burden placed on teachers."

        },

        {
          type: "narrative",

          text:
            "It is parents voluntarily choosing to build the culture they want their children to inherit."
        }

      ]
    },

    //
    // Scene 7
    //

    {
      title: "How It Works",

      blocks: [

        {
          type: "statistic",

          number: 8,

          label: "Family commitments",

          description:
            "Eight promises every participating household makes to every other household."
        },

        {
          type: "photo",

          image: "/images/family.jpg",

          caption:
            "Culture becomes predictable when expectations become shared."
        }

      ]
    },

    //
    // Scene 8
    //

    {
      title: "The Vision",

      blocks: [

        {
          type: "hero",

          title:
            "Imagine a school where every family knows what 'love your neighbor' actually looks like.",

          background: "/images/school-playground.jpg",

          intent: {
            emphasis: "high",
            mood: "hopeful"
          }
        },

        {
          type: "narrative",

          text:
            "Children flourish when adults model the culture they hope to see."
        }

      ]
    },

    //
    // Scene 9
    //

    {
      title: "Join",

      blocks: [

        {
          type: "cta",

          title:
            "The Gospel already gave us the standard.",

          text:
            "The Savio Standard simply gives Catholic families a practical way to live it together.",

          button: {
            label: "Read The Case",
            href: "/the-case"
          }
        }

      ]
    }

  ]
}

export default savioStory;
