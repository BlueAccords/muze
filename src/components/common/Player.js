import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
// import * as actions from '../../actions';

import {CLIENT_ID} from '../../constants/auth';

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.displayTrackInfo = this.displayTrackInfo.bind(this);
  }

  handlePlay() {
    // find audio player component
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    // if not found return nothing
    if (!audioElement) { return; }

    // else get active track from props
    const { activeTrack } = this.props;

    // if an active track is found then play else pause
    if (activeTrack) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  handleSkip() {
    console.log('skip was clicked');
  }

  // display track info or not depending on if an active track is loaded
  displayTrackInfo(track) {
    // if track is NOT undefined and object isn't empty then display info
    if(track !== undefined && Object.keys(track).length > 0) {
      return (
        <div className="track-info">
          <h3>{track.title}</h3>
          <h4>{track.user.username}</h4>
          <audio ref="audio" src={`${track.stream_url}?client_id=${CLIENT_ID}`}></audio>
        </div>
      );
    } else if(track === undefined) {
      return (
        <div className="track-info"></div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {activeTrack} = this.props;

    return (
      <div className="player">
        <div className="player-controls">
          <svg className="icon icon-backward2"><use onClick={this.handleSkip} xlinkHref="#icon-backward2"></use></svg>
          <svg className="icon icon-play3"><use onClick={this.handlePlay} xlinkHref="#icon-play3"></use></svg>
          <svg className="icon icon-forward3"><use onClick={this.handleSkip} xlinkHref="#icon-forward3"></use></svg>
        </div>
        <div className="active-track-container">
          {this.displayTrackInfo(activeTrack)}
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  activeTrack: PropTypes.object
};

function mapStateToProps(state) {
  return {
    activeTrack: state.tracks.activeTrack
  };
}

export default connect(mapStateToProps)(Player);
