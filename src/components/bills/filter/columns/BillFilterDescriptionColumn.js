import {h, Component} from 'preact';

class BillFilterActionLinkColumn extends Component {
  render(props) {
    return <td>{props.bill.summary}</td>;
  }
}

export default BillFilterActionLinkColumn;
