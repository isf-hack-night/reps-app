import { h, Component } from 'preact'
import Map from './map'
import Display from './display'
import CTABanner from './cta_banner'
import AutocompleteContainer from './autocomplete'
import RepsWrapper from './reps_wrapper'
import parseQuery from '../parse_query'
import { US_STATE } from '../constants'

import OpenStatesAPI from '../openstates'
let locOpenStates = new OpenStatesAPI.LocalOpenStates()
let districts = locOpenStates.getDistricts(US_STATE)
console.log('districts: ', districts)
let stateDistricts = new OpenStatesAPI.DistrictList(districts, US_STATE, locOpenStates)
stateDistricts.preloadDistricts()

class LandingApp extends Component {
  render() {
    const paramsData = parseQuery()
    const display = paramsData ? (
      <Display>
        <RepsWrapper {...paramsData} />
      </Display>
    ) : (
      <Display>
        <CTABanner />
        <h4>Enter your address below to find actions from your CA state legislators:</h4>
          <AutocompleteContainer stateDistricts={stateDistricts} />
        <h5>We do not retain any personal data, including your address.</h5>
      </Display>
    )

    return (
      <div className="Reps_App">
        <Map stateDistricts={stateDistricts} paramsData={paramsData} />
        {display}
      </div>
    )
  }
}

export default LandingApp
