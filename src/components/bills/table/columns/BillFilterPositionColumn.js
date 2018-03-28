import React from 'react';


class BillFilterPositionColumn extends React.Component {
  render() {
    // Assume there is only one
    const position = this.props.bill.position[0];
    if (!position) {
      return <td>Undecided</td>;
    }
    return (
      <td>
        <div style={{color: position === 'Support' ? 'green' : 'red' }}>
          {position.name}
        </div>
      </td>
    );
  }
}

export default BillFilterPositionColumn;
