# Savio Story Engine

Astro-first scrollytelling framework for immersive, Apple/NYT-style story pages.

Authors write a typed array of blocks. The engine renders HTML, applies CSS scroll-driven motion, and automatically choreographs transitions between adjacent blocks. No GSAP. Minimal JavaScript.

**Live demo:** `/story/sample`  
**Sample data:** [`stories/sample.ts`](stories/sample.ts)

---

## Philosophy

1. **Authors write stories, not HTML.** Content is a typed JS/TS array.
2. **Blocks own their defaults.** Omit optional fields and presentation still works.
3. **Declarative composition.** Order in the array is narrative order.
4. **Effects are composable.** Blocks declare `effects: ['fade', 'zoom']`; they do not hardcode animation logic.
5. **The director choreographs adjacency.** Certain block pairs get pin/crossfade/stack automatically.
6. **Lightweight output.** Plain HTML + CSS + a tiny client script for statistic counters.
7. **Progressive enhancement.** Scroll-driven animations run where supported; content stays readable everywhere. `prefers-reduced-motion` disables motion and simplifies pin layouts.

---

## Directory map

```
story/
  README.md                 ← this file
  Story.astro               ← thin renderer (iterate blocks)
  StoryBlock.astro          ← dispatch by type + apply effects/director attrs
  types.ts                  ← discriminated unions for all blocks
  director.ts               ← adjacency transition resolution
  blocks/
    Hero.astro
    Narrative.astro
    Quote.astro
    Photo.astro
    Statistic.astro
    Chapter.astro
    CTA.astro
  effects/
    index.ts                ← registry, applyEffects(), effectTargetClass()
    fade.ts | reveal.ts | parallax.ts | zoom.ts
    client.ts               ← IntersectionObserver statistic counters
  styles/
    story.css               ← theme CSS variables + shell
    blocks.css              ← block presentation
    effects.css             ← scroll-driven effect keyframes
    transitions.css         ← director pin-over / crossfade / stack
  stories/
    sample.ts               ← reference story using every block + transitions
```

---

## Quick start: build a story page

### 1. Create story data

```ts
// website/src/story/stories/my-story.ts
import type { Story } from '../types';

const myStory: Story = [
  {
    type: 'hero',
    title: 'The Problem',
    subtitle: 'Bullying evolved.',
    background: '/images/st-dominic-savio.png',
    effects: ['fade', 'reveal', 'zoom'],
  },
  {
    type: 'narrative',
    text: 'Catholic grade schools promise a community formed by the Gospel…',
    highlight: 'Left alone, a culture drifts.',
  },
  // …
];

export default myStory;
```

### 2. Create an Astro page

```astro
---
// website/src/pages/story/my-story.astro
import Base from '../../layouts/Base.astro';
import Story from '../../story/Story.astro';
import myStory from '../../story/stories/my-story';
---

<Base
  title="My Story"
  description="…"
  type="website"
>
  <Story story={myStory} theme="default" />
</Base>
```

### 3. Open it

Route follows the pages path: `/story/my-story`.

That is the entire integration surface for a new story.

---

## Architecture

```
stories/*.ts  →  pages/story/*.astro  →  Story.astro
                                              ↓
                                        director.ts  (adjacency)
                                              ↓
                                        StoryBlock.astro
                                         ↙         ↘
                                   blocks/*.astro   effects (data-effect)
                                         ↓
                              styles: story / blocks / effects / transitions
                                         ↓
                              effects/client.ts (stats only)
```

| Layer | Responsibility |
| --- | --- |
| Story data | Content only — no markup |
| `types.ts` | Strong typing; no presentation |
| `Story.astro` | Theme root, CSS imports, map blocks, mount client |
| `StoryBlock.astro` | Defaults, `data-effect`, director attrs, component switch |
| `blocks/*` | Semantic markup + effect target classes |
| `effects/*` + `effects.css` | Named motion behaviors |
| `director.ts` + `transitions.css` | Cross-block choreography |
| `styles/story.css` | Theme tokens via CSS variables |

---

## Story renderer API

### `<Story />`

