var mapAPI;

MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // Calculer les stats
  start()
})

/* Demarrage des stats (une fois chargées) */
var stat = {}
function start() {
  mapAPI.getFeatures({ layerId: 3 }, features => {
    if (!features.length) {
      setTimeout(start, 500)
    } else {
      stat.total = features.length;
      showstat(features)
    }
  })
}

/* Calcul / affichage des stats
 */
function showstat(features) {
  stat.filtered = features.length;
  stat.dispo = 0;
  stat.capacity = 0;
  features.forEach(f => {
    var p = f.properties
    stat.dispo += _filter.ebike ? p.ebike : (_filter.mechanical ? p.mechanical : p.numbikesavailable)
    stat.capacity += p.capacity
  })
  stat.tx = stat.capacity ? (stat.dispo / stat.capacity * 100).toFixed(1) : '-'
  Object.keys(stat).forEach(k => {
    var elt = document.querySelector('[data-attr="'+k+'"] span')
    if (elt) elt.innerText = stat[k]
  })
}

/* Filter features */
var _filter = {}
function filter(what, value) {
  // Update filter
  if (what) {
    if (!value) {
      delete _filter[what]
    } else {
      _filter[what] = {
        layerId: 3,
        attr: what,
        op: '=',
        val: value,
      }
    }
  }
  Object.keys(_filter).forEach(k => _filter[k]. matchAll = true)
  // Filter feature
  var filt = Object.values(_filter)
  if (!filt.length) filt = { layerId: 3 }
  mapAPI.getFeatures(filt, features => {
    mapAPI.addLayerFeatures({ 
      id: 5, 
      features: features, 
      clear: true
    })
    showstat(features)
  })
  // Show layer
  mapAPI.setLayer({ id: 3, visible: false })
  mapAPI.setLayer({ id: 5, visible: true })
  // Center
  if (what) {
    //  Center on commune
    setTimeout(() => mapAPI.setCenter({ layerId: 5, offsetZoom: -0.5 }, () => {
      // prevent zoom
      mapAPI.getZoom(zoom => { 
        if (zoom > 19) mapAPI.setZoom(19) 
      })
    }), 100)
    mapAPI.filterFeatures({
      layerId: 9,
      attr: 'nom_officiel',
      op: '=',
      val: value
    }, () => mapAPI.setLayer({ id: 9, visible: true }))
  }
  /*
  mapAPI.setLayer({
    id: 3,
    url: 
      'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/exports/geojson?lang=fr&refine=nom_arrondissement_communes%3A%22'
      + e.target.value
      +'%22&facet=facet(name%3D%22nom_arrondissement_communes%22%2C%20disjunctive%3Dtrue)&timezone=Europe%2FBerlin'
  }, console.log)
  */
}

/* Filter / commune */
var com = [
  "Rosny-sous-Bois", "Noisy-le-Sec", "Bobigny", "Montreuil", "Romainville", "Pantin", "Bagnolet", "Les Lilas", "Fontenay-sous-Bois", "Vincennes", "Nogent-sur-Marne", "Saint-Mandé", "Joinville-le-Pont", "Champigny-sur-Marne", "Créteil", "Maisons-Alfort", "Saint-Maurice", "Alfortville", "Charenton-le-Pont", "Choisy-le-Roi", "Vitry-sur-Seine", "Aubervilliers", "Le Pré-Saint-Gervais", "La Courneuve", "Ivry-sur-Seine", "Saint-Denis", "Villejuif", "Saint-Ouen-sur-Seine", "Villeneuve-la-Garenne", "Clichy", "Gennevilliers", "Asnières-sur-Seine", "Levallois-Perret", "Bois-Colombes", "Colombes", "Argenteuil", "La Garenne-Colombes", "Neuilly-sur-Seine", "Courbevoie", "Nanterre", "Rueil-Malmaison", "Puteaux", "Suresnes", "Le Kremlin-Bicêtre", "Gentilly", "Chevilly-Larue", "Cachan", "Arcueil", "Montrouge", "Malakoff", "Bagneux", "Bourg-la-Reine", "Vanves", "Fontenay-aux-Roses", "Sceaux", "Châtillon", "Saint-Cloud", "Boulogne-Billancourt", "Garches", "Issy-les-Moulineaux", "Sèvres", "Clamart", "Ville-d'Avray", "Meudon", "Chaville"
];
com.sort();
com.unshift("Paris")
com.unshift('')

var filterCommune = document.getElementById('filter-commune')
com.forEach(c => {
  var o = document.createElement('option')
  o.value = c;
  o.innerText = c || 'Ile de France'
  filterCommune.appendChild(o)
})
filterCommune.addEventListener('change', e => {
  filter ('nom_arrondissement_communes', e.target.value)
})

document.querySelectorAll('input[name="type"]').forEach(i => {
  i.addEventListener('change', e => {
    delete _filter.ebike
    delete _filter.mechanical
    _filter[e.target.value] = {
      attr: e.target.value,
      op: '>',
      val: 0
    }
    filter()
  })
})

/* Filtrer / places dispo */
document.querySelector('input.dispo').addEventListener('change', e => {
  _filter['numdocksavailable'] = {
    attr: 'numdocksavailable',
    op: '>',
    val: e.target.value
  }
  filter()
})