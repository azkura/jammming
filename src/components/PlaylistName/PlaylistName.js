import React from 'react'
import './PlaylistName.css'

class PlaylistName extends React.Component {
  render() {
    let list = this.props.list
    return <p>{list.title}</p>
  }
}

export default PlaylistName