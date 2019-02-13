import React from 'react';
import {TableCell} from 'material-ui/Table';

const prettify = (str) => {
  // Replace underscores and dashes with spaces
  str.replace(/(-)|(_)/g, ' ');
  // Capitalize the first letter
  return str[0].toUpperCase() + str.substr(1);
};


const defaultCell = (key) => ({row}) => <div>{row[key]}</div>;
const defaultHead = (key) => () => <h4>{prettify(key)}</h4>;

class TableColumn {
  constructor({key, headComponent, cellComponent}) {
    this.key = key;
    this.cellComponent = cellComponent ? cellComponent : defaultCell(key);
    this.headComponent = headComponent ? headComponent : defaultHead(key);
  }

  Cell(props) {
    const Component = this.cellComponent;
    return <Component {...props} column={this}/>;
  }

  Head() {
    const Component = this.headComponent;
    return <Component column={this}/>;
  }
}

export default TableColumn;