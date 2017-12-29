import {h} from 'preact';

import {
  HashRouter,
  Route,
  PropsRoute,
  Link, Redirect, Switch
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
    <Link to="find_rep"> <RaisedButton label="Find Your Rep" style={style} /></Link>
    <Link to="bill_search"><RaisedButton label="Bill Search (External)" style={style} /></Link>
    <Link to="bill_filter"><RaisedButton label="Bill Tracker" style={style} /></Link>
  </div>
);

const App = function (districtList) {
  return  (
  <HashRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/find_rep" render={(props) => (
          <LandingApp {...props} stateDistricts={districtList} /> )} />
        <Route path="/bill_search" component={BillSearchContainer}/>
        <Route path="/bill_filter" component={BillFilterContainer}/>
        <Route path="/bills/:bill_name" component={BillDetailContainer}/>
        <Redirect from="/" to="find_rep"/>
      </Switch>
    </div>
  </HashRouter>
)};

export default App;
