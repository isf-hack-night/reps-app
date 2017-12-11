import {h, Component} from 'preact';

class BillDetailVote extends Component {

  render(props) {
    return (
      <div>
        <h5>A Vote: {this.props.vote.motion}</h5>
        Yes: {this.props.vote.yes_count} No: {this.props.vote.no_count}
        Date: {this.props.vote.date} Passed: {this.props.vote.passed}
      </div>
    );
  }
}

export default BillDetailVote;
