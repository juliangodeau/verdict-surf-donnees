/**
 * Modèle de vagues côtier WaveWatch III du Shom et de Météo-France (grilles de 200 m), service WMS public
 * https://services.data.shom.fr/ncwms2/wms, Licence Ouverte Etalab 2.0.
 * Une valeur par requête (GetFeatureInfo) : un point, un pas de temps, une variable.
 */
import type { CoastalSea } from './height.ts';

const WMS = 'https://services.data.shom.fr/ncwms2/wms';

/** Variables lues : hauteur totale, mer du vent, période de pic, direction (vers laquelle va la houle). */
export const VARS = { hs: 'u:v-mag', hWind: 'u0:v0-mag', tp: 'VAR85-10-2-201_msl', dirTo: 'u:v-dir' } as const;

export interface ShomPoint {
  lat: number;
  lon: number;
  depth: number;
  grid: string;
}

export interface ShomStep extends CoastalSea {
  /** Heure UTC, ISO. */
  t: string;
  /** Direction d'où vient la houle (degrés). */
  dir: number;
}

async function value(layer: string, lat: number, lon: number, time: string): Promise<number | null> {
  const d = 0.0005;
  const q = new URLSearchParams({
    SERVICE: 'WMS', VERSION: '1.1.1', REQUEST: 'GetFeatureInfo', LAYERS: layer, QUERY_LAYERS: layer, STYLES: '',
    WIDTH: '11', HEIGHT: '11', X: '5', Y: '5', INFO_FORMAT: 'text/xml', SRS: 'EPSG:4326', TIME: time,
    BBOX: `${lon - d},${lat - d},${lon + d},${lat + d}`,
  });
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(`${WMS}?${q}`, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const m = /<value>([^<]*)<\/value>/.exec(await res.text());
      if (!m) return null;
      const v = Number(m[1]);
      return Number.isFinite(v) ? v : null;
    } catch {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  return null;
}

/** Exécute des tâches avec au plus `n` en parallèle. */
export async function pool<T>(tasks: (() => Promise<T>)[], n: number): Promise<T[]> {
  const out: T[] = new Array(tasks.length);
  let next = 0;
  const worker = async () => {
    while (next < tasks.length) {
      const i = next++;
      out[i] = await tasks[i]();
    }
  };
  await Promise.all(Array.from({ length: Math.min(n, tasks.length) }, worker));
  return out;
}

/** Fin de la période disponible pour une grille (heure UTC ISO), lue dans les capacités du service. */
export async function availableUntil(grid: string): Promise<string> {
  const res = await fetch(`${WMS}?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0`, { signal: AbortSignal.timeout(120_000) });
  const xml = await res.text();
  const i = xml.indexOf(`<Name>VAGUES_WW3_${grid}/${VARS.hs}</Name>`);
  if (i < 0) throw new Error(`Grille Shom introuvable : ${grid}`);
  const dim = /<Dimension name="time"[^>]*>([^<]*)<\/Dimension>/.exec(xml.slice(i))?.[1].trim() ?? '';
  const last = dim.split(',').pop()!.split('/');
  return last.length >= 2 ? last[1] : last[0];
}

/** Pas de 3 h, de `from` à `to` inclus (heures UTC ISO). */
export function steps3h(from: Date, to: Date): string[] {
  const t = new Date(from);
  t.setUTCMinutes(0, 0, 0);
  t.setUTCHours(Math.floor(t.getUTCHours() / 3) * 3);
  const out: string[] = [];
  for (; t <= to; t.setUTCHours(t.getUTCHours() + 3)) out.push(t.toISOString());
  return out;
}

/** Série de la mer au point de mesure d'une plage. Les pas incomplets sont écartés. */
export async function series(p: ShomPoint, times: string[], parallel = 8): Promise<ShomStep[]> {
  const keys = Object.keys(VARS) as (keyof typeof VARS)[];
  const tasks = times.flatMap((t) => keys.map((k) => () => value(`VAGUES_WW3_${p.grid}/${VARS[k]}`, p.lat, p.lon, t)));
  const vals = await pool(tasks, parallel);
  const out: ShomStep[] = [];
  times.forEach((t, i) => {
    const [hs, hWind, tp, dirTo] = keys.map((_, j) => vals[i * keys.length + j]);
    if (hs == null || hWind == null || tp == null || dirTo == null) return;
    out.push({ t, hs, hWind, tp, depth: p.depth, dir: (dirTo + 180) % 360 });
  });
  return out;
}
