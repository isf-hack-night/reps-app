import {h, Component} from 'preact';
import BillDetailVote from 'components/bills/detail/BillDetailVotes';
import {CardText} from 'material-ui/Card';
import DataTables from 'material-ui-datatables'
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';

class BillDetailBody extends Component {
  votes() {
    const votes = this.props.bill.open_states.votes;
    return (
      <DataTables
          columns={[{key: 'date', label:'Date'}, {key: 'motion', label: 'Motion'}, {key:'yes_count', label: 'Yes'}, {key: 'no_count', label: 'No'}]}
          data={votes}
          title='Votes'
          showHeaderToolbar={true}
          />
    );
  }

  render(props) {
    return (
      <CardText expandable={true}>
          <BillDetailSidebar bill={this.props.bill}/>
          {this.votes()}
      </CardText>
    );
  }
}

export default BillDetailBody;
