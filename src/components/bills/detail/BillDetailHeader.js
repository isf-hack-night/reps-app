import React from 'react';
import {CardHeader} from 'material-ui/Card';


class BillDetailHeader extends React.Component {
  render() {
    const bill = this.props.bill;
    return (
      <CardHeader
          title={`${bill.slug} (${bill.support ? 'Support' : 'Oppose'}): ${bill.title.rendered} `}
          // TODOD: Fix this raw html injection
          subheader={<div dangerouslySetInnerHTML={{__html: bill.excerpt.rendered}} />}
      />
    );
  }
}

export default BillDetailHeader;
