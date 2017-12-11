import {h} from 'preact';

import {
  BrowserRouter as Router,
  Route,
  PropsRoute,
  Link
} from 'react-router-dom';
import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';
import LandingApp from 'components/landing_app';
import { ROOT_PATH } from 'local_constants';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const Header = () => (
  <div>
    <Link to="/"> <RaisedButton label="Find Your Rep" style={style} /></Link>
    <Link to="/bill_search"><RaisedButton label="Bills Search (External)" style={style} /></Link>
    <Link to="/bill_filter"><RaisedButton label="Bills Search (Internal)" style={style} /></Link>
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
