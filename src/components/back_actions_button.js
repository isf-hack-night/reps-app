import React from 'react';
import {withRouter} from 'react-router-dom';
import queryAPI from '../query_api';
import Button from 'material-ui/Button';

class JustBTAButton extends React.Component {
  constructor (props) {
    super(props);

    this.goToActionsList = this.goToActionsList.bind(this)
  }

  goToActionsList () {
    const { districtLower, districtUpper } = queryAPI.parse();
    const newRoute = queryAPI.build({
      districtLower,
      districtUpper,
    });
    this.props.history.push(newRoute)
  }

  render () {

    return (
      <Button className="BTAButton" onClick={this.goToActionsList}>
        &lt;&lt; Back To Actions List
      </Button>
    )
  }
}

const BackToActionsButton = withRouter(({history, action}) => (
  <JustBTAButton history={history} action={action} />
));

export default BackToActionsButton
