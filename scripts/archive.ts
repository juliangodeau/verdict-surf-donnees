/**
 * Archive d'une journée (UTC, la veille par défaut) : modèle côtier et Open-Meteo aux points de mesure des plages,
 * mesures des bouées, et modèles à l'emplacement des bouées. Sert au recalage hebdomadaire et au contrôle face aux mesures.
 * Écrit archive/AAAA/AAAA-MM-JJ.json. Usage : node scripts/archive.ts [AAAA-MM-JJ]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { BUOYS, buoyDay } from '../src/buoys.ts';
import { fetchOpenMeteo } from '../src/openmeteo.ts';
import { gridFor, series, steps3h } from '../src/shom.ts';
import type { Spot } from '../src/spots.ts';

const spots: Spot[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
const date = process.argv[2] ?? new Date(Date.now() - 24 * 3600_000).toISOString().slice(0, 10);
const from = new Date(`${date}T00:00:00Z`);
const to = new Date(`${date}T21:00:00Z`);
const times = steps3h(from, to);
const range = { start: from, end: from };

const out: Record<string, unknown> = { v: 1, date, spots: {}, buoys: {} };
for (const s of spots) {
  const [shom, om] = await Promise.all([series({ ...s.ref, grid: s.grid }, times, 12), fetchOpenMeteo(s.ref, range)]);
  (out.spots as Record<string, unknown>)[s.id] = { shom, om };
}
for (const [code, b] of Object.entries(BUOYS)) {
  const grid = gridFor(b.lat, b.lon);
  const [obs, shom, om] = await Promise.all([
    buoyDay(code, date).catch(() => null),
    grid ? series({ lat: b.lat, lon: b.lon, depth: 50, grid }, times, 12) : Promise.resolve([]),
    fetchOpenMeteo(b, range).catch(() => null),
  ]);
  (out.buoys as Record<string, unknown>)[code] = { grid, obs, shom, om };
}
const dir = `archive/${date.slice(0, 4)}`;
mkdirSync(dir, { recursive: true });
writeFileSync(`${dir}/${date}.json`, JSON.stringify(out));
const nShom = Object.values(out.spots as Record<string, { shom: unknown[] }>).filter((x) => x.shom.length).length;
const nObs = Object.values(out.buoys as Record<string, { obs: unknown }>).filter((x) => x.obs).length;
console.log(`${date} : ${nShom}/${spots.length} plages avec le modèle côtier, ${nObs}/${Object.keys(BUOYS).length} bouées mesurées`);
