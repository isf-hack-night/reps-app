import { h, Component } from 'preact'
import PhoneLink from './phone_link'
import BackToActionsButton from './back_actions_button'
import { Panel , Button, Accordion} from 'react-bootstrap';

class ActionInfo extends Component {





  render () {
    const {
      preTitle,
      title,
      person,
      callScriptMd,
      callBackgroundMd
    } = this.props
    console.log('callBackgroundMd: ', callBackgroundMd)
    console.log('split? ', callBackgroundMd.split('\n'))
    const callBackgroundParagraphs = callBackgroundMd
      .split('\n')
      .filter(para => para.length)
      .map(para => <p>{para}</p>)

    return (
      <div className="ActionInfo">
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
        <BackToActionsButton/>


      </div>
    )
  }
}

export default ActionInfo
