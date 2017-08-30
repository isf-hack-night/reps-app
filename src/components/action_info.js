import { h, Component } from 'preact'
import PhoneLink from './phone_link'

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
        <h3 className="ActionInfo-header">{preTitle} {title}</h3>
        <PhoneLink num={person.offices[0].phone} />
        <h4 className="ActionInfo-subheader">Call script</h4>
        <p>{callScriptMd}</p>
        <h4 className="ActionInfo-subheader">Background information</h4>
        <p>{callBackgroundParagraphs}</p>
      </div>
    )
  }
}

export default ActionInfo
