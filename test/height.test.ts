import { describe, expect, it } from 'vitest';

import { surfSize } from '../src/height.ts';
import { breakingHs, komarGaughan, shoaling, waveNumber } from '../src/physics.ts';

describe('physique', () => {
  it('relation de dispersion : eau profonde et eau peu profonde', () => {
    const T = 10;
    expect(waveNumber(1000, T)).toBeCloseTo((2 * Math.PI) ** 2 / (9.81 * T * T), 6);
    // En eau très peu profonde, la vitesse vaut √(g·h).
    const h = 0.5;
    const k = waveNumber(h, T);
    expect((2 * Math.PI) / T / k).toBeCloseTo(Math.sqrt(9.81 * h), 1);
  });

  it('shoaling : 1 en eau profonde, minimum vers 0,91 puis croissance près du bord', () => {
    expect(shoaling(500, 10)).toBeCloseTo(1, 3);
    const mid = shoaling(40, 10);
    expect(mid).toBeGreaterThan(0.9);
    expect(mid).toBeLessThan(0.95);
    expect(shoaling(3, 10)).toBeGreaterThan(1.1);
  });

  it('Komar et Gaughan : valeurs de référence', () => {
    expect(komarGaughan(2, 10)).toBeCloseTo(2.69, 2);
    expect(komarGaughan(1, 8)).toBeCloseTo(1.41, 2);
  });

  it('houle réelle : 70 % de la houle régulière', () => {
    expect(breakingHs(2, 10)).toBeCloseTo(0.7 * komarGaughan(2, 10), 6);
  });
});

describe('taille des vagues au bord', () => {
  it('Les Dunes, 2 octobre 2026 vers 9 h : mer au déferlement vers 1,5 m (voir l’étude)', () => {
    // Shom WW3 à 12 m de fond devant la plage : environ 1,45 m, période de pic 12,5 s, peu de mer du vent.
    const s = surfSize({ hs: 1.45, hWind: 0.15, tp: 12.5, depth: 12 });
    expect(s.hb).toBeGreaterThanOrEqual(1.4);
    expect(s.hb).toBeLessThanOrEqual(1.7);
    expect(s.lo).toBeCloseTo(0.71 * s.hb, 1);
    expect(s.sets).toBeGreaterThan(s.hi);
  });

  it('plus la période est longue, plus les vagues sont grandes au bord', () => {
    const a = surfSize({ hs: 1, hWind: 0, tp: 8, depth: 12 });
    const b = surfSize({ hs: 1, hWind: 0, tp: 14, depth: 12 });
    expect(b.hb).toBeGreaterThan(a.hb);
  });

  it('la mer du vent seule ne fait pas de vagues à surfer', () => {
    expect(surfSize({ hs: 0.8, hWind: 0.8, tp: 4, depth: 12 }).hb).toBe(0);
    expect(surfSize({ hs: 0.8, hWind: 0.2, tp: 4, depth: 12 }).hb).toBe(0);
  });

  it('mer plate', () => {
    expect(surfSize({ hs: 0.02, hWind: 0, tp: 10, depth: 12 })).toEqual({ hb: 0, lo: 0, hi: 0, sets: 0 });
  });
});
