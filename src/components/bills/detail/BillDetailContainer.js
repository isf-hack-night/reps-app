import React from 'react';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import BillDetailBody from 'components/bills/detail/BillDetailBody';
import Card, {CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import StateStrong from 'api/StateStrong';
import WPAPI from 'wpapi';

class BillDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: null
    };
    this.bill_name = props.match.params.bill_name;
    this.statestrong = new StateStrong();
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
  }

  componentDidMount() {
    this.wordPressAPIPromise.then(
      api => api.legislation().id(this.bill_name)
    ).then(
      bill => this.setState({bill})
    );
  }

  render() {
    if (!this.state.bill) {
      return <div>Loading</div>;
    }
    return (
      <Card>
        <BillDetailHeader bill={this.state.bill}/>
        <BillDetailFlow bill={this.state.bill}/>
        <BillDetailBody bill={this.state.bill}/>
        <CardActions>
          <Button>Call Rep</Button>
          <Button>Fax Committee</Button>
        </CardActions>
      </Card>
    )
  }
}

export default BillDetailContainer;
