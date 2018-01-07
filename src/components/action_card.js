import React from 'react';
import {withRouter} from 'react-router-dom';
import queryAPI from '../query_api';
import Icon from 'material-ui/Icon';
import { ListItem } from 'material-ui/List';


class ActionDetails extends React.Component {
  constructor (props) {
    super(props);

    this.goToActionPage = this.goToActionPage.bind(this)
  }

  goToActionPage () {
    const { districtLower, districtUpper } = queryAPI.parse();
    const newRoute = queryAPI.build({
      districtLower,
      districtUpper,
      actionId: this.props.action.id
    });
    this.props.history.push(newRoute)
  }

  render () {
    const action = this.props.action;
    const icon = action.type === 'call' ? 'State Assemblymember' : 'State Senator';
    return (
      <ListItem onClick={this.goToActionPage}>
        <Icon className='fa fa-phone'/>
        <h5>{action.preTitle}</h5>
        <div>{action.title}</div>
      </ListItem>
    )
  }
}

const ActionCard = withRouter(({history, action}) => (
  <ActionDetails history={history} action={action} />
));

export default ActionCard
