import React from 'react';
import Card from 'material-ui/Card';
import WPAPI from 'wpapi';
import PoliticianDetailHeader from 'components/politicians/detail/PoliticianDetailHeader';
import PoliticianPicture from 'components/politicians/PoliticianPicture';
import PoliticianOffices from 'components/politicians/PoliticianOffices';
import {Grid} from 'material-ui';
import PoliticianElectionInfo from 'components/politicians/PoliticianElectionInfo';
import PoliticianCommittees from 'components/politicians/PoliticianCommittees';

class PoliticianDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politician: null
    };
    this.politician_slug = props.match.params.politician_slug;
    this.wordPressAPIPromise = WPAPI.discover( 'https://dev.state-strong.org' );
  }

  componentDidMount() {
    this.wordPressAPIPromise.then(
      api => api.politician().id(this.politician_slug)
    ).then(
      politician => {
        this.setState({politician});
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
        <Card>
          <PoliticianDetailHeader politician={politician} />
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <PoliticianPicture politician={politician} />
            </Grid>
            <Grid item xs={3}>
              <h3>Offices</h3>
              <PoliticianOffices politician={politician} />
            </Grid>
            <Grid item xs={3}>
              <h3>Election Info</h3>
              <PoliticianElectionInfo politician={politician} />
            </Grid>
            <Grid item xs={3}>
              <h3>Committees</h3>
              <PoliticianCommittees politician={politician} />
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default PoliticianDetailContainer;
