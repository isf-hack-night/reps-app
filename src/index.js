import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';
import {ROOT_REACT_ELEMENT} from 'local_constants';

const rootElement = document.getElementById(ROOT_REACT_ELEMENT);

if (!rootElement) {
  console.log('Unable to find root element for react app: ' + ROOT_REACT_ELEMENT);
} else {
  ReactDOM.render(<App/>, rootElement);
}

