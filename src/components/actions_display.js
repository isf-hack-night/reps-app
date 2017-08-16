import { h, Component } from 'preact'
import { ACTIONS_DISPLAY_LIMIT, ACTIONS_DISPLAY_INCREMENT } from '../constants'
import ActionCard from './action_card'

class ActionsDisplay extends Component {
  constructor (props) {
    super(props)

    this.setState({
      actionsNum: ACTIONS_DISPLAY_LIMIT
    })

    // this.props.loadMoreActions = this.loadMoreActions.bind(this)
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
        <button
          className="actions-display_load-more"
          onClick={this.loadMoreActions}>
          More actions
        </button>
      ) : ''
    return (
      <div className="actions-display-list">
        <h4>Take action</h4>
        {actionsList}
        {loadMoreButton}
      </div>
    )
  }
}

export default ActionsDisplay
