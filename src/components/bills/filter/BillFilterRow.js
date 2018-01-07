import React from 'react';

class BillSearchRow extends React.Component {
  render() {
    const cells = this.props.columns.map(
      (Column, i) => <Column key={i} bill={this.props.bill} />
    );
    return <tr>{cells}</tr>;
  }
}

export default BillSearchRow;
