/**
 * Récupère l'historique disponible (environ 15 jours) du modèle côtier Shom aux points de mesure des plages,
 * et les prévisions Open-Meteo archivées aux mêmes points et aux mêmes heures.
 * Sert au calage d'Open-Meteo sur le modèle côtier (scripts/calibrate.ts). Sortie : cache/history.json.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

import { fetchOpenMeteo } from '../src/openmeteo.ts';
import { series, steps3h } from '../src/shom.ts';
import type { Spot } from '../src/spots.ts';

const spots: Spot[] = JSON.parse(readFileSync('data/spots.json', 'utf8'));
const from = new Date(process.argv[2] ?? '2026-09-18T00:00:00Z');
const to = new Date(process.argv[3] ?? new Date(Date.now() - 3 * 3600_000).toISOString());
const times = steps3h(from, to);
mkdirSync('cache', { recursive: true });

const out: Record<string, unknown> = {};
for (const s of spots) {
  const shom = await series({ ...s.ref, grid: s.grid }, times, 12);
  const om = await fetchOpenMeteo(s.ref, { start: from, end: to });
  out[s.id] = { shom, om };
  console.log(s.id, shom.length, 'pas Shom', om.time.length, 'heures Open-Meteo');
  writeFileSync('cache/history.json', JSON.stringify(out));
}
