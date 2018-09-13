import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Router, Route } from 'react-router-dom'
import history  from './History'

import Login from './components/Login'
import Logout from './components/Logout'


ReactDOM.render((
  <Router history={ history }>
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/timeline/:login?" component={ App } />
      <Route exact path="/logout" component={ Logout } />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
