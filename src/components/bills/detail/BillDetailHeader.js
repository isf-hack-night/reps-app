import React from 'react';
import BillNameLink from 'components/bills/BillNameLink';
import BillPosition from 'components/bills/BillPosition';
import {Grid} from 'material-ui';
import BillTitle from 'components/bills/BillTitle';

class BillDetailHeader extends React.Component {
  render() {
    const bill = this.props.bill;
    return (
      <Grid container justify="flex-start" alignItems="flex-start" spacing={0}>
        <Grid item xs={2}>
          <BillNameLink bill={bill}/>
        </Grid>
        <Grid item xs={2}>
          <BillPosition bill={bill}/>
        </Grid>
        <Grid item xs={2}>
          <BillTitle bill={bill}/>
        </Grid>
      </Grid>
    );
  }
}

export default BillDetailHeader;
