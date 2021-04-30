import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginMenu from './components/auth/LoginMenu';
import TopNav from './components/TopNav';
import TestProtected from './components/TestProtected';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <TopNav />
        <Switch>
          <Route exact path="/" component={LoginMenu} />
          <Route path="/protected_route" component={TestProtected} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
