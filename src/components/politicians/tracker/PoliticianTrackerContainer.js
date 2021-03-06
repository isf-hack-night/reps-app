import FilterDropdown from 'components/table/FilterDropdown';
import PoliticianTable from 'components/politicians/table/PoliticianTable';
import React from 'react';
import WPAPI from 'wpapi';
import utils from 'utils';
import {Button, FormControl, TextField} from 'material-ui';


class PoliticianTrackerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politicianMetadata: null,
      politicians: [],
      filters: {},
      count: 0,
      page: 1,
      rowsPerPage: 25,
      search: '',
      orderby: 'title',
      order:'asc'
    };
    this.filterOptions = [];
    this.wordPressAPIPromise = WPAPI.discover('/');
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
  }

  componentDidMount() {
    this.fetchPoliticians();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.filters !== this.state.filters) {
      this.fetchPoliticians();
    }
  }

  fetchPoliticians() {
    this.wordPressAPIPromise.then(
      api => {
        let request = api.politician()
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
      politicians => this.setState({
        politicians,
        count: parseInt(politicians._paging ? politicians._paging.total : 0),
      })
    );
  }

  onChangePage(e, nextPageNum) {
    // Material ui pagination is 0-indexed, but WP api is 1-indexed
    this.setState({page: nextPageNum + 1}, () => this.fetchPoliticians());
  }

  onChangeRowsPerPage(e) {
    this.setState({rowsPerPage: e.target.value}, () => this.fetchPoliticians());
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
        <FilterDropdown
          key={`${name}_dropdown`}
          name={name}
          items={this.state.politicianMetadata[name]}
          onSelect={onSelect}
        />
    );
  }

  renderSearchButton() {
    // Reset page and then re-fetch
    return (
      <FormControl key={"search_button"}>
        <Button onClick={() => this.setState({page: 1}, () => this.fetchPoliticians())}>Search</Button>
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
    if (!this.state.politicians) {
      return <div>Loading data</div>;
    }
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
          <PoliticianTable
            politicians={this.state.politicians}
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

export default PoliticianTrackerContainer;