```ts
interface Props {
  story: Story;           // StoryBlock[]
  theme?: StoryTheme;     // default: 'default'
}
```

Renders:

```html
<article class="story" data-theme="default" data-story>
  <!-- one <section class="story-block"> per block -->
</article>
```

Also loads the four stylesheets and `effects/client.ts`.

### Block section attributes

Each block section receives:

| Attribute | Meaning |
| --- | --- |
| `data-block` | Block type (`hero`, `quote`, …) |
| `data-index` | Zero-based index |
| `data-from` | Previous block type (if any) |
| `data-to` | Next block type (if any) |
| `data-effect` | Space-separated effect names |
| `data-transition-out` | Transition this block starts toward the next |
| `data-transition-in` | Transition this block receives from the previous |

---

## Block types (v1)

All blocks share optional base fields:

```ts
{
  id?: string;              // HTML id on the inner root
  effects?: EffectName[];   // override defaults
  theme?: StoryTheme;       // reserved; unused by blocks today
}
```

Use TypeScript discriminated unions — always set `type` first so the rest of the object type-checks.

### `hero`

Fullscreen opening scene.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | `string` | required | `h1` |
| `subtitle` | `string` | — | |
| `background` | `string` | — | Image URL (public path or absolute) |
| `alignment` | `'left' \| 'center' \| 'right'` | `'center'` | |
| `overlay` | `'dark' \| 'light' \| 'none'` | `'dark'` if background else `'none'` | |
| default effects | | `['fade', 'reveal', 'zoom']` | Title fades; subtitle reveals; media zooms |

**Director:** `hero → narrative` → `pin-over` (hero media holds; narrative scrolls over).

### `narrative`

Readable prose.

| Field | Type | Default |
| --- | --- | --- |
| `text` | `string` | required (supports `\n` via `pre-line`) |
| `width` | `'narrow' \| 'wide'` | `'narrow'` |
| `highlight` | `string` | — emphasized follow-on paragraph |
| default effects | | `['reveal']` |

**Director:**  
- Incoming after `hero` or `photo` → `pin-over` (styled for dark media overlay)  
- Outgoing into `chapter` → `stack`

### `quote`

Editorial pull quote.

| Field | Type | Default |
| --- | --- | --- |
| `quote` | `string` | required |
| `attribution` | `string` | — |
| `background` | `string` | — optional full-bleed image |
| default effects | | `['fade']` |

**Director:**  
- After `photo` → `pin-over` (quote scrolls over pinned photo; quote’s own `background` is hidden during pin-over so the photo shows through)  
- Into `chapter` → `stack`

Tip: for a clean photo→quote pin, omit `background` on the quote.

### `photo`

| Field | Type | Default |
| --- | --- | --- |
| `image` | `string` | required |
| `caption` | `string` | — |
| `alt` | `string` | falls back to caption, then `''` |
| `layout` | `'fullscreen' \| 'contained'` | `'contained'` |
| default effects | fullscreen: `['fade', 'parallax']` · contained: `['fade']` | |

**Director:** `photo → quote` or `photo → narrative` → `pin-over`.

Fullscreen photos are the best pin sources. Contained photos do not participate in pin-over pairs by default (pair table keys on type only; contained still *can* pin if followed by quote/narrative, but visually works best fullscreen).

### `statistic`

| Field | Type | Default |
| --- | --- | --- |
| `number` | `number` | required |
| `label` | `string` | required |
| `description` | `string` | — |
| `prefix` / `suffix` | `string` | — e.g. suffix `'%'` → `72%` |
| default effects | | `['reveal']` |

HTML ships the final number (readable with JS off). `client.ts` resets to `0` and counts up once via `IntersectionObserver` when the block enters view. Reduced motion skips the count.

**Director:** `statistic → chapter` → `crossfade`.

### `chapter`

Section separator / breathing room.

| Field | Type | Default |
| --- | --- | --- |
| `title` | `string` | required (`h2`) |
| `subtitle` | `string` | — |
| default effects | | `['reveal']` |

**Director:** often the incoming side of `crossfade` or `stack`.

### `cta`

