import React, { Component } from 'react'
import { Redirect, matchPath } from 'react-router-dom'

import Header from './components/Header'
import Timeline from './components/Timeline'

export default class App extends Component {

  verifyAuthentication() {

    const pathname = this.props.history.location.pathname
  
    const isMatch = matchPath(pathname, {path: '/timeline/:login'})
    const isPrivateRoute = isMatch === null
  
    const authToken = localStorage.getItem('auth-token')
  
    if(isPrivateRoute) {
      if(authToken) {
        return true
      } else {
        return false
      }
    }
  
    return true
  }

  render() {
    if(this.verifyAuthentication()) {
      return (
        <div id="root">
          <div className="main">
  
            <Header />
            <Timeline loginParam={ this.props.match.params.login } />
            
          </div>
        </div>
      )
    } else {
      return <Redirect to={{
        pathname: '/',
        state: { msg: 'Você precisar estar logado para acessar essa página' }
      }} />
    }
  }
}
