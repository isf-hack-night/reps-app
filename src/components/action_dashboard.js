import { h, Component } from 'preact'
import RepsCard from './reps_card'
import ActionsDisplay from './actions_display'


class ActionDashboard extends Component {

  testAction (person, chamber, district) {
    //TODO: consider making this a util function
    if( person )
      return person.chamber === chamber && person.district === district
    else
      return false
  }

  render () {
    const numLower = this.props.districtLower.match(/\d+/g)[0]
    const numUpper = this.props.districtUpper.match(/\d+/g)[0]

    //TODO: consider making 'S' and 'H' constants... possibly connected to testAction as util function?
    let upperRep = this.props.ampData.find(action => this.testAction(action.person, 'S', numUpper)) || {}
    let lowerRep = this.props.ampData.find(action => this.testAction(action.person, 'H', numLower)) || {}

    // TODO: stop this spoof of 2 reps, change upperRep and lowerRep back to const
    if (!lowerRep.person && upperRep.person) {
      lowerRep = null
    } else if (!upperRep.person && lowerRep.person) {
      upperRep = null
    }

    return (
      <div className="ActionDashboard">
        <div className="RepsDisplay"> 
          <RepsCard rep={lowerRep} />
          <RepsCard rep={upperRep} />
        </div>
        <br></br>
        <ActionsDisplay actions={this.props.ampData} />
      </div>
    )
  }
}

export default ActionDashboard
