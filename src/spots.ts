/** Une plage, avec son point de mesure devant la plage (environ 12 m de fond). Voir data/spots.json. */
export interface Spot {
  id: string;
  name: string;
  lat: number;
  lon: number;
  /** Direction vers laquelle la plage regarde (degrés, d'où vient une houle de face). */
  facing: number;
  ref: { lat: number; lon: number; depth: number };
  /** Grille du modèle côtier Shom qui couvre le point de mesure. */
  grid: string;
}
