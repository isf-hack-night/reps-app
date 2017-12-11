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

    const phonePattern = /(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})/
    const phoneNums = flexBodyMd.match(phonePattern)
    const phoneNum = phoneNums ? <PhoneLink num={phoneNums[0]} size='large' /> : ''

    const scriptData  =  flexBodyMd.split('#Background')[0].split('#Script')[1]

    const backgroundData =  flexBodyMd.split('#Background')[1]
    const displayBackground =  backgroundData ? 'display:block;' : 'display:none;'

    //TODO known issue - doesn't handle markdown links 
    const callBackgroundParagraphs = backgroundData ?
          backgroundData.split('\n')
          .filter(para => para.length)
          .map(para => <p>{para}</p>)
          :''
    //console.log( callBackgroundParagraphs)
    //NOTE - not guaranteed to work for all flex actions, just parsing for calls to non-local reps

    return (
      <div className="ActionInfo">

        <div className="ActionInfo-header">{preTitle} {title}</div>
        {phoneNum}
        <div>&nbsp;</div>
        <Panel className="ActionInfo-CallScript" header="Call script">
          {scriptData}
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

export default FlexActionInfo
