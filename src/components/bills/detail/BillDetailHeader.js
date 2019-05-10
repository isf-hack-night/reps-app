import React from 'react';
import BillPosition from 'components/bills/BillPosition';
import Grid from 'material-ui/Grid';
import BillTitle from 'components/bills/BillTitle';
import BillLegInfoLink from 'components/bills/BillLegInfoLink';

class BillDetailHeader extends React.Component {
  render() {
    const bill = this.props.bill;
    return (
      <Grid container justify="flex-start" alignItems="baseline" spacing={0}>
        <Grid item xs={12}>
          <h2><BillLegInfoLink bill={bill}/></h2>
        </Grid>
        <Grid item xs={10}>
          <BillTitle bill={bill}/>
        </Grid>
        <Grid item xs={2}>
          <BillPosition bill={bill}/>
        </Grid>
      </Grid>
    );
  }
}

export default BillDetailHeader;
