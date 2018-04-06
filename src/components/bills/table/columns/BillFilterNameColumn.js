import React from 'react';
import {Link} from 'react-router-dom';
import BillNameLink from "../../BillNameLink";

class BillFilterNameColumn extends React.Component {
  render() {
    return (
      <td>
        <BillNameLink bill={this.props.bill} />
      </td>
    );
  }
}

export default BillFilterNameColumn;
