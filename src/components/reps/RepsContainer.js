import React from 'react';
import amplify from 'amplify';
import ActionDashboard from 'components/actions/ActionDashboard';
import {TEST_CUSTOM_ACTION} from 'local_constants';


class RepsContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isLoading: true
    };

    this.makeAmplifyRequestAndUpdate();
  }

  makeAmplifyRequestAndUpdate () {
    const { districtLower, districtUpper, legIdLower, legIdUpper } = this.props;
    amplify().get(districtLower, districtUpper)
             .then((response, outcome) => {
               const stateUpdates = {
                 successfulResponse: outcome === 'success',
                 isLoading: false,
                 ampData: response.concreteActions

               };
               stateUpdates.districtLower = districtLower;
               stateUpdates.districtUpper = districtUpper;
               stateUpdates.legIdUpper = legIdUpper;
               stateUpdates.legIdLower = legIdLower;
               const newState = Object.assign({}, this.state, stateUpdates);
               this.setState(newState)
             })
  }

  componentWillReceiveProps (prevProps) {
    if (!this.state.isLoading && this.hasNewDistrictProps(prevProps)) {
      // setState call here will trigger componentDidUpdate and thus makeAmplifyGetRequestAndUpdate
      this.setState(Object.assign({}, this.state, { isLoading: true }))
    }
  }

  hasNewDistrictProps (prevProps) {
    const { districtLower, districtUpper } = this.props;
    return districtLower !== prevProps.districtLower || districtUpper !== prevProps.districtUpper;
  }

  componentDidUpdate () {
    if (this.state.isLoading) {
      this.makeAmplifyRequestAndUpdate()
    }
  }

  render () {
    if (!this.state.isLoading && this.state.successfulResponse) {
      const { ampData, districtLower, districtUpper, legIdLower, legIdUpper } = this.state;
     // const testAmpData =   [TEST_CUSTOM_ACTION].concat( ampData)   //TEMP
      return <ActionDashboard ampData={ampData} districtLower={districtLower} districtUpper={districtUpper} legIdUpper={legIdUpper} legIdLower={legIdLower} />      
    } else if (this.state.isLoading) {
      //TODO: better spinny gif
      return <img src="https://static.fjcdn.com/gifs/Awesome_13a9db_5343455.gif" style={{width: '75px'}} />
    } else {
      return <h4>Something broke. Sad! Try refreshing the page.</h4>
    }
  }
}

export default RepsContainer
