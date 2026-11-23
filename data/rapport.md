# Rapport de calage

Archive : 60 jours (2026-09-24 → 2026-11-22). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 1 | -4 % | -3 % | aucune (trop peu de mesures) | 4 % → 4 % |
| Cap Ferret | 441 | +13 % | +15 % | ×0,88 | 14 % → 11 % |
| Anglet | 262 | +5 % | +7 % | aucune (sans effet) | 14 % → 15 % |
| Île d’Yeu Nord | 410 | +17 % | +42 % | ×0,85 | 14 % → 8 % |
| Les Pierres Noires | 427 | +16 % | +18 % | ×0,86 | 17 % → 11 % |
| Belle-Île | 442 | +14 % | +16 % | ×0,88 | 15 % → 9 % |
| SEM-REV (Le Croisic) | 332 | +25 % | +45 % | ×0,80 | 26 % → 11 % |
| Saint-Jean-de-Luz | 419 | +2 % | +3 % | aucune (sans effet) | 14 % → 15 % |
| Noirmoutier | 415 | +34 % | +28 % | ×0,74 | 32 % → 9 % |

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
| Lacanau Centrale | Cap Ferret | ×0,88 |
| Carcans-Plage | Cap Ferret | ×0,88 |
| Montalivet | Cap Ferret | ×0,88 |
| Vert Bois | Cap Ferret | ×0,88 |
| La Côte Sauvage | Cap Ferret | ×0,88 |
| La Sauzaie | Île d’Yeu Nord | ×0,85 |
| Les Dunes | Île d’Yeu Nord | ×0,85 |
| Les Conches | Île d’Yeu Nord | ×0,85 |
| La Terrière | Île d’Yeu Nord | ×0,85 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,85 |
| Grande Plage | Île d’Yeu Nord | ×0,85 |
| La Govelle | SEM-REV (Le Croisic) | ×0,80 |
| Penthièvre | Belle-Île | ×0,88 |
| Port Blanc | Belle-Île | ×0,88 |
| La Torche | Les Pierres Noires | ×0,86 |
| Pors Carn | Les Pierres Noires | ×0,86 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 480 | 0,76 / 1,15 | 65 % | 0,30 m |
| La Gravière | 480 | 0,93 / 1,22 | 65 % | 0,52 m |
| La Piste | 480 | 0,73 / 1,20 | 73 % | 0,30 m |
| Les Bourdaines | 480 | 1,11 / 1,32 | 70 % | 0,58 m |
| Le Penon | 480 | 1,09 / 1,33 | 69 % | 0,52 m |
| Vieux-Boucau | 480 | 1,02 / 1,31 | 59 % | 0,63 m |
| Moliets | 480 | 1,06 / 1,30 | 64 % | 0,61 m |
| Les Cavaliers | 480 | 1,01 / 1,28 | 71 % | 0,41 m |
| Côte des Basques | 480 | 1,21 / 1,27 | 66 % | 0,39 m |
| Hendaye | 480 | 0,24 / 1,32 | 72 % | 0,22 m |
| Lacanau Centrale | 480 | 0,99 / 1,27 | 69 % | 0,51 m |
| Carcans-Plage | 480 | 0,98 / 1,26 | 74 % | 0,54 m |
| Montalivet | 480 | 1,04 / 1,26 | 67 % | 0,94 m |
| Vert Bois | 480 | 0,86 / 1,27 | 69 % | 0,83 m |
| La Côte Sauvage | 480 | 0,97 / 1,24 | 60 % | 0,84 m |
| La Sauzaie | 480 | 0,87 / 1,23 | 66 % | 0,71 m |
| Les Dunes | 480 | 0,94 / 1,25 | 68 % | 0,77 m |
| Les Conches | 480 | 0,85 / 1,28 | 63 % | 0,63 m |
| La Terrière | 480 | 0,80 / 1,24 | 62 % | 0,68 m |
| Sion-sur-l’Océan | 480 | 0,73 / 1,24 | 68 % | 0,37 m |
| Grande Plage | 480 | 0,63 / 1,26 | 69 % | 0,32 m |
| La Govelle | 480 | 1,03 / 1,26 | 67 % | 0,53 m |
| Penthièvre | 480 | 0,90 / 1,30 | 64 % | 0,53 m |
| Port Blanc | 480 | 0,80 / 1,29 | 68 % | 0,52 m |
| La Torche | 480 | 0,92 / 1,29 | 57 % | 1,01 m |
| Pors Carn | 480 | 0,79 / 1,29 | 46 % | 0,96 m |
