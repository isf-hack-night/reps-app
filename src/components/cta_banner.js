import {Component} from 'preact';

class CTABanner extends Component {
  render() {
    const display = this.props.isVisible ? 'block' : 'none';

    return (
      <div className="CTABanner" styles={`display: ${display};`}>

        Resisting the Trump agenda and promoting progressive policy starts at home. 
        Find out how you can influence your State Representatives to make
        <span className="CTABanner-state_text"> California </span>take the lead.

      </div>
    )
  }
}

export default CTABanner
