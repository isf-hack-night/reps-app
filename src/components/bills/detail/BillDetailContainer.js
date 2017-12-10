import {h, Component} from 'preact';
import TRACKED_BILLS from 'components/bills/TrackedBills';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';
import BillDetailBody from 'components/bills/detail/BillDetailBody';


class BillDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.bill = TRACKED_BILLS[props.match.params.bill_name]
  }

  render(props) {
    return (
      <div>
        <h4>Header Section</h4>
        <BillDetailHeader bill={this.bill}/>
        <h4>Flow Section</h4>
        <BillDetailFlow bill={this.bill}/>
        <h4>Sidebar Section</h4>
        <BillDetailSidebar bill={this.bill}/>
        <h4>Body Section</h4>
        <BillDetailBody bill={this.bill}/>
      </div>
    )
  }
}

export default BillDetailContainer;
