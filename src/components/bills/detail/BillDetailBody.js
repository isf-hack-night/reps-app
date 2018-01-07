import React from 'react';
import {CardContent} from 'material-ui/Card';
import MUIDataTable from 'mui-datatables';
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';

class BillDetailBody extends React.Component {
  constructor(props) {
    super(props);

    this.columns = ['Date', 'Motion', 'Yes', 'No'];
    this.keys = ['date', 'motion', 'yes_count', 'no_count'];
    // TODO: DRYify this code with BillDetailSidebar
    this.getRow = this.getRow.bind(this);

  }

  getRow(entry) {
    return this.keys.map(key => entry[key]);
  }

  votes() {
    const votes = this.props.bill.open_states.votes;
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

  render() {
    return (
      <CardContent>
          <BillDetailSidebar bill={this.props.bill}/>
          {this.votes()}
      </CardContent>
    );
  }
}

export default BillDetailBody;
