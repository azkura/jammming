import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: [],
      playlists: [
        { title: '90 party!', id: 1},
        { title: 'hip-hop party!', id: 2},
        { title: 'Dancehall', id: 3},
        { title: 'raeggae', id: 4},
      ]
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)

    // this.retrievePlaylist = this.retrievePlaylist.bind(this)

  }

  // retrievePlaylist(playlist) {
  //   const myCurrentPlaylist = this.state.playlists.push(playlist)
  //   this.setState({ playlists: myCurrentPlaylist })
  // }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return
    }
    tracks.push(track)
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)
    this.setState({ playlistTracks: tracks })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      playlists={this.state.playlists}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
