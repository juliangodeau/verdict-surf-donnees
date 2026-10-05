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

/**
 * Correction du modèle côtier par les bouées : rapport médian mesure / modèle à l'emplacement d'une bouée,
 * appliqué aux plages qui s'y rattachent. Bornée, et seulement avec assez de mesures.
 */
export const BUOY_CORRECTION = { min: 0.7, max: 1.3, minPairs: 100 } as const;

export interface BuoyCorrection {
  /** Facteur à appliquer à la houle du modèle (mesure / modèle). */
  k: number;
  /** Mesures appariées. */
  n: number;
  /** La correction réduit l'erreur d'au moins un point sur des jours non utilisés pour la caler. */
  useful: boolean;
}

export const clampCorrection = (k: number) => Math.min(BUOY_CORRECTION.max, Math.max(BUOY_CORRECTION.min, k));

/**
 * Facteur pour une plage : sa première bouée de référence qui a assez de mesures. Si la correction de cette bouée
 * n'a pas fait ses preuves sur les jours de contrôle, on garde le modèle tel quel (facteur 1).
 */
export function correctionFor(buoys: string[], table: Record<string, BuoyCorrection> | undefined): { k: number; buoy: string | null } {
  for (const code of buoys) {
    const c = table?.[code];
    if (c && c.n >= BUOY_CORRECTION.minPairs && Number.isFinite(c.k)) return { k: c.useful ? clampCorrection(c.k) : 1, buoy: code };
  }
  return { k: 1, buoy: null };
}
