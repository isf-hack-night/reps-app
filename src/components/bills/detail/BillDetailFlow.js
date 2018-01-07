import React from 'react';
import BillFlowChart from 'components/bills/BillFlowChart';

class BillDetailFlow extends React.Component {
  currentStatus() {
    // TODO: Use this.props.bill to determine current status
    return this.props.bill.flow;
  }
  getChambers(billName) {
    if (billName.startsWith('A')) {
      return ['Assembly', 'Senate'];
    }
    return ['Senate', 'Assembly'];
  }
  render() {
    return (
      <div>
        <BillFlowChart current={this.currentStatus()} chambers={this.getChambers(this.props.bill.bill_name)} />
      </div>
    );
  }
}

export default BillDetailFlow;
