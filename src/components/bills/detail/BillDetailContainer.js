import React from 'react';
import BillDetailHeader from 'components/bills/detail/BillDetailHeader';
import Card from 'material-ui/Card';
import WPAPI from 'wpapi';
import Grid from 'material-ui/Grid';

import BillIssues from 'components/bills/BillIssues';
import BillSponsors from 'components/bills/BillSponsors';
import BillContent from 'components/bills/BillContent';
import BillExcerpt from 'components/bills/BillExcerpt';
import BillVotes from 'components/bills/BillVotes';
import BillCurrentHouse from 'components/bills/BillCurrentHouse';
import BillCurrentCommittee from 'components/bills/BillCurrentCommittee';
import BillNextHearing from 'components/bills/BillNextHearing';
import WordPress from 'api/WordPress';
import BillFlowChart from 'components/bills/BillFlowChart';

class BillDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: null
    };
    this.bill_slug = props.match.params.bill_slug;
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
    this.wordPress = new WordPress();
  }

  componentDidMount() {
    this.wordPressAPIPromise.then(
      api => api.legislation().id(this.bill_slug)
    ).then(
      bill => this.wordPress.annotateBillMetadata(bill)
    ).then(
      bill => {
        this.setState({bill});
      }
    )
  }

  sidebar(bill) {
    return (
      <Grid container direction="column" spacing={8}>
        <Grid item xs={12}>
          <h3>Sponsors</h3>
          <BillSponsors bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Topics</h3>
          <BillIssues bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Current House</h3>
          <BillCurrentHouse bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Current Committee</h3>
          <BillCurrentCommittee bill={bill}/>
        </Grid>
        <Grid item xs={12}>
          <h3>Next Hearing</h3>
          <BillNextHearing bill={bill}/>
        </Grid>
      </Grid>
    );
  }

  body(bill) {
    return (
      <Grid container direction="column" spacing={24}>
        <Grid item xs={12}>
          <h3>Summary</h3>
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
              <h3>Description</h3>
              <BillExcerpt bill={bill}/>
            </Grid>
            <Grid item xs={12}>
              <BillFlowChart bill={bill}/>
            </Grid>
            <Grid item xs={12} >
              <Grid container spacing={24}>
                <Grid item xs={3} >
                  {this.sidebar(bill)}
                </Grid>
                <Grid item xs={9} >
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
