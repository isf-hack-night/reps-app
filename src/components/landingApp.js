import { h, Component } from 'preact'
import Map from './map'
import Display from './display'
import AutocompleteContainer from './autocomplete'
import RepsWrapper from './reps'
import connector from '../connector'
const mapDisplayConnect = connector()

class LandingApp extends Component {
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

export default LandingApp
