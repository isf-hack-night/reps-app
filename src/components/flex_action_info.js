import { h, Component } from 'preact'
import PhoneLink from './phone_link'
import BackToActionsButton from './back_actions_button'
import { Panel , Button, Accordion} from 'react-bootstrap';

class FlexActionInfo extends Component {


  render () {
    const {
      preTitle,
      title,
      flexBodyMd
    } = this.props


/*
       <div className="ActionInfo-header">{preTitle} {title}</div>
        <PhoneLink num={person.offices[0].phone} size='large' /> 
        <div>&nbsp;</div>
        <Panel className="ActionInfo-CallScript" header="Call script">
          {callScriptMd}
        </Panel>
        <br></br>
        <Accordion defaultActiveKey='0'>
        <Panel header='Learn More About This Bill' >
          {callBackgroundParagraphs}
        </Panel>
        </Accordion>
        <br></br>
        */

    return (
      <div className="ActionInfo">

     

        <BackToActionsButton/>


      </div>
    )
  }
}

export default FlexActionInfo
