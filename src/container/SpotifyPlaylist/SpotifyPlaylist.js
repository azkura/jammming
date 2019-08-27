import React from 'react'
import './SpotifyPlaylist.css'

import PlaylistList from '../../components/PlaylistList/PlaylistList'

class SpotifyPlaylist extends React.Component {
  render() {
    return (
      <div>
        <h3>Spotify Playlists</h3>
        <PlaylistList lists={this.props.playlists}/>
      </div>
    )
  }
}

export default SpotifyPlaylist