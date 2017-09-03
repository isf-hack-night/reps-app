import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { REPS_PATH, CAP_PIC, COLORS } from '../constants'

class RepsCardBase extends Component {
  render () {
    const rep = this.props.rep.person
    if (!rep) { return }

    const houseTitle = rep.chamber === 'H' ? 'State Assemblymember' : 'State Senator'
    const houseColor = rep.chamber === 'H' ?  COLORS.DISTRICT.LOWER : COLORS.DISTRICT.UPPER
    const partyColor = rep.partyCode === 'D' ? COLORS.TEXT.BLUE : COLORS.TEXT.RED

    return (
      <div className="RepsCard" onClick={this.props.goToRepPage} style={`border: 2px solid ${houseColor};`}>
        <h5>Your {houseTitle} is: {rep.prefix} {rep.legalName} (<span style={`color: ${partyColor};`}>{rep.partyCode}</span>)</h5>
        <div>
            <img  src={CAP_PIC} style={`border: 1px solid ${partyColor};`}/>
          <div className="RepsCard-info">
            
            <p>District: {rep.district}</p>
            <p>Phone: {rep.offices[0].phone}</p>
            <a href={`mailto:${rep.email}`}>Email</a>
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
