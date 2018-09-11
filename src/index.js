import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Router, Route, Redirect } from 'react-router-dom'
import history  from './History'

import Login from './components/Login'

function verifyAuthentication() {
  if (localStorage.getItem('auth-token') != null) {
    return true
  }

  return false
}

ReactDOM.render((
  <Router history={ history }>
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/timeline" render={ () => {
        if(verifyAuthentication()) {
          return <App/>
        } else {
          return <Redirect to={{
            pathname: '/',
            state: { msg: 'Você precisar estar logado para acessar essa página' }
          }} />
        }
      }} />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
