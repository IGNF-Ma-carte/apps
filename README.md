## ZICAD

Suite au retour d’expérience de la campagne précédente, l’IGN renouvelle l’emploi de l’outil « Ma carte » pour permettre aux ministères gestionnaires d’effectuer l’ensemble de leurs travaux de mise à jour.

Les fonctionnalités actualisées de l’outil « Ma carte » permettent de répondre au mieux au besoin :
- Proposer un outil de saisie intuitif aux ministères pour saisir le contour d’une nouvelle ZICAD (ou le contour modifié d’une ZICAD existante, ce cas d’usage étant bien plus rare).
- Permettre un fond de saisie proposant l’ortho, le parcellaire et des infos de type plan IGN si nécessaire.
- Permettre de saisir, corriger une géométrie et de l'exporter en kml.
- Permettre d’ajouter un ou deux attributs tels le nom proposé pour la ZICAD
- Permettre de recevoir en retour de l'IGN, une contre-proposition et d'afficher la géométrie proposée initialement et la contreproposition.
- Ne pas stocker les fichiers kml sur le cloud, mais uniquement sur le poste des utilisateurs ministères qui ont à faire des propositions ou sur le poste du référent ministère qui doit les valider avant transmission à l’IGN.
 
Ce mode de saisie est sécurisé car le dessin réalisé ne sera pas stocké sur le Géoportail, dans le Cloud.    
Il sera uniquement enregistré sur le poste de l’utilisateur lorsqu’il aura terminé sa saisie.

[Voir en ligne](https://ignf-ma-carte.github.io/apps/ZICAD/)

## Mayotte

Exemple d'utilisation de l'iFrameAPI pour filtrer des objets sur la carte.

L'exemple utilise deux select pour choisir le type d'équipement et le propriétaire des établissements sportif et fait appel à [mapAPI.filterFeatures](https://ignf-ma-carte.github.io/mcviewer/doc/api.html#filterFeatures__anchor) pour activer un filtre sur l'affichage des objets dans la couche des équipements sportifs.

[Voir en ligne](https://ignf-ma-carte.github.io/apps/Mayotte/)


## Shirka, raconte moi une histoire

Test d'utilisation d'une IA pour faire intégrer un widget carte avec l'iFrame-API.

L'exemple utilise un IA en "langage naturel" pour intégrer un widget cartographique et raconter une histoire sur une carte.

[La liste des prompts utilisés](https://ignf-ma-carte.github.io/apps/Shirka/prompt.html)     
[Le résultat](https://ignf-ma-carte.github.io/apps/Shirka/)

----

## Autres exemples : 
* [pour filtrer un WFS](https://codepen.io/viglino/pen/dPyNodp)
