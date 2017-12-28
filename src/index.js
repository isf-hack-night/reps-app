import { h, render } from 'preact';
import App from 'app/App';


console.log('running!');
function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      render(<App/>, document.getElementById('reps_app_root'));
    } else {
      tryToRender();
    }
  }, 100)
}

tryToRender();
