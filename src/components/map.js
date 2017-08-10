import { h, Component } from 'preact'
var map, marker, markers, myDistricts;
var caCenter = [37.2719, -119.2702];
var defaultZoom = 6;
var caBounds = [ [32.5343, -124.4096], [42.0095, -114.1308]];
var autocomplete; 
var openStates;
var stateDistricts;
var state = 'CA';     //TODO get latlong map zoom defaults
var openStatesApiKey = 'INSERT API KEY HERE';


var onUpdatePoint;

// Copied from https://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function fakeOnUpdatePoint (lat, lng) {
  console.log( [lat,lng]);
  onPositionSet(lat, lng, stateDistricts.findDistrictsForPoint(lat, lng));
}




function init() {

	// initAutocomplete();
	initOpenStates();  //async
  initMap(fakeOnUpdatePoint);

  //setTimeout(function() {fakeOnUpdatePoint( 34.31092502160036, -118.29666137695312 );}, 3000);
}

function initOpenStates() {
	// openStates = new OpenStates(openStatesApiKey)
	openStates = new LocalOpenStates();
	var state_lower = state.toLowerCase();
	// calls are currently syncronous. Avoid synchronous call by launching a new thread.
	setTimeout(function () {
		stateDistricts = new DistrictList(openStates.getDistricts(state_lower), state_lower);
		stateDistricts.preloadDistricts();
	}, 10);
	
}


function initMap( _callback ){

  onUpdatePoint = _callback;

  L.mapbox.accessToken = 'pk.eyJ1Ijoid29sZmdhbmctbXB6IiwiYSI6ImNqNXcxYXA1djA4NzIyd29ncmFzbmowZjUifQ.d_D9DGVm9sfiEJilUmR0dw';
  map = L.mapbox.map('map', 'mapbox.light');
  map.fitBounds(caBounds);

  markers = L.featureGroup();
  map.addLayer(markers);

  myDistricts = L.layerGroup();
  map.addLayer(myDistricts);

  map.on('click', function(e){
      var pos = e.latlng;
      onUpdatePoint( pos.lat, pos.lng );

      // document.getElementById('autocomplete').value = '';

  });


  resetMap();

  //TODO needs ca outline
}


function resetMap(){

  markers.clearLayers();
  myDistricts.clearLayers();
  map.flyToBounds(caBounds);
  // document.getElementById('autocomplete').value = '';

}


// function initAutocomplete() {
//         // Create the autocomplete object, restricting the search to geographical
//         // location types.
//         autocomplete = new google.maps.places.Autocomplete(
//             /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
//             {types: ['geocode']});

//         autocomplete.addListener('place_changed', getAutocompletePlace);
//       }



// function getAutocompletePlace(){
//   var place = autocomplete.getPlace();

//   var lat = place.geometry.location.lat();
//   var lng = place.geometry.location.lng();
  
//   for (var i = 0; i < place.address_components.length; i++) {
//       for (var j = 0; j < place.address_components[i].types.length; j++) {
//         if (place.address_components[i].types[j] == "administrative_area_level_1") {
//             state = place.address_components[i].short_name;
//             console.log(state)
//         }
//         if (place.address_components[i].types[j] == "postal_code") {
//             zip = place.address_components[i].long_name;
//             console.log(zip)
//         }
//       }
//     }
//     onUpdatePoint( lat, lng );
// }


  function onPositionSet(districtData, lat, lng){



    markers.clearLayers();
    marker = L.marker([lat,lng],{ draggable: true });
    

    marker.on('dragend', function(e){
       console.log( e.target);
       var pos = e.target._latlng;
       onUpdatePoint( pos.lat, pos.lng)
        
    });

    markers.addLayer(marker);
       

    if( districtData.upper || districtData.lower ){
      zoomDistrict(districtData);  //make this a callback
    } else {

      myDistricts.clearLayers();
    }



 }

 function drawDistrict( district, districtColor ){

      var shape = district.shape;

      for (i = 0; i < shape.length; i++) { 
        var boundary = shape[i][0].slice(1).map(function(x) { return [x[1],x[0]]; });  //assumes no donuts
        shape[i] = boundary;
      }

      var polygon = L.polygon(shape, {color: districtColor });
      myDistricts.addLayer( polygon );  //todo name layer ?

 }

//TODO deal with upper and lower 
 function zoomDistrict(districtData){


  console.log(districtData);
  var bbox = districtData.upper.bbox;  //TODO get bbox of both bboxes

  var drawNewDistrict = true;
  map.flyToBounds(bbox);

  myDistricts.clearLayers();
  drawDistrict(districtData.upper, 'blue');
  drawDistrict(districtData.lower, 'red');
  

 }

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            // autocomplete.setBounds(circle.getBounds());
          });
        }
      }


class Map extends Component {
  componentDidMount () {
    this.props.connector.register(onPositionSet)
    initMap(this.props.connector.updatePoint)
  }

  render () {
    const styles = {
      display: 'inline-block',
      width: '48%'
    }
    return (
      <div style={styles} id="map"></div>
    )
  }
}

export default Map
