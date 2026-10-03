/**
 * Physique des vagues utilisée pour estimer la taille des vagues au bord.
 * Références : docs/methode.md (Komar et Gaughan 1972, Goda 2010, Thornton et Guza 1984, Longuet-Higgins 1952).
 */

export const G = 9.81;

/** Nombre d'onde k (rad/m) par la relation de dispersion linéaire ω² = g·k·tanh(k·h), résolue par Newton. */
export function waveNumber(depth: number, period: number): number {
  const w = (2 * Math.PI) / period;
  let k = (w * w) / G; // départ : eau profonde
  if (depth <= 0) return k;
  k = Math.max(k, w / Math.sqrt(G * depth)); // départ : eau peu profonde, si plus grand
  for (let i = 0; i < 50; i++) {
    const t = Math.tanh(k * depth);
    const f = G * k * t - w * w;
    const df = G * t + G * k * depth * (1 - t * t);
    const step = f / df;
    k -= step;
    if (Math.abs(step) < 1e-10 * k) break;
  }
  return k;
}

/** Coefficient de shoaling Ks = √(cg₀ / cg) : combien une houle grandit (ou rétrécit) en arrivant à cette profondeur. */
export function shoaling(depth: number, period: number): number {
  const k = waveNumber(depth, period);
  const w = (2 * Math.PI) / period;
  const kh = k * depth;
  const cg = (w / k) * 0.5 * (1 + (2 * kh) / Math.sinh(2 * kh));
  const cg0 = (G * period) / (4 * Math.PI);
  return Math.sqrt(cg0 / cg);
}

/** Hauteur de déferlement d'une houle régulière (Komar et Gaughan 1972) : Hb = 0,39·g^0,2·(T·H0²)^0,4. */
export function komarGaughan(h0: number, period: number): number {
  if (h0 <= 0 || period <= 0) return 0;
  return 0.39 * Math.pow(G, 0.2) * Math.pow(period * h0 * h0, 0.4);
}

/**
 * Une houle réelle est faite de vagues de tailles différentes : les plus grosses cassent plus tôt.
 * Sa hauteur significative au déferlement vaut environ 70 % de celle d'une houle régulière
 * (Goda 2010 ; Thornton et Guza 1984 : 30 à 40 % de moins ; Kamphuis 1991 : × 0,75).
 */
export const RANDOM_WAVE_FACTOR = 0.7;

/** Hauteur significative de la mer au déferlement (Hs_b), à partir de la houle équivalente au large. */
export function breakingHs(h0: number, period: number): number {
  return RANDOM_WAVE_FACTOR * komarGaughan(h0, period);
}

/**
 * Ce que voit un observateur : entre la hauteur moyenne quadratique (Hrms ≈ 0,71·Hs, Rayleigh)
 * et la hauteur significative (Schneider et Weggel 1980 : les observateurs rapportent entre les deux).
 * Les séries, les plus grosses vagues (H1/10), font environ 1,27·Hs.
 */
export const OBSERVER_LOW = 0.71;
export const SETS = 1.27;
