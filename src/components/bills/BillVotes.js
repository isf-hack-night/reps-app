import React from 'react';
import MUIDataTable from 'mui-datatables';

class BillVotes extends React.Component {
  constructor(props) {
    super(props);
    this.columns = ['Date', 'Description', 'Yes', 'No'];
    this.keys = ['date', 'desc', 'yea', 'nay'];
    this.getRow = this.getRow.bind(this);
  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }

  render() {
    const votes = this.props.bill.votes;
    if (!votes.length) {
      return null;
    }
    const rows = votes.map(this.getRow);
    return (
      <MUIDataTable
        columns={this.columns}
        data={rows}
        title='Votes'
        showHeaderToolbar={true}
      />
    );
  }
}

export default BillVotes;
