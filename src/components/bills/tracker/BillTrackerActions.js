import React from 'react';
import BillTrackerAction from 'components/bills/tracker/BillTrackerAction';

class BillTrackerActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default to the last action
      current_action_idx: this.props.actions.length-1,
    };
    this.max_idx = this.props.actions.length-1;
    this.min_idx = 0;

    this.nextAction = this.nextAction.bind(this);
    this.prevAction = this.prevAction.bind(this);
  }

  nextAction() {
    if (this.state.current_action_idx < this.max_idx) {
      this.setState({current_action_idx: this.state.current_action_idx + 1});
    }
  }

  prevAction() {
    if (this.state.current_action_idx > this.min_idx) {
      this.setState({current_action_idx: this.state.current_action_idx - 1});
    }
  }

  render() {
    const nextButton = (
      <button
        onClick={this.nextAction}
        disabled={this.state.current_action_idx===this.max_idx}
      >
        Next
      </button>
    );
    const prevButton = (
      <button
        onClick={this.prevAction}
        disabled={this.state.current_action_idx===this.min_idx}
      >
        Prev
      </button>
    );

    return (
      <div>
        <BillTrackerAction action={this.props.actions[this.state.current_action_idx]}/>
        {prevButton}
        {nextButton}
      </div>
    )

  }
}

export default BillTrackerActions;
