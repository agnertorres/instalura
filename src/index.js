import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './components/Login';

ReactDOM.render((
  <Router>
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/timeline" component={ App } />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
