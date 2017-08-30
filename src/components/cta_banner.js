import { h, Component } from 'preact'

class CTABanner extends Component {
  render() {
    const display = this.props.isVisible ? 'block' : 'none'

    return (
      <div className="CTABanner" styles={`display: ${display};`}>
        <p><span className="CTABanner-big_text">California</span> has the 6th largest economy in the world. </p>
        <p>As we lead the country in resisting the Trump agenda and
        promoting <span className="CTABanner-bold_text">progressive</span> policy, the nation will follow.</p>
      </div>
    )
  }
}

export default CTABanner
