import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import store from './store';
import axios from 'axios';

import App from './components/App'
import Home from './components/Home'
import Person from './components/Person'

// const retrievePeople = () => {
//   axios.get('api/people')
//     .then(res => {
//       res.data
//     })
// }

// let person = {};

// const retrievePerson = (nextState) => {
//   axios.get(`api/people/${nextState.params.id}`)
//     .then(res => {
//       person = res.data
//     })
//     .catch(err => console.error(err))
// }

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/people" component={Home} />
      <IndexRedirect to="/people" />
      <Route path="/people/:id" component={Home} />
    </Route>
  </Router>
);
