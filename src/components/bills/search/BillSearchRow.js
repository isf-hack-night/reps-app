import React from 'react';

class BillSearchRow extends React.Component {
  render() {
    const cells = this.props.columns.map((column, i) => <td key={i}>{this.props.bill[column]}</td>);
    return <tr>{cells}</tr>;
  }
}

export default BillSearchRow;
