# Rapport de calage

Archive : 15 jours (2026-09-20 → 2026-10-04). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | -1 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 0 | — | -4 % | aucune (trop peu de mesures) | — → — |
| Cap Ferret | 120 | +12 % | +18 % | ×0,90 | 21 % → 16 % |
| Anglet | 84 | +3 % | +7 % | aucune (trop peu de mesures) | 12 % → 14 % |
| Île d’Yeu Nord | 110 | +27 % | +45 % | ×0,79 | 27 % → 10 % |
| Les Pierres Noires | 119 | +9 % | +10 % | aucune (sans effet) | 16 % → 17 % |
| Belle-Île | 120 | +14 % | +18 % | ×0,88 | 21 % → 11 % |
| SEM-REV (Le Croisic) | 101 | +27 % | +57 % | ×0,79 | 33 % → 9 % |
| Saint-Jean-de-Luz | 120 | -3 % | -2 % | aucune (sans effet) | 16 % → 16 % |
| Noirmoutier | 120 | +47 % | +37 % | ×0,70 | 57 % → 18 % |

| Plage | Bouée de référence | Correction |
|---|---|---|
| Hossegor Sud | Saint-Jean-de-Luz | ×1,00 |
| La Gravière | Saint-Jean-de-Luz | ×1,00 |
| La Piste | Saint-Jean-de-Luz | ×1,00 |
| Les Bourdaines | Saint-Jean-de-Luz | ×1,00 |
| Le Penon | Saint-Jean-de-Luz | ×1,00 |
| Vieux-Boucau | Saint-Jean-de-Luz | ×1,00 |
| Moliets | Saint-Jean-de-Luz | ×1,00 |
| Les Cavaliers | Saint-Jean-de-Luz | ×1,00 |
| Côte des Basques | Saint-Jean-de-Luz | ×1,00 |
| Hendaye | Saint-Jean-de-Luz | ×1,00 |
| Lacanau Centrale | Cap Ferret | ×0,90 |
| Carcans-Plage | Cap Ferret | ×0,90 |
| Montalivet | Cap Ferret | ×0,90 |
| Vert Bois | Cap Ferret | ×0,90 |
| La Côte Sauvage | Cap Ferret | ×0,90 |
| La Sauzaie | Île d’Yeu Nord | ×0,79 |
| Les Dunes | Île d’Yeu Nord | ×0,79 |
| Les Conches | Île d’Yeu Nord | ×0,79 |
| La Terrière | Île d’Yeu Nord | ×0,79 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,79 |
| Grande Plage | Île d’Yeu Nord | ×0,79 |
| La Govelle | SEM-REV (Le Croisic) | ×0,79 |
| Penthièvre | Belle-Île | ×0,88 |
| Port Blanc | Belle-Île | ×0,88 |
| La Torche | Les Pierres Noires | ×1,00 |
| Pors Carn | Les Pierres Noires | ×1,00 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 120 | 0,75 / 1,13 | 77 % | 0,17 m |
| La Gravière | 120 | 0,95 / 1,20 | 85 % | 0,13 m |
| La Piste | 120 | 0,71 / 1,18 | 80 % | 0,15 m |
| Les Bourdaines | 120 | 1,12 / 1,31 | 83 % | 0,17 m |
| Le Penon | 120 | 1,10 / 1,30 | 85 % | 0,17 m |
| Vieux-Boucau | 120 | 1,02 / 1,29 | 73 % | 0,17 m |
| Moliets | 120 | 1,06 / 1,26 | 78 % | 0,16 m |
| Les Cavaliers | 120 | 1,03 / 1,25 | 83 % | 0,15 m |
| Côte des Basques | 120 | 1,21 / 1,23 | 83 % | 0,15 m |
| Hendaye | 120 | 0,24 / 1,28 | 88 % | 0,10 m |
| Lacanau Centrale | 120 | 0,96 / 1,27 | 75 % | 0,22 m |
| Carcans-Plage | 120 | 0,97 / 1,26 | 77 % | 0,21 m |
| Montalivet | 120 | 1,03 / 1,26 | 75 % | 0,21 m |
| Vert Bois | 120 | 0,87 / 1,28 | 85 % | 0,20 m |
| La Côte Sauvage | 120 | 0,98 / 1,24 | 75 % | 0,22 m |
| La Sauzaie | 120 | 0,85 / 1,28 | 78 % | 0,22 m |
| Les Dunes | 120 | 0,94 / 1,28 | 78 % | 0,20 m |
| Les Conches | 120 | 0,86 / 1,31 | 75 % | 0,19 m |
| La Terrière | 120 | 0,87 / 1,27 | 73 % | 0,18 m |
| Sion-sur-l’Océan | 120 | 0,66 / 1,30 | 81 % | 0,21 m |
| Grande Plage | 120 | 0,58 / 1,29 | 78 % | 0,25 m |
| La Govelle | 120 | 1,02 / 1,34 | 83 % | 0,17 m |
| Penthièvre | 120 | 0,87 / 1,34 | 87 % | 0,15 m |
| Port Blanc | 120 | 0,80 / 1,33 | 83 % | 0,17 m |
| La Torche | 120 | 0,95 / 1,31 | 75 % | 0,26 m |
| Pors Carn | 120 | 0,84 / 1,30 | 72 % | 0,26 m |
