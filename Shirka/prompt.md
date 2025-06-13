# Liste des prompts utilisés pour créer la narration

J'ai utilis une IA pour générer une narration à partir d'une carte en utilisant l'iFramAPI de l'outil Macarte de l'IGN.    
L'idée est double : tester les capacité de l'IA en codage d'une application web avec des composant que je développe et voir ce qu'on peut obtenir en mode non développeur, **en langage naturel**.
Pour cela, j'ai utilisé Cursor.

Le code source de l'API est disponible en Opensource dans le [code Github de l'outil IGN](https://github.com/IGNF-Ma-carte/mcviewer/tree/main/docs/doc), 
il faudra l'indiquer à l'IA pour le contexte ou un lien vers le site de la [documentation en ligne de l'iFramAPI](https://ignf-ma-carte.github.io/mcviewer/doc/)

## prérequis

L'iFrame-API proposé par l'outil Ma carte de l'IGN permet d'intégrer un widget d'une carte produite sur le site [Ma carte](https://macarte.ign.fr/) 
sur votre site Web et de le contrôler à l'aide de JavaScript.    
Cela nécessite d'avoir au préalable créé une carte sur le site, ici, nous utiliseront une carte de 
la [base mémoire photographique de la première guerre mondiale](https://data.culture.gouv.fr/explore/dataset/fonds-de-la-guerre-14-18-extrait-de-la-base-memoire/information/)
dont je parlais [ici](https://www.linkedin.com/posts/jean-marc-viglino-87826b14b_storymap-activity-7337025542929481728-N7aR).    
La carte est disponible ici : https://macarte.ign.fr/carte/hMUCH3/Memoire-14-18.


## Initialisation de la carte

La première étape est de voir si l'IA comprend bien de quoi on cause...

> [!TIP]
> Peux-tu créer une page pour afficher un widget carte avec la carte https://macarte.ign.fr/carte/hMUCH3/Memoire-14-18 via l'iFrameAPI

Sans réel surprise, **ça marche pô !**
Il n'a visiblement pas compris où il fallait chercher...

> [!TIP]
> non, ce n'est pas cela, utilise les paragraphe "premier pas" de la documentation (doc/index.html) pour voir comment faire

```
Je vais consulter la documentation pour voir les "premiers pas" recommandés.
...

J'ai créé une nouvelle page HTML qui suit exactement les recommandations de la documentation
pour l'intégration de la carte IGN. Voici les points clés :

1. Le script de l'API est chargé depuis `https://macarte.ign.fr/carte/MapIFrameAPI.js`
2. L'iframe est configurée avec :
   - L'ID "map"
   - L'URL de votre carte : `https://macarte.ign.fr/carte/hMUCH3/Memoire-14-18`
   - Les permissions nécessaires pour la géolocalisation et le presse-papier
3. L'API est initialisée avec `MapIFrameAPI.ready()`
4. La carte est centrée sur Paris (vous pouvez modifier ces coordonnées si vous le souhaitez)
5. Un écouteur d'événements est ajouté pour détecter les sélections sur la carte

Pour utiliser cette page :
1. Ouvrez le fichier `carte-ign.html` dans votre navigateur
2. La carte devrait s'afficher avec les dimensions spécifiées (100% de largeur, 480px de hauteur)
3. Vous pouvez interagir avec la carte et voir les sélections dans la console du navigateur

Voulez-vous que je modifie certains aspects de cette intégration,
comme la taille de la carte ou le point central ?
```
Là, c'est bon, il a (bêtement) recopié l'exemple donné dans la documentation, signe qu'il sait où chercher. On va pouvoir jouer...   
Je passe sur la partie reprise de la page web et passage de la carte en plein écran pour me concentrer sur l'application elle-même.

## Navigation dans la carte

> [!TIP]
> Ajoute une fonction dans carte-ign pour récupérer les objets 10 objets de la carte les plus proche du centre de la carte en utilisant les fonctionnalits de l'iFrameAPI
```
Pour récupérer les 10 objets (features) les plus proches du centre de la carte avec l'iFrameAPI, il faut :

1. Récupérer le centre de la carte avec `api.getCenter(callback)`.
2. Récupérer toutes les features avec `api.getFeatures(condition, callback)` (ou sans condition pour tout avoir).
3. Calculer la distance de chaque feature par rapport au centre.
4. Trier les features par distance et prendre les 10 plus proches.
```
Ca marche ! il a bien trouvé les fonctionnalités `getCenter` et `getFeatures` de l'api et propose une [formule de haversine](https://fr.wikipedia.org/wiki/Formule_de_haversine) 
pour le calcul de la distance (trop fort) !
Par contre, il n'a pas bien compris la structure de la `condition` pour la recherche des objets (mais il ne peut pas non plus inventer l'identifiant du calque dans lequel 
chercher et il faudra lui indiquer...   
Je lui demande aussi de retravailler la lisibilité du code, sinon, c'est plutôt clean et documenté.

> [!TIP]
> bien, peux-tu placer le code en dehors de la fonction ready en utilisant la variable mapAPI et changer le nom des variable avec des caractère grec φ et Δ par phi et delta    
> modifie la fonction getNearestFeatures pour paramétrer le nombre d'objets qu'on veut récupérer et renvoie le résultat dans un callback

> [!TIP]
> Bien, ajoute maintenant un bouton à la page qui lance une fonction qui utilise getNearestFeatures pour récupérer les 10 feature les plus proche et qui centre
la carte sur avec un delay de quelques secondes sur chacune d'elle à un zoom de 16

```
Les changements principaux sont :
1. Ajout d'un bouton dans l'interface
2. Ajout de la fonction `centerOnFeatures` qui :
   - Prend un tableau de features en paramètre
   - Utilise un délai de 3 secondes entre chaque feature
   - Centre la carte sur chaque feature avec un zoom de 16
   - Utilise l'effet 'flyTo' pour une animation fluide
3. Ajout d'un gestionnaire d'événement sur le bouton qui :
   - Récupère les 10 features les plus proches
   - Lance la fonction de centrage

Quand tu cliqueras sur le bouton, la carte se centrera automatiquement sur chaque feature avec un délai de 3 secondes entre chaque centrage.
```
Parfait, il a bien trouvé les information dans la doc et les paramètres pour centrer la carte et ça ... **marche pô !**   
mais bon, là c'est pas de sa faute, c'est la doc qui est fausse... je [corrige la doc](https://github.com/IGNF-Ma-carte/mcviewer/commit/7a01cba5f80f63142f0e00fc16d25b4d43166cd7)
et on continue.

> [!TIP]
> lors du déplacement, ne fait un envol (flyTo) que pour le premier objet, utilise moveTo pour les suivants)

> [!TIP]
> Maintenant affiche les informations de l'objet par dessus la carte, en particulier une image (property VIDEO-p) et une légende (property LEG)
 Plus compliqué là, il va falloir voir comment il s'en sort...

```
Les changements principaux sont :
1. Ajout de la création du contenu de la popup avec :
   - L'image si la propriété 'VIDEO-p' existe
   - La légende si la propriété LEG existe
2. Utilisation de la méthode `mapAPI.popup()` pour afficher la popup à la position de la feature
3. Style CSS inline pour limiter la taille de l'image et ajouter une marge

Maintenant, à chaque déplacement vers une feature, une popup apparaîtra au-dessus de la carte avec l'image et la légende de l'objet. La popup disparaîtra automatiquement lors du déplacement vers l'objet suivant.
```
Pas mal ! mais il n'a pas compris que le contenu du popup doit être en Markdown (et pas en HTML pour éviter les injections).

> [!TIP]
> pour s'afficher correctement, le popupContent doit être en Markdown et pas en HTML
```
Je vais modifier le code pour formater le contenu de la popup en Markdown plutôt qu'en HTML.
```

Je vous passe la partie où je lui demande d'ajouter un titre, un compyright et autre information fournie par les objets.

Je lui demande aussi de désactiver la carte pendans le parcours pour éviter que l'utilisateur ne bouge la carte. 
Il essaye une fonction de l'iFrameAPI qui n'existe pas pour se rabattre sur l'ajout d'une `div transparente qui se superpose à l'iframe`.

## Encore plus fort

> [!TIP]
> Plus compliqué maintenant, peux-tu ajouter un dialogue au démarrage qui demande de choisir une commune française pour raconter une histoire sur cette commune,
> récupère les coordonnées de cette commune via une API, centre la carte sur ces coordonnées et lance le parcours à partir de cette position

```
Ces modifications vont :
1. Ajouter un dialogue de recherche de commune
2. Utiliser l'API gouvernementale des communes françaises pour obtenir les coordonnées
3. Centrer la carte sur la commune sélectionnée
4. Lancer le parcours des features les plus proches de cette commune

Le processus sera maintenant :
1. L'utilisateur clique sur "Raconte-moi une histoire"
2. Un dialogue s'ouvre pour saisir le nom d'une commune
3. Après la recherche, la carte se centre sur la commune
4. Le parcours des features les plus proches commence automatiquement
```
Bon, rien à redire...     
Je lui demande juste d'utiliser un dialog HTML (m'enfin!) d'ajouter une patience et d'afficher les erreurs dans le dialogue.

Le résultat est visible ici : https://ignf-ma-carte.github.io/apps/Shirka/   
et le code est là : https://github.com/IGNF-Ma-carte/apps/blob/main/Shirka/index.html

## Conclusion

Au final, le résultat est plutôt bon :
1. il a bien retrouvé l'information dans la doc de l'API (qu'il n'avait aucune raison de connaître) il a même levé une erreur de la doc (oops)
2. il utilise les fonctionnalités disponibles (même s'il essaye de pipoter quand la fonctionnalité n'existe pas)
3. le code est plutôt propre et documenté (même s'il faudrait lui demander de sortir js et css de la page web et de faire un peu de refactoring)
4. on doit pouvoir aller un peu plus loin pour reformater le résultat et l'afficher différemment, formater le bouton, etc. mais ça sort du test

