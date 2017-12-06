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

let openStates = new OpenStatesAPI.OpenStates('xxx');
let districts = openStates.getDistricts(US_STATE);
let stateDistricts = new OpenStatesAPI.DistrictList(districts, US_STATE, openStates);
stateDistricts.preloadDistricts();

class LandingApp extends Component {
  render(props) {
    const paramsData = queryAPI.parse()
    const locationData = undefined
    // .getDistrictsByParams will get only the districts passed by query params but map will not be useable
    // let districts = locOpenStates.getDistrictsByParams(US_STATE, paramsData) // .getDistricts(US_STATE)
    // .getDistricts will get ALL districts so map will be useable
    // let districts = locOpenStates.getDistricts(US_STATE)
    //console.log('districts: ', districts)
    // let stateDistricts = new OpenStatesAPI.DistrictList(districts, US_STATE, locOpenStates)
    // stateDistricts.preloadDistricts()
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
            <AutocompleteContainer locationData={locationData} stateDistricts={stateDistricts} />
          <div className="DataDisclaimer">{DATA_FINE_PRINT}</div>
        </div>
      )
    }

    return (
      <div className="RepsApp">
        {display_head}
        <br></br>
        <MapWrapper paramsData={paramsData} locationData={locationData}>
          <MapHeader stateDistricts={stateDistricts} locationData={locationData} />
          <Map stateDistricts={stateDistricts} locationData={locationData} paramsData={paramsData} />
        </MapWrapper>
        {display_right}
      </div>
    )
  }
}

export default LandingApp
