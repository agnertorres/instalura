import React, { Component } from 'react'
import TimelineApi from '../logics/TimelineApi'

export default class Header extends Component {

  constructor() {
    super()
    this.state = {
      message: ''
    }
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      this.setState({message: this.props.store.getState().notify})
    })
  }

  search( event ) {
    event.preventDefault()
    this.props.store.dispatch(TimelineApi.search(this.searchedLogin.value))
  }
    
  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">
          Instalura
        </h1>

        <form className="header-busca" onSubmit={ this.search.bind(this) }>
          <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={ input => this.searchedLogin = input} />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>

        <nav>
          <ul className="header-nav">
            <li className="header-nav-item">
              <span>{ this.state.message }</span>
              <a href="#">
                ♡
                {/*                 ♥ */}
                {/* Quem deu like nas minhas fotos */}
              </a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}