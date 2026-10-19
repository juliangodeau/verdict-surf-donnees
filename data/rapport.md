# Rapport de calage

Archive : 29 jours (2026-09-20 → 2026-10-18). Mis à jour chaque semaine.

## Houle face aux bouées

Écart médian de la hauteur significative avec la mesure (+10 % : le modèle annonce 10 % de trop), et correction appliquée au modèle côtier (bornée entre ×0,7 et ×1,3, à partir de 100 mesures). Contrôle : erreur médiane sur la seconde moitié de l’archive, avant → après une correction calée sur la première.

| Bouée | Mesures | Modèle côtier Shom | Open-Meteo (MFWAM) | Correction | Erreur avant → après |
|---|---|---|---|---|---|
| Gascogne (large) | 0 | — | -1 % | aucune (trop peu de mesures) | — → — |
| Bilbao-Vizcaya | 0 | — | -2 % | aucune (trop peu de mesures) | — → — |
| Cap Ferret | 232 | +11 % | +15 % | ×0,90 | 10 % → 8 % |
| Anglet | 121 | +2 % | +7 % | aucune (sans effet) | 8 % → 8 % |
| Île d’Yeu Nord | 218 | +21 % | +42 % | ×0,82 | 18 % → 9 % |
| Les Pierres Noires | 226 | +11 % | +13 % | ×0,90 | 13 % → 9 % |
| Belle-Île | 232 | +12 % | +15 % | ×0,89 | 12 % → 10 % |
| SEM-REV (Le Croisic) | 189 | +24 % | +51 % | ×0,81 | 20 % → 9 % |
| Saint-Jean-de-Luz | 232 | -4 % | +0 % | aucune (sans effet) | 8 % → 8 % |
| Noirmoutier | 232 | +40 % | +33 % | ×0,71 | 39 % → 10 % |

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
| Lacanau Centrale | Cap Ferret | ×0,91 |
| Carcans-Plage | Cap Ferret | ×0,91 |
| Montalivet | Cap Ferret | ×0,91 |
| Vert Bois | Cap Ferret | ×0,91 |
| La Côte Sauvage | Cap Ferret | ×0,91 |
| La Sauzaie | Île d’Yeu Nord | ×0,82 |
| Les Dunes | Île d’Yeu Nord | ×0,82 |
| Les Conches | Île d’Yeu Nord | ×0,82 |
| La Terrière | Île d’Yeu Nord | ×0,82 |
| Sion-sur-l’Océan | Île d’Yeu Nord | ×0,82 |
| Grande Plage | Île d’Yeu Nord | ×0,82 |
| La Govelle | SEM-REV (Le Croisic) | ×0,81 |
| Penthièvre | Belle-Île | ×0,89 |
| Port Blanc | Belle-Île | ×0,89 |
| La Torche | Les Pierres Noires | ×0,90 |
| Pors Carn | Les Pierres Noires | ×0,90 |

## Calage d’Open-Meteo, plage par plage

Coefficients hauteur / période. Contrôle sur la seconde moitié de l’archive, jamais utilisée pour caler : part des heures où la taille au bord est à ±0,2 m du modèle côtier, et écart type.

| Plage | Pas de 3 h | Coefficients | À ±0,2 m | Écart type |
|---|---|---|---|---|
| Hossegor Sud | 232 | 0,76 / 1,14 | 71 % | 0,20 m |
| La Gravière | 232 | 0,94 / 1,22 | 84 % | 0,17 m |
| La Piste | 232 | 0,72 / 1,20 | 86 % | 0,19 m |
| Les Bourdaines | 232 | 1,09 / 1,32 | 75 % | 0,24 m |
| Le Penon | 232 | 1,08 / 1,31 | 78 % | 0,24 m |
| Vieux-Boucau | 232 | 0,99 / 1,29 | 77 % | 0,26 m |
| Moliets | 232 | 1,04 / 1,27 | 83 % | 0,26 m |
| Les Cavaliers | 232 | 1,01 / 1,26 | 80 % | 0,28 m |
| Côte des Basques | 232 | 1,17 / 1,25 | 72 % | 0,33 m |
| Hendaye | 232 | 0,24 / 1,30 | 96 % | 0,10 m |
| Lacanau Centrale | 232 | 0,96 / 1,27 | 80 % | 0,19 m |
| Carcans-Plage | 232 | 0,97 / 1,27 | 88 % | 0,17 m |
| Montalivet | 232 | 1,04 / 1,26 | 86 % | 0,16 m |
| Vert Bois | 232 | 0,86 / 1,29 | 94 % | 0,13 m |
| La Côte Sauvage | 232 | 0,98 / 1,24 | 88 % | 0,15 m |
| La Sauzaie | 232 | 0,85 / 1,28 | 94 % | 0,12 m |
| Les Dunes | 232 | 0,92 / 1,29 | 94 % | 0,12 m |
| Les Conches | 232 | 0,86 / 1,31 | 92 % | 0,12 m |
| La Terrière | 232 | 0,87 / 1,27 | 94 % | 0,12 m |
| Sion-sur-l’Océan | 232 | 0,68 / 1,29 | 92 % | 0,10 m |
| Grande Plage | 232 | 0,58 / 1,30 | 91 % | 0,12 m |
| La Govelle | 232 | 1,04 / 1,33 | 95 % | 0,11 m |
| Penthièvre | 232 | 0,87 / 1,34 | 91 % | 0,14 m |
| Port Blanc | 232 | 0,79 / 1,33 | 91 % | 0,14 m |
| La Torche | 232 | 0,95 / 1,32 | 73 % | 0,22 m |
| Pors Carn | 232 | 0,83 / 1,31 | 88 % | 0,15 m |
