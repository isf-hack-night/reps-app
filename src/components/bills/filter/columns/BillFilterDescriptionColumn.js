import React from 'react';

class BillFilterActionLinkColumn extends React.Component {
  render() {
    return <td>{this.props.bill.summary}</td>;
  }
}

export default BillFilterActionLinkColumn;
