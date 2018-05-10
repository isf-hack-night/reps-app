import React from 'react';
import {withRouter} from 'react-router-dom';
import API_KEYS from 'KEYS';
import queryAPI from 'queryAPI';
import {COLORS, STATE_BOUNDS, STATE_CENTER, GMAP_STYLE} from 'local_constants';
const defaultZoom = 6;

//TODO:
// went forward (map didn't render in this view) hit back and got "Error: Map container is already initialized."
// how to handle a single action's page... the map should lock in this case? or moving/clicking opens the rep/actions list view?

class DistrictMap extends React.Component {
  constructor (props) {
    super(props);

    this.stateDistricts = props.stateDistricts;
    //todo local lat lng 
    this.state = { mounted: false };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    if(e.latlng){
      const { lat, lng } = e.latlng;
      this.updateRoute(lat, lng)
    } else {

      if(e.latLng){
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.updateRoute(lat, lng)
      }
    }
  }

  handleDrag (e) {

    if( e.target._latlng){
        const {lat, lng} = e.target._latlng;
        //todo set lat lng in global state
        this.updateRoute(lat, lng)

    } else {
      console.log(e.target);
      if(e.target.latLng){
        const lat = e.target.latLng.lat();
        const lng = e.target.latLng.lng();
        this.updateRoute(lat, lng)
      }
    }

  }

  calcGBounds( bounds ){
    const sw =  new google.maps.LatLng( bounds[0][0] , bounds[0][1] );
    const ne =  new google.maps.LatLng( bounds[1][0] , bounds[1][1] );
    return new google.maps.LatLngBounds(sw,ne);
  }


  resetMap () {
    this.state.markers.clearLayers();
    this.state.upperDistricts.clearLayers();
    this.state.lowerDistricts.clearLayers();
   // this.state.layerControl.getContainer.hide()
    this.state.map.flyToBounds(STATE_BOUNDS)
  // document.getElementById('autocomplete').value = '';


    thi.state.gmarker.setMap(null);
    this.state.gupperDistricts.setMap(null);
    this.state.glowerDistricts.setMap(null);
    this.state.gmap.fitBounds(this.calcGBounds( STATE_BOUNDS ));
  }

  updateRoute (lat, lng) {

    const districtsData = this.stateDistricts.findDistrictsForPoint(lat, lng);
    const lowerId = districtsData.lower.id;
    const upperId = districtsData.upper.id;
    const newRoute = queryAPI.build({
      districtLower: lowerId,
      districtUpper: upperId,
    });
    this.props.history.push(newRoute);
    console.log("NOW UPDATE LOCATION DATA");
    if (this.props.locationData) {
      this.props.locationData.push({lat: lat, lng: lng})
    }
  }

  positionFromDistrict(districtUpper, districtLower) {
    
    this.state.markers.clearLayers();
    thi.state.gmarker.setMap(null);

    if (districtUpper || districtLower) {

      const districtData = this.stateDistricts.findDistrictsFromIDs( districtUpper, districtLower);
      this.zoomDistrict(districtData) 
    }

  }


  positionSet (lat, lng) {

    //TODO clear g marker
    this.state.markers.clearLayers();
    const marker = L.marker([lat,lng], { draggable: true });
      
    marker.on('dragend', this.handleDrag);

    this.state.markers.addLayer(marker);

    //TODO create g marker
    this.state.gmarker.position(new google.maps.LatLng( lat, lng ));
    this.state.gmarker.setMap(this.state.gmap);
    
    const districtData = this.stateDistricts.findDistrictsForPoint(lat, lng);
    console.log('posSet districtData', districtData );
    if (districtData.upper || districtData.lower) {
      this.zoomDistrict(districtData)  //make this a callback
    } else {

      this.state.upperDistricts.clearLayers();
      this.state.lowerDistricts.clearLayers()
     // this.state.layerControl.getContainer.hide()

      this.state.gupperDistricts.setMap(null);
      this.state.glowerDistricts.setMap(null);

    }
  }

  zoomDistrict (districtData) {
    const bboxU = districtData.upper.bbox;  //TODO get bbox of both bboxes
    const bboxL = districtData.lower.bbox;
  
    const bbox = bboxU;
    bboxU[0][0] = Math.min(bboxU[0][0],bboxL[0][0]);
    bbox[0][1]  = Math.min(bboxU[0][1],bboxL[0][1]);
    bbox[1][0]  = Math.max(bboxU[1][0],bboxL[1][0]);
    bbox[1][1]  = Math.max(bboxU[1][1],bboxL[1][1]);


    const drawNewDistrict = true;
    this.state.map.flyToBounds(bbox);

    this.state.upperDistricts.clearLayers();
    this.state.lowerDistricts.clearLayers();


    this.state.gupperDistricts.setMap(null);
    this.state.glowerDistricts.setMap(null);
    this.state.gmap.fitBounds(this.calcGBounds( bbox ));


    this.drawDistrict(districtData.upper);
    this.drawDistrict(districtData.lower)
   // this.state.layerControl.getContainer().show()
  }

