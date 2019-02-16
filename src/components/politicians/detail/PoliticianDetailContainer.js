import React from 'react';
import Card from 'material-ui/Card';
import WPAPI from 'wpapi';
import PoliticianDetailHeader from 'components/politicians/detail/PoliticianDetailHeader';
import PoliticianPicture from 'components/politicians/PoliticianPicture';
import PoliticianOffices from 'components/politicians/PoliticianOffices';
import {Grid} from 'material-ui';
import PoliticianElectionInfo from 'components/politicians/PoliticianElectionInfo';
import PoliticianCommittees from 'components/politicians/PoliticianCommittees';
import PoliticianParty from 'components/politicians/PoliticianParty';
import PoliticianChamber from 'components/politicians/PoliticianChamber';
import PoliticianDistrict from 'components/politicians/PoliticianDistrict';

class PoliticianDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politician: null
    };
    this.politician_slug = props.match.params.politician_slug;
    this.wordPressAPIPromise = WPAPI.discover('/');
  }

  componentDidMount() {
    this.wordPressAPIPromise.then(
      api => api.politician().slug(this.politician_slug)
    ).then(
      politicians => {
        // the above fetch returns a list, even though we only expect 1 item
        this.setState({politician: politicians[0]});
      }
    )
  }

  render() {
    if (!this.state.politician) {
      return <div>Loading</div>;
    }
    const politician = this.state.politician;
    return (
      <div>
        <PoliticianDetailHeader politician={politician} />
        <Grid container spacing={12}>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12}>
                <PoliticianPicture politician={politician} />
              </Grid>
              <Grid item xs={12}>
                  Party: <PoliticianParty politician={politician}/>
              </Grid>
              <Grid item xs={12}>
                  Chamber: <PoliticianChamber politician={politician}/>
              </Grid>
              <Grid item xs={12}>
                  District: <PoliticianDistrict politician={politician}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <h3>Offices</h3>
            <PoliticianOffices politician={politician} />
          </Grid>
          {/*TODO: Implement*/}
          {/*<Grid item xs={3}>*/}
            {/*<h3>Election Info</h3>*/}
            {/*<PoliticianElectionInfo politician={politician} />*/}
          {/*</Grid>*/}
          {/*<Grid item xs={3}>*/}
            {/*<h3>Committees</h3>*/}
            {/*<PoliticianCommittees politician={politician} />*/}
          {/*</Grid>*/}
        </Grid>
      </div>
    );
  }
}

export default PoliticianDetailContainer;
