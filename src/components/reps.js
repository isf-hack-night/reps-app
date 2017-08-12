import { h, Component } from 'preact'

class RepsWrapper extends Component {
  constructor (props) {
    super(props)
    debugger
    const boundUpdate = this.setState.bind(this)

    function updateWrapper (data) {
      boundUpdate({
        districtData: data,
        isVisible: true
      })
    }

    this.props.registerWithConnector(updateWrapper)
  }

  render () {
    const visibility = this.state.isVisible ? 'block' : 'none'
    const styles = {
      display: visibility
    }
    const distData = this.state.districtData
    const lowerRep = distData ? distData.lower.legislators[0].full_name : ''
    const upperRep = distData ? distData.upper.legislators[0].full_name : ''
    return (
      <div style={styles}>
        <h4>Your Assemblymember is: {lowerRep}</h4>
        <h4>Your Senator is: {upperRep}</h4>
      </div>
    )
  }
}

export default RepsWrapper
