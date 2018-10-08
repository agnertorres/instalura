import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { Router, Route } from 'react-router-dom'
import history  from './History'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { timeline } from './reducers/timeline'
import { notify } from './reducers/header'

import Login from './components/Login'
import Logout from './components/Logout'

const reducers = combineReducers({notify, timeline})
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

ReactDOM.render((
  <Provider store={ store }>
    <Router history={ history }>
      <div>
        <Route exact path="/" component={ Login } />
        <Route path="/timeline/:login?" component={ App } />
        <Route exact path="/logout" component={ Logout } />
      </div>
    </Router>
  </Provider>
), document.getElementById('root'))
registerServiceWorker()
