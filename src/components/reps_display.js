import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { REPS_PATH, CAP_PIC } from '../constants'

class RepsCard extends Component {
  render () {
    const rep = this.props.rep.person
    if (!rep) { return }

    return (
      <div className="reps-display" onClick={this.props.goToRepPage}>
        <h5>Your State Senator is: {rep.legalName}</h5>
        <div>
          <img src={CAP_PIC} style="width: 75px;"/>
          <p>District {rep.district}</p>
          <p>Phone: {rep.offices[0].phone}</p>
          <p>Email: {rep.email}</p>
        </div>
      </div>
    )
  }
}

const RepsDisplay = withRouter(({history, rep}) => (
  <RepsCard
    rep={rep}
    goToRepPage={() => {
      // build rep page url using REPS_PATH
      // save rep data to localStorage?
      // history.push(url)
    }}
    />
))

export default RepsDisplay
