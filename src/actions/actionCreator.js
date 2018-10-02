export function getProfilePhotos( photos ) {
    return {type: 'GET_PROFILE_PHOTOS', photos}
}

export function likePhoto( photoId, liker ) {
    return {type: 'LIKE_PHOTO', photoId, liker}
}

export function commentPhoto( photoId, newComment ) {
    return {type: 'COMMENT_PHOTO', photoId, newComment}
}
