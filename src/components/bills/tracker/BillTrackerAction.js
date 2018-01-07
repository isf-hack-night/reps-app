import React from 'react';

class BillTrackerAction extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>Action: {this.props.action.action}</li>
          <li>Date: {this.props.action.date}</li>
        </ul>
      </div>
    )
  }
}

export default BillTrackerAction;
