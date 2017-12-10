import {h, Component} from 'preact';

class BillSearchRow extends Component {
  render(props) {
    const cells = props.columns.map((column) => <td>{props.bill[column]}</td>);
    return <tr>{cells}</tr>;
  }
}

export default BillSearchRow;
