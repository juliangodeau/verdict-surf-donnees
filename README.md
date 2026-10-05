# Verdict Surf · données

La taille des vagues **au bord**, heure par heure, sur 7 jours, pour les plages de l’appli Verdict Surf.
Publiée toutes les 3 heures sur GitHub Pages : `forecast.json`.

## Houle ou vague ?

- **La houle** se mesure au large. C’est ce qu’affichent la plupart des sites.
- **La vague** est ce que le surfeur trouve au bord. Elle dépend de la plage : son orientation, les îles et les caps qui l’abritent, le fond.

Ce dépôt calcule la vague.

## Méthode

1. **La houle devant la plage, vers 12 m de fond.**
   - Jusqu’à demain soir : modèle de vagues côtier du Shom et de Météo-France, qui tient compte du fond, des îles et des caps (maille de 200 m).
   - Ensuite, jusqu’à 7 jours : Open-Meteo (MFWAM), recalé plage par plage sur ce modèle côtier (`data/calibration.json`).
2. **On retire le clapot** levé par le vent local : il ne fait pas de vagues à surfer.
3. **Le déferlement.** On ramène la houle à son équivalent au large, puis on calcule le déferlement :
   - formule de Komar et Gaughan (1972) ;
   - multipliée par 0,7, parce qu’une vraie houle mélange des vagues de tailles différentes et que les plus grosses cassent plus tôt (Goda 2010, Thornton et Guza 1984).
4. **Ce que voit un observateur** sur la plage :
   - de 0,71 à 1 fois la hauteur au déferlement (Schneider et Weggel 1980) ;
   - les séries, les plus grosses vagues, à 1,27 fois.

La méthode, les mesures et les sources sont détaillées dans l’étude du projet (dépôt de l’appli, `docs/etude-hauteur-vagues.md`). Les points de mesure viennent de la carte du fond du Shom (`data/spots.json`).

## Précision connue

- **Modèle côtier face aux bouées Candhis :** environ +6 % sur la hauteur de houle.
- **Open-Meteo recalé face au modèle côtier**, sur des jours non utilisés pour le calage : la taille au bord est à ±0,2 m dans 61 à 86 % des cas selon la plage (environ 70 % en moyenne). `npm run calibrate` refait ce contrôle.
- **Le déferlement lui-même** n’est pas encore mesuré sur nos plages. C’est la prochaine étape de validation : observations sur place.

## Archive et recalage

Chaque nuit, une tâche archive la veille dans `archive/` : modèle côtier et Open-Meteo aux points de mesure des plages, mesures des bouées de la façade (Copernicus Marine In Situ) et modèles à l’emplacement des bouées. Chaque lundi, Open-Meteo est recalé sur les 60 derniers jours. Le rapport `data/rapport.md` montre l’écart avec les bouées et la qualité du calage.

## Commandes

```
npm test           # tests
npm run build      # calcule public/forecast.json
npm run archive    # archive la veille : modèle côtier, Open-Meteo et bouées (archive/)
npm run calibrate  # recale Open-Meteo sur les 60 derniers jours d’archive, écrit data/rapport.md
```

## Sources et licences

- Shom / Météo-France, modèle de vagues côtier WaveWatch III, Licence Ouverte Etalab 2.0.
- Shom, MNT bathymétrique de façade Atlantique (HOMONIM), Licence Ouverte Etalab 2.0.
- Open-Meteo Marine, CC BY 4.0.
- Copernicus Marine Service, mesures in situ IBI (bouées Candhis, Météo-France, Puertos del Estado).
