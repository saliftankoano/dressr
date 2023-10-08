import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import LandingPage from './LandingPage';
import Dashboard from './Dashboard.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <LandingPage/> */}
    <Dashboard/>
  </React.StrictMode>
);

