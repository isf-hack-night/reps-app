import React from 'react';
import MUIDataTable from 'mui-datatables';

class BillCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ['Date','Type', 'Description'];
    this.keys = ['date', 'type', 'description'];
    this.getRow = this.getRow.bind(this);
  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }

  render() {
    const votes = this.props.bill.calendar;
    const rows = votes.map(this.getRow).reverse();
    return (
      <MUIDataTable
        columns={this.columns}
        data={rows}
        title='Calendar'
        showHeaderToolbar={true}
      />
    );
  }
}

export default BillCalendar;
