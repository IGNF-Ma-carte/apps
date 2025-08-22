var mapAPI;

let current = [];

MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // Calculer les stats
  api.on('select', function(features) {
    current = features;
    const resDiv = document.querySelector('aside .result p')
    resDiv.innerHTML = 'Objet sélectionnés : ' + features.length;
    const ul = document.querySelector('aside .result ul')
    ul.innerHTML = ''; // Clear previous results
    // Display features in a list
    features.forEach(f => {
      console.log(f,f.properties.cleabs)
      createElement('li', {
        html: f.properties.cleabs,
        title: f.properties.nature,
        parent: ul
      })
    })
  })
})

document.querySelector('aside button.send').addEventListener('click', function() {
  // Get department from first feature
  const f = current[0];
  if(!f) return;
  const pt = f.geometry.coordinates[0];
  const url = 'https://geo.api.gouv.fr/communes?lon=' + pt[0].toFixed(3) + '&lat=' + pt[1].toFixed(3);
  fetch(url).then(r => r.json()).then(data => {
    console.log(data);
    const dep = data[0].codeDepartement;
    const subject = 'Signalement de troncons manquants - ' + data[0].nom + ' (' + dep + ')';
    const body = 'Bonjour,\n\nJe souhaite vous signaler l\'ajout des troncons suivants :\n\n';
    let bodyDetails = ''; // Details to append to body
    current.forEach(f => {
      const cleabs = f.properties.cleabs;
      bodyDetails += '- ' + cleabs + '\n';
    })
    const mailto = 'mailto:contact' + dep + '@ign.fr?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body + bodyDetails);
    // Open mailto link
    // window.location.href = mailto;  
    const dlg = document.querySelector('dialog')
    dlg.querySelector('div').innerHTML = 
      '<b>Objet : </b>' + subject +'<hr/>'
      + 'à : contact' + dep + '@ign.fr<hr/><br/>'
      + (body + bodyDetails).replace(/\n/g, '<br/>');
    dlg.querySelector('a').href = mailto;
    dlg.showModal();
  })
})

// Copy content to clipboard
document.querySelector('dialog button.copy').addEventListener('click', b => {
  const dlg = document.querySelector('dialog')
  const text = dlg.querySelector('div').innerText;
  navigator.clipboard.writeText(text).then(() => {
    document.querySelector('aside .info').innerHTML = 'Contenu copié dans le presse-papier !';
    setTimeout(() => {
      document.querySelector('aside .info').innerHTML = '';
    }, 5000);
  }).catch(err => {
  });
});

document.querySelectorAll('dialog button').forEach(b => {
  b.addEventListener('click', function() {
    document.querySelector('dialog').close(); 
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
