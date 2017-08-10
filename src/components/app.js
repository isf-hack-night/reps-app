import { h, Component } from 'preact'
import Map from './map'
import Display from './display'
import AutocompleteContainer from './autocomplete'
import RepsWrapper from './reps'
import connector from '../connector'
const mapDisplayConnect = connector()
// import OpenStatesAPI from '../openstates'
// let locOpenStates = new OpenStatesAPI.LocalOpenStates()
// let districts = locOpenStates.getDistricts('ca')
// let stateDistricts = new OpenStatesAPI.DistrictList(districts, 'ca', locOpenStates)
// stateDistricts.preloadDistricts()
// let map = MargitMap
// map.initMap(updatePoint)

// function findDistricts (lat, lon) {
//   return stateDistricts.findDistrictsForPoint(lat, lon)
// }
// function updatePoint(lat, lon) {
//   let districtData = stateDistricts.findDistrictsForPoint(lat, lon)
//   map.zoomDistrict(districtData, lat, lon)
//   listings.listStuff(districtData)
// }

// function sharedState () {
//   function updatePoint
// }


class App extends Component {
  render() {
    return (
      <div className="Reps_App">
        <Map connector={mapDisplayConnect} />
        <Display>
          <AutocompleteContainer updatePoint={mapDisplayConnect.updatePoint} />
          <RepsWrapper registerWithConnector={mapDisplayConnect.register} />
        </Display>
      </div>
    )
  }
}

export default App
