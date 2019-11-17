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
import Grid from 'material-ui/Grid';


class LandingApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stateDistricts: new StateStrong(),
      districtsData: {
        districtUpperId: "",
        districtLowerId: "",
        districtDataLower: {},
        districtDataUpper: {},
        actionId: "",
        legIdUpper: "",
        legIdLower: "",
      },
    };
  }

  finishDistrictDataUpdate(districtsData) {

    this.setState({districtsData: {
      districtDataUpper: districtsData.upper,
      districtIdUpper: districtsData.upper.id,
      districtDataLower: districtsData.lower,
      districtIdLower: districtsData.lower.id,
      legIdUpper: districtsData.legIdUpper,
      legIdLower: districtsData.legIdLower,
    }});
    const lowerId = districtsData.lower.id;

    const upperId = districtsData.upper.id;
    const newRoute = queryAPI.build({
      districtLower: lowerId,
      districtUpper: upperId,
      legIdUpper: districtsData.legIdUpper,
      legIdLower: districtsData.legIdUpper,
    });
    this.props.history.push(newRoute);
  }

  handleUpdateDistrictIDs(upperId, lowerId) {
    if (this.state.districtsData.districtIdUpper == upperId && this.state.districtsData.districtIdLower == lowerId) {
      return;
    }
    this.state.stateDistricts.fetchUpperLowerDistrictBoundariesByDistrictIds(upperId, lowerId).then(districtsData => (this.finishDistrictDataUpdate(districtsData)));
  }

  createHandleUpdateLocationCallback() {
    let that = this;
    return function(lat, lon) {
      that.state.stateDistricts.fetchUpperLowerDistrictBoundariesByLocation(lat, lon).then(districtsData => (that.finishDistrictDataUpdate(districtsData)));
    };
  }

  componentDidMount() {
    let paramsParsed = queryAPI.parse(this.props.location.search);
    if (!paramsParsed || (this.state.districtsData.districtUpperId == paramsParsed.districtUpper && this.state.districtsData.districtLowerId == paramsParsed.districtLower)) {
      return;
     
    }
    this.handleUpdateDistrictIDs(paramsParsed.districtUpper, paramsParsed.districtLower);
  }

  getParamsDataFromState() {
    let paramsData = {};
    const districts = this.state.districtsData;
    if (districts.districtIdUpper && districts.districtIdLower && districts.legIdUpper && districts.legIdLower) {
      paramsData.districtLowerId = districts.districtIdLower;
      paramsData.districtUpperId = districts.districtIdUpper;
      paramsData.legIdLower = districts.legIdLower;
      paramsData.legIdUpper = districts.legIdUpper;
    }
    return paramsData;
  }

  render() {
    if (!window.google) {
      return <div>Can't display maps: Missing connection to google</div>;
    }
    let paramsData = this.getParamsDataFromState();

    let display_head;
    let display_right;
    const shouldDisplayAction = paramsData.districtUpperId && paramsData.actionId;
    if (paramsData) {
      display_right = (
        <div >
          <RepsContainer {...paramsData} />
        </div>
      )
    }
    // only show DisplayHead and DisplayRight if we don't have valid
    // map data (like, for instance, the "districtLower" parameter
    if (!paramsData || !(paramsData.districtLowerId)) {
      display_head = (
        <div >
          <CTABanner />
        </div>
      );
      display_right = (
        <div >
          <div className="Tagline_text">Hold your State Representatives accountable!</div>
          <br></br>
          <div className="FindActionsText">Find actions YOU can take based on your State Senate and Assembly districts:</div>
            <AddressAutocompleteContainer updateLocation={this.createHandleUpdateLocationCallback()} />
          <div className="DataDisclaimer">{DATA_FINE_PRINT}</div>
        </div>
      )
    }
    const header = paramsData ? <MapHeader updateLocation={this.createHandleUpdateLocationCallback()} /> : null;
    
    return (
      <Grid className="RepsApp" container spacing={24}>
        <Grid item xs={12}>
          {display_head}
        
        </Grid>
        <Grid item xs={12} md={6}>
          {header}
          <DistrictMapContainer updateLocation={this.createHandleUpdateLocationCallback()} districtsData={this.state.districtsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          {display_right}
        </Grid>
      </Grid>
    )
  }
}

export default LandingApp
