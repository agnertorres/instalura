import React, { Component } from 'react'
import history from '../History'

export default class Login extends Component {

  constructor( props ) {
    super(props)

    let msg = ''

    if (this.props.location.state) {
      msg = this.props.location.state.msg
    }

    this.state = {
      msg: msg
    }

  }

  sendLoginForm( event ) {
    event.preventDefault()

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.login.value,
        senha: this.password.value
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    }

    fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
      .then( response => {
        if (response.ok) {
          return response.text()
        } else {
          throw new Error('Não foi possível fazer login')
        }
      })
      .then( token => {
        localStorage.setItem('auth-token', token)
        history.push('/timeline')
      })
      .catch( error  => {
        this.setState({
          msg: error.message
        })
      })
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        <span>{ this.state.msg }</span>
        <form onSubmit={ this.sendLoginForm.bind(this) }>
          <input type="text" ref={ input => this.login = input } />
          <input type="password" ref={ input => this.password = input } />
          <input type="submit" value="login" />
        </form>
      </div>
    )
  }
}