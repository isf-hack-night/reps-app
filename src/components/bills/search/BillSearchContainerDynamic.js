import {Component} from 'preact';
import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import DataTables from 'material-ui-datatables';

const styles = {
  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
  },
  titleStyle: {
    fontSize: 16,
  },
  footerToolbarStyle: {
    padding: '0 100px',
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
  },
};

 const TABLE_COLUMNS = [
  {
    key: 'bill_id',
    label: 'Bill Id',
  }, {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'calendar',
    label: 'Calendar',
  }
];


class BillSearchContainerDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      data: [],
      page: 1
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
  }


  componentDidMount() {
    this.onInit();
  }

  onInit() { 
    //TODO only get 100 per page
    var start_page = 1

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
    this.openstates.searchBills(searchQuery).then(
      bills =>
        Promise.all(bills.map(bill => this.addCalendarToBill(bill)))
    ).then(
      updatedBills => this.setState({bills: updatedBills})
    );
  }


handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order);
  }

  handleFilterValueChange(value) {
    console.log('filter value: ' + value);
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    console.log('handlePreviousPageClick');
    this.setState({
      data: TABLE_DATA,
      page: 1,
    });
  }

  //todo fetch
  handleNextPageClick() {
    console.log('handleNextPageClick');
    this.setState({
      data: TABLE_DATA_NEXT,
      page: 2,
    });
  }

  handlePersonAddClick() {
    console.log('handlePersonAddClick');
  }

  handleInfoClick() {
    console.log('handleInfoClick');
  }

  render(props, state, context) {

    console.log(state.bills)

    return (
      <div>
      <DataTables
        height={'auto'}
        showHeaderToolbar={true}
        showHeaderToolbarFilterIcon={true}
        selectable={false}
        showRowHover={false}
        columns={TABLE_COLUMNS}
        data={state.bills}
        showCheckboxes={true}
        onCellClick={this.handleCellClick}
        onCellDoubleClick={this.handleCellDoubleClick}
        onFilterValueChange={this.handleFilterValueChange}
        onSortOrderChange={this.handleSortOrderChange}
        page={1}
        count={100}/>      
      </div>
    )
  }
}

export default BillSearchContainerDynamic;
