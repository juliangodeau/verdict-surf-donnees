import { OBSERVER_LOW, SETS, breakingHs, shoaling } from './physics.ts';

/** État de mer au point de mesure de la plage (environ 12 m de fond, devant la plage). */
export interface CoastalSea {
  /** Hauteur significative totale (m). */
  hs: number;
  /** Part due à la mer du vent, le clapot local (m). */
  hWind: number;
  /** Période de pic (s). */
  tp: number;
  /** Profondeur du point de mesure (m). */
  depth: number;
}

/** Taille des vagues au bord, en mètres. */
export interface SurfSize {
  /** Mer au déferlement (hauteur significative). */
  hb: number;
  /** Fourchette vue par un observateur sur la plage. */
  lo: number;
  hi: number;
  /** Les plus grosses vagues, les séries. */
  sets: number;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Sous cette période, ce n'est pas de la houle mais du clapot : rien à surfer. */
export const MIN_PERIOD = 5;

/**
 * Taille des vagues au bord à partir de la mer au point de mesure :
 * 1. on retire la mer du vent (clapot de période courte) ;
 * 2. on ramène la houle à son équivalent au large (on enlève le shoaling entre le large et le point de mesure) ;
 * 3. on calcule le déferlement pour une houle réelle ;
 * 4. on en déduit ce que voit un observateur.
 */
export function surfSize(sea: CoastalSea): SurfSize {
  const swell = Math.sqrt(Math.max(0, sea.hs * sea.hs - sea.hWind * sea.hWind));
  if (swell < 0.05 || sea.tp < MIN_PERIOD) return { hb: 0, lo: 0, hi: 0, sets: 0 };
  const h0 = swell / shoaling(sea.depth, sea.tp);
  const hb = breakingHs(h0, sea.tp);
  return { hb: round1(hb), lo: round1(OBSERVER_LOW * hb), hi: round1(hb), sets: round1(SETS * hb) };
}
