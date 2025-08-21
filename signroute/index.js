var mapAPI;

MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // Calculer les stats
  api.on('select', function(features) {
    console.log('Selected features:', features);
    const resDiv = document.querySelector('aside .result p')
    resDiv.innerHTML = 'Objet sélectionnés : ' + features.length;
    const ul = document.querySelector('aside .result ul')
    ul.innerHTML = ''; // Clear previous results
    features.forEach(f => {
      console.log(f,f.properties.cleabs)
      const li = createElement('li', {
        html: f.properties.cleabs,
        parent: ul
      })
    })
  })
})


function createElement(tag, options) {
  const elt = document.createElement(tag.toLowerCase())
  Object.keys(options).forEach(k => {
    switch(k) {
      case 'parent': {
        options.parent.appendChild(elt)
        break;
      }
      case 'html': {
        elt.innerHTML = options.html
        break;
      }
      default: {
        elt[k] = options[k]
        break;
      }
    }
  })
  return elt;
}
