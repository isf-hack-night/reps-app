import React from 'react';
import Grid from 'material-ui/Grid';
import PoliticianNameLink from 'components/politicians/PoliticianNameLink';
import PoliticianParty from 'components/politicians/PoliticianParty';
import PoliticianChamber from 'components/politicians/PoliticianChamber';
import PoliticianDistrict from 'components/politicians/PoliticianDistrict';

const PoliticianDetailHeader = ({politician}) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={3}>
        <PoliticianNameLink politician={politician}/>
      </Grid>
      <Grid item xs={3}>
        <PoliticianParty politician={politician}/>
      </Grid>
      <Grid item xs={3}>
        <PoliticianChamber politician={politician}/>
      </Grid>
      <Grid item xs={3}>
        <PoliticianDistrict politician={politician}/>
      </Grid>
    </Grid>
  );
};

export default PoliticianDetailHeader;