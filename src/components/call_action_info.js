import { h, Component } from 'preact'
import PhoneLink from './phone_link'
import BackToActionsButton from './back_actions_button'
import { Panel , Button, Accordion} from 'react-bootstrap';

class CallActionInfo extends Component {

  render () {
    const {
      preTitle,
      title,
      person,
      callScriptMd,
      callBackgroundMd
    } = this.props

    const displayBackground =  callBackgroundMd ? 'display:block;' : 'display:none;'

    const callBackgroundParagraphs = callBackgroundMd ?
        callBackgroundMd.split('\n')
          .filter(para => para.length)
          .map(para => <p>{para}</p>)
        : ''

    console.log( person.offices[0].phone)

    return (
      <div className="ActionInfo">
        <div className="ActionInfo-header">{preTitle} {title}</div>
        <PhoneLink num={person.offices[0].phone} size='large' /> 
        <div>&nbsp;</div>
        <Panel className="ActionInfo-CallScript" header="Call script">
          {callScriptMd}
        </Panel>
        <br></br>
        <div style={displayBackground} >
          <Accordion defaultActiveKey='0'>
          <Panel header='Learn More About This Bill' >
            {callBackgroundParagraphs}
          </Panel>
          </Accordion>
        </div>
        <br></br>
        <BackToActionsButton/>


      </div>
    )
  }
}

export default CallActionInfo
