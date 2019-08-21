import React from 'react'
import './Track.css'

class Track extends React.Component {
  constructor(props) {
    super(props)

    this.addTrack = this.addTrack.bind(this)
  }
  renderAction() {
    if(this.props.isRemoval){
      return <button className="Track-action">-</button>
    } else {
      return <button className="Track-action">+</button>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track)
  }

  render() {
    let track = this.props.track
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>{track.artist} | {track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track