| Field | Type | Default |
| --- | --- | --- |
| `title` | `string` | required |
| `text` | `string` | — |
| `button.label` | `string` | required |
| `button.href` | `string` | required |
| default effects | | `['fade']` |

---

## Effects

Effects are names on the block (`effects` array) that become `data-effect` on the section. Target elements inside blocks get classes like `story-effect-fade`. CSS in `styles/effects.css` only animates when **both** the section declares the effect **and** a child has the matching class.

| Name | Behavior | Typical target |
| --- | --- | --- |
| `fade` | Opacity 0→1, rise `4rem`, range `entry 0–65%` | Text, captions, frames |
| `reveal` | Larger rise `6.5rem` + slight scale, `entry 0–75%` | Titles, narrative, chapters |
| `parallax` | Vertical drift `±16%` @ scale 1.12 over `cover` | Photo images |
| `zoom` | Slow scale `1 → 1.18` over `cover` | Hero / photo media |

Implementation notes:

- Guarded by `@supports (animation-timeline: view())`.
- Outside that support, elements stay at their resting (visible) state — never pre-hidden.
- `prefers-reduced-motion: reduce` kills effect animations.
- Do not put conflicting transform effects on the **same** element when both would apply (e.g. fade lives on the photo frame; parallax/zoom on the `img`).

### Adding an effect

1. Add the name to `EffectName` in `types.ts`.
2. Create `effects/my-effect.ts` exporting `{ name, targetClass }`.
3. Register it in `effects/index.ts`.
4. Add keyframes + `[data-effect~='my-effect'] .story-effect-…` rules in `styles/effects.css`.
5. Apply `effectTargetClass('my-effect')` on the markup that should move.
6. Optionally add it to defaults in `StoryBlock.astro`.

---

## Director (automatic transitions)

The director inspects each pair of adjacent blocks and assigns a transition kind. Authors do **not** set this in story data today — ordering blocks is enough.

Defined in [`director.ts`](director.ts):

| Pair | Transition | What you see |
| --- | --- | --- |
| `hero → narrative` | `pin-over` | Hero media sticky ~220svh; narrative scrolls over with dark gradient |
| `photo → quote` | `pin-over` | Photo holds; quote rises over it |
| `photo → narrative` | `pin-over` | Same pattern with narrative |
| `statistic → chapter` | `crossfade` | Statistic fades/scales out as chapter arrives |
| `narrative → chapter` | `stack` | Chapter covers with opaque paper surface |
| `quote → chapter` | `stack` | Same |

### Transition kinds

**`pin-over`**
- Outgoing section: `height: 220svh`; first child `position: sticky; top: 0; height: 100svh`.
- Incoming section: `margin-top: -100svh`; higher `z-index`; gradient overlay; light text.
- Pin text (hero content / photo caption) exits via scroll-driven fade-up.
- Overlay content rises via `story-overlay-rise`.
- Reduced motion: collapses pin height, removes negative margin, solid dark background on overlay.

**`crossfade`**
- Outgoing block animates `story-crossfade-out` on `exit` range.

**`stack`**
- Incoming block gets opaque background + soft top shadow so it physically covers what came before.

### Adding a director pair

Edit `PAIR_TRANSITIONS` in `director.ts`:

```ts
'hero>quote': 'pin-over',
```

Add or adjust CSS in `styles/transitions.css` if the new pair needs different overlay styling (e.g. by `[data-block='…']`).

---

## Themes

`Story` accepts `theme?: StoryTheme`. The root sets `data-theme`.

Tokens live on `.story` in `styles/story.css` (`--story-bg`, `--story-ink`, `--story-accent`, fonts, measures, spacing).

v1 only styles the default theme (Savio paper / ink / gold). Other theme names are reserved:

`minimal` · `magazine` · `apple` · `annual-report` · `editorial` · `documentary`

To add a theme: override the same CSS variables under `.story[data-theme='magazine'] { … }`. **Do not** put theme-specific classes in story data.

---

## Client JavaScript

[`effects/client.ts`](effects/client.ts) is the only runtime script. It:

