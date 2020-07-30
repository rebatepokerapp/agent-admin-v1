import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './Dashboard';
import SignIn from './components/Signin';

ReactDOM.render(
  <React.StrictMode>    
    <SignIn />
  </React.StrictMode>,
  document.getElementById('root')
);

