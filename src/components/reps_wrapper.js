import { h, Component } from 'preact'
import amplify from '../amplify'
import ActionDashboard from './action_dashboard'

function handleAmplifyResponse (response, outcome) {
  return {
    successfulResponse: outcome === 'success',
    isLoading: false,
    ampData: response.concreteActions
  }
}

class RepsWrapper extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: true
    }

    amplify().get(this.props.districtLower, this.props.districtUpper)
          .then((response, outcome) => {
            const stateUpdates = handleAmplifyResponse(response, outcome)
            stateUpdates.districtLower = this.props.districtLower,
            stateUpdates.districtUpper = this.props.districtUpper
            const newState = Object.assign({}, this.state, stateUpdates)
            this.setState(newState)
          })
  }

  // componentWillUpdate () {
  //   debugger
  //   this.setState(Object.assign({}, this.state, { isLoading: true }))
  // }

  componentWillReceiveProps () {
    this.setState(Object.assign({}, this.state, { isLoading: true, successfulResponse: false }))
    amplify().get(this.props.districtLower, this.props.districtUpper)
             .then((response, outcome) => {
               const stateUpdates = handleAmplifyResponse(response, outcome)
               stateUpdates.districtLower = this.props.districtLower,
               stateUpdates.districtUpper = this.props.districtUpper
               const newState = Object.assign({}, this.state, stateUpdates)
               debugger
               this.setState(newState)
             })
  }

  render () {
    console.log('reps state: ', this.state)
    if (!this.state.isLoading && this.state.successfulResponse) {
      const { ampData, districtLower, districtUpper } = this.state
      return <ActionDashboard ampData={ampData} districtLower={districtLower} districtUpper={districtUpper} />      
    } else if (this.state.isLoading) {
      //TODO: better spinny gif
      return <img src="https://static.fjcdn.com/gifs/Awesome_13a9db_5343455.gif" style="width: 75px;" />
    } else {
      return <h4>Something broke. Sad! Try refreshing the page.</h4>
    }
  }
}

export default RepsWrapper
