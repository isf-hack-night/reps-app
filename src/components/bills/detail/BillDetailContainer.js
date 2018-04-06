import React from 'react';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import BillDetailFlow from 'components/bills/detail/BillDetailFlow';
import BillDetailBody from 'components/bills/detail/BillDetailBody';
import Card, {CardActions} from 'material-ui/Card';
import Button from 'material-ui/Button';
import StateStrong from 'api/StateStrong';
import WPAPI from 'wpapi';
import BillDetailSidebar from 'components/bills/detail/BillDetailSidebar';
import {CardHeader, Grid} from 'material-ui';

import BillIssues from 'components/bills/BillIssues';
import BillSponsors from 'components/bills/BillSponsors';
import BillContent from 'components/bills/BillContent';
import BillExcerpt from 'components/bills/BillExcerpt';
import BillVotes from 'components/bills/BillVotes';

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

  sidebar(bill) {
    return (
      <Grid container direction="column" spacing={24}>
        <Grid item xs={12}>
          <h3>Topics</h3>
          <BillIssues bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Sponsors</h3>
          <BillSponsors bill={bill}/>
        </Grid>
      </Grid>
    );
  }

  body(bill) {
    return (
      <Grid container direction="column" spacing={24}>
        <Grid item xs={12}>
          <h3>Description</h3>
          <BillContent bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <BillVotes bill={bill}/>
        </Grid>
      </Grid>
    );
  }

  render() {
    if (!this.state.bill) {
      return <div>Loading</div>;
    }
    const bill = this.state.bill;
    return (
      <div>
        <Card>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <BillDetailHeader bill={bill}/>
            </Grid>
            <Grid item xs={12}>
              <BillExcerpt bill={bill}/>
            </Grid>
            <Grid item xs={12}>
              <BillDetailFlow bill={bill}/>
            </Grid>
            <Grid item xs={12} >
              <Grid container spacing={24}>
                <Grid item xs={4} >
                  {this.sidebar(bill)}
                </Grid>
                <Grid item xs={8} >
                  {this.body(bill)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    )
  }
}

export default BillDetailContainer;
