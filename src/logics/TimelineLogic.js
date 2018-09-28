import Pubsub from 'pubsub-js'

export default class TimelineLogic {

  constructor( photos ) {
    this.photos = photos
  }

  getProfilePhotos( profileUrl ) {
    fetch(profileUrl)
      .then( response => response.json() )
      .then( photos => {

        this.photos = photos
        Pubsub.publish('timeline', this.photos)
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
        const foundPhoto = this.photos.find( photo => photo.id === photoId )

        foundPhoto.likeada = !foundPhoto.likeada

        const possibleLiker = foundPhoto.likers.find( currentLiker => {
          return currentLiker.login === liker.login
        })

        if (possibleLiker === undefined) { 
          foundPhoto.likers.push(liker)

        } else {
          const newLikers = foundPhoto.likers.filter( currentLiker => { 
            return currentLiker.login !== liker.login
          })

          foundPhoto.likers = newLikers
        }

        Pubsub.publish('timeline', this.photos)
      })
  }
  
  commentPhoto( photoId, commentValue ) {
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
        const foundPhoto = this.photos.find( photo => photo.id === photoId )
        foundPhoto.comentarios.push(newComment)

        Pubsub.publish('timeline', this.photos)
      })
  }

  subscribe( callback ) {
    Pubsub.subscribe('timeline', (topic, photos) => {
      callback(photos)
    })
  }
} 