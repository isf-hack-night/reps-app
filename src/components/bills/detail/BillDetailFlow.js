import {h, Component} from 'preact';
import BillFlowChart from 'components/bills/BillFlowChart';

class BillDetailFlow extends Component {
  currentStatus() {
    // TODO: Use this.props.bill to determine current status
    return 'TBD';
  }
  render(props) {
    return (
      <div>
        <BillFlowChart current={this.currentStatus()}/>
      </div>
    );
  }
}

export default BillDetailFlow;
