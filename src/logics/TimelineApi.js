import { 
  getProfilePhotos,
  likePhoto,
  commentPhoto,
  notify
} from '../actions/actionCreator'

export default class TimelineApi {

  static getProfilePhotos( profileUrl ) {
    return dispatch => {
      fetch(profileUrl)
      .then( response => response.json() )
      .then( photos => {
        dispatch(getProfilePhotos(photos))

        return photos
      })
    }
  }

  static likePhoto( photoId ) {
    return dispatch => {
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
          dispatch(likePhoto(photoId, liker))

          return liker
        })
    }
  }
  
  static commentPhoto( photoId, commentValue ) {
    return dispatch => {
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
          dispatch(commentPhoto(photoId, newComment))

          return newComment
        })
    }
  }

  static search( searchedLogin ) {
    return dispatch => {
      const requestUrl = `https://instalura-api.herokuapp.com/api/public/fotos/${ searchedLogin }`

      fetch(requestUrl)
        .then( response => {
          if(response.ok) {
            return response.json()
          } else {
            throw new Error('Não foi possível realizar a busca')
          }
        })
        .then( photos => {

          if(photos.length === 0) {
            dispatch(notify('Usuário não encontrado'))
          } else {
            dispatch(notify('Usuário encontrado'))
          }

          dispatch(getProfilePhotos(photos))
          return photos
        })      
    }
  }
} 