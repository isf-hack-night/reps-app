import React from 'react';
import {
  HashRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import BillTrackerContainer from 'components/bills/tracker/BillTrackerContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';

import LandingApp from 'components/LandingApp';

import 'styles/style.less';

const App = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route path="/find_rep" component={LandingApp} />
        <Route path="/bills/:bill_name" component={BillDetailContainer}/>
        <Route path="/bills" component={BillTrackerContainer}/>
        <Redirect from="/" to="find_rep"/>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
