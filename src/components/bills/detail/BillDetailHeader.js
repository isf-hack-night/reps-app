import {h, Component} from 'preact';
import BillSupport from 'components/bills/BillSupport';


class BillDetailHeader extends Component {
  render(props) {
    const bill = this.props.bill;
    const billTextUrl = bill.open_states.sources[0].url;
    return (
      <div>
        <div>Name: {bill.bill_name}</div>
        <div>Title: {bill.open_states.title}</div>
        <div>Our summary: {bill.summary}</div>
        <BillSupport bill={bill}/>
        <a href={billTextUrl}>Link to text</a>
      </div>
    );
  }
}

export default BillDetailHeader;
