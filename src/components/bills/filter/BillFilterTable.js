import {h, Component} from 'preact';
import BillFilterNameColumn from 'components/bills/filter/columns/BillFilterNameColumn';
import BillFilterDescriptionColumn from 'components/bills/filter/columns/BillFilterDescriptionColumn';
import BillFilterActionLinkColumn from 'components/bills/filter/columns/BillFilterActionLinkColumn';
import BillFilterTagColumn from 'components/bills/filter/columns/BillFilterTagColumn';
import BillFilterPositionColumn from 'components/bills/filter/columns/BillFilterPositionColumn';


import BillFilterRow from 'components/bills/filter/BillFilterRow';

class BillFilterTable extends Component {
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
    const columns = ['Name', 'Description','Position', 'Action','Tags'];
    return (
      <thead>
        <tr>
          {columns.map(column => <th>{column}</th>)}
        </tr>
      </thead>
    );
  }

  body() {
    const rows = this.props.bills.map(
      (bill, index) =>
        <BillFilterRow key={index} bill={bill} columns={this.columns}/>
    );
    return <tbody>{rows}</tbody>;
  }

  render(props) {
    return (
      <table>
        {this.header()}
        {this.body()}
      </table>
    );
  }
}

export default BillFilterTable;
