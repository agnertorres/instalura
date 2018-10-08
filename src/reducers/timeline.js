import { List } from 'immutable'

function swapPhoto( list, photoId, callbackUpdateProperties ) {

  const foundPhoto = list.find(photo => photo.id === photoId)
  const newProperties = callbackUpdateProperties(foundPhoto)

  const newStatePhoto = Object.assign({}, foundPhoto, newProperties)
  const photoListIndex = list.findIndex(photo => photo.id === photoId)

  return list.set(photoListIndex, newStatePhoto)
}

export function timeline( state = [], action ) {

  if(action.type === 'GET_PROFILE_PHOTOS') {
    return new List(action.photos)
  }

  if(action.type === 'COMMENT_PHOTO') {

    return swapPhoto(state, action.photoId, ( oldStatePhoto ) => {
      const newComments = oldStatePhoto.comentarios.concat(action.newComment)

      return { comentarios: newComments }
    })
  }

  if(action.type === 'LIKE_PHOTO') {

    return swapPhoto(state, action.photoId, ( oldStatePhoto ) => {
      const likeada = !oldStatePhoto.likeada
  
      const liker = action.liker

      const possibleLiker = oldStatePhoto.likers.find(currentLiker => currentLiker.login === liker.login)

      let newLikers
      
      if (possibleLiker === undefined) {
        newLikers = oldStatePhoto.likers.concat(liker)
      } else {
        newLikers = oldStatePhoto.likers.filter(currentLiker => currentLiker.login !== liker.login)
      }

      return { likeada, likers: newLikers }
    })
  }

  return state
}