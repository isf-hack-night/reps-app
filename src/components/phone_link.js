import { h, Component } from 'preact'
import utils from '../utils'

class PhoneLink extends Component {
  render () {
    const teleNum = utils.parseTeleNum(this.props.num)
    if (!teleNum) { return }
    const action = utils.isOnMobile() ? `callto:${teleNum}` : `tel:${teleNum}`

    return <a className="PhoneLink" href={action}><i class="fa fa-phone fa-fw" aria-hidden="true"></i> {this.props.num}</a>
  }
}

export default PhoneLink
