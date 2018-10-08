import React, { Component } from 'react'
import { connect } from 'react-redux'

import TimelineApi from '../logics/TimelineApi'
import PhotoItem from './Photo'

class Timeline extends Component {
  
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

    this.props.list(profileUrl)
  }

  render() {
    return (
      <div className="fotos container">
        {
        this.props.photos.map(photo => { 
          return <PhotoItem 
            key={ photo.id } 
            photo={ photo } 
            likePhoto={ this.props.likePhoto } 
            commentPhoto={ this.props.commentPhoto } /> 
        })
        }
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    photos: state.timeline
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    likePhoto: ( photoId ) => {
      dispatch(TimelineApi.likePhoto(photoId))
    },
    commentPhoto: ( photoId, commentValue ) => {
      dispatch(TimelineApi.commentPhoto(photoId, commentValue))
    },
    list: ( profileUrl ) => {
      dispatch(TimelineApi.getProfilePhotos(profileUrl))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline)