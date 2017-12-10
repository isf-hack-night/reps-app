import {h, Component} from 'preact';
import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import BillTrackerCard from 'components/bills/tracker/BillTrackerCard';

class BillTrackerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: []
    };
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
  }

  componentDidMount() {
    this.fetchBills();
  }

  fetchBills() {
    Promise.all(
      this.props.bills.map(
        bill_id => this.openstates.fetchBill(bill_id))
    ).then(
      bills =>
        Promise.all(bills.map(bill => this.addCalendarToBill(bill)))
    ).then(
      bills => this.setState({bills: bills})
    );
  }

  addCalendarToBill(openStatesBill) {
    const searchTerm = openStatesBill.bill_id.replace(/ /g,'');
    return this.legiscan.searchBill(searchTerm).then(
      billSearchResult => this.legiscan.fetchBill(billSearchResult.bill_id)
    ).then(
      legiscanBill => {
        const updatedBill = Object.assign({}, openStatesBill);
        updatedBill.calendar = legiscanBill.calendar;
        return updatedBill;
      }
    );
  }

  render(props, state, context) {
    if (!state.bills.length) {
      return <div>Loading bills</div>;
    }

    return (
      <div>
        {state.bills.map((bill, i) => <BillTrackerCard id={i} bill={bill}/>)}
      </div>
    )
  }
}

export default BillTrackerContainer;
