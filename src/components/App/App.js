import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      searchResults: [
        {name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
      ],
      playlistName: 'pop',
      playlistTracks: [
        {name: 'i like that', artist: 'houston', album: 'like', id: 4},
        {name: 'bee', artist: 'bop', album: 'beep', id: 5},
        {name: 'that', artist: 'big', album: 'that', id: 6}
      ]
    }

    this.addTrack = this.addTrack.bind(this)
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks
    if(track.find(savedTrack => savedTrack.id === track.id)){
      return
    }
    tracks.push(track)
    this.setState({ playlistTracks: tracks })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
                           onAdd={this.addTrack}/>
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
