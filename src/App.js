import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginMenu from './components/auth/LoginMenu';
import NewUser from './components/auth/NewUser';
import BottleList from './components/bottles/BottleList';
import TopNav from './components/TopNav';
import TestProtected from './components/TestProtected';
import withAuth from './components/auth/withAuth';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <TopNav />
        <Switch>
          <Route exact path="/" component={LoginMenu} />
          <Route path="/protected-route" component={withAuth(TestProtected)} />
          <Route path="/users/new" component={withAuth(NewUser)} />
          <Route path="/bottles" component={withAuth(BottleList)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
