import { h, Component } from 'preact'
import { withRouter } from 'react-router-dom'
import queryAPI from '../query_api'
//import { ListGroupItem } from 'react-bootstrap';
//import { List,Icon } from 'semantic-ui-react'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon';




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
      /*
      <List.Item className="ActionCard" onClick={this.goToActionPage} >
        
      <List.Icon name='phone' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a'>{`${action.preTitle}`}</List.Header>
        <List.Description as='a'>{`${action.title}`}</List.Description>
      </List.Content>

      </List.Item>
      */

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
