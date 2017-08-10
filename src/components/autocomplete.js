import { h, Component } from 'preact'
import Autocomplete from 'react-google-autocomplete'
import { withRouter, Redirect } from 'react-router-dom'

const AutocompleteContainer = withRouter(({history, updatePoint}) => (
  // render () {
  //   return (
      <div className="autocomplete_container">
        <h4>Enter your address below to find actions from your CA state legislators:</h4>
        <Autocomplete
              style={{width: '60%'}}
              onPlaceSelected={(place) => {
                var tempKey = 'temp'
                var newPage = `/index.php/test/${tempKey}`
                {/*<Redirect to={{ pathname: newPage }} />*/}
                console.log('placeSelected: ', place)
                const lat = place.geometry.location.lat()
                const lon = place.geometry.location.lng()
                const districtsData = updatePoint(lat, lon)
                console.log('response: ', districtsData)
                {/*history.push(newPage)*/}
              }}
              types={['address']}
              componentRestrictions={{country: 'us'}}
          />
        <h5>We do not retain any personal data, including your address.</h5>
      </div>
    )
  // }
)
// }

export default AutocompleteContainer
