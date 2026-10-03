/**
 * Calcule la taille des vagues au bord, heure par heure, pour toutes les plages, et écrit public/forecast.json.
 * - Jusqu'à la fin du modèle côtier Shom (J+1 environ) : modèle côtier au point de mesure devant la plage.
 * - Au-delà, jusqu'à 7 jours : Open-Meteo (MFWAM) recalé plage par plage sur le modèle côtier.
 * - Sur les 6 dernières heures du modèle côtier, passage progressif de l'un à l'autre.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { DEFAULT_TRANSFER, coastalFromOpenMeteo, type Transfer } from './calibration.ts';
import { surfSize, type CoastalSea } from './height.ts';
import { fetchOpenMeteo, type OpenMeteoSeries } from './openmeteo.ts';
import { availableUntil, series, steps3h, type ShomStep } from './shom.ts';
import type { Spot } from './spots.ts';

const HOUR = 3600_000;
const BLEND_HOURS = 6;

const spots: Spot[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
const calib: { spots: Record<string, Transfer> } = JSON.parse(readFileSync('data/calibration.json', 'utf8'));

/** Valeur interpolée linéairement entre deux pas de 3 h du modèle côtier. */
function shomAt(steps: ShomStep[], t: number): (CoastalSea & { dir: number }) | null {
  for (let i = 0; i < steps.length - 1; i++) {
    const a = steps[i], b = steps[i + 1];
    const ta = Date.parse(a.t), tb = Date.parse(b.t);
    if (t < ta || t > tb || tb - ta > 6 * HOUR) continue;
    const f = (t - ta) / (tb - ta);
    const lerp = (x: number, y: number) => x + (y - x) * f;
    return { hs: lerp(a.hs, b.hs), hWind: lerp(a.hWind, b.hWind), tp: lerp(a.tp, b.tp), depth: a.depth, dir: f < 0.5 ? a.dir : b.dir };
  }
  const last = steps.at(-1);
  return last && Date.parse(last.t) === t ? last : null;
}

function omAt(om: OpenMeteoSeries, i: number) {
  return { swell: om.swell_wave_height[i], total: om.wave_height[i], period: om.swell_wave_period[i], dir: om.swell_wave_direction[i] };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

async function spotForecast(s: Spot, start: Date, shomUntil: Date) {
  const [steps, om] = await Promise.all([
    series({ ...s.ref, grid: s.grid }, steps3h(start, shomUntil), 8),
    fetchOpenMeteo(s.ref, { start, end: new Date(start.getTime() + 7 * 24 * HOUR) }),
  ]);
  const tr = calib.spots[s.id] ?? DEFAULT_TRANSFER;
  const shomEnd = steps.length ? Date.parse(steps.at(-1)!.t) : 0;
  const out = { lo: [] as number[], hi: [] as number[], sets: [] as number[], swell: [] as number[], period: [] as number[], dir: [] as (number | null)[], src: '' };
  om.time.forEach((iso, i) => {
    const t = Date.parse(iso);
    if (t < start.getTime()) return;
    const c = shomAt(steps, t);
    const o = coastalFromOpenMeteo(omAt(om, i), s.ref.depth, tr);
    let sea: CoastalSea | null = c ?? o;
    let src = c ? 's' : 'o';
    if (c && o && t > shomEnd - BLEND_HOURS * HOUR) {
      const w = (shomEnd - t) / (BLEND_HOURS * HOUR); // 1 → modèle côtier, 0 → Open-Meteo
      sea = { hs: w * c.hs + (1 - w) * o.hs, hWind: w * c.hWind, tp: w * c.tp + (1 - w) * o.tp, depth: s.ref.depth };
      src = 'm';
    }
    if (!sea) { out.lo.push(-1); out.hi.push(-1); out.sets.push(-1); out.swell.push(-1); out.period.push(-1); out.dir.push(null); out.src += '-'; return; }
    const size = surfSize(sea);
    out.lo.push(size.lo); out.hi.push(size.hi); out.sets.push(size.sets);
    out.swell.push(r1(Math.sqrt(Math.max(0, sea.hs ** 2 - sea.hWind ** 2))));
    out.period.push(Math.round(sea.tp));
    out.dir.push(c ? Math.round(c.dir) : (omAt(om, i).dir ?? null));
    out.src += src;
  });
  return out;
}

export async function build(now = new Date()) {
  // Début : minuit UTC du jour (l'appli montre la journée entière, de 7 h à 20 h).
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const grids = [...new Set(spots.map((s) => s.grid))];
  const until = Object.fromEntries(await Promise.all(grids.map(async (g) => [g, new Date(await availableUntil(g))] as const)));
  const result: Record<string, Awaited<ReturnType<typeof spotForecast>>> = {};
  for (const s of spots) result[s.id] = await spotForecast(s, start, until[s.grid]);
  const doc = {
    v: 1,
    generatedAt: now.toISOString(),
    /** Première heure (UTC) ; une valeur par heure ensuite. Valeur -1 : pas de donnée. */
    start: start.toISOString(),
    stepHours: 1,
    fields: {
      lo: 'taille des vagues au bord vue par un observateur, bas de la fourchette (m)',
      hi: 'taille des vagues au bord vue par un observateur, haut de la fourchette (m)',
      sets: 'les plus grosses vagues, les séries (m)',
      swell: 'houle devant la plage, vers 12 m de fond, sans la mer du vent (m)',
      period: 'période de pic de la houle (s)',
      dir: 'direction d’où vient la houle (degrés)',
      src: 's = modèle côtier Shom, m = transition, o = Open-Meteo recalé, - = pas de donnée',
    },
    sources: [
      'Shom / Météo-France, modèle de vagues côtier WaveWatch III 200 m (Licence Ouverte Etalab 2.0)',
      'Open-Meteo Marine, modèle MFWAM de Météo-France (CC BY 4.0)',
    ],
    spots: result,
  };
  mkdirSync('public', { recursive: true });
  writeFileSync('public/forecast.json', JSON.stringify(doc));
  return doc;
}

if (import.meta.main) {
  const t0 = Date.now();
  const doc = await build();
  const d = doc.spots['dunes'];
  console.log(`ok en ${Math.round((Date.now() - t0) / 1000)} s, ${Object.keys(doc.spots).length} plages, ${d.lo.length} heures ; Les Dunes : ${d.src}`);
}
