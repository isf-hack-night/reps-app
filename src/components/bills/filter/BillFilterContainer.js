import React from 'react';
import Legiscan from 'api/Legiscan';
import OpenStates from 'api/OpenStates';
import BillFilterTable from 'components/bills/filter/BillFilterTable';
import StateStrong from 'api/StateStrong';

class BillFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      tags: new Set(),
      currentTag: 'ALL',
    };
    this.legiscan = new Legiscan();
    this.openstates = new OpenStates();
    this.statestrong = new StateStrong();
    this.onSelectTag = this.onSelectTag.bind(this);
  }

  componentDidMount() {
    this.statestrong.fetchAllBills().then(
      bills => this.extractTags(bills)
    ).then(
      bills => this.setState({bills})
    );
  }

  extractTags(bills) {
    bills.map(
      bill => bill.open_states['+tags'].forEach(
        tag => this.setState({tags: this.state.tags.add(tag)})
      )
    );
    return bills;
  }

  onSelectTag(evt) {
    const tag = evt.target.value;
    this.setState({currentTag: tag});
  }

  filterBills(bills, tag) {
    if(tag === 'ALL'){
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
