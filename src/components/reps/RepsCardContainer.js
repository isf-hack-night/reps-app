import React from 'react';
import {withRouter} from 'react-router-dom';
import {COLORS, REP_PIC_PATH} from 'local_constants';
import PhoneLink from 'components/actions/PhoneLink';
import { Redirect } from 'react-router';
      


class RepsCard extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirectLink: null,
    };
  }

  goToRepPage(leg_id) {
    if (!leg_id) {
      return () => {};
    }
    return () => {
      let rep_link=`/politicians/${leg_id.toLowerCase()}`;
      this.setState({redirectLink: rep_link});
    };
  }

  render () {
    if (this.state.redirectLink) {
      return (<Redirect push to={this.state.redirectLink} />);
    }

    if(!this.props.rep) { return }
    const rep = this.props.rep.person;
    if (!rep) { return }

    const legId = this.props.rep.leg_id;
    const houseTitle = rep.chamber === 'H' ? 'State Assemblymember' : 'State Senator';
    const houseColor = rep.chamber === 'H' ?  COLORS.DISTRICT.LOWER : COLORS.DISTRICT.UPPER;
    const partyColor = rep.partyCode === 'D' ? COLORS.TEXT.BLUE : COLORS.TEXT.RED;

    const pixPath = REP_PIC_PATH + rep.photo;

    const repClass = rep.chamber === 'H'? "RepsCard RepCardLower" : "RepsCard RepCardUpper";

    if(rep.twitter) {
      return (
        <div className={repClass} onClick={this.goToRepPage(legId)} style={{border: `3px solid ${houseColor}`}}>
          <p> Your {houseTitle}: </p>
          <p> <span className="RepName"> {rep.legalName} (<span style={{color: partyColor}}>{rep.partyCode}</span>)</span></p>
          <div>
            <div className="RepImageWrapper">
              <img  src={pixPath} style={{border: `4px solid ${partyColor}`}}/>

            </div>
            <div className="RepsCard-info">
              <p>District {rep.district}</p>
              <PhoneLink num={rep.offices[0].phone} />
              <div className= "RepSocialWrapper">
                <a href={`${rep.website}`} alt="Homepage"><i className="fa fa-home fa-fw" aria-hidden="true" /></a>
                <a href={`${rep.twitter}`} alt="Twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true" /></a>
                <a href={`mailto:${rep.email}`} alt="Email"><i className="fa fa-envelope fa-fw" aria-hidden="true" /></a>
              </div>

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className={repClass} onClick={this.goToRepPage(legId)} style={{border: `3px solid ${houseColor}`}}>
          <p> Your {houseTitle}: </p>
          <p> <span className="RepName"> {rep.legalName} (<span style={{color: partyColor}}>{rep.partyCode}</span>)</span></p>
          <div>
            <div className="RepImageWrapper">
              <img  src={pixPath} style={{border: `4px solid ${partyColor}`}}/>

            </div>
            <div className="RepsCard-info">
              <p>District {rep.district}</p>
              <PhoneLink num={rep.offices[0].phone} />
              <div className= "RepSocialWrapper">
                <a href={`${rep.website}`} alt="Homepage"><i className="fa fa-home fa-fw" aria-hidden="true" /></a>
                <a href={`mailto:${rep.email}`} alt="Email"><i className="fa fa-envelope fa-fw" aria-hidden="true" /></a>
              </div>

            </div>
          </div>
        </div>
      )
    }
  }
}



            //commented out until read to populate with links
            //<a href={`mailto:${rep.email}`} ><i class="fa fa-envelope-square" aria-hidden="true" ></i></a>
            //<i class="fa fa-twitter-square" aria-hidden="true"></i>
            //<i class="fa fa-facebook-square" aria-hidden="true"></i>

// TODO: Move this to calling code. Make this a "dumb" component
const RepsCardContainer = withRouter(({history, rep}) => (
  <RepsCard
    rep={rep}
    goToRepPage={() => {
      // build rep page url using REPS_PATH
      // save rep data to localStorage?
      // history.push(url)
      let rep_link=`/politicians/${rep.leg_id.toLowerCase()}`;
      history.push(rep_link);
    }}
    />
));

export default RepsCardContainer