1. Sets `data-story-ready="true"` on `[data-story]`.
2. Animates `[data-count-to]` statistic numbers once when ~40% visible.
3. Respects `prefers-reduced-motion`.

Scroll motion itself is CSS — no requestAnimationFrame loops for parallax/fade.

---

## Accessibility

- Semantic elements: `h1`/`h2`, `blockquote`, `figure`/`figcaption`, real links for CTAs.
- Content remains visible without JS (stats show final value in HTML).
- Motion gated by `@supports` + `prefers-reduced-motion`.
- Pin-over overlays use high-contrast light text on dark gradients.
- Focus styles on CTA buttons.

---

## Authoring guidelines (for humans and agents)

### Do

- Keep story files as pure data arrays typed with `Story` / `satisfies Story`.
- Prefer public URLs under `/images/…` or other static assets for media.
- Place `hero` first when you want a cold open.
- Put `photo` (fullscreen) immediately before `quote` or `narrative` to trigger pin-over.
- Put `statistic` immediately before `chapter` to trigger crossfade.
- Put `chapter` after `narrative` or `quote` to trigger stack.
- Use `highlight` on narrative for a single emphasized takeaway.
- Override `effects` only when defaults are wrong for that beat.

### Don’t

- Put Tailwind or site utility classes in story data (engine CSS is self-contained).
- Hardcode animation in new blocks — use `effectTargetClass` + `data-effect`.
- Hide content with `opacity: 0` outside `@supports` (breaks unsupported browsers).
- Put `fade` and `parallax` transform animations on the same DOM node.
- Expect markdown/YAML authoring yet — TS arrays only in v1.
- Add GSAP or other heavy animation libraries.

### Suggested narrative arc

1. `hero` — thesis / emotional hook  
2. `narrative` — context (pins over hero)  
3. `photo` + `quote` — evidence / voice (pin-over)  
4. `statistic` + `chapter` — turn (crossfade)  
5. More `narrative` / `quote` / `photo` as needed  
6. `cta` — close  

See [`stories/sample.ts`](stories/sample.ts) for a full working example.

---

## Extending the engine

### New block type checklist

1. Add interface + union member in `types.ts`.
2. Create `blocks/NewBlock.astro` with semantic markup and effect target classes.
3. Add case to the switch in `StoryBlock.astro` + default effects.
4. Add presentation rules in `styles/blocks.css`.
5. Optionally add director pairs in `director.ts` and overlay rules in `transitions.css`.
6. Exercise it in `stories/sample.ts`.

### File ownership rules

| Change | Edit here |
| --- | --- |
| Content fields | `types.ts` + block component |
| Default effects for a type | `StoryBlock.astro` |
| Motion recipe | `effects/*` + `effects.css` |
| Adjacent choreography | `director.ts` + `transitions.css` |
| Colors / type / spacing | `styles/story.css` variables |
| Block look (non-motion) | `styles/blocks.css` |

---

## Out of scope (not built yet)

Markdown/YAML authoring · AI story generation · video / timeline / comparison / before-after / audio blocks · progress indicator · in-story navigation · theme switching UI · View Transitions between stories · author-specified per-block transition overrides · word/letter splitting

The content model and director attrs are designed so these can land without rewriting existing stories.

---

## Agent brief (copy-paste)

When asked to create or edit a Savio story page:

1. Add or edit a file under `website/src/story/stories/*.ts` exporting a `Story` array.
2. Add or edit `website/src/pages/story/<slug>.astro` that imports `Base`, `Story`, and the data file, then renders `<Story story={…} theme="default" />`.
3. Use only the block types and fields in `types.ts`.
4. Control cinematic feel by **block order** (director pairs) and optional `effects` arrays — not custom HTML.
5. For pin-over moments: `hero` then `narrative`, or fullscreen `photo` then `quote`/`narrative`.
6. For crossfade turns: `statistic` then `chapter`.
7. For covering section breaks: `narrative`/`quote` then `chapter`.
8. Do not introduce new dependencies for animation.
9. Verify with `npm run build` from `website/` (Node `>=22.12.0`).
10. Reference implementation: `stories/sample.ts` + `/story/sample`.
