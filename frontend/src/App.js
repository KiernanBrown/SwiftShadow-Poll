import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './shared/components/Navigation';
import Polls from './polls/pages/Polls';
import './App.css';
import PollVoting from './polls/pages/PollVoting';
import User from './users/pages/User';

const NavigationWithRouter = withRouter(Navigation);

function App() {
  return (
    <Router>
      <NavigationWithRouter />
      <main>
        <Switch>
          <Route path='/polls' exact>
            <Polls />
          </Route>
          <Route path='/polls/:pollId'>
            <PollVoting />
          </Route>
          <Route path='/users/:userId'>
            <User />
          </Route>
          <Route path='login' exact>
            
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
