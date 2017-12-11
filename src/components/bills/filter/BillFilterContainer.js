import {h, Component} from 'preact';
import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import BillFilterTable from 'components/bills/filter/BillFilterTable';
import TRACKED_BILLS from 'components/bills/TrackedBills';

class BillFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      tags: new Set(),
      currentTag: 'ALL',
    };
    this.tracked_bills = Object.values(TRACKED_BILLS);
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
    this.onSelectTag = this.onSelectTag.bind(this);
  }

  componentDidMount() {
    Promise.all(
      this.tracked_bills.map(bill => this.addOpenStatesToBill(bill))
    ).then(
      bills =>
        Promise.all(
          this.tracked_bills.map(bill => this.addLegiscanToBill(bill))
        )
    ).then(
      bills => this.setState({bills})
    );
  }

  addOpenStatesToBill(bill) {
    return this.openstates.fetchBill(
      bill.bill_name
    ).then(
      openstates => {
        openstates['+tags'].forEach(
          tag => this.setState({tags: this.state.tags.add(tag)})
          //todo generate colors for tags
        );
        return openstates;
      }
    ).then(
       openstates => {
         bill.open_states = openstates;
         return bill;
       }
    );
  }

  addLegiscanToBill(bill) {
    return this.legiscan.fetchBillByName(
      bill.bill_name
    ).then(
       legiscan => {
         bill.legiscan = legiscan;
         return bill
       }
    );
  }

  onSelectTag(evt) {
    const tag = evt.target.value;
    this.setState({currentTag: tag});
  }

  filterBills(bills, tag) {
    if(tag == 'ALL'){
      return bills
    } else {
    return bills.filter(
      bill => bill.open_states['+tags'].includes(tag)
    )
   }
  }

  render(props, state, context) {
    const options = [<option selected id='ALL' value='ALL'>All Tags</option>];
    for (const tag of this.state.tags.values()) {
      options.push(<option id={tag} value={tag}>{tag}</option>);
    }
    const filteredBills = this.filterBills(this.state.bills, this.state.currentTag);
    let filter = null;
    if (this.state.currentTag) {
      filter = <div>Search results for: {this.state.currentTag}</div>;
    }

    return (
      <div>
        <select onChange={this.onSelectTag}>
          {options}
        </select>
        {filter}
        <BillFilterTable bills={filteredBills} />
      </div>
    )
  }
}

export default BillFilterContainer;
