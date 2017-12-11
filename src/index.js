import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './app/app'
import OpenStatesAPI from 'openstates'
import { ROOT_PATH } from 'local_constants'
import './styles/style.less'


console.log('running!')
function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      //document.querySelector('h1.title.entry-title').style.display = 'none'
      
      const open_states = new OpenStatesAPI.OpenStates('no_key_required');
      const districts = open_states.getDistricts('ca');
      const stateDistricts = new OpenStatesAPI.DistrictList(districts, 'ca', open_states);
      stateDistricts.preloadDistricts(function() {});
      render(<App stateDistricts={stateDistricts}/>, document.getElementById('reps_app_root'))
    } else {
      tryToRender()
    }
  }, 100)
}

tryToRender()
