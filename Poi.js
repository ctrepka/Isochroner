
class Poi {

  constructor(marker) {
    this._id = marker._leaflet_id;
    this._travelMethod = $('#poiTravel').val();
    this._maxTravelTime = $('#poiTime').val();
    this._arrivalTime = $('#poiArriveBy').val();
    this._travelShape;
    this._mapObject = marker;

    addL(marker);
  }

  //begin methods

  

  createBadge() {

    var poiContainer = $("<div class='poi'></div>");
    //add data value and elmnt id = _leaflet_id
    poiContainer.attr({
      'id': this._id,
      'data-value': this._id
    });
    
    var poiButtons = $("<div class='poiButtons'></div>");
    var poiText = $("<div class='poiText'></div>");
    poiText.attr({
      'id': this._id
    })
    
    var first = $(''); 
    
    var third = $(''); 
    
    var last = $('');

    $("#poiList").append(poiContainer);
    $(`#${this._id}`).append(poiText);
    /*$(`#${this._id}.poiText`).append(first);
    $(`#${this._id}.poiText`).append(second);
    $(`#${this._id}.poiText`).append(third);
    $(`#${this._id}.poiText`).append(last);*/
  }

  //var travelMethods = ['car', 'bus', 'bike', 'walk'];

  //begin getters 
  get mapObject() {
    return this._mapObject;
  }
  get travelMethod() {
    return this._travelMethod;
  }
  get maxTravelTime() {
    return this._maxTravelTime;
  }

  //begin setters

  set mapObject(m) {
    this._mapObject = m;
  }
  set travelMethod(tm) {
    this._travelMethod = tm;
  }
  set maxTravelTime(mtt) {
    this._maxTravelTime = mtt;
  }

}