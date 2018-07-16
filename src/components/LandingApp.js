import React from 'react';
import DistrictMapContainer from 'components/map/DistrictMapContainer';
import ActionPage from 'components/actions/ActionPage';
import CTABanner from 'components/CTABanner';
import MapHeader from 'components/map/DistrictMapHeader';
import RepsContainer from 'components/reps/RepsContainer';
import StateStrong from 'api/StateStrong';
import queryAPI from 'queryAPI';
import { US_STATE, DATA_FINE_PRINT } from 'local_constants';
import AddressAutocompleteContainer from 'components/map/AddressAutoCompleteContainer';

class LandingApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateDistricts: new StateStrong(),
    };
  }

  render() {
    const paramsData = queryAPI.parse();
    const locationData = undefined;
   
    let display_head;
    let display_right;
    const shouldDisplayAction = paramsData && paramsData.actionId;
    if (shouldDisplayAction) {
      // TODO: add action display page
      display_right = (
        <div className="DisplayRight">
          <ActionPage {...paramsData} />
        </div>
      )
    } else if (paramsData) {
      display_right = (
        <div className="DisplayRight">
          <RepsContainer {...paramsData} />
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
      );
      display_right = (
        <div className="DisplayRight">
          <div className="Tagline_text">Hold your State Representatives accountable!</div>
          <br></br>
          <div className="FindActionsText">Find actions YOU can take based on your State Senate and Assembly districts:</div>
            <AddressAutocompleteContainer locationData={locationData} stateDistricts={this.state.stateDistricts} />
          <div className="DataDisclaimer">{DATA_FINE_PRINT}</div>
        </div>
      )
    }
    const header = paramsData ? <MapHeader stateDistricts={this.state.stateDistricts} locationData={locationData} /> : null;
    
    return (
      <div className="RepsApp">
        {display_head}
        <br></br>
        {header}
        <DistrictMapContainer stateDistricts={this.state.stateDistricts} locationData={locationData} paramsData={paramsData} />
        {display_right}
      </div>
    )
  }
}

export default LandingApp
