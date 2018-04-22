import React from 'react';
import Grid from 'material-ui/Grid';
import {Link} from 'react-router-dom';

const BillSponsors = ({bill}) => {
  return (
    <Grid container direction="column" spacing={0}>
      {bill.sponsors.map(
        (sponsor, i) => {
          const politician_path = `/politicians/${sponsor.leg_id}`;
          return (
            <Grid key={i} item xs={12}>
              <Link to={politician_path}>{sponsor.name}</Link>
            </Grid>
          );
        }
      )}
    </Grid>
  );
};

export default BillSponsors;