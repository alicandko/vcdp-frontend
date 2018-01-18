import React from 'react';
import AppActions from '../../actions/app-actions';
import PlayerStore from '../../stores/player-store';
import Button from '../app-button';


class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      video: PlayerStore.getVideo()
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    PlayerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    PlayerStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    console.log("player.js onChange");
    this.setState({
      video: PlayerStore.getVideo()
    });
  }

  _getIframeSource() {
    var src = ""
    if (this.state.video !== null) {
      src = "https://www.youtube.com/embed/" + this.state.video.vp_video_id;
    }
    return src;
  }

  render() {
    var src = this._getIframeSource();
    var videoIndex = PlayerStore.getVideoIndex();
    var videoCount = PlayerStore.getVideos().length;
    if (videoCount > 0) {
      videoIndex = videoIndex + 1;
    }

    return (
      <div className="container-fluid player-form">
        <iframe width="640" height="360"
          src={src}
          frameBorder="0" allowFullScreen>
        </iframe>
        <br></br>
        <p>{videoIndex} / {videoCount}</p>
        <Button
          handler={
            AppActions.prevVideo
          }
          txt="Prev"
        />
        <Button
          handler={
            AppActions.nextVideo
          }
          txt="Next"
        />
      </div>
    )
  }

}

export default Player;
