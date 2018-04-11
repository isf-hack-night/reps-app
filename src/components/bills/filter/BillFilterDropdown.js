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
    const capName = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)
    const options = [
      <MenuItem
        key={'ALL'}
        id={'ALL'}
        value={''}>
        {`All ${capName}s`}
      </MenuItem>
    ];
    for (const item of Object.values(this.props.items)) {
      const key = `${capName}_${item.id}`;
      options.push(<MenuItem key={key} id={key} value={item.id}>{item.name}</MenuItem>);
    }
    let onChange = (evt) => {
      const value = evt.target.value;
      this.setState({item: value});
      this.props.onSelect(value ? this.props.items[value] : null);
    };
    return (
      <FormControl style={{
          margin: 12,
          minWidth: 120,
        }}>
          <InputLabel htmlFor={capName}>{capName}</InputLabel>
          <Select value={this.state.item} onChange={onChange} autoWidth>
            {options}
          </Select>
      </FormControl>
    );
  }
}

export default BillFilterDropdown;