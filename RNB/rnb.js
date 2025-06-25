const search = document.querySelector('#volet input[type="search"]')
search.addEventListener('change', function(e) {
  fetch('https://rnb-api.beta.gouv.fr/api/alpha/buildings/'+e.target.value+'/').then(resp => resp.json()).then(function(resp) {
    mapAPI.setCenter({ center: resp.point.coordinates, zoom:18 })
    console.log('center', resp)
    setTimeout(function() {
      mapAPI.selectFeatures({
        layerId: 4,
        attr: 'identifiants_rnb',
        op: 'contain',
        val: resp.rnb_id
      })
    }, 500)
  })
})

/* Get mapAPI */
var mapAPI;
MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // On a selectionner un objet
  api.on('select', function(e) {
    var ul = document.querySelector('.result')
    ul.innerHTML = ''
    var f = e[0]
    if (f) {
      var id = '';
      f.properties.identifiants_rnb.split('/').forEach(element => {
        var li = document.createElement('li');
        ul.appendChild(li)
        var a = document.createElement('a');
        a.innerText = element;
        a.href = 'javascript:find("'+element+'")';
        li.appendChild(a)
        id = element
      });
      // search.value = f.properties.identifiants_rnb.split('/')[0];
      fetch('https://rnb-api.beta.gouv.fr/api/alpha/buildings/'+id+'/').then(resp => resp.json()).then(function(resp) {
        console.log(resp)
        var li = document.createElement('li');
        ul.appendChild(li)
        li.innerHTML = '<b>Adresses</b>'
        resp.addresses.forEach(a => {
          li.innerHTML += '<br/>' + a.street_number + ' ' +a.street + ' ' + a.city_zipcode + ' ' + a.city_name;
        })
      })
    }
  })
})

function find(x) {
  search.value = x;
  search.dispatchEvent(new Event('change'))
}
