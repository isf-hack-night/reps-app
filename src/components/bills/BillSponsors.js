import React from 'react';
import {Grid} from 'material-ui';

const BillSponsors = ({bill}) => {
  return (
    <Grid container direction="column" spacing={0}>
      {bill.sponsors.map((sponsor, i) => <Grid key={i} item xs={12}>{sponsor.name}</Grid>)}
    </Grid>
  );
};

export default BillSponsors;