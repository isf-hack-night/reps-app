import React from 'react';
import AutocompleteContainer from 'components/map/AddressAutoCompleteContainer';
import {DATA_FINE_PRINT} from 'local_constants';

class DistrictMapHeader extends React.Component {
  render () {
    return (
      <div className="DistrictMapHeader">
        <div className="DistrictMapHeader-left">
        {/* <h5>Change address:</h5> */}
          <AutocompleteContainer updateLocation={this.props.updateLocation} />
          <h6>{DATA_FINE_PRINT}</h6>
        </div>
        {/* TODO: make <MiniMap /> */}
      </div>
    )
  }
}

export default DistrictMapHeader
