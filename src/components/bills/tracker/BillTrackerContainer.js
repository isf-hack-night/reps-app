import BillTrackerDropdown from 'components/bills/tracker/BillTrackerDropdown';
import BillTable from 'components/bills/table/BillTable';
import React from 'react';
import WPAPI from 'wpapi';
import utils from 'utils';
import WordPress from 'api/WordPress';


class BillTrackerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billMetadata: null,
      bills: null,
      filters: {}
    };
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
    this.wordPress = new WordPress();
    this.filterOptions = ['position', 'issue'];
  }

  componentDidMount() {
    this.wordPress.fetchMetadata().then(
      metadata => this.setState({billMetadata: metadata})
    ).then(() => this.fetchBills());
  }

  componentDidUpdate(_, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.fetchBills();
    }
  }

  fetchBills() {
    this.wordPressAPIPromise.then(
      api => {
        let request = api.legislation();
        for (const filterKey in this.state.filters) {
          const filterValue = this.state.filters[filterKey];
          if (filterValue) {
            request = request.param(filterKey, filterValue)
          }
        }
        return request.get();
      }
    ).then(
      bills => {
        Promise.all(
          bills.map(bill => this.wordPress.annotateBillMetadata(bill))
        ).then(
          () => this.setState({bills: utils.arrayToObject('id', bills)})
        );
      }
    );
  }

  renderDropdown(name) {
    let onSelect = (selectedItem) => {
      this.setState((prevState) => {
        const filters = Object.assign({}, prevState.filters);
        if (selectedItem) {
          filters[name] = selectedItem.id;
        } else {
          delete filters[name];
        }
        return {filters};
      });
    };
    onSelect = onSelect.bind(this);
    return (
        <BillTrackerDropdown
          key={`${name}_dropdown`}
          name={name}
          items={this.state.billMetadata[name]}
          onSelect={onSelect}
        />
    );
  }

  render() {
    if (!this.state.bills || !this.state.billMetadata) {
      return <div>Loading data</div>;
    }
    const dropDowns = [];
    for (const option of this.filterOptions) {
      dropDowns.push(this.renderDropdown(option));
    }
    return (
      <div>
        <form autoComplete="off">
          {dropDowns}
        </form>
        <div>
          <BillTable bills={this.state.bills} />
        </div>
      </div>
    )
  }
}

export default BillTrackerContainer;
