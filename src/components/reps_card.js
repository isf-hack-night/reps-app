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

    console.log(rep)

    return (
      <div className="RepsCard" onClick={this.props.goToRepPage} style={`border: 3px solid ${houseColor};`}>
        <h5>Your {houseTitle} is: </h5>
        <h4> {rep.legalName} (<span style={`color: ${partyColor};`}>{rep.partyCode}</span>)</h4>
        <div>
          <div className="RepImageWrapper">
            <img  src={CAP_PIC} style={`border: 1px solid ${partyColor};`}/>

          </div>
          <div className="RepsCard-info">
            <p>District: {rep.district}</p>
            <p><i class="fa fa-phone fa-fw" aria-hidden="true"></i> {rep.offices[0].phone}</p>
            <div className= "RepSocialWrapper">
              <a href={`${rep.website}`} alt="Homepage"><i class="fa fa-home fa-fw" aria-hidden="true"></i></a>
              <a href={`${rep.twitter}`} alt="Twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></a>
              <a href={`mailto:${rep.email}`} alt="Email"><i class="fa fa-envelope fa-fw" aria-hidden="true"></i></a>
            </div>

          </div>
        </div>
      </div>
    )
  }
}


            //commented out until read to populate with links
            //<a href={`mailto:${rep.email}`} ><i class="fa fa-envelope-square" aria-hidden="true" ></i></a>
            //<i class="fa fa-twitter-square" aria-hidden="true"></i>
            //<i class="fa fa-facebook-square" aria-hidden="true"></i>


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
