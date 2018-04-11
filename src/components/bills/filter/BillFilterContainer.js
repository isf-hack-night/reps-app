import {BillFilterDropdown} from 'components/bills/filter/BillFilterDropdown';
import BillTable from 'components/bills/table/BillTable';
import {Grid, Toolbar} from 'material-ui';
import React from 'react';
import WPAPI from 'wpapi';
import utils from 'utils';
import WordPress from 'api/WordPress';


class BillFilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: null,
      bills: null,
      filters: {}
    };
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
    this.wordPress = new WordPress();
  }

  componentDidMount() {
    this.wordPress.fetchMetadata().then(
      metadata => this.setState({filterOptions: metadata})
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
        <BillFilterDropdown
          key={`${name}_dropdown`}
          name={name}
          items={this.state.filterOptions[name]}
          onSelect={onSelect}
        />
    );
  }

  render() {
    if (!this.state.bills || !this.state.filterOptions) {
      return <div>Loading data</div>;
    }
    console.log({state: this.state});
    const dropDowns = [];
    for (const option of Object.keys(this.state.filterOptions)) {
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

export default BillFilterContainer;
