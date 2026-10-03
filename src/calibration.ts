/**
 * Passage d'Open-Meteo (MFWAM, maille de 8 km) au point de mesure devant la plage.
 * Pour chaque plage, deux coefficients calés sur le modèle côtier du Shom (scripts/calibrate.ts) :
 * - `h` : houle au point de mesure / houle Open-Meteo (biais du modèle, abri, réfraction, frottement) ;
 * - `t` : période de pic au point de mesure / période moyenne de la houle Open-Meteo.
 */
import type { CoastalSea } from './height.ts';

export interface Transfer {
  h: number;
  t: number;
}

/** Valeurs par défaut quand une plage n'a pas encore de calage (médianes de l'ensemble des plages). */
export const DEFAULT_TRANSFER: Transfer = { h: 0.8, t: 1.3 };

export function coastalFromOpenMeteo(
  om: { swell: number | null; total: number | null; period: number | null },
  depth: number,
  tr: Transfer,
): CoastalSea | null {
  const h = om.swell ?? om.total;
  if (h == null || om.period == null) return null;
  return { hs: tr.h * h, hWind: 0, tp: tr.t * om.period, depth };
}

/** Médiane d'une liste non vide. */
export function median(xs: number[]): number {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
