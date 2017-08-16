import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import API_KEYS from '../KEYS'
import queryAPI from '../query_api'
import { ROOT_PATH, US_STATE, STATE_CENTER, STATE_BOUNDS } from '../constants'
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
    this.updateRoute(lat, lng)
  }

  resetMap () {
    this.state.markers.clearLayers()
    this.state.myDistricts.clearLayers()
    this.state.map.flyToBounds(STATE_BOUNDS)
  // document.getElementById('autocomplete').value = '';
  }

  updateRoute (lat, lng) {
    const districtsData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    console.log('response: ', districtsData)
    const lowerId = districtsData.lower.id
    const upperId = districtsData.upper.id
    const newRoute = queryAPI.build({
      lat,
      lng,
      districtLower: lowerId,
      districtUpper: upperId
    })
    // const newRoute = [
    //   ROOT_PATH,
    //   `?lat=${lat}`,
    //   `&lng=${lng}`,
    //   `&districtLower=${lowerId}`,
    //   `&districtUpper=${upperId}`
    // ].join('')
    {/*var newRoute = `${ROOT_PATH}${routeQuery}`*/}
    console.log('autocomplete route: ', newRoute)
    this.props.history.push(newRoute)
  }

  positionSet (lat, lng) {
    this.state.markers.clearLayers()
    const marker = L.marker([lat,lng], { draggable: true })
      
    marker.on('dragend', this.handleDrag)

    this.state.markers.addLayer(marker)
    
    const districtData = this.props.stateDistricts.findDistrictsForPoint(lat, lng)
    if (districtData.upper || districtData.lower) {
      this.zoomDistrict(districtData)  //make this a callback
    } else {
      this.state.myDistricts.clearLayers()
    }
  }

  zoomDistrict (districtData) {
    const bbox = districtData.upper.bbox  //TODO get bbox of both bboxes

    const drawNewDistrict = true
    this.state.map.flyToBounds(bbox)

    this.state.myDistricts.clearLayers()
    this.drawDistrict(districtData.upper, 'blue')
    this.drawDistrict(districtData.lower, 'red')
  }

  drawDistrict (district, districtColor) {
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

    for (let i = 0; i < shape.length; i++) { 
      const boundary = shape[i][0].slice(1).map(x => [x[1], x[0]] )  //assumes no donuts
      shape[i] = boundary
    }

    const polygon = L.polygon(shape, { color: districtColor })
    this.state.myDistricts.addLayer(polygon)  //todo name layer ?
  }

  componentDidMount () {
    // aka init map
    L.mapbox.accessToken = API_KEYS.mapbox
    const map = L.mapbox.map('map', 'mapbox.light')
    map.fitBounds(STATE_BOUNDS)

    const markers = L.featureGroup()
    map.addLayer(markers)

    const myDistricts = L.layerGroup()
    map.addLayer(myDistricts)

    map.on('click', this.handleClick)

    const newState = { map, markers, myDistricts }

    // this setState will trigger componentDidUpdate thus positionSet
    this.setState(Object.assign({}, this.state, newState))
    this.resetMap()
  }

  componentDidUpdate (prevProps) {
    const { lat, lng } = this.props.paramsData
    if (lat && lng) {
      this.positionSet(lat, lng)
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
