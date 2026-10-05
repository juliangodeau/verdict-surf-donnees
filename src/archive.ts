/** Lecture de l'archive quotidienne (archive/AAAA/AAAA-MM-JJ.json), écrite par scripts/archive.ts. */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { BuoyDay } from './buoys.ts';
import type { OpenMeteoSeries } from './openmeteo.ts';
import type { ShomStep } from './shom.ts';

export interface ArchiveDay {
  v: 1;
  date: string;
  spots: Record<string, { shom: ShomStep[]; om: OpenMeteoSeries }>;
  buoys: Record<string, { grid: string | null; obs: BuoyDay | null; shom: ShomStep[]; om: OpenMeteoSeries | null }>;
}

/** Les jours archivés, du plus ancien au plus récent, limités aux `days` derniers. */
export function loadArchive(root = 'archive', days = 60): ArchiveDay[] {
  if (!existsSync(root)) return [];
  const files = readdirSync(root)
    .flatMap((y) => readdirSync(join(root, y)).map((f) => join(root, y, f)))
    .filter((f) => f.endsWith('.json'))
    .sort();
  return files.slice(-days).map((f) => JSON.parse(readFileSync(f, 'utf8')) as ArchiveDay);
}

/** Concatène des séries Open-Meteo de plusieurs jours. */
export function concatOpenMeteo(list: (OpenMeteoSeries | null | undefined)[]): OpenMeteoSeries {
  const out: OpenMeteoSeries = { time: [], wave_height: [], swell_wave_height: [], swell_wave_period: [], swell_wave_direction: [], wind_wave_height: [] };
  for (const s of list) {
    if (!s) continue;
    for (const k of Object.keys(out) as (keyof OpenMeteoSeries)[]) (out[k] as unknown[]).push(...(s[k] as unknown[]));
  }
  return out;
}

/** Historique par plage (modèle côtier et Open-Meteo), au format attendu par le calage. */
export function spotHistory(days: ArchiveDay[]): Record<string, { shom: ShomStep[]; om: OpenMeteoSeries }> {
  const ids = new Set(days.flatMap((d) => Object.keys(d.spots)));
  return Object.fromEntries(
    [...ids].map((id) => [id, { shom: days.flatMap((d) => d.spots[id]?.shom ?? []), om: concatOpenMeteo(days.map((d) => d.spots[id]?.om)) }]),
  );
}
