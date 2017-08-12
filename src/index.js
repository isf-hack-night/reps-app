import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LandingApp from './components/landingApp'
import RepsWrapper from './components/reps'
// import './style.css'
// import './style.less'

const RepsApp = () => (
  <Router>
    <div>
      <Route exact path="/index.php/test/" component={LandingApp}/>
      {/*<Route path="/index.php/test/temp" component={RepsWrapper}/>*/}
    </div>
  </Router>
)

console.log('running!')
render(<RepsApp />, document.getElementById('reps_app_root'))
