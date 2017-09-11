import { h, Component } from 'preact'
import utils from '../utils'

class PhoneLink extends Component {
  render () {
    const teleNum = utils.parseTeleNum(this.props.num)
    if (!teleNum) { return }
    const action = utils.isOnMobile() ?  'tel:${teleNum}' : 'callto:${teleNum' 
	// callto: doesn't work on andriod moile

    return <a className="PhoneLink" href={action}  >
    	<i class="fa fa-phone fa-fw" aria-hidden="true">
    	</i> 
    	{this.props.num} 
    	</a>
  }
}

export default PhoneLink
