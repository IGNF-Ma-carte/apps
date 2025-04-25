var mapAPI;

MapIFrameAPI.ready('map', function(api) {
  // Récupération de l'API pour un accès global
  mapAPI = api;
  // Afficher les layers dans la console
  api.getLayers(console.log)
  api.addEditBar({ layerId: 10, tools: ['Select','DrawPolygon','Attributes','Delete','Export'] })
})
