import React from 'react';
import BillNameLink from 'components/bills/BillNameLink';
import BillPosition from 'components/bills/BillPosition';
import {Grid} from 'material-ui';

class BillDetailHeader extends React.Component {
  render() {
    const bill = this.props.bill;
    return (
      <div>
        <BillNameLink bill={bill}/>
        <BillPosition bill={bill}/>
        {bill.title.rendered}
      </div>
    );
  }
}

export default BillDetailHeader;
