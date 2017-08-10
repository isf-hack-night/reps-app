import { h, render } from 'preact'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import App from './components/app'
import RepsWrapper from './components/reps'
import './style.css'
// import './style.less'

const RepsApp = () => (
  <Router>
    <div>
      <Route path="/index.php/test/" component={App}/>
      <Route path="/index.php/test/temp" component={RepsWrapper}/>
    </div>
  </Router>
)

console.log('running!')
render(<RepsApp />, document.getElementById('reps_app_root'))
