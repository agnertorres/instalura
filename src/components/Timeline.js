import React, { Component } from 'react'

import PhotoItem from './Photo'

export default class Timeline extends Component {

  constructor(props) {
    super(props)

    this.state = {
      photos: [],
      loginParam: props.login
    }
  }

  componentDidMount() {

    let profileUrl;
    const authToken = localStorage.getItem('auth-token')

    if (this.state.loginParam) {
      profileUrl = `https://instalura-api.herokuapp.com/api/public/fotos/${ this.state.loginParam }`

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