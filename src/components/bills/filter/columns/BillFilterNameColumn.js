import React from 'react';
import {Link} from 'react-router-dom';

class BillFilterNameColumn extends React.Component {
  render() {
    const bill_path = `/bills/${this.props.bill.bill_name}`;
    return (
      <td>
        <Link to={bill_path}>{this.props.bill.bill_name}</Link>
      </td>
    );
  }
}

export default BillFilterNameColumn;
