import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

import { DEFAULT_TRANSFER, coastalFromOpenMeteo, median } from '../src/calibration.ts';
import { steps3h } from '../src/shom.ts';

describe('calage Open-Meteo → point de mesure', () => {
  it('applique les deux coefficients et retire la mer du vent', () => {
    expect(coastalFromOpenMeteo({ swell: 2, total: 2.2, period: 9 }, 12, { h: 0.8, t: 1.3 })).toEqual({ hs: 1.6, hWind: 0, tp: 9 * 1.3, depth: 12 });
  });

  it('utilise la hauteur totale si la houle manque, et rien si la période manque', () => {
    expect(coastalFromOpenMeteo({ swell: null, total: 1, period: 8 }, 12, DEFAULT_TRANSFER)?.hs).toBeCloseTo(0.8);
    expect(coastalFromOpenMeteo({ swell: 1, total: 1, period: null }, 12, DEFAULT_TRANSFER)).toBeNull();
  });

  it('médiane', () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 2, 3])).toBe(2.5);
  });

  it('chaque plage a un calage plausible', () => {
    const spots: { id: string }[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
    const calib = JSON.parse(readFileSync('data/calibration.json', 'utf8'));
    for (const s of spots) {
      const c = calib.spots[s.id];
      expect(c, s.id).toBeDefined();
      expect(c.h, s.id).toBeGreaterThan(0.1);
      expect(c.h, s.id).toBeLessThan(1.5);
      expect(c.t, s.id).toBeGreaterThan(0.9);
      expect(c.t, s.id).toBeLessThan(1.8);
    }
  });
});

describe('pas de temps du modèle côtier', () => {
  it('pas de 3 h alignés, bornes incluses', () => {
    expect(steps3h(new Date('2026-10-03T04:30:00Z'), new Date('2026-10-03T12:00:00Z'))).toEqual([
      '2026-10-03T03:00:00.000Z', '2026-10-03T06:00:00.000Z', '2026-10-03T09:00:00.000Z', '2026-10-03T12:00:00.000Z',
    ]);
  });
});

describe('correction par les bouées', async () => {
  const { correctionFor, clampCorrection } = await import('../src/calibration.ts');
  it('prend la première bouée qui a assez de mesures', () => {
    const t = { a: { k: 0.8, n: 50, useful: true }, b: { k: 0.78, n: 300, useful: true } };
    expect(correctionFor(['a', 'b'], t)).toEqual({ k: 0.78, buoy: 'b' });
  });
  it('une correction qui n’a pas fait ses preuves n’est pas appliquée', () => {
    expect(correctionFor(['a', 'b'], { a: { k: 0.9, n: 300, useful: false }, b: { k: 0.8, n: 300, useful: true } })).toEqual({ k: 1, buoy: 'a' });
  });
  it('sans bouée utilisable, pas de correction', () => {
    expect(correctionFor(['x'], {})).toEqual({ k: 1, buoy: null });
    expect(correctionFor(['a'], undefined)).toEqual({ k: 1, buoy: null });
  });
  it('bornée entre ×0,7 et ×1,3', () => {
    expect(clampCorrection(0.5)).toBe(0.7);
    expect(clampCorrection(1.6)).toBe(1.3);
    expect(clampCorrection(0.9)).toBe(0.9);
  });
  it('chaque plage a au moins une bouée de référence connue', async () => {
    const { BUOYS } = await import('../src/buoys.ts');
    const spots: { id: string; buoys: string[] }[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
    for (const s of spots) {
      expect(s.buoys.length, s.id).toBeGreaterThan(0);
      for (const c of s.buoys) expect(BUOYS[c], `${s.id} ${c}`).toBeDefined();
    }
  });
});