  drawDistrict (district) {
    let shape = [];
    for (let a in district.shape) {
      shape[a] = [];
      for (let b in district.shape[a]) {
        shape[a][b] = [];
        for (let c in district.shape[a][b]) {
          shape[a][b][c] = [];
          for (let d in district.shape[a][b][c]) {
            shape[a][b][c][d] = district.shape[a][b][c][d]
          }
        }
      }
    }


    const districtColor = district.chamber === 'upper' ? COLORS.DISTRICT.UPPER : COLORS.DISTRICT.LOWER;

    let gshape = [];
    for (let i = 0; i < shape.length; i++) { 
       shape[i] = shape[i][0].slice(1).map(x => [x[1], x[0]] );  //assumes no donuts
       gshape.push( new google.maps.LatLng(shape[i][1],  shape[i][0] )) ;
    }

    if( district.chamber === 'upper'){
      this.state.upperDistricts.addLayer( polygon );
      this.state.gupperDistrict.paths = gshape;
      this.state.gupperDistricts.setMap(this.state.gmap);
    } else {
      this.state.lowerDistricts.addLayer( polygon )
      this.state.gupperDistrict.paths = gshape;
      this.state.glowerDistricts.setMap(this.state.gmap);
    }

  }

  componentDidMount () {
    
    let gmap;

    gmap = new google.maps.Map(document.getElementById('gmap'), {
      mapTypeControl: false,
      streetViewControl: false,
      styles: GMAP_STYLE
    });

    gmap.fitBounds( this.calcGBounds( STATE_BOUNDS ));
    

    // aka init map
    L.mapbox.accessToken = API_KEYS.mapbox;
    let map;
    if (L.mapbox.HACK_MAP) {
      L.mapbox.HACK_MAP.remove()
    }

    map = L.mapbox.map('map', 'mapbox.light');
    L.mapbox.HACK_MAP = map;
    map.fitBounds(STATE_BOUNDS);

    const markers = L.featureGroup();
    map.addLayer(markers);

    const upperDistricts = L.layerGroup([]);
    const lowerDistricts = L.layerGroup([]);
    map.addLayer( upperDistricts);
    map.addLayer( lowerDistricts);

    const overlayHTMLUpper = "<span style='color:" + COLORS.DISTRICT.UPPER + "''>State Senate Districts</span>";
    const overlayHTMLLower = "<span style='color: " + COLORS.DISTRICT.UPPER + "'>State Assembly Districts</span>";

    //TODO update colors here as wll
    const overlayMaps = {
       overlayHTMLUpper : upperDistricts,
       overlayHTMLLower : lowerDistricts
    };

    //const layerControl = L.control.layers(null, overlayMaps, {collapsed:false})
    //layerControl.addTo(map);
    //layerControl.hide()

    map.on('click', this.handleClick);


    let gmarker = new google.map.Marker({map: gmap, draggable: true})
    let gupperDistrict = new google.map.Polygon({map: gmap, strokeColor: COLORS.DISTRICT.UPPER});
    let glowerDistrict = new google.map.Polygon({map: gmap, strokeColor: COLORS.DISTRICT.LOWER});
    gmarker.addListener('dragend' , this.handleDrag);
    gmap.addListener('click', this.handleClick  );

    const newState = { map,  markers, upperDistricts, lowerDistricts, 
      gmap, gmarkers, gupperDistricts, gLowerDistricts,
     mounted: true};

    // this setState will trigger componentDidUpdate thus positionSet
    this.setState(Object.assign({}, this.state, newState));
    // this.resetMap()
  }

  //TODO if district but no local lat long params, then use center of bbbox
  componentDidUpdate (prevProps) {
    console.log("MAP DID UPDATE");

    if(this.props.locationData){
      const { lat, lng } = this.props.locationData;
      if (lat && lng) {
        this.positionSet(lat, lng)
      }

    } else {
        if (this.props.paramsData) { 
          const { districtUpper, districtLower } = this.props.paramsData;

          if( districtUpper || districtLower) {
            this.positionFromDistrict(districtUpper, districtLower)
          }
     }
   }
  }

  render () {
    const styles = {
      display: window.innerWidth <= 600 ? 'block' : 'inline-block'
    };

    const gstyles = {
      display: window.innerWidth <= 600 ? 'block' : 'inline-block',
      width: 600,
      height: 600,
    };


    return (
      <div>
        <div style={gstyles} id="gmap"></div>
        <div style={styles} id="map"></div>
      </div>
    )
  }
}

// TODO: Move this to calling code. Make this a "dumb" component
const DistrictMapContainer = withRouter(({history, locationData, stateDistricts, paramsData}) => (
  <DistrictMap history={history} locationData={locationData} stateDistricts={stateDistricts} paramsData={paramsData} />
));

export default DistrictMapContainer
