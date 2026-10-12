# Rapport de calage

Archive : 22 jours (2026-09-20 → 2026-10-11). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | -2 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 0 | — | +0 % | aucune (trop peu de mesures) | — → — |
| Cap Ferret | 176 | +14 % | +16 % | ×0,88 | 15 % → 8 % |
| Anglet | 84 | +3 % | +7 % | aucune (trop peu de mesures) | 12 % → 14 % |
| Île d’Yeu Nord | 166 | +22 % | +41 % | ×0,82 | 18 % → 10 % |
| Les Pierres Noires | 170 | +11 % | +13 % | ×0,90 | 13 % → 10 % |
| Belle-Île | 176 | +12 % | +18 % | ×0,89 | 12 % → 9 % |
| SEM-REV (Le Croisic) | 147 | +25 % | +52 % | ×0,80 | 24 % → 7 % |
| Saint-Jean-de-Luz | 176 | -4 % | -1 % | aucune (sans effet) | 9 % → 10 % |
| Noirmoutier | 176 | +45 % | +37 % | ×0,70 | 45 % → 11 % |

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
| Lacanau Centrale | Cap Ferret | ×0,88 |
| Carcans-Plage | Cap Ferret | ×0,88 |
| Montalivet | Cap Ferret | ×0,88 |
| Vert Bois | Cap Ferret | ×0,88 |
| La Côte Sauvage | Cap Ferret | ×0,88 |
| La Sauzaie | Île d’Yeu Nord | ×0,82 |
| Les Dunes | Île d’Yeu Nord | ×0,82 |
| Les Conches | Île d’Yeu Nord | ×0,82 |
| La Terrière | Île d’Yeu Nord | ×0,82 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,82 |
| Grande Plage | Île d’Yeu Nord | ×0,82 |
| La Govelle | SEM-REV (Le Croisic) | ×0,80 |
| Penthièvre | Belle-Île | ×0,89 |
| Port Blanc | Belle-Île | ×0,89 |
| La Torche | Les Pierres Noires | ×0,90 |
| Pors Carn | Les Pierres Noires | ×0,90 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 176 | 0,77 / 1,14 | 81 % | 0,20 m |
| La Gravière | 176 | 0,95 / 1,22 | 84 % | 0,16 m |
| La Piste | 176 | 0,72 / 1,19 | 88 % | 0,20 m |
| Les Bourdaines | 176 | 1,09 / 1,32 | 78 % | 0,24 m |
| Le Penon | 176 | 1,08 / 1,31 | 80 % | 0,25 m |
| Vieux-Boucau | 176 | 0,98 / 1,29 | 72 % | 0,28 m |
| Moliets | 176 | 1,04 / 1,28 | 83 % | 0,27 m |
| Les Cavaliers | 176 | 1,01 / 1,27 | 84 % | 0,30 m |
| Côte des Basques | 176 | 1,15 / 1,25 | 77 % | 0,37 m |
| Hendaye | 176 | 0,24 / 1,29 | 87 % | 0,12 m |
| Lacanau Centrale | 176 | 0,95 / 1,27 | 85 % | 0,19 m |
| Carcans-Plage | 176 | 0,96 / 1,26 | 89 % | 0,18 m |
| Montalivet | 176 | 1,03 / 1,26 | 85 % | 0,17 m |
| Vert Bois | 176 | 0,86 / 1,29 | 88 % | 0,15 m |
| La Côte Sauvage | 176 | 0,98 / 1,24 | 88 % | 0,15 m |
| La Sauzaie | 176 | 0,85 / 1,29 | 93 % | 0,12 m |
| Les Dunes | 176 | 0,92 / 1,29 | 92 % | 0,13 m |
| Les Conches | 176 | 0,86 / 1,31 | 84 % | 0,15 m |
| La Terrière | 176 | 0,90 / 1,27 | 82 % | 0,16 m |
| Sion-sur-l’Océan | 176 | 0,68 / 1,30 | 95 % | 0,10 m |
| Grande Plage | 176 | 0,58 / 1,29 | 90 % | 0,12 m |
| La Govelle | 176 | 1,07 / 1,35 | 87 % | 0,14 m |
| Penthièvre | 176 | 0,86 / 1,34 | 92 % | 0,12 m |
| Port Blanc | 176 | 0,77 / 1,33 | 93 % | 0,13 m |
| La Torche | 176 | 0,95 / 1,32 | 84 % | 0,19 m |
| Pors Carn | 176 | 0,83 / 1,30 | 85 % | 0,14 m |
