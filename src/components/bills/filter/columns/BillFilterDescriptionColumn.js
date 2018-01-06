import React from 'react';

class BillFilterActionLinkColumn extends React.Component {
  render(props) {
    return <td>{props.bill.summary}</td>;
  }
}

export default BillFilterActionLinkColumn;
