var mapAPI;
var search = document.querySelector('select.equip')
var proprio = document.querySelector('select.proprio')

// Type d'equipements
var type= ("Salle de musculation/cardiotraining|Terrain de football|Boucle de randonnée|Pas de tir à la cible|Multisports/City-stades|Salles polyvalentes / des fêtes / non spécialisées|Salle de tennis de table|Court de tennis|Port de plaisance|Salle multisports (gymnase)|Bassin mixte de natation|Salle de danse|Structure Artificielle d'Escalade|Terrain de volley-ball|Piste d'athlétisme isolée|Dojo / Salle d'arts martiaux|Site d'activités aquatiques et nautiques|Terrain mixte|Terrain de basket-ball 3x3|Salle de cours collectifs|Stade d’athlétisme|Terrain de pétanque|Parcours sportif/santé|Baignade aménagée|Skatepark|Practice|Terrain de futsal extérieur|Aire de saut|Site de plongée|Bassin ludique de natation|Piste d’aérodrome / d'aéroport|Aire de fitness/street workout|Manège|Carrière|Piste d'athlétisme 2 à 4 couloirs|Parcours 9 trous|Salle de gymnastique sportive|Salle de volley-ball|Aire de lancer|Terrain de basket-ball|Piste ULM|Point d'embarquement et de débarquement isolé|Site d'escalade en falaise|Via ferrata / Via corda").split('|')
type.forEach(t => {
  var c = document.createElement('OPTION')
  c.innerText = t;
  search.appendChild(c)
})
// Type de proprietaires
var typeProprio= ("Etat|Commune|Etablissement privé commercial|Etablissement Public|Département|Association(s)|undefined").split('|')
typeProprio.forEach(t => {
  var c = document.createElement('OPTION', { value: t })
  c.value = t;
  c.innerText = t!=='undefined' ? t : 'inconnu';
  proprio.appendChild(c)
})

function setFilter() {
  mapAPI.filterFeatures([
    { layerId:3, attr: 'Type', op: 'contain', val: search.value, matchAll: true },
    { layerId:3, attr: 'Type de propriétaire', op: 'contain', val: proprio.value, matchAll: true }
  ]);
}

MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // Afficher les layers dans la console
  api.getLayers(console.log)
  // Filtrer
  search.addEventListener('change', setFilter)
  proprio.addEventListener('change', setFilter)
})
