import {FormControl, InputLabel, MenuItem, Select, withStyles} from 'material-ui';
import React from 'react';

export class BillFilterDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ''
    }
  }

  render() {
    if (!this.props.items) {
      return null;
    }
    const options = [<MenuItem key={'ALL'} id={'ALL'} value={''}>{`All ${this.props.name}`}</MenuItem>];
    for (const item of Object.values(this.props.items)) {
      const key = `${this.props.name}_${item.id}`;
      options.push(<MenuItem key={key} id={key} value={item.id}>{item.name}</MenuItem>);
    }
    let onChange = (evt) => {
      const value = evt.target.value;
      this.setState({item: value});
      this.props.onSelect(value ? this.props.items[value] : null);
    };
    return (
      <div style={{margin:'4px'}}>
        <FormControl margin="normal">
          <div>
            <InputLabel htmlFor={this.props.name}>{this.props.name}</InputLabel>
            <Select value={this.state.item} onChange={onChange} autoWidth>
              {options}
            </Select>
          </div>
        </FormControl>
      </div>
    );
  }
}

export default BillFilterDropdown;