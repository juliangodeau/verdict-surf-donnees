import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { concatOpenMeteo, loadArchive, spotHistory } from '../src/archive.ts';
import { BUOYS } from '../src/buoys.ts';
import { gridFor } from '../src/shom.ts';

const om = (t: string, h: number) => ({ time: [t], wave_height: [h], swell_wave_height: [h], swell_wave_period: [9], swell_wave_direction: [270], wind_wave_height: [0] });
const step = (t: string) => ({ t, hs: 1, hWind: 0.1, tp: 11, depth: 12, dir: 270 });

describe('archive', () => {
  it('lit les jours dans l’ordre et garde les derniers', () => {
    const root = mkdtempSync(join(tmpdir(), 'archive-'));
    mkdirSync(join(root, '2026'));
    for (const d of ['2026-10-02', '2026-10-01', '2026-10-03']) {
      writeFileSync(join(root, '2026', `${d}.json`), JSON.stringify({ v: 1, date: d, spots: { dunes: { shom: [step(`${d}T00:00:00.000Z`)], om: om(`${d}T00:00:00.000Z`, 1) } }, buoys: {} }));
    }
    expect(loadArchive(root).map((d) => d.date)).toEqual(['2026-10-01', '2026-10-02', '2026-10-03']);
    expect(loadArchive(root, 2).map((d) => d.date)).toEqual(['2026-10-02', '2026-10-03']);
    const h = spotHistory(loadArchive(root));
    expect(h.dunes.shom).toHaveLength(3);
    expect(h.dunes.om.time).toHaveLength(3);
  });

  it('archive absente : rien', () => {
    expect(loadArchive(join(tmpdir(), 'nexiste-pas'))).toEqual([]);
  });

  it('concatène les séries et ignore les jours manquants', () => {
    const c = concatOpenMeteo([om('a', 1), null, om('b', 2)]);
    expect(c.time).toEqual(['a', 'b']);
    expect(c.wave_height).toEqual([1, 2]);
  });
});

describe('grilles du modèle côtier', () => {
  it('prend la grille la plus fine qui couvre le point', () => {
    expect(gridFor(46.5999, -1.8812)).toBe('R1141_CHARENTES-200M');
    expect(gridFor(43.6724, -1.4498)).toBe('R1142_AQUITAINE-200M');
    expect(gridFor(45.22, -5.03)).toBe('R1100_NORGAS-2MIN');
    expect(gridFor(40, -10)).toBeNull();
  });

  it('chaque bouée est couverte par une grille', () => {
    for (const [code, b] of Object.entries(BUOYS)) expect(gridFor(b.lat, b.lon), code).not.toBeNull();
  });
});
