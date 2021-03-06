import React from 'react';
import utils from 'utils';

class PhoneLink extends React.Component {
  render () {
    const teleNum = utils.parseTeleNum(this.props.num);


    if (!teleNum) { return }
    //const action = utils.isOnMobile() ?  'tel:${teleNum}' : 'callto:${teleNum}' 

    const action =  'tel:'.concat(teleNum);
   // console.log(action) 


    return <a className="PhoneLink" href={action}  >
    	<i className="fa fa-phone fa-fw" aria-hidden="true">
    	</i> 
    	{this.props.num} 
    	</a>
  }
}

export default PhoneLink
