# Rapport de calage

Archive : 50 jours (2026-09-20 → 2026-11-08). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 1 | -4 % | -3 % | aucune (trop peu de mesures) | 4 % → 4 % |
| Cap Ferret | 365 | +12 % | +17 % | aucune (sans effet) | 12 % → 11 % |
| Anglet | 248 | +3 % | +8 % | aucune (sans effet) | 11 % → 12 % |
| Île d’Yeu Nord | 328 | +19 % | +43 % | ×0,84 | 16 % → 8 % |
| Les Pierres Noires | 356 | +14 % | +18 % | ×0,88 | 16 % → 11 % |
| Belle-Île | 365 | +13 % | +18 % | ×0,89 | 14 % → 9 % |
| SEM-REV (Le Croisic) | 259 | +24 % | +50 % | ×0,81 | 22 % → 10 % |
| Saint-Jean-de-Luz | 358 | -2 % | +0 % | aucune (sans effet) | 12 % → 13 % |
| Noirmoutier | 364 | +36 % | +30 % | ×0,73 | 31 % → 10 % |

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
| Lacanau Centrale | Cap Ferret | ×1,00 |
| Carcans-Plage | Cap Ferret | ×1,00 |
| Montalivet | Cap Ferret | ×1,00 |
| Vert Bois | Cap Ferret | ×1,00 |
| La Côte Sauvage | Cap Ferret | ×1,00 |
| La Sauzaie | Île d’Yeu Nord | ×0,84 |
| Les Dunes | Île d’Yeu Nord | ×0,84 |
| Les Conches | Île d’Yeu Nord | ×0,84 |
| La Terrière | Île d’Yeu Nord | ×0,84 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,84 |
| Grande Plage | Île d’Yeu Nord | ×0,84 |
| La Govelle | SEM-REV (Le Croisic) | ×0,81 |
| Penthièvre | Belle-Île | ×0,89 |
| Port Blanc | Belle-Île | ×0,89 |
| La Torche | Les Pierres Noires | ×0,88 |
| Pors Carn | Les Pierres Noires | ×0,88 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 400 | 0,75 / 1,14 | 66 % | 0,25 m |
| La Gravière | 400 | 0,93 / 1,22 | 70 % | 0,47 m |
| La Piste | 400 | 0,72 / 1,20 | 79 % | 0,30 m |
| Les Bourdaines | 400 | 1,11 / 1,32 | 71 % | 0,47 m |
| Le Penon | 400 | 1,09 / 1,33 | 71 % | 0,47 m |
| Vieux-Boucau | 400 | 1,01 / 1,30 | 61 % | 0,57 m |
| Moliets | 400 | 1,05 / 1,28 | 69 % | 0,53 m |
| Les Cavaliers | 400 | 1,01 / 1,27 | 73 % | 0,48 m |
| Côte des Basques | 400 | 1,18 / 1,25 | 67 % | 0,50 m |
| Hendaye | 400 | 0,24 / 1,30 | 70 % | 0,21 m |
| Lacanau Centrale | 400 | 0,97 / 1,27 | 71 % | 0,43 m |
| Carcans-Plage | 400 | 0,97 / 1,26 | 76 % | 0,45 m |
| Montalivet | 400 | 1,04 / 1,26 | 70 % | 0,73 m |
| Vert Bois | 400 | 0,86 / 1,28 | 80 % | 0,54 m |
| La Côte Sauvage | 400 | 0,97 / 1,24 | 69 % | 0,69 m |
| La Sauzaie | 400 | 0,87 / 1,25 | 77 % | 0,39 m |
| Les Dunes | 400 | 0,94 / 1,27 | 76 % | 0,45 m |
| Les Conches | 400 | 0,87 / 1,29 | 73 % | 0,35 m |
| La Terrière | 400 | 0,86 / 1,25 | 73 % | 0,41 m |
| Sion-sur-l’Océan | 400 | 0,71 / 1,26 | 79 % | 0,23 m |
| Grande Plage | 400 | 0,60 / 1,28 | 81 % | 0,22 m |
| La Govelle | 400 | 1,05 / 1,29 | 75 % | 0,31 m |
| Penthièvre | 400 | 0,90 / 1,31 | 70 % | 0,26 m |
| Port Blanc | 400 | 0,79 / 1,31 | 76 % | 0,28 m |
| La Torche | 400 | 0,96 / 1,31 | 64 % | 0,61 m |
| Pors Carn | 400 | 0,83 / 1,29 | 67 % | 0,60 m |
