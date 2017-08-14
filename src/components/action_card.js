import { h, Component } from 'preact'

class ActionCard extends Component {
  render () {
    const action = this.props.action
    return (
      <div className="action-card">
        <div>
          <p>{action.preTitle}</p>
          <p>{action.title}</p>
        </div>
        <div>{action.callBackgroundMd}</div>
      </div>
    )
  }
}

export default ActionCard
