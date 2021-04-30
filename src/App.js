import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewUser from './components/auth/NewUser';
import LoginMenu from './components/auth/LoginMenu';
import Logout from './components/auth/Logout';
import Topnav from './components/Topnav.js';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Topnav />
      </Router>
    </div>
  );
}

export default App;
