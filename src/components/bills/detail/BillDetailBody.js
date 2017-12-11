import {h, Component} from 'preact';
import BillDetailVote from 'components/bills/detail/BillDetailVotes';
import {CardText} from 'material-ui/Card';

class BillDetailBody extends Component {
  votes() {
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
      <CardText expandable={true}>
          {this.props.bill.legiscan.description}
      </CardText>
    );
  }
}

export default BillDetailBody;
