/**
 * Cale Open-Meteo sur le modèle côtier du Shom, plage par plage, à partir de cache/history.json.
 * Calage sur la première moitié de la période, contrôle sur la seconde (jamais vue au calage).
 * Écrit data/calibration.json et affiche l'erreur sur la taille des vagues au bord.
 */
import { readFileSync, writeFileSync } from 'node:fs';

import { coastalFromOpenMeteo, median, type Transfer } from '../src/calibration.ts';
import { surfSize } from '../src/height.ts';
import type { OpenMeteoSeries } from '../src/openmeteo.ts';
import type { ShomStep } from '../src/shom.ts';
import type { Spot } from '../src/spots.ts';

const spots: Spot[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
const hist: Record<string, { shom: ShomStep[]; om: OpenMeteoSeries }> = JSON.parse(readFileSync('cache/history.json', 'utf8'));

interface Pair { t: string; shom: ShomStep; swell: number | null; total: number | null; period: number | null; dir: number | null }

function pairs(id: string): Pair[] {
  const { shom, om } = hist[id];
  const idx = new Map(om.time.map((t, i) => [t, i]));
  return shom.flatMap((s) => {
    const i = idx.get(s.t);
    if (i == null) return [];
    return [{ t: s.t, shom: s, swell: om.swell_wave_height[i], total: om.wave_height[i], period: om.swell_wave_period[i], dir: om.swell_wave_direction[i] }];
  });
}

function fit(ps: Pair[]): Transfer {
  const h = ps.flatMap((p) => {
    const sw = Math.sqrt(Math.max(0, p.shom.hs ** 2 - p.shom.hWind ** 2));
    const o = p.swell ?? p.total;
    return o && o > 0.2 && sw > 0.1 ? [sw / o] : [];
  });
  const t = ps.flatMap((p) => (p.period && p.period > 3 ? [p.shom.tp / p.period] : []));
  return { h: median(h), t: median(t) };
}

function score(ps: Pair[], tr: Transfer, depth: number) {
  const err: number[] = [];
  for (const p of ps) {
    const ref = surfSize(p.shom).hb;
    const c = coastalFromOpenMeteo(p, depth, tr);
    if (!c || ref < 0.3) continue;
    err.push(surfSize(c).hb - ref);
  }
  const n = err.length;
  const bias = err.reduce((a, b) => a + b, 0) / n;
  const rmse = Math.sqrt(err.reduce((a, b) => a + b * b, 0) / n);
  const within = err.filter((e) => Math.abs(e) <= 0.2).length / n;
  return { n, bias: +bias.toFixed(2), rmse: +rmse.toFixed(2), within02: +within.toFixed(2) };
}

const result: Record<string, Transfer & { n: number }> = {};
const rows: string[] = [];
for (const s of spots) {
  const ps = pairs(s.id);
  const half = ps.length >> 1;
  const train = ps.slice(0, half), test = ps.slice(half);
  const tr = fit(train);
  const sc = score(test, tr, s.ref.depth);
  const raw = score(test, { h: 1, t: 1 }, s.ref.depth);
  const all = fit(ps);
  result[s.id] = { h: +all.h.toFixed(3), t: +all.t.toFixed(3), n: ps.length };
  rows.push(`${s.id.padEnd(6)} h=${tr.h.toFixed(2)} t=${tr.t.toFixed(2)} | contrôle n=${sc.n} biais ${sc.bias} m, écart type ${sc.rmse} m, à ±0,2 m : ${Math.round(sc.within02 * 100)} % | sans calage : biais ${raw.bias} m, à ±0,2 m : ${Math.round(raw.within02 * 100)} %`);
}
console.log(rows.join('\n'));
writeFileSync('data/calibration.json', JSON.stringify({ model: 'meteofrance_wave', fittedOn: [hist[spots[0].id].shom[0]?.t, hist[spots[0].id].shom.at(-1)?.t], spots: result }, null, 1) + '\n');
