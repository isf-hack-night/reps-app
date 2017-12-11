import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './app/app'
import OpenStatesAPI from 'openstates'
import { ROOT_PATH } from 'local_constants'
import { withStyles } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/style.less'


console.log('running!')
function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      //document.querySelector('h1.title.entry-title').style.display = 'none'
      
      const open_states = new OpenStatesAPI.LocalOpenStates();
      const districts = open_states.getDistricts('ca');
      const stateDistricts = new OpenStatesAPI.DistrictList(districts, 'ca', open_states);
      stateDistricts.preloadDistricts(function() {});
      render(
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <App stateDistricts={stateDistricts}/>
        </MuiThemeProvider>
        , document.getElementById('reps_app_root'))
    } else {
      tryToRender()
    }
  }, 100)
}

tryToRender()
