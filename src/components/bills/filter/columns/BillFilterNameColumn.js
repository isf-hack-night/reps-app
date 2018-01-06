import React from 'react';
import {Link} from 'react-router-dom';

class BillFilterNameColumn extends React.Component {
  render(props) {
    const bill_path = `/bills/${props.bill.bill_name}`;
    return (
      <td>
        <Link to={bill_path}>{props.bill.bill_name}</Link>
      </td>
    );
  }
}

export default BillFilterNameColumn;
