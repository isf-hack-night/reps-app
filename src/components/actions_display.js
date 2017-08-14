import { h, Component } from 'preact'
import { ACTIONS_DISPLAY_LIMIT, ACTIONS_DISPLAY_INCREMENT } from '../constants'
import ActionCard from './action_card'

class ActionsDisplay extends Component {
  constructor (props) {
    super(props)

    this.setState({
      actionsNum: ACTIONS_DISPLAY_LIMIT
    })

    this.props.loadMoreActions = this.loadMoreActions.bind(this)
  }

  loadMoreActions () {
    const currentShown = this.state.actionsNum
    const newNum = currentShown < ACTIONS_DISPLAY_INCREMENT 
      ? ACTIONS_DISPLAY_INCREMENT
      : currentShown + ACTIONS_DISPLAY_INCREMENT
    const newState = Object.assign({}, this.state, { actionsNum: newNum })
    this.setState(newState)
  }

  componentDidUpdate (prevProps) {
    this.props = Object.assign({}, prevProps, this.props)
  }

  render () {
    console.log('actionsNum: ', this.state.actionsNum)
    const actionsList = this.props.actions.slice(0, this.state.actionsNum)
                                          .map(action => <ActionCard action={action} />)
    return (
      <div className="actions-display-list">
        <h4>Take action</h4>
        {actionsList}
        <button
          className="actions-display_load-more"
          onClick={this.props.loadMoreActions}>
          More actions
        </button>
      </div>
    )
  }
}

export default ActionsDisplay
