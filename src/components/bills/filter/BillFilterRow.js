import {Component} from 'preact';

class BillSearchRow extends Component {
  constructor(props) {
    super(props);
  }
  render(props) {
    const cells = this.props.columns.map((Column) => <Column bill={props.bill} />);
    return <tr>{cells}</tr>;
  }
}

export default BillSearchRow;
