import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import API_KEYS from '../KEYS'
import queryAPI from '../query_api'
import { ROOT_PATH, US_STATE, STATE_CENTER, STATE_BOUNDS, COLORS} from '../local_constants'
const defaultZoom = 6

//TODO:
// went forward (map didn't render in this view) hit back and got "Error: Map container is already initialized."
// how to handle a single action's page... the map should lock in this case? or moving/clicking opens the rep/actions list view?

// const caCenter = [37.2719, -119.2702] // replaced by STATE_CENTER constant
// const caBounds = [[32.5343, -124.4096], [42.0095, -114.1308]] // replace by STATE_BOUNDS constant
// var stateDistricts; // get from react prop
// var state = 'CA'; // replaced by US_STATE constant     //TODO get latlong map zoom defaults
var openStatesApiKey = 'INSERT API KEY HERE' // TODO: is this necessary?

class JustMap extends Component {
  constructor (props) {
    super(props)

    //todo local lat lng 

    this.handleDrag = this.handleDrag.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    const { lat, lng } = e.latlng
    this.updateRoute(lat, lng)
  }

  handleDrag (e) {
    console.log(e.target)
    const {lat, lng} = e.target._latlng
    //todo set lat lng in global state
    this.updateRoute(lat, lng)
  }

  resetMap () {
    this.state.markers.clearLayers()
    this.state.upperDistricts.clearLayers()
    this.state.lowerDistricts.clearLayers()
   // this.state.layerControl.getContainer.hide()
    this.state.map.flyToBounds(STATE_BOUNDS)
  // document.getElementById('autocomplete').value = '';
  }

  updateRoute (lat, lng) {
    const districtsData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    const lowerId = districtsData.lower.id
    const upperId = districtsData.upper.id
    const newRoute = queryAPI.build({
      districtLower: lowerId,
      districtUpper: upperId,
    })
    this.props.history.push(newRoute)
    console.log("NOW UPDATE LOCATION DATA")
    this.props.locationData.push({lat: lat, lng: lng})
  }

  positionFromDistrict(districtUpper, districtLower) {
    
    this.state.markers.clearLayers()

    if (districtUpper || districtLower) {

      const districtData = this.props.stateDistricts.findDistrictsFromIDs( districtUpper, districtLower)
      this.zoomDistrict(districtData) 
    }

  }


  positionSet (lat, lng) {

    console.log('POSITION SET')
    this.state.markers.clearLayers()
    const marker = L.marker([lat,lng], { draggable: true })
      
    marker.on('dragend', this.handleDrag)

    this.state.markers.addLayer(marker)
    
    const districtData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    console.log('posSet districtData', districtData )
    if (districtData.upper || districtData.lower) {
      this.zoomDistrict(districtData)  //make this a callback
    } else {
      this.state.upperDistricts.clearLayers()
      this.state.lowerDistricts.clearLayers()
     // this.state.layerControl.getContainer.hide()

    }
  }

  zoomDistrict (districtData) {
    const bboxU = districtData.upper.bbox  //TODO get bbox of both bboxes
    const bboxL = districtData.lower.bbox 
  
    const bbox = bboxU
    bboxU[0][0] = Math.min(bboxU[0][0],bboxL[0][0])
    bbox[0][1]  = Math.min(bboxU[0][1],bboxL[0][1])
    bbox[1][0]  = Math.max(bboxU[1][0],bboxL[1][0])
    bbox[1][1]  = Math.max(bboxU[1][1],bboxL[1][1])


    const drawNewDistrict = true
    this.state.map.flyToBounds(bbox)

    this.state.upperDistricts.clearLayers()
    this.state.lowerDistricts.clearLayers()
    this.drawDistrict(districtData.upper)
    this.drawDistrict(districtData.lower)
   // this.state.layerControl.getContainer().show()
  }

  drawDistrict (district) {
    let shape = []
    for (let a in district.shape) {
      shape[a] = []
      for (let b in district.shape[a]) {
        shape[a][b] = []
        for (let c in district.shape[a][b]) {
          shape[a][b][c] = []
          for (let d in district.shape[a][b][c]) {
            shape[a][b][c][d] = district.shape[a][b][c][d]
          }
        }
      }
    }


    const districtColor = district.chamber === 'upper' ? COLORS.DISTRICT.UPPER : COLORS.DISTRICT.LOWER

    for (let i = 0; i < shape.length; i++) { 
      const boundary = shape[i][0].slice(1).map(x => [x[1], x[0]] )  //assumes no donuts
      shape[i] = boundary
    }

    const polygon = L.polygon(shape, { color: districtColor })
    if( district.chamber == 'upper')
      this.state.upperDistricts.addLayer( polygon )
    else 
      this.state.lowerDistricts.addLayer( polygon )

  }

  componentDidMount () {

    // aka init map
    L.mapbox.accessToken = API_KEYS.mapbox
    const map = L.mapbox.map('map', 'mapbox.light')
    map.fitBounds(STATE_BOUNDS)

    const markers = L.featureGroup()
    map.addLayer(markers)

    const upperDistricts = L.layerGroup([])
    const lowerDistricts = L.layerGroup([])
    map.addLayer( upperDistricts)
    map.addLayer(lowerDistricts)

    const overlayHTMLUpper = "<span style='color:" + COLORS.DISTRICT.UPPER + "''>State Senate Districts</span>"
    const overlayHTMLLower = "<span style='color: " + COLORS.DISTRICT.UPPER + "'>State Assembly Districts</span>"

    //TODO update colors here as wll
    const overlayMaps = {
       overlayHTMLUpper : upperDistricts,
       overlayHTMLLower : lowerDistricts
    };

    //const layerControl = L.control.layers(null, overlayMaps, {collapsed:false})
    //layerControl.addTo(map);
    //layerControl.hide()

    map.on('click', this.handleClick)

    const newState = { map, markers, upperDistricts, lowerDistricts}

    // this setState will trigger componentDidUpdate thus positionSet
    this.setState(Object.assign({}, this.state, newState))
    this.resetMap()
  }

  //TODO if district but no local lat long params, then use center of bbbox
  componentDidUpdate (prevProps) {
    console.log("MAP DID UPDATE")
    console.log( "this.props", this.props)

    if(this.props.locationData){
      const { lat, lng } = this.props.locationData
      if (lat && lng) {
        this.positionSet(lat, lng)
      }

    } else {
        if (this.props.paramsData) { 
          const { districtUpper, districtLower } = this.props.paramsData

          if( districtUpper || districtLower) {
            this.positionFromDistrict(districtUpper, districtLower)
          }
     }
   }
  }

  render () {
    const styles = {
      display: window.innerWidth <= 600 ? 'block' : 'inline-block'
    }

    return (
      <div style={styles} id="map"></div>
    )
  }
}

const Map = withRouter(({history, locationData, stateDistricts, paramsData}) => (
  <JustMap history={history} locationData={locationData} stateDistricts={stateDistricts} paramsData={paramsData} />
))

export default Map
