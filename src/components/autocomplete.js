import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { ROOT_PATH } from '../constants'

class Autocomplete extends Component {
  constructor (props) {
    super(props)

    this.props.getPlace = this.getPlace.bind(this)
    this.props.geolocate = this.geolocate.bind(this)
    this.props.getAndUpdatePlace = this.getAndUpdatePlace.bind(this)
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

    this.props.updateRoute(lat, lng)
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
    this.props.history.push(newRoute)
  }

  componentDidMount () {
    const autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('map-autocomplete')),
            {types: ['geocode']})

    autocomplete.addListener('place_changed', this.props.getPlace)

    const newState = Object.assign({}, this.state, { autocomplete })
    this.setState(newState)
  }

  componentDidUpdate (prevProps) {
    this.props = Object.assign({}, prevProps, this.props)
  }

  render () {
    return (
      <input id="map-autocomplete" placeholder="Enter your address" type="text" onFocus={this.props.geolocate}/>
    )
  }
}

const AutocompleteContainer = withRouter(({history, stateDistricts}) => (
  <Autocomplete history={history} stateDistricts={stateDistricts} />
))

export default AutocompleteContainer
