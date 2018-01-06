import React from 'react';

class BillActionSummary extends Component {
  render(props, state, context) {
    return (
      <div>
        <ul>
          <li>Passed Lower: {props.action_dates.passed_lower ? 'Yes' : 'No'}</li>
          <li>Passed Upper: {props.action_dates.passed_upper ? 'Yes' : 'No'}</li>
          <li>Signed: {props.action_dates.signed ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    )

  }
}

export default BillActionSummary;
