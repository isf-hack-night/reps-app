import {h, Component} from 'preact';
import TRACKED_BILLS from 'components/bills/TrackedBills';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';
import BillDetailBody from 'components/bills/detail/BillDetailBody';
import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class BillDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.bill = TRACKED_BILLS[props.match.params.bill_name]
  }

  topicsList() {
    const topics = this.props.bill.open_states['+tags'];
    return (
      <List style='border:2px'>
        <Subheader>Topics</Subheader>
        {topics.map(topic => <ListItem primaryText={topic} />)}
      </List>
    )
  }

  render(props) {
    return (
      <Card>
        <BillDetailHeader bill={this.bill}/>
        <BillDetailFlow bill={this.bill}/>
        <BillDetailSidebar bill={this.bill}/>
        <BillDetailBody bill={this.bill}/>
        <CardActions>
          <FlatButton label="Call Rep" />
          <FlatButton label="Fax Committee" />
        </CardActions>
      </Card>
    )
  }
}

export default BillDetailContainer;
