import {BillFilterDropdown} from 'components/bills/filter/BillFilterDropdown';
import BillTable from 'components/bills/table/BillTable';
import {Toolbar} from 'material-ui';
import React from 'react';
// import Legiscan from 'api/Legiscan';
// import OpenStates from 'api/OpenStates';
import BillFilterTable from 'components/bills/filter/BillFilterTable';
// import StateStrong from 'api/StateStrong';
import WPAPI from 'wpapi';
import utils from 'utils';


class BillFilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.filterOptions = [
      'position',
      'interest',
      'issue'
    ];
    this.state = {
      legislation: null,
      filters: {}
    };
    this.filterOptions.forEach((option) => this.state[option] = null);
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
  }

  componentDidMount() {
    for (const option of this.filterOptions) {
      this.wordPressAPIPromise.then(
        api => api[option]().get()
      ).then(
        optionList => {this.setState({[option]: utils.arrayToObject('id', optionList)})}
      );
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.optionsLoaded() && this.state.legislation === null) {
      this.fetchLegislation();
    } else if (prevState.filters !== this.state.filters) {
      this.fetchLegislation();
    }
  }

  optionsLoaded() {
    return this.filterOptions.every((option) => this.state[option] !== null);
  }

  translateAssociations(legislationItem) {
    this.filterOptions.forEach(option => {
      const translatedAssociation = [];
      for (const association of legislationItem[option]) {
        translatedAssociation.push(this.state[option][association]);
      }
      legislationItem[option] = translatedAssociation;
    });
  }

  fetchLegislation() {
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
      legislation => {
        legislation.forEach(legislationItem => this.translateAssociations(legislationItem));
        this.setState({legislation: utils.arrayToObject('id', legislation)})
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
    return <BillFilterDropdown key={`${name}_dropdown`} name={name} items={this.state[name]} onSelect={onSelect}/>
  }

  render() {
    if (!this.state.legislation) {
      return <div>Loading data</div>;
    }
    const dropDowns = [];
    for (const option of this.filterOptions) {
      dropDowns.push(this.renderDropdown(option));
    }
    return (
      <div>
        <Toolbar>
          {dropDowns}
        </Toolbar>
        <div>
          <BillTable bills={this.state.legislation} />
        </div>
      </div>
    )
  }
}

export default BillFilterContainer;
