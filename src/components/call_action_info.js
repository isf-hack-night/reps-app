import React from 'react';
import PhoneLink from './phone_link';
import BackToActionsButton from './back_actions_button';
import Card, {CardHeader, CardContent} from 'material-ui/Card';

class CallActionInfo extends React.Component {

  render () {
    const {
      preTitle,
      title,
      person,
      callScriptMd,
      callBackgroundMd
    } = this.props;

    const displayBackground =  callBackgroundMd ? {display: 'block'} : {display: 'none'};

    const callBackgroundParagraphs = callBackgroundMd ?
        callBackgroundMd.split('\n')
          .filter(para => para.length)
          .map((para, i) => <p key={i}>{para}</p>)
        : '';

    return (
      <div className="ActionInfo">
        <div className="ActionInfo-header">{preTitle} {title}</div>
        <PhoneLink num={person.offices[0].phone} size='large' /> 
        <div>&nbsp;</div>
        <div className="ActionInfo-CallScript" header="Call script">
          {callScriptMd}
        </div>
        <br></br>
        <div style={displayBackground} >
          <Card>
            <CardHeader title="Learn More About This Bill"/>
            <CardContent>{callBackgroundParagraphs}</CardContent>
          </Card>
        </div>
        <br></br>
        <BackToActionsButton/>
      </div>
    )
  }
}

export default CallActionInfo
