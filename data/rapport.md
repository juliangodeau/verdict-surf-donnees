# Rapport de calage

Archive : 43 jours (2026-09-20 → 2026-11-01). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 0 | — | -3 % | aucune (trop peu de mesures) | — → — |
| Cap Ferret | 309 | +11 % | +15 % | ×0,90 | 10 % → 9 % |
| Anglet | 198 | +2 % | +7 % | aucune (sans effet) | 8 % → 10 % |
| Île d’Yeu Nord | 292 | +20 % | +43 % | ×0,83 | 19 % → 8 % |
| Les Pierres Noires | 301 | +12 % | +14 % | ×0,90 | 14 % → 9 % |
| Belle-Île | 309 | +12 % | +16 % | ×0,89 | 11 % → 9 % |
| SEM-REV (Le Croisic) | 231 | +26 % | +52 % | ×0,79 | 24 % → 10 % |
| Saint-Jean-de-Luz | 309 | -3 % | +0 % | aucune (sans effet) | 11 % → 12 % |
| Noirmoutier | 309 | +36 % | +29 % | ×0,73 | 31 % → 10 % |

| Plage | Bouée de référence | Correction |
|---|---|---|
| Hossegor Sud | Anglet | ×1,00 |
| La Gravière | Anglet | ×1,00 |
| La Piste | Anglet | ×1,00 |
| Les Bourdaines | Anglet | ×1,00 |
| Le Penon | Anglet | ×1,00 |
| Vieux-Boucau | Anglet | ×1,00 |
| Moliets | Anglet | ×1,00 |
| Les Cavaliers | Saint-Jean-de-Luz | ×1,00 |
| Côte des Basques | Saint-Jean-de-Luz | ×1,00 |
| Hendaye | Saint-Jean-de-Luz | ×1,00 |
| Lacanau Centrale | Cap Ferret | ×0,90 |
| Carcans-Plage | Cap Ferret | ×0,90 |
| Montalivet | Cap Ferret | ×0,90 |
| Vert Bois | Cap Ferret | ×0,90 |
| La Côte Sauvage | Cap Ferret | ×0,90 |
| La Sauzaie | Île d’Yeu Nord | ×0,83 |
| Les Dunes | Île d’Yeu Nord | ×0,83 |
| Les Conches | Île d’Yeu Nord | ×0,83 |
| La Terrière | Île d’Yeu Nord | ×0,83 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,83 |
| Grande Plage | Île d’Yeu Nord | ×0,83 |
| La Govelle | SEM-REV (Le Croisic) | ×0,80 |
| Penthièvre | Belle-Île | ×0,89 |
| Port Blanc | Belle-Île | ×0,89 |
| La Torche | Les Pierres Noires | ×0,90 |
| Pors Carn | Les Pierres Noires | ×0,90 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 344 | 0,75 / 1,14 | 62 % | 0,26 m |
| La Gravière | 344 | 0,92 / 1,22 | 69 % | 0,52 m |
| La Piste | 344 | 0,71 / 1,20 | 78 % | 0,31 m |
| Les Bourdaines | 344 | 1,09 / 1,32 | 67 % | 0,51 m |
| Le Penon | 344 | 1,08 / 1,33 | 69 % | 0,51 m |
| Vieux-Boucau | 344 | 0,99 / 1,30 | 59 % | 0,62 m |
| Moliets | 344 | 1,04 / 1,29 | 70 % | 0,58 m |
| Les Cavaliers | 344 | 1,00 / 1,27 | 72 % | 0,52 m |
| Côte des Basques | 344 | 1,17 / 1,25 | 65 % | 0,53 m |
| Hendaye | 344 | 0,23 / 1,31 | 68 % | 0,21 m |
| Lacanau Centrale | 344 | 0,96 / 1,27 | 67 % | 0,46 m |
| Carcans-Plage | 344 | 0,97 / 1,27 | 76 % | 0,48 m |
| Montalivet | 344 | 1,02 / 1,26 | 66 % | 0,78 m |
| Vert Bois | 344 | 0,86 / 1,29 | 76 % | 0,57 m |
| La Côte Sauvage | 344 | 0,96 / 1,25 | 65 % | 0,74 m |
| La Sauzaie | 344 | 0,85 / 1,27 | 72 % | 0,43 m |
| Les Dunes | 344 | 0,92 / 1,27 | 72 % | 0,48 m |
| Les Conches | 344 | 0,85 / 1,30 | 69 % | 0,38 m |
| La Terrière | 344 | 0,84 / 1,26 | 63 % | 0,45 m |
| Sion-sur-l’Océan | 344 | 0,69 / 1,27 | 75 % | 0,25 m |
| Grande Plage | 344 | 0,59 / 1,28 | 75 % | 0,23 m |
| La Govelle | 344 | 1,03 / 1,30 | 70 % | 0,34 m |
| Penthièvre | 344 | 0,87 / 1,32 | 66 % | 0,28 m |
| Port Blanc | 344 | 0,79 / 1,31 | 69 % | 0,30 m |
| La Torche | 344 | 0,94 / 1,31 | 55 % | 0,66 m |
| Pors Carn | 344 | 0,82 / 1,30 | 60 % | 0,66 m |
