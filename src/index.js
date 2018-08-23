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

ReactDOM.render((
  <Router history={ history }>
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/timeline" component={ App } />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
