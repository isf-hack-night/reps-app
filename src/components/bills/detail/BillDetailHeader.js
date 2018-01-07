import React from 'react';
import {CardHeader} from 'material-ui/Card';


class BillDetailHeader extends React.Component {
  render() {
    const bill = this.props.bill;
    const billTextUrl = bill.open_states.sources[0].url;
    return (
        <CardHeader
            title={`${bill.bill_name} (${bill.support ? 'Support' : 'Oppose'}): ${bill.open_states.title} `}
            subheader={bill.summary}
        />
    );
  }
}

export default BillDetailHeader;
