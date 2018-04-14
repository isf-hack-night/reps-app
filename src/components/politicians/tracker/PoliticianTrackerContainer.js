import FilterDropdown from 'components/table/FilterDropdown';
import PoliticianTable from 'components/politicians/table/PoliticianTable';
import React from 'react';
import WPAPI from 'wpapi';
import utils from 'utils';


class PoliticianTrackerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politicianMetadata: null,
      politicians: null,
      filters: {}
    };
    this.filterOptions = [];
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
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
        let request = api.politician();
        for (const filterKey in this.state.filters) {
          const filterValue = this.state.filters[filterKey];
          if (filterValue) {
            request = request.param(filterKey, filterValue)
          }
        }
        return request.get();
      }
    ).then(
      politicians => this.setState({politicians: utils.arrayToObject('id', politicians)})
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
        <FilterDropdown
          key={`${name}_dropdown`}
          name={name}
          items={this.state.politicianMetadata[name]}
          onSelect={onSelect}
        />
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
    return (
      <div>
        <form autoComplete="off">
          {dropDowns}
        </form>
        <div>
          <PoliticianTable politicians={this.state.politicians} />
        </div>
      </div>
    )
  }
}

export default PoliticianTrackerContainer;
