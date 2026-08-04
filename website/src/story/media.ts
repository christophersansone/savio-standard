/** Future: video | illustration | animation */
export type MediaKind = 'image';

export interface StoryMedia {
  kind: MediaKind;
  src: string;
  alt?: string;
  /** Normalized 0–1 focal point; reserved for future cropping. */
  focalPoint?: { x: number; y: number };
  treatment?: 'none' | 'cover' | 'contain';
  credits?: string;
}

/** Accept author shorthand strings or full media objects. */
export type MediaInput = string | StoryMedia;

export function toStoryMedia(
  input: MediaInput | undefined,
  defaults: Partial<Pick<StoryMedia, 'alt' | 'treatment'>> = {},
): StoryMedia | undefined {
  if (input == null) return undefined;
  if (typeof input === 'string') {
    return {
      kind: 'image',
      src: input,
      alt: defaults.alt,
      treatment: defaults.treatment ?? 'cover',
    };
  }
  return {
    kind: input.kind ?? 'image',
    src: input.src,
    alt: input.alt ?? defaults.alt,
    focalPoint: input.focalPoint,
    treatment: input.treatment ?? defaults.treatment ?? 'cover',
    credits: input.credits,
  };
}
