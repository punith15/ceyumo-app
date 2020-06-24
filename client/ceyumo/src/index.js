import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {VendorContext, VendorDetails} from './components/login/VendorContext'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <VendorDetails>
      <App />
    </VendorDetails>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

