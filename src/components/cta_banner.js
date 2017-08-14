import { h, Component } from 'preact'

class CTABanner extends Component {
  render() {
    const display = this.props.isVisible ? 'block' : 'none'

    return (
      <div className="cta-banner" styles={`display: ${display};`}>
        <p><span className="cta-big-text">California</span> has the 6th largest economy in the world. </p>
        <p>As we lead the country in resisting the Trump agenda and</p>
        <p>promoting <span className="cta-bold-text">progressive</span> policy, the nation will follow.</p>
      </div>
    )
  }
}

export default CTABanner
