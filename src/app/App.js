import React from 'react';
import {
  HashRouter,
  Link,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';

import LandingApp from 'components/LandingApp';

import 'styles/style.less';
import Button from 'material-ui/Button';

const style = {
  margin: 12,
};

const Header = () => (
  <div>
    <Link to="/find_rep"><Button raised style={style}>Find Your Rep</Button></Link>
    <Link to="/bill_search"><Button raised style={style}>Bill Search (External)</Button></Link>
    <Link to="/bill_filter"><Button raised style={style}>Bill Tracker</Button></Link>
  </div>
);

const App = () => (
  <HashRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/find_rep" component={LandingApp} />
        <Route path="/bill_search" component={BillSearchContainer}/>
        <Route path="/bill_filter" component={BillFilterContainer}/>
        <Route path="/bills/:bill_name" component={BillDetailContainer}/>
        <Redirect from="/" to="find_rep"/>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
