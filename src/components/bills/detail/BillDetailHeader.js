import {h, Component} from 'preact';
import BillSupport from 'components/bills/BillSupport';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import {CardHeader} from 'material-ui/Card';


class BillDetailHeader extends Component {
  render(props) {
    const bill = this.props.bill;
    const billTextUrl = bill.open_states.sources[0].url;
    return (
        <CardHeader
            title={`${bill.bill_name} (${bill.support ? 'Support' : 'Oppose'}): ${bill.open_states.title} `}
            subtitle={bill.summary}
            actAsExpander={true}
            showExpandableButton={true} />
    );
  }
}

export default BillDetailHeader;
