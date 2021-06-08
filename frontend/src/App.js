import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './shared/components/Navigation';
import Polls from './polls/pages/Polls';
import PollDetails from './polls/pages/PollDetails';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path='/polls' exact>
            <Polls />
          </Route>
          <Route path='/polls/:pollId'>
            <PollDetails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
