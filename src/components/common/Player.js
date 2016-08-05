import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

// try to get local api key or from env
// if(process.env.NODE_ENV === 'production') {
//   var CLIENT_ID = process.env.SC_KEY;
// } else {
//   var CLIENT_ID = require('../../constants/auth').CLIENT_ID;
// }
import { CLIENT_ID } from '../../constants/auth';

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    // local player state
    this.state = {
      currentAudioTime: 0,
      currentVolumeLevel: 100
    };

    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.displayTrackInfo = this.displayTrackInfo.bind(this);

    // audio controls
    this.handleAudioPlayed = this.handleAudioPlayed.bind(this);
    this.handleAudioPaused = this.handleAudioPaused.bind(this);

    // seekbar
    this.handleAudioTimeUpdate = this.handleAudioTimeUpdate.bind(this);
    this.handleSeeked = this.handleSeeked.bind(this);
    this.handleAudioTimeUpdate = this.handleAudioTimeUpdate.bind(this);
    this.onSeekbarChange = this.onSeekbarChange.bind(this);

    // volume controls
    this.onVolumeLevelChange = this.onVolumeLevelChange.bind(this);
    this.handleVolumeUpdated = this.handleVolumeUpdated.bind(this);
    
  }

  // Lifecycle components
  componentDidMount() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    // update ui icons based on audio element changes directly
    audioElement.addEventListener('play', this.handleAudioPlayed, false);
    audioElement.addEventListener('pause', this.handleAudioPaused, false);
    audioElement.addEventListener('timeupdate', this.handleAudioTimeUpdate, false);
    audioElement.addEventListener('seeked', this.handleSeeked, false);
    audioElement.addEventListener('volumechange', this.handleVolumeUpdated, false);
  }

  // compare changed activeTrack and automaticaly play song if activeTrack is different
  // from the previous;
  componentDidUpdate(prevProps) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if(this.props.activeTrack && this.props.activeTrack !== prevProps.activeTrack) {
      audioElement.play();
    }
  }

  // clean up event listeners on dismount
  componentWillUnmount() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    audioElement.removeEventListener('play', this.handleAudioPlayed, false);
    audioElement.removeEventListener('pause', this.handleAudioPaused, false);
    audioElement.removeEventListener('timeupdate', this.handleAudioTimeUpdate, false);
    audioElement.removeEventListener('seeked', this.handleSeeked, false);
    audioElement.removeEventListener('volumechange', this.handleVolumeUpdated, false);
  }

  // toggle redux store to show audio is playing
  // should only change if an active track is available
  handleAudioPlayed() {
    const { activeTrack } = this.props;
    if(activeTrack) this.props.actions.togglePlaying(true);
  }
  
  // toggle redux store playing state to pause
  handleAudioPaused() {
    const { activeTrack } = this.props;
    if(activeTrack) this.props.actions.togglePlaying(false);
  }

  handleAudioTimeUpdate(e) {
    const time = Math.floor(e.target.currentTime);
    this.setState({
      currentAudioTime: time
    });
  }

  // handles event for when audio element's time is changed via a seek event.
  // should update component state to reflect change
  handleSeeked(e) {
    const changedTime = e.target.currentTime;
    this.setState({
      currentAudioTime: changedTime
    });
  }

  handleVolumeUpdated(e) {
    const changedVolume = Math.floor(e.target.volume * 100);
    this.setState({
      currentVolumeLevel: changedVolume
    });
  }

  // display track info or not depending on if an active track is loaded
  displayTrackInfo(track) {
    // if track is NOT undefined and object isn't empty then display info
    if(track !== undefined && Object.keys(track).length > 0) {
      return (
        <div className="track-info">
          <h3>{track.title}</h3>
          <h4>{track.user.username}</h4>
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

  // convert soundcloud milliseconds to seconds
  convertToSeconds(millis) {
    const seconds = Math.floor((millis / 1000));
    return seconds;
  }

  // conver to mm:ss display time
  convertToDisplayTime(seconds) {
    const dMinutes = Math.floor(seconds / 60);
    const dSeconds = (Math.floor(seconds % 60));
    return dMinutes + ":" + (dSeconds < 10 ? '0' : '') + dSeconds;
  }



  // handle changes to seek bar range input and 
  // update audio player's current time to set seek time
  onSeekbarChange(e) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    let newValue = e.target.value;

    audioElement.currentTime = newValue;
  }

  // update volume of audio element on audio range slider change event
  onVolumeLevelChange(e) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    // volume value for audio element is 0 to 100, slider is 0-100 converted to 0..1
    const newValue = e.target.value/100;

    audioElement.volume = newValue;
  }

  // toggle audio element playing/pause if possible
  onTogglePlay() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    // if not found return nothing
    if (!audioElement) { return; }
    const { playing, activeTrack } = this.props;

    if (playing && activeTrack) {
      audioElement.pause();
    } else if(!playing && activeTrack){
      audioElement.play();
    }
  }

  onSkip() {
    console.log('skip was clicked');
  }

  // formatStreamUrl(url) {
  //   if(url === 'undefined') return "";

  //   const proxyUrl = `http://localhost:3030/stream?url=${url}`;
  //   return proxyUrl;
  // }

  render() {
    const {activeTrack, playing} = this.props;

    // XXX: <audio ref="audio" src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}></audio>
    // this is the original audio element.
    // i'm currently replacing this with a version that directly references an mp3 track on the local
    // dev environment so put this back inside the return function once internet is back
    return (
      <div className="player">
        <div className="player-controls">
          <svg className="icon icon-backward2"><use onClick={this.onSkip} xlinkHref="#icon-backward2"></use></svg>
          {playing
          ? <svg onClick={this.onTogglePlay} className="icon icon-pause2"><use xlinkHref="#icon-pause2"></use></svg>
          : <svg onClick={this.onTogglePlay} className="icon icon-play3"><use  xlinkHref="#icon-play3"></use></svg>
          }

          <svg className="icon icon-forward3"><use onClick={this.onSkip} xlinkHref="#icon-forward3"></use></svg>
        </div>
        <div className="active-track-container">
          <audio ref="audio" src={activeTrack.stream_url}></audio>
          {this.displayTrackInfo(activeTrack)}
          <div className="seek-bar-container">
            <span className="seek-bar-current-time">
              {this.convertToDisplayTime(this.state.currentAudioTime)}
            </span>
            <input
              className="seek-bar"
              type="range"
              value={this.state.currentAudioTime}
              min="0" max={this.convertToSeconds(activeTrack.duration)}
              onChange={this.onSeekbarChange}
            />
            <span className ="seek-bar-end-time">
              {this.convertToDisplayTime(this.convertToSeconds(activeTrack.duration))}
            </span>
          </div>
          <div className="volume-container">
            <input
              className="volume-bar"
              type="range"
              value={this.state.currentVolumeLevel}
              min="0" max="100"
              onChange={this.onVolumeLevelChange}
            />
            <span>{this.state.currentVolumeLevel}</span>
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  activeTrack: PropTypes.object,
  playing: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    activeTrack: state.tracks.activeTrack,
    playing: state.player.playing
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
