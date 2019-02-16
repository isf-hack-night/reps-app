import React from 'react';
import Grid from 'material-ui/Grid';
import PoliticianNameLink from 'components/politicians/PoliticianNameLink';

const PoliticianDetailHeader = ({politician}) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <h2><PoliticianNameLink politician={politician}/></h2>
      </Grid>
    </Grid>
  );
};

export default PoliticianDetailHeader;