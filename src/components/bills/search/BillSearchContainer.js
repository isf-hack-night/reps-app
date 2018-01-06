import React from 'react';
import BillSearchList from 'components/bills/search/BillSearchList';
import BillSearchBox from 'components/bills/search/BillSearchBox';
import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';

class BillSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      page: 1
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
  }

  componentDidMount() {
    this.onInit();
  }

//todo - breaks with legiscan if empty
  onInit() { 
    //TODO only get 100 per page
    const start_page = 1;

    this.openstates.getAllBillsCurrentTerm(start_page).then(
      bills =>
        Promise.all(bills.map(bill => this.addCalendarToBill(bill)))
    ).then(
      updatedBills => this.setState({bills: (this.state.bills).concat(updatedBills)})
    );
  }



  parseCalendar(calendar) {
    return <p>
      {calendar.map(event => `${event.type}: ${event.date} ${event.time}`).join('\n')}
    </p>
  }

  addCalendarToBill(openStatesBill) {
    const searchTerm = openStatesBill.bill_id.replace(/ /g,'');
    return this.legiscan.searchBill(searchTerm).then(
      billSearchResult => this.legiscan.fetchBill(billSearchResult.bill_id)
    ).then(
      legiscanBill => {
        const updatedBill = Object.assign({}, openStatesBill);
        updatedBill.calendar = this.parseCalendar(legiscanBill.calendar);
        return updatedBill;
      }
    );
  }

  onSubmit(searchQuery) {
    console.log( searchQuery);
    this.openstates.searchBills(searchQuery).then(
      bills =>
        Promise.all(bills.map(bill => this.addCalendarToBill(bill)))
    ).then(
      updatedBills => this.setState({bills: updatedBills})
    );
  }


  

  render(props, state, context) {
   // console.log(state.bills)

    return (
      <div>
        <BillSearchBox onSubmit={this.onSubmit} />
        <BillSearchList bills={state.bills} />
      </div>
    )
  }
}

export default BillSearchContainer;
