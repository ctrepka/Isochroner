

var APP_ID = 'e75b921d';
var API_KEY = '7a3dccc2c290ee7a96df7d9aeb45a219';

var d = new Date();
var departureTime = d.toISOString();
// Travel time in seconds. We want 1 hour travel time so it is 60 minutes x 60 seconds.
var travelTime = 30 * 60;
var c = ['red', 'blue', 'yellow', 'orange', 'green', 'pink'];
var index = 0;

function sendTimeMapRequest(p) {

  // The request for Time Map. Reference: http://docs.traveltimeplatform.com/reference/time-map/
  //var coords = geocodingResponse.features[0].geometry.coordinates;
  var latLng = p._mapObject._latlng;
  console.log(latLng);

  var request = {
    "arrival_searches": [{
      "id": p._id.toString(),
      "coords": latLng,
      "transportation": {
        "type": p._travelMethod
      },

      "arrival_time": p._arrivalTime,
      "travel_time": p._maxTravelTime * 60
    }],

    "departure_searches": []
  };

  console.log(request);
  var xhr = new XMLHttpRequest()
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.response);
      drawTimeMap(map, this.response);
    }
  });
  xhr.open("POST", "https://api.traveltimeapp.com/v4/time-map")
  xhr.setRequestHeader("X-Application-Id", APP_ID);
  xhr.setRequestHeader("X-Api-Key", API_KEY);
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.responseType = "json";
  xhr.send(JSON.stringify(request));

  // A helper function that converts [{lat: <lat>, lng: <lng>}, ...] to a [[<lat>, <lng>], ...] format.
  function ringCoordsHashToArray(ring) {
    return ring.map(function (latLng) { return [latLng.lat, latLng.lng]; });
  };

  // Draws the resulting multipolygon from the response on the map.
  function drawTimeMap(map, response) {

    // Reference for the response: http://docs.traveltimeplatform.com/reference/time-map/#response-body-json-attributes
    var shapesCoords = response.results[0].shapes.map(function (polygon) {
      var shell = ringCoordsHashToArray(polygon.shell);
      var holes = polygon.holes.map(ringCoordsHashToArray);
      return [shell].concat(holes);
    });
    var polygon = L.polygon(shapesCoords, { color: c[index] });
    polygon.addTo(map);
    map.fitBounds(polygon.getBounds());

    if(index >= (c.length - 1)){
      index = 0;
    }else{
      index += 1;
    }
  };
}