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

  render() {
    return (
      <div className="fotos container">
        {
          this.state.photos.map(photo => <PhotoItem key={ photo.id } photo={ photo }/>)
        }
      </div>
    )
  }
}