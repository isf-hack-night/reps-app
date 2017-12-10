import {h, Component} from 'preact';
import BillDetailVote from 'components/bills/detail/BillDetailVotes';

class BillDetailBody extends Component {
  votes() {
    debugger;
    const votes = this.props.bill.open_states.votes;
    if (votes.length === 0) {
      return <div>No votes</div>;
    }
    return (
      <ul>
        {votes.map(vote => <BillDetailVote vote={vote} />)}
      </ul>
    );
  }

  render(props) {
    return (
      <div>
        <h5>Long Description</h5>
        {this.props.bill.legiscan.description}
        <h5>Take Action</h5>
        <a href="">Call Rep</a>
        <a href="">Fax Committee</a>
        <h5>Votes</h5>
        {this.votes()}
      </div>
    );
  }
}

export default BillDetailBody;
