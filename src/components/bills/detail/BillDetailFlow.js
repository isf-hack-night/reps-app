import React from 'react';
import BillFlowChart from 'components/bills/BillFlowChart';

class BillDetailFlow extends React.Component {
  currentStatus() {
    // TODO: Use this.props.bill to determine current status
    return 1;
  }
  getChambers() {
    if (this.props.bill.history.length && this.props.bill.history[0].chamber === 'A') {
      return ['Assembly', 'Senate'];
    }
    return ['Senate', 'Assembly'];
  }
  render() {
    return (
      <div>
        <BillFlowChart current={this.currentStatus()} chambers={this.getChambers()} />
      </div>
    );
  }
}

export default BillDetailFlow;
