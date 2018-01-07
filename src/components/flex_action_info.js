import React from 'react';
import PhoneLink from './phone_link';
import BackToActionsButton from './back_actions_button';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class FlexActionInfo extends React.Component {


  render () {
    const {
      preTitle,
      title,
      flexBodyMd
    } = this.props;

    const phonePattern = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/;
    const phoneNums = flexBodyMd.match(phonePattern);
    const phoneNum = phoneNums ? <PhoneLink num={phoneNums[0]} size='large' /> : '';

    const scriptData  =  flexBodyMd.split('#Background')[0].split('#Script')[1];

    const backgroundData =  flexBodyMd.split('#Background')[1];
    const displayBackground =  backgroundData ? 'display:block;' : 'display:none;';

    //TODO known issue - doesn't handle markdown links 
    const callBackgroundParagraphs = backgroundData ?
          backgroundData.split('\n')
          .filter(para => para.length)
          .map(para => <p>{para}</p>)
          :'';
    //console.log( callBackgroundParagraphs)
    //NOTE - not guaranteed to work for all flex actions, just parsing for calls to non-local reps

    return (
      <div className="ActionInfo">

        <div className="ActionInfo-header">{preTitle} {title}</div>
        {phoneNum}
        <div>&nbsp;</div>
        <div className="ActionInfo-CallScript" header="Call script">
          {scriptData}
        </div>
        <br></br>
        <div style={displayBackground} >
          <Card>
            <CardHeader
              title="Learn More About This Bill"
              //subtitle="Subtitle"
              actAsExpander={true}
              showExpandableButton={true} />
            <CardText expandable={true}>
               {callBackgroundParagraphs}
            </CardText>
          </Card>
        </div>
        <br></br>

        <BackToActionsButton/>

      </div>
    )
  }
}

export default FlexActionInfo
