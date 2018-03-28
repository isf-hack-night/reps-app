import React from 'react';

class BillFilterDescriptionColumn extends React.Component {
  render() {
    return <td>{this.props.bill.title.rendered}</td>;
  }
}

export default BillFilterDescriptionColumn;
