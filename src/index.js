import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Router, Route, Redirect, matchPath } from 'react-router-dom'
import history  from './History'

import Login from './components/Login'
import Logout from './components/Logout'


function verifyAuthentication(props) {

  const pathname = props.history.location.pathname

  const isMatch = matchPath(pathname, {path: '/timeline/:login'})
  const isPrivateRoute = isMatch === null

  const authToken = localStorage.getItem('auth-token')

  if(isPrivateRoute && authToken) {
    return true
  }

  return false
}

ReactDOM.render((
  <Router history={ history }>
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/timeline/:login?" render={ (props) => {
        if(verifyAuthentication(props)) {
          return <App/>
        } else {
          return <Redirect to={{
            pathname: '/',
            state: { msg: 'Você precisar estar logado para acessar essa página' }
          }} />
        }
      }} />
      <Route exact path="/logout" component={ Logout } />
    </div>
  </Router>
), document.getElementById('root'))
registerServiceWorker()
