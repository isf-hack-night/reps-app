import React from 'react';

class BillActionSummary extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>Passed Lower: {this.props.action_dates.passed_lower ? 'Yes' : 'No'}</li>
          <li>Passed Upper: {this.props.action_dates.passed_upper ? 'Yes' : 'No'}</li>
          <li>Signed: {this.props.action_dates.signed ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    )

  }
}

export default BillActionSummary;
