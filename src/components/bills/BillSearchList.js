import {h, Component} from 'preact';
import BillSearchHeader from 'components/bills/BillSearchHeader';
import BillSearchRow from 'components/bills/BillSearchRow';

class BillSearchList extends Component {
  constructor(props) {
    super(props);
    this.columns = ['bill_id', 'title'];
  }

  render(props) {
    const rows = props.bills.map((bill, index) => <BillSearchRow key={index}
                                                                 columns={this.columns}
                                                                 bill={bill}/>);
    return (
      <table>
        <thead>
        <BillSearchHeader columns={this.columns}/>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    );
  }
}

export default BillSearchList;
