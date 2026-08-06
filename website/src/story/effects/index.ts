import type { EffectName } from '../types';
import { drift } from './drift';
import { fade } from './fade';
import { parallax } from './parallax';
import { reveal } from './reveal';
import { zoom } from './zoom';

export interface EffectDescriptor {
  name: EffectName;
  /** Class applied to the element that should animate. */
  targetClass: string;
}

const REGISTRY: Record<EffectName, EffectDescriptor> = {
  fade,
  reveal,
  parallax,
  zoom,
  drift,
};

const VALID = new Set<string>(Object.keys(REGISTRY));

export function isEffectName(value: string): value is EffectName {
  return VALID.has(value);
}

/** Deduplicate and drop unknown effect names. */
export function normalizeEffects(effects?: EffectName[]): EffectName[] {
  if (!effects?.length) return [];
  const seen = new Set<EffectName>();
  const out: EffectName[] = [];
  for (const name of effects) {
    if (!isEffectName(name) || seen.has(name)) continue;
    seen.add(name);
    out.push(name);
  }
  return out;
}

export interface AppliedEffects {
  /** Space-separated list for `data-effect`. */
  dataEffect: string;
  /** Target classes authors can put on animatable children. */
  classes: string[];
  names: EffectName[];
}

export function applyEffects(effects?: EffectName[]): AppliedEffects {
  const names = normalizeEffects(effects);
  return {
    dataEffect: names.join(' '),
    classes: names.map((n) => REGISTRY[n].targetClass),
    names,
  };
}

export function effectTargetClass(name: EffectName): string {
  return REGISTRY[name].targetClass;
}

export { fade, reveal, parallax, zoom, drift };
