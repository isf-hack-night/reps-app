import React from 'react';
import {
  ACTIONS_DISPLAY_INCREMENT,
  ACTIONS_DISPLAY_LIMIT
} from '../local_constants';
import ActionCard from './action_card';

import List from 'material-ui/List';
import Button from 'material-ui/Button';

class ActionsDisplay extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      actionsNum: ACTIONS_DISPLAY_LIMIT
    };

    this.loadMoreActions = this.loadMoreActions.bind(this)
  }

  loadMoreActions () {
    const currentShown = this.state.actionsNum;
    const newNum = currentShown < ACTIONS_DISPLAY_INCREMENT 
      ? ACTIONS_DISPLAY_INCREMENT
      : currentShown + ACTIONS_DISPLAY_INCREMENT;
    const newState = Object.assign({}, this.state, { actionsNum: newNum });
    this.setState(newState)
  }

  render () {
    const actionsList = this.props.actions.slice(0, this.state.actionsNum)
                                          .map((action, i) => <ActionCard key={i} action={action} />);

    const loadMoreButton = this.props.actions.length > this.state.actionsNum
      ? (
           <Button className="ActionsDisplay-loadMore" label="Display more actions" onClick={this.loadMoreActions} />
      ) : '';
      //todo else display fewer or make sure scrollable


    return (
      <div className="ActionsDisplay">
        <h3> Take Action </h3>
        <List>
          {actionsList}
        </List>
        {loadMoreButton}
      </div>
    )
  }
}

export default ActionsDisplay
