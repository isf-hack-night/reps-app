import React from 'react';

class BillSearchHeader extends React.Component {
  render() {
    const header_cells = this.props.columns.map((column, i) => <th key={i}>{column}</th>);
    return <tr>{header_cells}</tr>;
  }
}

export default BillSearchHeader;
