import {h} from 'preact';
import {
  HashRouter,
  Link,
  PropsRoute,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import BillFilterContainer from 'components/bills/filter/BillFilterContainer';
import BillDetailContainer from 'components/bills/detail/BillDetailContainer';
import BillSearchContainer from 'components/bills/search/BillSearchContainer';

import LandingApp from 'components/landing_app';

import RaisedButton from 'material-ui/RaisedButton';

import {withStyles} from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'styles/style.less';

const style = {
  margin: 12,
};

const Header = () => (
  <div>
    <Link to="/find_rep"> <RaisedButton label="Find Your Rep" style={style} /></Link>
    <Link to="/bill_search"><RaisedButton label="Bill Search (External)" style={style} /></Link>
    <Link to="/bill_filter"><RaisedButton label="Bill Tracker" style={style} /></Link>
  </div>
);

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
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
  </MuiThemeProvider>
);

export default App;
