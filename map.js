$('document').ready(function(){
  map.locate({setView: true, maxZoom: 14});
});

var gl = L.tileLayer('https://api.mapbox.com/styles/v1/crepkautexas/cjxqyq0bz600f1cl784to8u4n/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiY3JlcGthdXRleGFzIiwiYSI6ImNqbGNuZTF6OTAyZHozdm85MTAxaWswN2sifQ.3coI7rsISASF65kgFHLblQ', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
});


var mapboxUrl = 'mapbox://styles/crepkautexas/cjxqyq0bz600f1cl784to8u4n';

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),

  map = new L.Map('map', { center: new L.LatLng(30.2672, -97.7431), zoom: 14, zoomControl: false, }),
  drawnItems = L.featureGroup().addTo(map);

var placesLayer = new L.featureGroup().addTo(map);

L.control.zoom({
  position: 'topright',
}).addTo(map);
//adds layers to control array before adding ui to bottom right
L.control.layers({
  'Mapbox': gl.addTo(map),
})



search = new L.Control.Search({
  url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
  //layer: placesLayer,
  zoom: 18,
  autoType: true,
  delayType: 50,
  container: 'search-container',
  jsonpParam: 'json_callback',
  propertyName: 'display_name',
  propertyLoc: ['lat', 'lon'],
  marker: L.marker([0, 0]),
  collapsed: false,
  autoType: false,
  minLength: 2,
  geocode: 'countrycodes=us'

})


map.addControl(search);

//search.onAdd(console.log('added'));
