import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingApp from './components/landing_app'
import { ROOT_PATH } from './constants'
import './styles/style.less'

const RepsApp = () => (
  <Router>
    <div>
      <Route exact path={ROOT_PATH} component={LandingApp}/>
      {/*<Route path="/index.php/test/temp" component={RepsWrapper}/>*/}
    </div>
  </Router>
)

console.log('running!')
function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      //document.querySelector('h1.title.entry-title').style.display = 'none'
      render(<RepsApp />, document.getElementById('reps_app_root'))
    } else {
      tryToRender()
    }
  }, 100)
}

tryToRender()
