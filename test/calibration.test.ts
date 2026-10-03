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
