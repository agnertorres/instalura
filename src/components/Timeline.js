import React, { Component } from 'react'

import PhotoItem from './Photo'

export default class Timeline extends Component {

  constructor() {
    super()

    this.state = {
      photos: []
    }
  }

  componentDidMount() {

    const authToken = localStorage.getItem('auth-token')

    fetch(`https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${ authToken }`)
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