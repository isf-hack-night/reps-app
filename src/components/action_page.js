import { h, Component } from 'preact'
import queryAPI from '../query_api'
import amplify from '../amplify'
import CallActionInfo from './call_action_info'
import FlexActionInfo from './flex_action_info'
import {TEST_CUSTOM_ACTION} from '../constants'


class ActionPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }

    this.makeAmplifyRequestAndUpdate()
  }

  makeAmplifyRequestAndUpdate () {
    const { districtLower, districtUpper } = this.props
    amplify().get(districtLower, districtUpper)
             .then((response, outcome) => {
               const stateUpdates = {
                 successfulResponse: outcome === 'success',
                 isLoading: false,
                 ampData: response.concreteActions   //[TEST_CUSTOM_ACTION].concat( response.concreteActions) //TEMP
               }
               stateUpdates.districtLower = districtLower
               stateUpdates.districtUpper = districtUpper
               const newState = Object.assign({}, this.state, stateUpdates)
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
    const { districtLower, districtUpper } = this.props
    return districtLower !== prevProps.districtLower || districtUpper !== prevProps.districtUpper
  }

  componentDidUpdate () {
    if (this.state.isLoading) {
      this.makeAmplifyRequestAndUpdate()
    }
  }

  render () {
    if (!this.state.isLoading && this.state.successfulResponse) {
      const { actionId } = queryAPI.parse()
      const action = this.state.ampData.find((action) => action.id === actionId)
      if (action) {
            switch (action.type){
              case 'call' :
                return <CallActionInfo {...action} />
              default :
                return <FlexActionInfo {...action} />
              }
      } else {
        return <h4>Something broke. Sad! Try refreshing the page.</h4>
      }
    } else if (this.state.isLoading) {
      //TODO: better spinny gif
      return <img src="https://static.fjcdn.com/gifs/Awesome_13a9db_5343455.gif" style="width: 75px;" />
    } else {
      return <h4>Something broke. Sad! Try refreshing the page.</h4>
    }
  }
}

export default ActionPage
