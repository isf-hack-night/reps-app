import React from 'react';
import {withRouter} from 'react-router-dom';
import utils from 'utils';

class AddressAutocomplete extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      uuid: utils.generateUUID()
    };

    this.updateLocation = props.updateLocation;
    this.getPlace = this.getPlace.bind(this);
    this.geolocate = this.geolocate.bind(this)
  }

  geolocate () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        this.state.autocomplete.setBounds(circle.getBounds())
      })
    }
  }

  getPlace () {
    const place = this.state.autocomplete.getPlace();

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    this.updateLocation(lat, lng)
  }

  componentDidMount () {
    const autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById(this.state.uuid)),
            {types: ['geocode']});

    autocomplete.addListener('place_changed', this.getPlace);

    const newState = Object.assign({}, this.state, { autocomplete });
    this.setState(newState)
  }

  render () {
    return (
      <input
        id={this.state.uuid}
        className="AddressAutocomplete"
        placeholder="Enter your address or click on map"
        type="text"
        onFocus={this.geolocate}
      />
    )
  }
}

// TODO: Move this to calling code. Make this a "dumb" component
const AddressAutocompleteContainer = withRouter(({updateLocation}) => (
  <AddressAutocomplete updateLocation={updateLocation} />
));

export default AddressAutocompleteContainer
