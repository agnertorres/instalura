import React, { Component } from 'react'
import { Redirect, matchPath } from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { timeline } from './reducers/timeline'
import { notify } from './reducers/header'

import Header from './components/Header'
import Timeline from './components/Timeline'

const reducers = combineReducers({notify, timeline})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

class App extends Component {

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
  
            <Header store={ store }/>
            <Timeline loginParam={ this.props.match.params.login } store={ store } />
            
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

export default App
