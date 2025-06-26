const search = document.querySelector('#volet input[type="search"]')
search.addEventListener('change', function(e) {
  fetch('https://rnb-api.beta.gouv.fr/api/alpha/buildings/'+e.target.value+'/')
  .then(resp => resp.json()).then(function(resp) {
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
  }).catch(function() {
    var ul = document.querySelector('.result')
    ul.innerHTML = ''
    var addr = document.querySelector('.address')
    addr.innerHTML = '';
  })
})

/* Get mapAPI */
var mapAPI;
var data;
MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // On a selectionne un objet
  api.on('select', function(e) {
    var ul = document.querySelector('.result')
    ul.innerHTML = ''
    var f = e[0]
    var addr = document.querySelector('.address')
    addr.innerHTML = '';
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
      // To copy
      data = id
      console.log(id)
      // search.value = f.properties.identifiants_rnb.split('/')[0];
      fetch('https://rnb-api.beta.gouv.fr/api/alpha/buildings/'+id+'/').then(resp => resp.json()).then(function(resp) {
        console.log(resp)
        addr.innerHTML = '<h3>Adresses</h3><ul></ul>'
        var ul = addr.querySelector('ul')
        resp.addresses.forEach(a => {
          var li = document.createElement('li');
          ul.appendChild(li)
          li.innerHTML = a.street_number + ' ' +a.street 
            + '<br/>' + a.city_zipcode + ' ' + a.city_name 
            + '<br/>Clé BAN : ' + a.id;
        })
      })
    }
  })
})

function find(x) {
  search.value = x;
  search.dispatchEvent(new Event('change'))
}

document.querySelector('button.copy').addEventListener('click', function() {
  console.log(data)
  navigator.clipboard.writeText(data);

})
