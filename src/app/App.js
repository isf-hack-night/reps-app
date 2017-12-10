import {h} from 'preact';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';
import LandingApp from 'components/landing_app';
import { ROOT_PATH } from 'local_constants';


const Header = () => (
  <div>
    <Link to="/">Find Your Rep</Link>
    <Link to="/bill_search">Bills Search (External)</Link>
    <Link to="/bill_filter">Bills Search (Internal)</Link>
  </div>
);

const App = () => (
  <Router basename={ROOT_PATH}>
    <div>
      <Header />
      <Route exact path="/" component={LandingApp} />
      <Route exact path="/bill_search" component={BillSearchContainer}/>
      <Route exact path="/bill_filter" component={BillFilterContainer}/>
      <Route exact path="/bills/:bill_name" component={BillDetailContainer}/>
    </div>
  </Router>
);

export default App;
