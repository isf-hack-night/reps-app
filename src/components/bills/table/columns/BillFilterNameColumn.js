import React from 'react';
import {Link} from 'react-router-dom';

class BillFilterNameColumn extends React.Component {
  render() {
    const bill_path = `/bills/${this.props.bill.id}`;
    return (
      <td>
        <Link to={bill_path}>{this.props.bill.slug}</Link>
      </td>
    );
  }
}

BillFilterNameColumn.header = 'test';

export default BillFilterNameColumn;
