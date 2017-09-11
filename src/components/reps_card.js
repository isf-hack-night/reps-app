import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import { REPS_PATH, REP_PIC_PATH , COLORS } from '../constants'
import { Panel  } from 'react-bootstrap';
import PhoneLink from './phone_link'


class RepsCardBase extends Component {
  render () {
    const rep = this.props.rep.person
    if (!rep) { return }

    const houseTitle = rep.chamber === 'H' ? 'State Assemblymember' : 'State Senator'
    const houseColor = rep.chamber === 'H' ?  COLORS.DISTRICT.LOWER : COLORS.DISTRICT.UPPER
    const partyColor = rep.partyCode === 'D' ? COLORS.TEXT.BLUE : COLORS.TEXT.RED

    const pixPath = REP_PIC_PATH + rep.photo

    const repClass = rep.chamber === 'H'? "RepsCard RepCardLower" : "RepsCard RepCardUpper"

    console.log(rep)

    return (
      <div className={repClass} onClick={this.props.goToRepPage} style={`border: 3px solid ${houseColor};`}>
        <p> Your {houseTitle} is: </p>
        <p> <span className="RepName"> {rep.legalName} (<span style={`color: ${partyColor};`}>{rep.partyCode}</span>)</span></p>
        <div>
          <div className="RepImageWrapper">
            <img  src={pixPath} style={`border: 4px solid ${partyColor};`}/>

          </div>
          <div className="RepsCard-info">
            <p>District: {rep.district}</p>
            <PhoneLink num={rep.offices[0].phone} />
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
