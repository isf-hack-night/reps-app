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
import PoliticianTrackerContainer from 'components/politicians/tracker/PoliticianTrackerContainer';
import PoliticianDetailContainer from 'components/politicians/detail/PoliticianDetailContainer';

const App = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route path="/find_rep" component={LandingApp} />
        <Route path="/bills/:bill_slug" component={BillDetailContainer}/>
        <Route path="/bills" component={BillTrackerContainer}/>
        <Route path="/politicians/:politician_slug" component={PoliticianDetailContainer}/>
        <Route path="/politicians" component={PoliticianTrackerContainer}/>
        <Redirect from="/" to="find_rep"/>
      </Switch>
    </div>
  </HashRouter>
);

export default App;
