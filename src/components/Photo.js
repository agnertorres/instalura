import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PhotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={ this.props.photo.urlPerfil } alt="foto do usuario"/>
          <figcaption className="foto-usuario">
            <Link to={`/timeline/${ this.props.photo.loginUsuario }`}>
              { this.props.photo.loginUsuario }
            </Link>  
          </figcaption>
        </figure>
        <time className="foto-data">{ this.props.photo.horario }</time>
      </header>
    )
  }
}

class PhotoInfo extends Component {
  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.props.photo.likers.map(( liker ) => {
              return  <Link to={`/timeline/${ liker.login }`} key={ liker.login } >{ liker.login }, </Link>
            })
          }
          curtiram
        </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          { this.props.photo.comentario }
        </p>

        <ul className="foto-info-comentarios">
          {
            this.props.photo.comentarios.map(( comment ) => {
              return (
                <li key={ comment.id } className="comentario">
                  <Link to={`/timeline/${ comment.login }`} className="foto-info-autor">{ comment.login }</Link>
                  { comment.texto }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class PhotoUpdates extends Component {

  constructor(props) {
    super(props)

    this.state = {
      liked: this.props.photo.likeada
    }
  }

  likePhoto( event ) {
    event.preventDefault()

    const authToken = localStorage.getItem('auth-token')

    const requestUrl = `https://instalura-api.herokuapp.com/api/fotos/${ this.props.photo.id }/like?X-AUTH-TOKEN=${ authToken }`,
          requestParams = { method: 'POST' }

    fetch(requestUrl, requestParams)
      .then( response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Não foi possível curtir a foto')
        }
      })
      .then( liker => {
        this.setState({
          liked: !this.state.liked
        })
      })
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={ this.likePhoto.bind(this) } className={ this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like' }>Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"/>
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
        </form>
      </section>
    )
  }
}

export default class PhotoItem extends Component {
  render() {
    return (
      <div className="foto">
        <PhotoHeader photo={ this.props.photo }/>
        <img alt="foto" className="foto-src" src={ this.props.photo.urlFoto }/>

        <PhotoInfo photo={ this.props.photo }/>
        <PhotoUpdates photo={ this.props.photo }/>
      </div>
    )
  }
}