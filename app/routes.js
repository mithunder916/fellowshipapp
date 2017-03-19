import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import App from './components/App'
import Home from './components/Home'

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/people" component={Home} />
      <IndexRedirect to="/people" />
      <Route path="/people/:id" component={Home} />
    </Route>
  </Router>
);
