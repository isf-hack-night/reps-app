import {Component} from 'preact';


class BillSupport extends Component {
  render(props) {
    const support_text = this.props.bill.support ? 'Support' : 'Oppose';
    return <div>{support_text}</div>;
  }
}

export default BillSupport;
