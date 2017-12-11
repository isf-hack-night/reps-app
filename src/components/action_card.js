import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import queryAPI from '../query_api'
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List'


class ActionDetails extends Component {
  constructor (props) {
    super(props)

    this.goToActionPage = this.goToActionPage.bind(this)
  }

  goToActionPage () {
    const { districtLower, districtUpper } = queryAPI.parse()
    const newRoute = queryAPI.build({
      districtLower,
      districtUpper,
      actionId: this.props.action.id
    })
    this.props.history.push(newRoute)
  }

  render () {
    const action = this.props.action
    const icon = action.type === 'call' ? 'State Assemblymember' : 'State Senator'
    return (
      <ListItem 
        onClick={this.goToActionPage}
        leftIcon={<FontIcon className='fa fa-phone'/>}
        primaryText={`${action.preTitle}`} 
        secondaryText={`${action.title}`} >
        </ListItem>
    )
  }
}

const ActionCard = withRouter(({history, action}) => (
  <ActionDetails history={history} action={action} />
))

export default ActionCard
