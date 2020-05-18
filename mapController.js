var i = 1;
var list = [];

//Add layer to group, pass group (g) and new layer (l)
function addL(l) {
  //createPoiBadge(l);
  placesLayer.addLayer(l);
}

//Add layer from search bar
function getSearchLayer(map) {

  var geojsonFeature = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [search._markerSearch._latlng.lat, search._markerSearch._latlng.lng]
    }
  }

  var marker;
  L.geoJson(geojsonFeature, {

    pointToLayer: function (feature, latlng) {

      marker = new L.marker(search._markerSearch._latlng, {
        title: `POI #${i}`,
        draggable: false,
      })
      i++;
      return marker;
    }
  });

  return marker;
}

//Remove layer from group, pass group (g) and layer reference (l)
function removeL(layerId) {
  //remove marker from map
  var point = placesLayer.getLayer(layerId);
  map.removeLayer(point);
  //remove list item badge from right div
  var elementId = '#' + layerId;
  $(elementId).remove();
}


function addPOI(){
  var poi = new Poi(getSearchLayer());
  sendTimeMapRequest(poi);
}







