import { h, Component } from 'preact'
import { ACTIONS_DISPLAY_LIMIT, ACTIONS_DISPLAY_INCREMENT } from '../local_constants'
import ActionCard from './action_card'
import { Panel, ListGroup, Button } from 'react-bootstrap';

class ActionsDisplay extends Component {
  constructor (props) {
    super(props)

    this.setState({
      actionsNum: ACTIONS_DISPLAY_LIMIT
    })

    this.loadMoreActions = this.loadMoreActions.bind(this)
  }

  loadMoreActions () {
    const currentShown = this.state.actionsNum
    const newNum = currentShown < ACTIONS_DISPLAY_INCREMENT 
      ? ACTIONS_DISPLAY_INCREMENT
      : currentShown + ACTIONS_DISPLAY_INCREMENT
    const newState = Object.assign({}, this.state, { actionsNum: newNum })
    this.setState(newState)
  }

  render () {
    const actionsList = this.props.actions.slice(0, this.state.actionsNum)
                                          .map(action => <ActionCard action={action} />)

    const loadMoreButton = this.props.actions.length > this.state.actionsNum
      ? (
        <Button block
          className="ActionsDisplay-loadMore"
          onClick={this.loadMoreActions}>
          More actions
        </Button>
      ) : ''


    return (
      <Panel header="Take Action" className="ActionsDisplay">
        <ListGroup  >
          {actionsList}
        </ListGroup>
        {loadMoreButton}
      </Panel>
    )
  }
}

export default ActionsDisplay
