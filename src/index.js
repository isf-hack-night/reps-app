import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';


function tryToRender () {
  setTimeout(() => {
    if (window.google) {
      ReactDOM.render(<App/>, document.getElementById('reps_app_root'));
    } else {
      tryToRender();
    }
  }, 100)
}

tryToRender();
