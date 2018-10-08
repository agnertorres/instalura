import React, { Component } from 'react'
import { connect } from 'react-redux' 

import TimelineApi from '../logics/TimelineApi'

class Header extends Component {

  search( event ) {
    event.preventDefault()
    this.props.search(this.searchedLogin.value)
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
              <span>{ this.props.message }</span>
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

function mapStateToProps( state ) {
  return {
    message: state.notify
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    search: ( searchedLogin ) => {
      dispatch(TimelineApi.search(searchedLogin))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)