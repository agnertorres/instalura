import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Pubsub from 'pubsub-js'

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

  constructor( props ) {
    super(props)

    this.state = {
      likers: this.props.photo.likers,
      comments: this.props.photo.comentarios
    }
  }

  componentWillMount() {
    Pubsub.subscribe('update-liker', (topic, infoLiker) => {

      if (this.props.photo.id === infoLiker.photoId) {

        const possibleLiker = this.state.likers.find( liker => {
          return liker.login === infoLiker.liker.login 
        })

        if (possibleLiker === undefined) {
          
          const newLikers = this.state.likers.concat(infoLiker.liker)
          
          this.setState({
            likers: newLikers
          })
        } else {
          const newLikers = this.state.likers.filter( liker => { 
            return liker.login !== infoLiker.liker.login 
          })

          this.setState({
            likers: newLikers
          })
        }
      }
    })

    Pubsub.subscribe('new-comments', (topic, infoComment) => {

      if (this.props.photo.id === infoComment.photoId) {
        const newComments = this.state.comments.concat(infoComment.newComment)

        this.setState({
          comments: newComments
        })
      }
    })
  }

  render() {
    return (
      <div className="foto-info">
        <div className="foto-info-likes">
          {
            this.state.likers.map(( liker ) => {
              return  <Link to={`/timeline/${ liker.login }`} key={ liker.login } >{ liker.login }, </Link>
            })
          }
          <span className={ this.state.likers.length > 0 ? '' : 'hide' }>curtiram</span>
        </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">autor </a>
          { this.props.photo.comentario }
        </p>

        <ul className="foto-info-comentarios">
          {
            this.state.comments.map(( comment ) => {
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

  constructor( props ) {
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
        this.setState({ liked: !this.state.liked })
        
        Pubsub.publish('update-liker', { photoId: this.props.photo.id, liker })
      })
  }

  commentPhoto( event ) {
    event.preventDefault()

    const authToken = localStorage.getItem('auth-token')

    const requestUrl = `https://instalura-api.herokuapp.com/api/fotos/${ this.props.photo.id }/comment?X-AUTH-TOKEN=${ authToken }`,
          requestParams = { 
            method: 'POST',
            body: JSON.stringify({
              texto: this.comment.value
            }),
            headers: new Headers({
              'Content-type': 'application/json'
            })
          }

    fetch(requestUrl, requestParams)
      .then( response => {
        if(response.ok) {
          return response.json()
        } else {
          throw new Error('Não foi possível comentar a foto')
        }
      })
      .then( newComment => {
        Pubsub.publish('new-comments', { photoId: this.props.photo.id, newComment })
      })
  }

  render() {
    return (
      <section className="fotoAtualizacoes">
        <a onClick={ this.likePhoto.bind(this) } className={ this.state.liked ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like' }>Likar</a>
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
        <PhotoUpdates photo={ this.props.photo }/>
      </div>
    )
  }
}