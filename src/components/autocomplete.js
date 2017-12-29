import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { ROOT_PATH} from '../local_constants'
import utils from '../utils'
import queryAPI from '../query_api'

class Autocomplete extends Component {
  constructor (props) {
    super(props)

    this.state = {
      uuid: utils.generateUUID()
    }
    this.stateDistricts = props.stateDistricts

    this.getPlace = this.getPlace.bind(this)
    this.geolocate = this.geolocate.bind(this)
  }

  geolocate () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        })
        this.state.autocomplete.setBounds(circle.getBounds())
      })
    }
  }

  getPlace () {
    const place = this.state.autocomplete.getPlace()

    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    this.updateRoute(lat, lng)
  }

  //TODO need to pass latlong to map somehow
  updateRoute (lat, lng) {
    const districtsData = this.stateDistricts.findDistrictsForPoint(lat, lng)
    const lowerId = districtsData.lower.id
    const upperId = districtsData.upper.id
    const newRoute = queryAPI.build({
      districtLower: lowerId,
      districtUpper: upperId
    })
    this.props.history.push(newRoute)
    if (this.props.locationData) {
      this.props.locationData.push({lat: lat, lng: lng})  //TODO is this getting called
    }
  }

  componentDidMount () {
    const autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(this.state.uuid)),
            {types: ['geocode']})

    autocomplete.addListener('place_changed', this.getPlace)

    const newState = Object.assign({}, this.state, { autocomplete })
    this.setState(newState)
  }

  render () {
    return (
      <input
        id={this.state.uuid}
        className="Autocomplete"
        placeholder="Enter your address or click on map"
        type="text"
        onFocus={this.geolocate}
      />
    )
  }
}

const AutocompleteContainer = withRouter(({history, stateDistricts}) => (
  <Autocomplete history={history} stateDistricts={stateDistricts} />
))

export default AutocompleteContainer
