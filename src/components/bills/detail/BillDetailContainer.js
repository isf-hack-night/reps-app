import React from 'react';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import BillDetailBody from 'components/bills/detail/BillDetailBody';
import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import StateStrong from 'api/StateStrong';


class BillDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: null
    };
    this.bill_name = props.match.params.bill_name;
    this.statestrong = new StateStrong();
  }

  componentDidMount() {
    this.statestrong.fetchBill(this.bill_name).then(
      bill => this.setState({bill})
    );
  }

  render(props) {
    if (!this.state.bill) {
      return <div>Loading</div>;
    }
    return (
      <Card>
        <BillDetailHeader bill={this.state.bill}/>
        <BillDetailFlow bill={this.state.bill}/>
        <BillDetailBody bill={this.state.bill}/>
        <CardActions>
          <FlatButton label="Call Rep" />
          <FlatButton label="Fax Committee" />
        </CardActions>
      </Card>
    )
  }
}

export default BillDetailContainer;
