import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './app/app'
import { ROOT_PATH } from 'local_constants'
import { withStyles } from 'material-ui/styles';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './styles/style.less'

const RepsApp = () => (
  <Router>
    <div>
      <Route exact path={ROOT_PATH} component={App}/>
      {/*<Route path="/index.php/test/temp" component={RepsWrapper}/>*/}
    </div>
  </Router>
)

console.log('running!')
function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      //document.querySelector('h1.title.entry-title').style.display = 'none'
      render(
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <RepsApp />
        </MuiThemeProvider>
        , document.getElementById('reps_app_root'))
    } else {
      tryToRender()
    }
  }, 100)
}

tryToRender()
