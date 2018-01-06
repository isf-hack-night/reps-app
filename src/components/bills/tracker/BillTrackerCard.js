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

  render(props, state, context) {
    return (
      <div className="container">
        <BillTrackerTitle bill={props.bill} />
        <BillTrackerActions actions={props.bill.actions} />
        <BillActionSummary action_dates={props.bill.action_dates} />
      </div>
    )

  }
}

export default BillTrackerCard;
