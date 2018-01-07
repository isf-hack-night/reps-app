import React from 'react';


class BillFilterPositionColumn extends React.Component {
  render() {
    const position = this.props.bill.support ? 'Support' : 'Oppose';
    return (
      <td>
        <div style={{color: this.props.bill.support ? 'green' : 'red' }}>
          {position}
        </div>
      </td>
    );
  }
}

export default BillFilterPositionColumn;
