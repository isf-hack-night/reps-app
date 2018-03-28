import React from 'react';
import BillFilterNameColumn from 'components/bills/table/columns/BillFilterNameColumn';
import BillFilterDescriptionColumn from 'components/bills/table/columns/BillFilterDescriptionColumn';
import BillFilterActionLinkColumn from 'components/bills/table/columns/BillFilterActionLinkColumn';
import BillFilterTagColumn from 'components/bills/table/columns/BillFilterTagColumn';
import BillFilterPositionColumn from 'components/bills/table/columns/BillFilterPositionColumn';


import BillFilterRow from 'components/bills/filter/BillFilterRow';

class BillFilterTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      BillFilterNameColumn,
      BillFilterDescriptionColumn,
      BillFilterPositionColumn,
      BillFilterActionLinkColumn,
      BillFilterTagColumn
    ]
  }

  header() {
    const columns = [this.columns[0].header, 'Description','Position', 'Action','Tags'];
    return (
      <thead>
        <tr>
          {columns.map(column => <th key={column}>{column}</th>)}
        </tr>
      </thead>
    );
  }

  body() {
    const rows = Object.values(this.props.bills).map(
      (bill, index) =>
        <BillFilterRow key={index} bill={bill} columns={this.columns}/>
    );
    return <tbody>{rows}</tbody>;
  }

  render() {
    return (
      <table>
        {this.header()}
        {this.body()}
      </table>
    );
  }
}

export default BillFilterTable;
