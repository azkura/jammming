import React from 'react'
import './PlaylistList.css'

import PlaylistName from '../PlaylistName/PlaylistName'

class PlaylistList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.lists.map((list) => {
            return <PlaylistName key={list.id} list={list}/>
          })
        }
      </div>
    )
  }
}

export default PlaylistList