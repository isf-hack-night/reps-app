import {h, Component} from 'preact';
import BillFlowChart from 'components/bills/BillFlowChart';

class BillDetailFlow extends Component {
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
  render(props) {
    console.log(props);
    return (
      <div>
        <BillFlowChart current={this.currentStatus()} chambers={this.getChambers(props.bill.bill_name)} />
      </div>
    );
  }
}

export default BillDetailFlow;
