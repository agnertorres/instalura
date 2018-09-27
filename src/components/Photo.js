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
          <span className={ this.props.photo.likers.length > 0 ? '' : 'hide' }>curtiram</span>
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

  likePhoto( event ) {
    event.preventDefault()
    this.props.likePhoto(this.props.photo.id)
  }

  commentPhoto( event ) {
    event.preventDefault()
    this.props.commentPhoto(this.props.photo.id, this.comment.value)
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={ this.likePhoto.bind(this) } className={ this.props.photo.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like' }>Likar</a>
        <form className="fotoAtualizacoes-form" onSubmit={ this.commentPhoto.bind(this) }>
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={ input => this.comment = input }/>
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
        <PhotoUpdates photo={ this.props.photo } likePhoto={ this.props.likePhoto } commentPhoto={ this.props.commentPhoto }/>
      </div>
    )
  }
}