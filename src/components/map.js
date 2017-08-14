import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import API_KEYS from '../KEYS'
import { ROOT_PATH, US_STATE } from '../constants'

var map, marker, markers, myDistricts
var caCenter = [37.2719, -119.2702]
var defaultZoom = 6
var caBounds = [ [32.5343, -124.4096], [42.0095, -114.1308]]
var openStates
// var stateDistricts; // get from react prop
// var state = 'CA'; // replaced by US_STATE constant     //TODO get latlong map zoom defaults
var openStatesApiKey = 'INSERT API KEY HERE'

var onUpdatePoint

function initMap (_callback) {
  onUpdatePoint = _callback

  L.mapbox.accessToken = API_KEYS.mapbox
  map = L.mapbox.map('map', 'mapbox.light')
  map.fitBounds(caBounds)

  markers = L.featureGroup()
  map.addLayer(markers)

  myDistricts = L.layerGroup()
  map.addLayer(myDistricts)

  map.on('click', function (e) {
      var pos = e.latlng
      onUpdatePoint( pos.lat, pos.lng )

      // document.getElementById('autocomplete').value = ''
  })

  resetMap()
  //TODO needs ca outline
}



class JustMap extends Component {
  constructor (props) {
    super(props)

    this.props.resetMap = this.resetMap.bind(this)
    this.props.handleDrag = this.handleDrag.bind(this)
    this.props.handleClick = this.handleClick.bind(this)
    this.props.updateRoute = this.updateRoute.bind(this)
    this.props.positionSet = this.positionSet.bind(this)
    this.props.zoomDistrict = this.zoomDistrict.bind(this)
    this.props.drawDistrict = this.drawDistrict.bind(this)
  }

  handleClick (e) {
    const { lat, lng } = e.latlng
    this.props.updateRoute(lat, lng)
  }

  handleDrag (e) {
    console.log(e.target)
    const {lat, lng} = e.target._latlng
    this.props.updateRoute(lat, lng)
  }

  resetMap () {
    this.state.markers.clearLayers()
    this.state.myDistricts.clearLayers()
    this.state.map.flyToBounds(caBounds)
  // document.getElementById('autocomplete').value = '';
  }

  updateRoute (lat, lng) {
    const districtsData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    console.log('response: ', districtsData)
    const lowerId = districtsData.lower.id
    const upperId = districtsData.upper.id
    const newRoute = [
      ROOT_PATH,
      `?lat=${lat}`,
      `&lng=${lng}`,
      `&districtLower=${lowerId}`,
      `&districtUpper=${upperId}`
    ].join('')
    {/*var newRoute = `${ROOT_PATH}${routeQuery}`*/}
    console.log('autocomplete route: ', newRoute)
    this.props.history.push(newRoute)
  }

  positionSet (lat, lng) {
    this.state.markers.clearLayers()
    marker = L.marker([lat,lng], { draggable: true })
      
    marker.on('dragend', this.props.handleDrag)

    this.state.markers.addLayer(marker)
    
    const districtData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    if (districtData.upper || districtData.lower) {
      this.props.zoomDistrict(districtData)  //make this a callback
    } else {
      this.state.myDistricts.clearLayers()
    }
  }

  zoomDistrict (districtData) {
    const bbox = districtData.upper.bbox  //TODO get bbox of both bboxes

    const drawNewDistrict = true
    map.flyToBounds(bbox)

    this.state.myDistricts.clearLayers()
    this.props.drawDistrict(districtData.upper, 'blue')
    this.props.drawDistrict(districtData.lower, 'red')
  }

  drawDistrict (district, districtColor) {
    let shape = district.shape

    for (let i = 0; i < shape.length; i++) { 
      const boundary = shape[i][0].slice(1).map(x => [x[1], x[0]] )  //assumes no donuts
      shape[i] = boundary
    }

    const polygon = L.polygon(shape, { color: districtColor })
    this.state.myDistricts.addLayer(polygon)  //todo name layer ?
  }

  componentDidMount () {
    L.mapbox.accessToken = API_KEYS.mapbox
    map = L.mapbox.map('map', 'mapbox.light')
    map.fitBounds(caBounds)

    const markers = L.featureGroup()
    map.addLayer(markers)

    myDistricts = L.layerGroup()
    map.addLayer(myDistricts)

    map.on('click', this.props.handleClick)

    const newState = { map, markers, myDistricts }

    if (this.props.paramsData) {
      const { lat, lng } = this.props.paramsData
      newState.lat = lat
      newState.lng = lng
    }
    this.setState(Object.assign({}, this.state, newState))
    this.props.resetMap()
  }

  componentDidUpdate (prevProps) {
    this.props = Object.assign({}, prevProps, this.props)
    const { lat, lng } = this.state
    if (lat && lng) {
      this.props.positionSet(lat, lng)
    }
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

const Map = withRouter(({history, stateDistricts, paramsData}) => (
  <JustMap history={history} stateDistricts={stateDistricts} paramsData={paramsData} />
))

export default Map
