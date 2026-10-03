/**
 * Open-Meteo Marine (https://open-meteo.com, CC BY 4.0), modèle MFWAM de Météo-France :
 * il sépare la houle de la mer du vent et va à 10 jours. Son biais à la côte est corrigé
 * plage par plage par le calage sur le modèle côtier du Shom (data/calibration.json).
 */
const API = 'https://marine-api.open-meteo.com/v1/marine';
export const MODEL = 'meteofrance_wave';
const HOURLY = ['wave_height', 'swell_wave_height', 'swell_wave_period', 'swell_wave_direction', 'wind_wave_height'] as const;

export interface OpenMeteoSeries {
  /** Heures UTC ISO. */
  time: string[];
  wave_height: (number | null)[];
  swell_wave_height: (number | null)[];
  swell_wave_period: (number | null)[];
  swell_wave_direction: (number | null)[];
  wind_wave_height: (number | null)[];
}

const day = (d: Date) => d.toISOString().slice(0, 10);

export async function fetchOpenMeteo(
  p: { lat: number; lon: number },
  range: { start: Date; end: Date } | { days: number },
): Promise<OpenMeteoSeries> {
  const q = new URLSearchParams({
    latitude: String(p.lat), longitude: String(p.lon), hourly: HOURLY.join(','), models: MODEL, timezone: 'GMT',
  });
  if ('days' in range) q.set('forecast_days', String(range.days));
  else { q.set('start_date', day(range.start)); q.set('end_date', day(range.end)); }
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(`${API}?${q}`, { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = (await res.json()) as { hourly: OpenMeteoSeries };
      return { ...j.hourly, time: j.hourly.time.map((t) => new Date(t + 'Z').toISOString()) };
    } catch (e) {
      if (attempt === 3) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  throw new Error('inaccessible');
}
