import React, { Component } from 'react'
import Pubsub from 'pubsub-js'

import PhotoItem from './Photo'

export default class Timeline extends Component {

  constructor( props ) {
    super(props)

    this.state = {
      photos: []
    }
  }

  componentWillMount() {
    Pubsub.subscribe('timeline', (topic, photos) => {
      this.setState({ photos })
    })

    Pubsub.subscribe('update-liker', (topic, infoLiker) => {

      const foundPhoto = this.state.photos.find( photo => photo.id === infoLiker.photoId )

      foundPhoto.likeada = !foundPhoto.likeada

      const possibleLiker = foundPhoto.likers.find( liker => {
        return liker.login === infoLiker.liker.login 
      })

      if (possibleLiker === undefined) {
        foundPhoto.likers.push(infoLiker.liker)

      } else {
        const newLikers = foundPhoto.likers.filter( liker => { 
          return liker.login !== infoLiker.liker.login 
        })

        foundPhoto.likers = newLikers
      }

      this.setState({
        photos: this.state.photos
      })
    })

    Pubsub.subscribe('new-comments', (topic, infoComment) => {

      const foundPhoto = this.state.photos.find( photo => photo.id === infoComment.photoId )
      foundPhoto.comentarios.push(infoComment.newComment)

      this.setState({
        photos: this.state.photos
      })
    })
  }

  componentDidMount() {
    this.getProfilePhotos()
  }
  
  componentDidUpdate( prevProps ) {

    if (this.props.loginParam !== prevProps.loginParam){
      this.getProfilePhotos()
    } 
  }

  getProfilePhotos() {
    let profileUrl;
    const authToken = localStorage.getItem('auth-token')

    if (this.props.loginParam) {
      profileUrl = `https://instalura-api.herokuapp.com/api/public/fotos/${ this.props.loginParam }`

    } else {
      profileUrl = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${ authToken }`
    }

    fetch(profileUrl)
      .then( response => response.json() )
      .then( photos => {
        this.setState({
          photos: photos
        })
      })
  }

  likePhoto( photoId ) {
    const authToken = localStorage.getItem('auth-token')

    const requestUrl = `https://instalura-api.herokuapp.com/api/fotos/${ photoId }/like?X-AUTH-TOKEN=${ authToken }`,
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
        Pubsub.publish('update-liker', { photoId: photoId, liker })
      })
  }

  commentPhoto(photoId, commentValue) {
    const authToken = localStorage.getItem('auth-token')

    const requestUrl = `https://instalura-api.herokuapp.com/api/fotos/${ photoId }/comment?X-AUTH-TOKEN=${ authToken }`,
          requestParams = { 
            method: 'POST',
            body: JSON.stringify({
              texto: commentValue
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
        Pubsub.publish('new-comments', { photoId: photoId, newComment })
      })
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(photo => <PhotoItem key={ photo.id } photo={ photo } likePhoto={ this.likePhoto } commentPhoto={ this.commentPhoto } />)
        }
      </div>
    )
  }
}