import {h, Component} from 'preact';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';

const BillLinks = () => (
  <div>
    <Link to="/bills">Bills</Link>
    <Link to="/search">Search</Link>
  </div>
);

const BillsApp = () => (
  <Router basename="/dist">
    <div>
      <Route path="/" component={BillLinks}/>
      <Route path="/bills" component={BillFilterContainer}/>
      <Route path="/bills/:bill_name" component={BillDetailContainer}/>
      <Route path="/search" component={BillSearchContainer}/>
    </div>
  </Router>
);

export default BillsApp;
