import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import queryAPI from '../query_api'
import { Button } from 'react-bootstrap';


class JustBTAButton extends Component {
  constructor (props) {
    super(props)

    this.goToActionsList = this.goToActionsList.bind(this)
  }

  goToActionsList () {
    const { lat, lng, districtLower, districtUpper } = queryAPI.parse()
    const newRoute = queryAPI.build({
      lat,
      lng,
      districtLower,
      districtUpper,
    })
    this.props.history.push(newRoute)
  }

  render () {

    return (
      <Button className="BTAButton" onClick={this.goToActionsList} >
          &lt;&lt; Back To Actions List
      </Button>
    )
  }
}

const BackToActionsButton = withRouter(({history, action}) => (
  <JustBTAButton history={history} action={action} />
))

export default BackToActionsButton
