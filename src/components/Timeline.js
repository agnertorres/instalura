import React, { Component } from 'react'

import PhotoItem from './Photo'

export default class Timeline extends Component {

  constructor( props ) {
    super(props)

    this.state = {
      photos: []
    }
  }

  componentWillMount() {
    this.props.timelineLogic.subscribe( photos => {
      this.setState({ photos })
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

    this.props.timelineLogic.getProfilePhotos(profileUrl)
  }

  likePhoto( photoId ) {
    this.props.timelineLogic.likePhoto(photoId)
  }

  commentPhoto(photoId, commentValue) {
    this.props.timelineLogic.commentPhoto(photoId, commentValue)
  }

  render() {
    return (
      <div className="fotos container">
        {
        this.state.photos.map(photo => { 
          return <PhotoItem 
            key={ photo.id } 
            photo={ photo } 
            likePhoto={ this.likePhoto.bind(this) } 
            commentPhoto={ this.commentPhoto.bind(this) } /> 
        })
        }
      </div>
    )
  }
}