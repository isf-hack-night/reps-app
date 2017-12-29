import {h, Component} from 'preact';

class BillSearchHeader extends Component {
  render(props) {
    const header_cells = props.columns.map((column) => <th>{column}</th>);
    return <tr>{header_cells}</tr>;
  }
}

export default BillSearchHeader;
