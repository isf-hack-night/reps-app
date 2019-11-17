import React from 'react';
import {withRouter} from 'react-router-dom';
import API_KEYS from 'KEYS';
import {GMAP_STYLE} from 'components/map/gmap_style';
import {COLORS, STATE_BOUNDS, STATE_CENTER, STATE_BOUNDS_PADDING} from 'local_constants';
const defaultZoom = 6;

//TODO:
// went forward (map didn't render in this view) hit back and got "Error: Map container is already initialized."
// how to handle a single action's page... the map should lock in this case? or moving/clicking opens the rep/actions list view?

class DistrictMap extends React.Component {
  constructor (props) {
    super(props);

    //todo local lat lng 
    this.state = { mounted: false };

    this.updateLocation = this.props.updateLocation;
    this.handleDrag = this.handleDrag.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {

    if(e.latlng){
      const { lat, lng } = e.latlng;
      this.updateLocation(lat, lng)
    } else {

      if(e.latLng){
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.updateLocation(lat, lng)
      }
    }
  }

  handleDrag (e) {

    if( e.target._latlng){
        const {lat, lng} = e.target._latlng;
        //todo set lat lng in global state
        this.updateLocation(lat, lng)

    } else {
      if(e.target.latLng){
        const lat = e.target.latLng.lat();
        const lng = e.target.latLng.lng();
        this.updateLocation(lat, lng)
      }
    }

    const { lat, lng } = e.latlng;
    this.updateLocation(lat, lng);
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

  zoomDistrict (districtsData) {
    const bboxU = districtsData.districtDataUpper.bbox;  //TODO get bbox of both bboxes
    const bboxL = districtsData.districtDataLower.bbox;
  
    const bbox = bboxU;
    bbox[0][0] = Math.min(bboxU[0][0],bboxL[0][0]);
    bbox[0][1]  = Math.min(bboxU[0][1],bboxL[0][1]);
    bbox[1][0]  = Math.max(bboxU[1][0],bboxL[1][0]);
    bbox[1][1]  = Math.max(bboxU[1][1],bboxL[1][1]);


    const drawNewDistrict = true;

    this.state.gmap.fitBounds(this.calcGBounds( bbox ));
    this.drawDistrict(districtsData.districtDataLower);
    this.drawDistrict(districtsData.districtDataUpper);
  }

  drawDistrict (district) {
    var shape = [];
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
          [ shape[i][0].slice(0).map(x => new google.maps.LatLng(x[1], x[0]) ) ]
       ));  //assumes no donuts
    }
  
    let poly = new google.maps.Data.MultiPolygon(gshapes);
    this.state.gmap.data.getFeatureById(district.chamber).setGeometry(poly); 
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

  componentDidUpdate (prevProps) {
      if (this.props.districtsData.districtIdUpper) { 
        this.zoomDistrict(this.props.districtsData);
      }
  }

  render () {

    //todo make this responsive ( but needs initial size or won't render)

    return (
        <div id="map" style={{ height: "500px" }}></div>
    )
  }
}

// TODO: Move this to calling code. Make this a "dumb" component
const DistrictMapContainer = withRouter(({updateLocation, districtsData}) => (
  <DistrictMap updateLocation={updateLocation} districtsData={districtsData} />
));

export default DistrictMapContainer
