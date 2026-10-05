/**
 * Mesures des bouées de la façade atlantique (Candhis, Météo-France, Puertos del Estado), redistribuées par
 * Copernicus Marine In Situ (IBI, temps quasi réel) : un fichier NetCDF4 par bouée et par jour, en accès public.
 * Licence : service Copernicus Marine, gratuit, citation requise.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import h5wasm from 'h5wasm/node';

const BASE = 'https://s3.waw3-1.cloudferro.com/mdl-native-03/native/INSITU_IBI_PHYBGCWAV_DISCRETE_MYNRT_013_033/cmems_obs-ins_ibi_phybgcwav_mynrt_na_irr_202311/latest';

/** Bouées utiles, de la Bretagne au Pays basque (code OMM → nom). */
export const BUOYS: Record<string, { name: string; prefix: 'GL' | 'IR'; lat: number; lon: number }> = {
  '6200069': { name: 'Les Pierres Noires', prefix: 'GL', lat: 48.2903, lon: -4.9683 },
  '6200074': { name: 'Belle-Île', prefix: 'GL', lat: 47.285, lon: -3.285 },
  '6200078': { name: 'SEM-REV (Le Croisic)', prefix: 'GL', lat: 47.239, lon: -2.787 },
  '6200251': { name: 'Noirmoutier', prefix: 'GL', lat: 46.9167, lon: -2.7222 },
  '6200067': { name: 'Île d’Yeu Nord', prefix: 'GL', lat: 46.8332, lon: -2.295 },
  '6200064': { name: 'Cap Ferret', prefix: 'GL', lat: 44.6503, lon: -1.4478 },
  '6200001': { name: 'Gascogne (large)', prefix: 'GL', lat: 45.22, lon: -5.03 },
  '6200066': { name: 'Anglet', prefix: 'GL', lat: 43.532, lon: -1.615 }, // position approximative (en maintenance en octobre 2026)
  '6200079': { name: 'Saint-Jean-de-Luz', prefix: 'GL', lat: 43.403, lon: -1.6766 },
  '6200024': { name: 'Bilbao-Vizcaya', prefix: 'IR', lat: 43.64, lon: -3.04 },
};

export interface BuoyDay {
  /** Heures UTC ISO des mesures. */
  time: string[];
  /** Hauteur significative (m) : Hm0 spectral, sinon H1/3. */
  hs: (number | null)[];
  /** Période de pic (s). */
  tp: (number | null)[];
  /** Période moyenne (s). */
  tm: (number | null)[];
  /** Direction d'où viennent les vagues (degrés). */
  dir: (number | null)[];
}

const FILL = 9e36;
const GOOD_QC = new Set([1, 2]);
const r2 = (n: number) => Math.round(n * 100) / 100;

let ready: Promise<unknown> | null = null;

/** Mesures d'une bouée pour un jour (AAAA-MM-JJ), ou null si le fichier n'existe pas. */
export async function buoyDay(code: string, date: string): Promise<BuoyDay | null> {
  const ymd = date.replaceAll('-', '');
  const b = BUOYS[code];
  const url = `${BASE}/${ymd}/${b.prefix}_TS_MO_${code}_${ymd}.nc`;
  const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (res.status === 404 || res.status === 403) return null;
  if (!res.ok) throw new Error(`bouée ${code} : HTTP ${res.status}`);
  const dir = mkdtempSync(join(tmpdir(), 'bouee-'));
  const path = join(dir, 'f.nc');
  writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  ready ??= h5wasm.ready;
  await ready;
  const f = new h5wasm.File(path, 'r');
  try {
    const read = (k: string): (number | null)[] | null => {
      const d = f.get(k) as { value: ArrayLike<number> } | null;
      if (!d) return null;
      const qc = f.get(`${k}_QC`) as { value: ArrayLike<number> } | null;
      return Array.from(d.value, (v, i) => (Math.abs(v) >= FILL || (qc && !GOOD_QC.has(qc.value[i])) ? null : r2(v)));
    };
    const t = f.get('TIME') as { value: ArrayLike<number> };
    const time = Array.from(t.value, (days) => new Date(Date.UTC(1950, 0, 1) + Math.round(days * 86400) * 1000).toISOString());
    const pick = (...keys: string[]) => {
      const cols = keys.map(read).filter((c): c is (number | null)[] => !!c);
      return time.map((_, i) => cols.map((c) => c[i]).find((v) => v != null) ?? null);
    };
    const day: BuoyDay = { time, hs: pick('VHM0', 'VAVH', 'VGHS'), tp: pick('VTPK'), tm: pick('VTM02', 'VAVT'), dir: pick('VMDR', 'VDIR') };
    // On ne garde que les instants où la hauteur est mesurée.
    const keep = day.hs.map((v) => v != null);
    const f2 = <T>(a: T[]) => a.filter((_, i) => keep[i]);
    return { time: f2(day.time), hs: f2(day.hs), tp: f2(day.tp), tm: f2(day.tm), dir: f2(day.dir) };
  } finally {
    f.close();
    rmSync(dir, { recursive: true, force: true });
  }
}
