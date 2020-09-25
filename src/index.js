import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './Pages/User/Dashboard';
import Admin from './Pages/Admin/Admin';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={App}></Route>
      <Route exact path='/userdetails' component={Dashboard}></Route>
      <Route exact path='/admin' component={Admin}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
