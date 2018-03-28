import React from 'react';
import CardText from 'material-ui/Card';
import MUIDataTable from 'mui-datatables';
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';

class BillDetailBody extends React.Component {
  constructor(props) {
    super(props);

    this.columns = ['Date', 'Description', 'Yes', 'No'];
    this.keys = ['date', 'desc', 'yea', 'nay'];
    // TODO: DRYify this code with BillDetailSidebar
    this.getRow = this.getRow.bind(this);

  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }

  votes() {
    const votes = this.props.bill.votes;
    const rows = votes.map(this.getRow);
    console.log(rows);
    return (
      <MUIDataTable
        columns={this.columns}
        data={rows}
        title='Votes'
        showHeaderToolbar={true}
      />
    );
  }

  render() {
    return (
      <CardText>
          <BillDetailSidebar bill={this.props.bill}/>
          {this.votes()}
      </CardText>
    );
  }
}

export default BillDetailBody;
