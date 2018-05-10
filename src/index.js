import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';


console.log('hello WORlD!');

function tryToRender () {
  setTimeout(() => {
    if (window.google && window.L.mapbox) {
      ReactDOM.render(<App/>, document.getElementById('reps_app_root'));
    } else {
      tryToRender();
    }
  }, 100)
}

tryToRender();
