import FilterDropdown from 'components/table/FilterDropdown';
import BillTable from 'components/bills/table/BillTable';
import React from 'react';
import WPAPI from 'wpapi';
import utils from 'utils';
import WordPress from 'api/WordPress';
import {Button, FormControl, TextField} from 'material-ui';


class BillTrackerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billMetadata: [],
      bills: [],
      filters: {},
      count: 0,
      page: 1,
      rowsPerPage: 10,
      search: '',
      orderby: 'slug',
      order:'asc'
    };
    this.wordPressAPIPromise = WPAPI.discover('/');
    this.wordPress = new WordPress();
    this.filterOptions = ['position', 'issue'];
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
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
        let request = api.legislation()
          .perPage(this.state.rowsPerPage)
          .page(this.state.page)
          .order(this.state.order)
          .orderby(this.state.orderby)
          .search(this.state.search);
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
          () => this.setState({
            bills,
            count: parseInt(bills._paging ? bills._paging.total : 0),
          })
        );
      }
    );
  }

  onChangePage(e, nextPageNum) {
    // Material ui pagination is 0-indexed, but WP api is 1-indexed
    this.setState({page: nextPageNum + 1}, () => this.fetchBills());
  }

  onChangeRowsPerPage(e) {
    this.setState({rowsPerPage: e.target.value}, () => this.fetchBills());
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
        // reset pagination when filters change.
        return {filters, page: 1};
      });
    };
    onSelect = onSelect.bind(this);
    return (
        <FilterDropdown
          key={`${name}_dropdown`}
          name={name}
          items={this.state.billMetadata[name]}
          onSelect={onSelect}
        />
    );
  }

  renderSearchButton() {
    // Reset page and then re-fetch
    return (
      <FormControl key={"search_button"}>
        <Button onClick={() => this.setState({page: 1}, () => this.fetchBills())}>Search</Button>
      </FormControl>
    );
  }

  renderSearchField() {
    return (
      <FormControl key={"search_text"}>
        <TextField
          id="search"
          label="Search"
          type="search"
          onChange={e => this.setState({search: e.target.value})}
        />
      </FormControl>
    );
  }

  render() {
    const dropDowns = [];
    for (const option of this.filterOptions) {
      dropDowns.push(this.renderDropdown(option));
    }
    dropDowns.push(this.renderSearchField());
    dropDowns.push(this.renderSearchButton());
    return (
      <div>
        <form autoComplete="off">
          {dropDowns}
        </form>
        <div>
          <BillTable
            bills={this.state.bills}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
            page={this.state.page}
            count={this.state.count}
            rowsPerPage={this.state.rowsPerPage}
          />
        </div>
      </div>
    )
  }
}

export default BillTrackerContainer;
