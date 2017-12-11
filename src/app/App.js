import {h} from 'preact';

import {
  BrowserRouter as Router,
  Route,
  PropsRoute,
  Link
} from 'react-router-dom';
import BillTrackerContainer from 'components/bills/tracker/BillTrackerContainer';

import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';
import BillSearchContainerDynamic from 'components/bills/search/BillSearchContainerDynamic';

import LandingApp from 'components/landing_app';
import { ROOT_PATH } from 'local_constants';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Header = () => (
  <div>
    <Link to="/"> <RaisedButton label="Find Your Rep (External)" style={style} /></Link>
    <Link to="/bill_search"><RaisedButton label="Bill Search (External)" style={style} /></Link>
    <Link to="/bill_filter"><RaisedButton label="Bill Filter (Internal)" style={style} /></Link>

  </div>
);

const App = function (districtList) {
  return  (
  <Router basename={ROOT_PATH}>
    <div>
      <Header />
      <Route exact path="/" render={(props) => (
        <LandingApp {...props} stateDistricts={districtList} /> )} />
      <Route exact path="/bill_search" component={BillSearchContainer}/>
      <Route exact path="/bill_filter" component={BillFilterContainer}/>

      <Route exact path="/bills/:bill_name" component={BillDetailContainer}/>
    </div>
  </Router>
)};

export default App;
