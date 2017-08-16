import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import queryAPI from '../query_api'

class ActionDetails extends Component {
  constructor (props) {
    super(props)

    this.goToActionPage = this.goToActionPage.bind(this)
  }

  goToActionPage () {
    const { lat, lng, districtLower, districtUpper } = queryAPI.parse()
    const newRoute = queryAPI.build({
      lat,
      lng,
      districtLower,
      districtUpper,
      actionId: this.props.action.id
    })
    this.props.history.push(newRoute)
  }

  render () {
    const action = this.props.action
    return (
      <div className="action-card" onClick={this.goToActionPage}>
        <p>{`${action.preTitle} ${action.title}`}</p>
      </div>
    )
  }
}

const ActionCard = withRouter(({history, action}) => (
  <ActionDetails history={history} action={action} />
))

export default ActionCard
