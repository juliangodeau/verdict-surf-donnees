# Rapport de calage

Archive : 36 jours (2026-09-20 → 2026-10-25). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 0 | — | -3 % | aucune (trop peu de mesures) | — → — |
| Cap Ferret | 261 | +11 % | +15 % | aucune (sans effet) | 10 % → 9 % |
| Anglet | 150 | +2 % | +7 % | aucune (sans effet) | 8 % → 8 % |
| Île d’Yeu Nord | 247 | +21 % | +42 % | ×0,83 | 17 % → 9 % |
| Les Pierres Noires | 253 | +12 % | +14 % | ×0,90 | 14 % → 10 % |
| Belle-Île | 261 | +12 % | +17 % | ×0,89 | 11 % → 9 % |
| SEM-REV (Le Croisic) | 206 | +25 % | +51 % | ×0,80 | 20 % → 10 % |
| Saint-Jean-de-Luz | 261 | -4 % | -1 % | aucune (sans effet) | 9 % → 8 % |
| Noirmoutier | 261 | +39 % | +31 % | ×0,72 | 33 % → 10 % |

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
| Hossegor Sud | 288 | 0,76 / 1,15 | 67 % | 0,24 m |
| La Gravière | 288 | 0,93 / 1,22 | 74 % | 0,55 m |
| La Piste | 288 | 0,71 / 1,20 | 78 % | 0,34 m |
| Les Bourdaines | 288 | 1,09 / 1,32 | 66 % | 0,57 m |
| Le Penon | 288 | 1,08 / 1,32 | 66 % | 0,57 m |
| Vieux-Boucau | 288 | 0,99 / 1,30 | 60 % | 0,67 m |
| Moliets | 288 | 1,04 / 1,28 | 69 % | 0,64 m |
| Les Cavaliers | 288 | 1,00 / 1,27 | 69 % | 0,60 m |
| Côte des Basques | 288 | 1,17 / 1,26 | 61 % | 0,64 m |
| Hendaye | 288 | 0,23 / 1,30 | 67 % | 0,23 m |
| Lacanau Centrale | 288 | 0,96 / 1,27 | 73 % | 0,49 m |
| Carcans-Plage | 288 | 0,97 / 1,27 | 76 % | 0,52 m |
| Montalivet | 288 | 1,02 / 1,27 | 70 % | 0,85 m |
| Vert Bois | 288 | 0,85 / 1,29 | 75 % | 0,64 m |
| La Côte Sauvage | 288 | 0,96 / 1,24 | 68 % | 0,80 m |
| La Sauzaie | 288 | 0,85 / 1,27 | 74 % | 0,46 m |
| Les Dunes | 288 | 0,92 / 1,28 | 73 % | 0,53 m |
| Les Conches | 288 | 0,85 / 1,30 | 72 % | 0,40 m |
| La Terrière | 288 | 0,85 / 1,26 | 68 % | 0,46 m |
| Sion-sur-l’Océan | 288 | 0,68 / 1,28 | 74 % | 0,26 m |
| Grande Plage | 288 | 0,58 / 1,29 | 77 % | 0,25 m |
| La Govelle | 288 | 1,04 / 1,32 | 73 % | 0,34 m |
| Penthièvre | 288 | 0,87 / 1,33 | 65 % | 0,29 m |
| Port Blanc | 288 | 0,78 / 1,32 | 69 % | 0,32 m |
| La Torche | 288 | 0,94 / 1,31 | 57 % | 0,71 m |
| Pors Carn | 288 | 0,83 / 1,30 | 67 % | 0,68 m |
