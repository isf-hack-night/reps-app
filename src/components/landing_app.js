import { h, Component } from 'preact'
import Map from './map'
import ActionPage from './action_page'
import CTABanner from './cta_banner'
import MapWrapper from './map_wrapper'
import MapHeader from './map_header'
import RepsWrapper from './reps_wrapper'
import queryAPI from '../query_api'
import { US_STATE, DATA_FINE_PRINT } from '../local_constants'
import OpenStatesAPI from '../openstates'
import AutocompleteContainer from './autocomplete'

class LandingApp extends Component {
  constructor(props) {
    super(props);
    this.open_states = new OpenStatesAPI.OpenStates('no_key_required');
    this.state = {
      stateDistricts: null
    };
  }

  componentDidMount() {
    const districts = this.open_states.getDistricts(US_STATE);
    const stateDistricts = new OpenStatesAPI.DistrictList(districts, US_STATE, this.open_states);
    stateDistricts.preloadDistricts(() => this.setState({stateDistricts: stateDistricts}))
  }

  render() {
    if (!this.state.stateDistricts) {
      return <div>Loading</div>;
    }
    const paramsData = queryAPI.parse()
    const locationData = undefined
   
    let display_head
    let display_right
    const shouldDisplayAction = paramsData && paramsData.actionId
    const shouldDisplayRepsAndActions = paramsData
    if (shouldDisplayAction) {
      // TODO: add action display page
      display_right = (
        <div className="DisplayRight">
          <ActionPage {...paramsData} />
        </div>
      )
    } else if (shouldDisplayRepsAndActions) {
      display_right = (
        <div className="DisplayRight">
          <RepsWrapper {...paramsData} />
        </div>
      )
    }
    // only show DisplayHead and DisplayRight if we don't have valid
    // map data (like, for instance, the "districtLower" parameter
    if (!paramsData || !(paramsData.districtLower)) {
      display_head = (
        <div className="DisplayHead">
          <CTABanner />
        </div>
      )
      display_right = (
        <div className="DisplayRight">
          <div className="Tagline_text">Hold your State Representatives accountable!</div>
          <br></br>
          <div className="FindActionsText">Find actions YOU can take based on your State Senate and Assembly districts:</div>
            <AutocompleteContainer locationData={locationData} stateDistricts={this.state.stateDistricts} />
          <div className="DataDisclaimer">{DATA_FINE_PRINT}</div>
        </div>
      )
    }

    return (
      <div className="RepsApp">
        {display_head}
        <br></br>
        <MapWrapper paramsData={paramsData} locationData={locationData}>
          <MapHeader stateDistricts={this.state.stateDistricts} locationData={locationData} />
          <Map stateDistricts={this.state.stateDistricts} locationData={locationData} paramsData={paramsData} />
        </MapWrapper>
        {display_right}
      </div>
    )
  }
}

export default LandingApp
