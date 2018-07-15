import React from 'react';
import {withRouter} from 'react-router-dom';
import API_KEYS from 'KEYS';
import queryAPI from 'queryAPI';
import {COLORS, STATE_BOUNDS, STATE_CENTER, GMAP_STYLE, STATE_BOUNDS_PADDING} from 'local_constants';
import StateStrong from 'api/StateStrong';
const defaultZoom = 6;

//TODO:
// went forward (map didn't render in this view) hit back and got "Error: Map container is already initialized."
// how to handle a single action's page... the map should lock in this case? or moving/clicking opens the rep/actions list view?

class DistrictMap extends React.Component {
  constructor (props) {
    super(props);

    this.stateStrong = new StateStrong();
    //todo local lat lng 
    this.state = { mounted: false };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

    const { lat, lng } = e.latlng;
    this.updateRoute(lat, lng);
  }

  calcGBounds( bounds ){
    const sw =  new google.maps.LatLng( bounds[0][0] , bounds[0][1] );
    const ne =  new google.maps.LatLng( bounds[1][0] , bounds[1][1] );
    return new google.maps.LatLngBounds(sw,ne);
  }


  resetMap () {
    this.state.gmap.data.forEach(function(feature){
          feature.setGeometry( new google.maps.Data.Polygon([]));
        });
    this.state.gmap.fitBounds(this.calcGBounds( STATE_BOUNDS ) , STATE_BOUNDS_PADDING);
  }

  updateRoute (lat, lng) {
    const districtsData = this.stateStrong.fetchUpperLowerDistrictBoundaries(lat, lng).then(
      data => this.finishUpdateRoute(data, lat, lng));
  }

  finishUpdateRoute (districtData, lat, lng) {
    console.log("FINISH UPDATE:", {districtData, lat, lng});
    const upperId = districtsData.upper.id;
    const newRoute = queryAPI.build({
      districtLower: lowerId,
      districtUpper: upperId,
    });
    this.props.history.push(newRoute);

    if (this.props.locationData) {
      this.props.locationData.push({lat: lat, lng: lng})
    }
    
  }



  positionFromDistrict(districtUpper, districtLower) {
    
    if (districtUpper || districtLower) {
      const districtData = this.stateDistricts.findDistrictsFromIDs( districtUpper, districtLower);
      this.zoomDistrict(districtData) 
    }

  }


  positionSet (lat, lng) {

    /*
    let marker = new google.maps.Marker({
          position: new google.maps.LatLng( lat, lng ),
          map: this.state.gmap,
          draggable: true
        });
    marker.addListener('dragend' , this.handleDrag);
  */
 
    const districtData = this.stateDistricts.findDistrictsForPoint(lat, lng);
    console.log('posSet districtData', districtData );
    if (districtData.upper || districtData.lower) {
      this.zoomDistrict(districtData)  //make this a callback
    } else {
        this.state.gmap.data.forEach(function(feature){
          feature.setGeometry( new google.maps.Data.Polygon([]));
        });
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

    this.state.gmap.fitBounds(this.calcGBounds( bbox ));
    this.drawDistrict(districtData.lower);
    this.drawDistrict(districtData.upper);


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
            shape[a][b][c][d] = district.shape[a][b][c][d];
          }
        }
      }
    }

    let gshapes = [];
    for (let i = 0; i < shape.length; i++) { 
       gshapes.push( 
        new google.maps.Data.Polygon(
          [ shape[i][0].slice(1).map(x => new google.maps.LatLng(x[1], x[0]) ) ]
       ));  //assumes no donuts
    }
  
    this.state.gmap.data.getFeatureById(district.chamber).setGeometry(new google.maps.Data.MultiPolygon(gshapes)); 

  }

  componentDidMount () {
    
    let gmap;

    gmap = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      streetViewControl: false,
      clickableIcons: false,
      styles: GMAP_STYLE
    });
    gmap.fitBounds( this.calcGBounds( STATE_BOUNDS ), STATE_BOUNDS_PADDING);

    gmap.addListener('click', this.handleClick  );

    gmap.data.add( new google.maps.Data.Feature({ 
      id: 'upper',
      geometry: new google.maps.Data.Polygon([]),
      properties: {color: COLORS.DISTRICT.UPPER}
    }));

    gmap.data.add( new google.maps.Data.Feature({ 
      id: 'lower',
      geometry: new google.maps.Data.Polygon([]),
      properties: {color: COLORS.DISTRICT.LOWER}
    }));

    gmap.data.setStyle(function(feature) {
          return({
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillOpacity: 0.35,
            fillColor: feature.getProperty('color'),
            strokeColor: feature.getProperty('color'),
            clickable: false,
          });
        });

    const newState = { gmap, mounted: true};

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


    //todo make this responsive ( but needs initial size or won't render)
    const gstyles = {
      minWidth: 500,
      height: 600
    };


    return (
      <div style={styles}>
        <div style={gstyles} id="map"></div>
      </div>
    )
  }
}

// TODO: Move this to calling code. Make this a "dumb" component
const DistrictMapContainer = withRouter(({history, locationData, stateDistricts, paramsData}) => (
  <DistrictMap history={history} locationData={locationData} stateDistricts={stateDistricts} paramsData={paramsData} />
));

export default DistrictMapContainer
