import React from 'react';
import BillTrackerTitle from 'components/bills/tracker/BillTrackerTitle';
import BillTrackerActions from 'components/bills/tracker/BillTrackerActions';
import BillActionSummary from 'components/bills/tracker/BillActionSummary';

class BillTrackerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_detail: false,
    }
  }

  render() {
    return (
      <div className="container">
        <BillTrackerTitle bill={this.props.bill} />
        <BillTrackerActions actions={this.props.bill.actions} />
        <BillActionSummary action_dates={this.props.bill.action_dates} />
      </div>
    )

  }
}

export default BillTrackerCard;
