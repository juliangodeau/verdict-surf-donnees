# Rapport de calage

Archive : 57 jours (2026-09-20 → 2026-11-15). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 1 | -4 % | -3 % | aucune (trop peu de mesures) | 4 % → 4 % |
| Cap Ferret | 420 | +13 % | +17 % | ×0,88 | 14 % → 11 % |
| Anglet | 292 | +3 % | +7 % | aucune (sans effet) | 13 % → 13 % |
| Île d’Yeu Nord | 384 | +18 % | +42 % | ×0,85 | 15 % → 9 % |
| Les Pierres Noires | 409 | +14 % | +18 % | ×0,88 | 17 % → 12 % |
| Belle-Île | 421 | +14 % | +18 % | ×0,88 | 15 % → 10 % |
| SEM-REV (Le Croisic) | 309 | +24 % | +47 % | ×0,80 | 24 % → 11 % |
| Saint-Jean-de-Luz | 398 | -2 % | +0 % | aucune (sans effet) | 13 % → 13 % |
| Noirmoutier | 394 | +36 % | +30 % | ×0,74 | 32 % → 10 % |

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
| Lacanau Centrale | Cap Ferret | ×0,89 |
| Carcans-Plage | Cap Ferret | ×0,89 |
| Montalivet | Cap Ferret | ×0,89 |
| Vert Bois | Cap Ferret | ×0,89 |
| La Côte Sauvage | Cap Ferret | ×0,89 |
| La Sauzaie | Île d’Yeu Nord | ×0,85 |
| Les Dunes | Île d’Yeu Nord | ×0,85 |
| Les Conches | Île d’Yeu Nord | ×0,85 |
| La Terrière | Île d’Yeu Nord | ×0,85 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,85 |
| Grande Plage | Île d’Yeu Nord | ×0,85 |
| La Govelle | SEM-REV (Le Croisic) | ×0,80 |
| Penthièvre | Belle-Île | ×0,88 |
| Port Blanc | Belle-Île | ×0,88 |
| La Torche | Les Pierres Noires | ×0,88 |
| Pors Carn | Les Pierres Noires | ×0,88 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 456 | 0,76 / 1,14 | 72 % | 0,25 m |
| La Gravière | 456 | 0,94 / 1,21 | 72 % | 0,45 m |
| La Piste | 456 | 0,73 / 1,20 | 78 % | 0,29 m |
| Les Bourdaines | 456 | 1,12 / 1,32 | 71 % | 0,45 m |
| Le Penon | 456 | 1,10 / 1,32 | 70 % | 0,46 m |
| Vieux-Boucau | 456 | 1,03 / 1,30 | 59 % | 0,55 m |
| Moliets | 456 | 1,07 / 1,28 | 67 % | 0,52 m |
| Les Cavaliers | 456 | 1,02 / 1,27 | 74 % | 0,46 m |
| Côte des Basques | 456 | 1,20 / 1,25 | 67 % | 0,49 m |
| Hendaye | 456 | 0,26 / 1,30 | 70 % | 0,21 m |
| Lacanau Centrale | 456 | 0,98 / 1,26 | 72 % | 0,41 m |
| Carcans-Plage | 456 | 0,98 / 1,26 | 77 % | 0,43 m |
| Montalivet | 456 | 1,05 / 1,25 | 73 % | 0,70 m |
| Vert Bois | 456 | 0,87 / 1,27 | 77 % | 0,52 m |
| La Côte Sauvage | 456 | 0,98 / 1,23 | 68 % | 0,66 m |
| La Sauzaie | 456 | 0,88 / 1,24 | 76 % | 0,39 m |
| Les Dunes | 456 | 0,95 / 1,25 | 76 % | 0,44 m |
| Les Conches | 456 | 0,87 / 1,28 | 73 % | 0,35 m |
| La Terrière | 456 | 0,84 / 1,24 | 71 % | 0,39 m |
| Sion-sur-l’Océan | 456 | 0,73 / 1,25 | 74 % | 0,24 m |
| Grande Plage | 456 | 0,63 / 1,27 | 75 % | 0,24 m |
| La Govelle | 456 | 1,06 / 1,27 | 77 % | 0,30 m |
| Penthièvre | 456 | 0,93 / 1,31 | 67 % | 0,27 m |
| Port Blanc | 456 | 0,81 / 1,30 | 75 % | 0,28 m |
| La Torche | 456 | 0,95 / 1,30 | 63 % | 0,61 m |
| Pors Carn | 456 | 0,81 / 1,29 | 51 % | 0,63 m |
