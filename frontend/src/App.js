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
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
