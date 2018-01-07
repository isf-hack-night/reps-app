import React from 'react';


class BillSupport extends React.Component {
  render() {
    const support_text = this.props.bill.support ? 'Support' : 'Oppose';
    return <div>{support_text}</div>;
  }
}

export default BillSupport;
