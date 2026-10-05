/**
 * Recalage hebdomadaire d'Open-Meteo sur le modèle côtier du Shom, plage par plage, à partir de l'archive
 * (60 derniers jours). Calage sur la première moitié, contrôle sur la seconde (jamais vue au calage).
 * Une plage n'est recalée que si elle a assez de données ; sinon son calage précédent est gardé.
 * Écrit data/calibration.json et data/rapport.md (contrôle face aux bouées et qualité du calage).
 */
import { readFileSync, writeFileSync } from 'node:fs';

import { loadArchive, spotHistory, type ArchiveDay } from '../src/archive.ts';
import { BUOYS } from '../src/buoys.ts';
import { coastalFromOpenMeteo, median, type Transfer } from '../src/calibration.ts';
import { surfSize } from '../src/height.ts';
import type { OpenMeteoSeries } from '../src/openmeteo.ts';
import type { ShomStep } from '../src/shom.ts';
import type { Spot } from '../src/spots.ts';

/** Pas de 3 h minimum pour recaler une plage (environ 10 jours). */
const MIN_PAIRS = 80;

const spots: Spot[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
const previous: { spots: Record<string, Transfer & { n?: number }> } = JSON.parse(readFileSync('data/calibration.json', 'utf8'));
const days: ArchiveDay[] = loadArchive();
const hist = spotHistory(days);

interface Pair { t: string; shom: ShomStep; swell: number | null; total: number | null; period: number | null }

function pairs(shom: ShomStep[], om: OpenMeteoSeries): Pair[] {
  const idx = new Map(om.time.map((t, i) => [t, i]));
  return shom.flatMap((s) => {
    const i = idx.get(s.t);
    return i == null ? [] : [{ t: s.t, shom: s, swell: om.swell_wave_height[i], total: om.wave_height[i], period: om.swell_wave_period[i] }];
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
  const err = ps.flatMap((p) => {
    const ref = surfSize(p.shom).hb;
    const c = coastalFromOpenMeteo(p, depth, tr);
    return c && ref >= 0.3 ? [surfSize(c).hb - ref] : [];
  });
  const n = err.length;
  if (!n) return { n, within: NaN, rmse: NaN };
  return { n, within: err.filter((e) => Math.abs(e) <= 0.2).length / n, rmse: Math.sqrt(err.reduce((a, b) => a + b * b, 0) / n) };
}

const pct = (x: number) => (Number.isFinite(x) ? `${Math.round(x * 100)} %` : '—');
const m2 = (x: number) => (Number.isFinite(x) ? x.toFixed(2).replace('.', ',') : '—');
const sign = (x: number) => (Number.isFinite(x) ? `${x >= 0 ? '+' : ''}${Math.round(x * 100)} %` : '—');

// 1. Calage par plage.
const result: Record<string, Transfer & { n: number }> = {};
const spotRows: string[] = [];
for (const s of spots) {
  const h = hist[s.id];
  const ps = h ? pairs(h.shom, h.om) : [];
  const old = previous.spots[s.id];
  if (ps.length < MIN_PAIRS) {
    if (old) result[s.id] = { h: old.h, t: old.t, n: old.n ?? 0 };
    spotRows.push(`| ${s.name} | ${ps.length} | gardé (${m2(old?.h ?? NaN)} / ${m2(old?.t ?? NaN)}) | — | — |`);
    continue;
  }
  const half = ps.length >> 1;
  const check = score(ps.slice(half), fit(ps.slice(0, half)), s.ref.depth);
  const all = fit(ps);
  result[s.id] = { h: +all.h.toFixed(3), t: +all.t.toFixed(3), n: ps.length };
  spotRows.push(`| ${s.name} | ${ps.length} | ${m2(all.h)} / ${m2(all.t)} | ${pct(check.within)} | ${m2(check.rmse)} m |`);
}

// 2. Contrôle face aux bouées : hauteur significative du modèle côtier et d'Open-Meteo contre la mesure.
const buoyRows: string[] = [];
for (const [code, b] of Object.entries(BUOYS)) {
  const rs: number[] = [], ro: number[] = [];
  for (const d of days) {
    const x = d.buoys?.[code];
    if (!x?.obs) continue;
    const obsAt = (t: string) => {
      const tt = Date.parse(t);
      let best: number | null = null, bestDt = 31 * 60_000;
      x.obs!.time.forEach((ot, i) => {
        const dt = Math.abs(Date.parse(ot) - tt);
        if (dt <= bestDt && x.obs!.hs[i] != null) { bestDt = dt; best = x.obs!.hs[i]; }
      });
      return best as number | null;
    };
    for (const s of x.shom) {
      const o = obsAt(s.t);
      if (o && o > 0.3) rs.push(s.hs / o);
    }
    if (x.om) x.om.time.forEach((t, i) => {
      const o = obsAt(t), m = x.om!.wave_height[i];
      if (o && o > 0.3 && m != null) ro.push(m / o);
    });
  }
  buoyRows.push(`| ${b.name} | ${rs.length + ro.length ? Math.max(rs.length, ro.length) : 0} | ${sign(rs.length ? median(rs) - 1 : NaN)} | ${sign(ro.length ? median(ro) - 1 : NaN)} |`);
}

writeFileSync('data/calibration.json', JSON.stringify({ model: 'meteofrance_wave', days: days.length, from: days[0]?.date, to: days.at(-1)?.date, spots: result }, null, 1) + '\n');
writeFileSync('data/rapport.md', `# Rapport de calage

Archive : ${days.length} jours (${days[0]?.date ?? '—'} → ${days.at(-1)?.date ?? '—'}). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop).

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) |
|---|---|---|---|
${buoyRows.join('\n')}

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
${spotRows.join('\n')}
`);
console.log(`calage : ${days.length} jours, ${Object.keys(result).length} plages ; rapport dans data/rapport.md`);
