import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { REPS_PATH, CAP_PIC, COLORS } from '../constants'

class RepsCardBase extends Component {
  render () {
    const rep = this.props.rep.person
    if (!rep) { return }

    const houseTitle = rep.chamber === 'H' ? 'State Assemblymember' : 'State Senator'
    const partyColor = rep.partyCode === 'D' ? COLORS.TEXT.BLUE : COLORS.TEXT.RED
    return (
      <div className="RepsCard" onClick={this.props.goToRepPage}>
        <h5>Your {houseTitle} is:</h5>
        <div>
          <img src={CAP_PIC}/>
          <div className="RepsCard-info">
            <p>{rep.prefix} {rep.legalName} (<span style={`color: ${partyColor};`}>{rep.partyCode}</span>)</p>
            <p>District: {rep.district}</p>
            <p>Phone: {rep.offices[0].phone}</p>
            <a href={`mailto:${rep.email}`}>{rep.email}</a>
          </div>
        </div>
      </div>
    )
  }
}

const RepsCard = withRouter(({history, rep}) => (
  <RepsCardBase
    rep={rep}
    goToRepPage={() => {
      // build rep page url using REPS_PATH
      // save rep data to localStorage?
      // history.push(url)
    }}
    />
))

export default RepsCard
