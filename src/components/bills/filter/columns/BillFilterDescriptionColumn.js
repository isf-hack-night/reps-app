import React from 'react';

class BillFilterActionLinkColumn extends Component {
  render(props) {
    return <td>{props.bill.summary}</td>;
  }
}

export default BillFilterActionLinkColumn;
