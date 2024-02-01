import React from 'react';
import ReactDOM from 'react-dom/client';
import Canvas from './components/Canvas';
import App from './App';
import {GlobalStyles} from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.Fragment>
    <GlobalStyles/>
    <App/>
  </React.Fragment>
);


