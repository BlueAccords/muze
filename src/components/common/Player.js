import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';

// try to get local api key or from env
// if(process.env.NODE_ENV === 'production') {
//   var CLIENT_ID = process.env.SC_KEY;
// } else {
//   var CLIENT_ID = require('../../constants/auth').CLIENT_ID;
// }
// import { CLIENT_ID } from '../../constants/auth';

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    // local player state
    this.state = {
      currentAudioTime: 0,
      currentAudioDuration: 0,
      currentVolumeLevel: 100,
      isShuffle: false
    };

    this.onTogglePlay = this.onTogglePlay.bind(this);
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
    
    // track change events
    this.onNextTrack = this.onNextTrack.bind(this);
    this.onPrevTrack = this.onPrevTrack.bind(this);
    this.handleAudioEnded = this.handleAudioEnded.bind(this);

    // format util function
    this.formatStreamURL = this.formatStreamURL.bind(this);

    // checkbox event handler
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
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
    audioElement.addEventListener('ended', this.handleAudioEnded, false);
  }

  // compare changed activeTrack and automaticaly play song if activeTrack is different
  // from the previous;
  // additionally, set local state's duration
  componentDidUpdate(prevProps) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);
    const { activeTrackIndex, playlist } = this.props;

    if(activeTrackIndex !== undefined && activeTrackIndex !== prevProps.activeTrackIndex) {
      const activeTrack = playlist[activeTrackIndex];
      const duration = Math.floor(activeTrack.duration);

      this.setState({
        currentAudioDuration: duration
      });

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
    audioElement.removeEventListener('ended', this.handleAudioEnded, false);
  }

  // toggle redux store to show audio is playing
  // should only change if an active track is available
  handleAudioPlayed() {
    const { activeTrackIndex } = this.props;
    if(activeTrackIndex !== undefined) this.props.actions.togglePlaying(true);
  }
  
  // toggle redux store playing state to pause
  handleAudioPaused() {
    const { activeTrackIndex } = this.props;
    if(activeTrackIndex !== undefined) this.props.actions.togglePlaying(false);
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

  // play next song in playlist on audio end depending on state options
  handleAudioEnded() {
    const { activeTrackIndex } = this.props;
    
    if(activeTrackIndex !== undefined && !this.state.isShuffle){
      this.props.actions.setTrackChangeIndex(activeTrackIndex, 'next');
    } else if(this.state.isShuffle) {
      this.props.actions.setTrackChangeIndex(activeTrackIndex, 'shuffle'); 
    }
  }

  // display track info or not depending on if an active track is loaded
  displayTrackInfo(track) {
    // if track is NOT undefined and object isn't empty then display info
    if(track !== undefined && Object.keys(track).length > 0) {
      return (
        <div className="track-info">
          <img className="track-art" src={this.placeholderArtwork(track.artwork_url)} title={track.title}/>
          <div className="track-text-info">
            <h3>{track.title}</h3>
            <h4>{track.user.username}</h4>
          </div>
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
    const { playing, activeTrackIndex } = this.props;

    if (playing && activeTrackIndex !== undefined) {
      audioElement.pause();
    } else if(!playing && activeTrackIndex !== undefined){
      audioElement.play();
    }
  }

  onNextTrack() {
    const { activeTrackIndex } = this.props;
    
    if(activeTrackIndex !== undefined) this.props.actions.setTrackChangeIndex(activeTrackIndex, 'next');
  }

  onPrevTrack() {
    const { activeTrackIndex } = this.props;
    
    if(activeTrackIndex !== undefined) this.props.actions.setTrackChangeIndex(activeTrackIndex, 'prev');
  }

  // format stream url
  formatStreamURL(track) {
    if(track !== undefined) {
      // return `http://localhost:3030/stream?id=${track.id}`;
      return `https://muze.blueaccords.com/api/tracks/${track.id}/stream`;
    } else {
      return "";
    }
  }

  // display svg volume icon depending on volume level
  displayVolumeIcon() {
    const volume = this.state.currentVolumeLevel;

    if(volume >= 70) {
      return <svg className="icon icon-volume-high"><use onClick={this.onSkip} xlinkHref="#icon-volume-high"></use></svg>;
    } else if(volume >= 40 && volume < 70) {
      return <svg className="icon icon-volume-medium"><use onClick={this.onSkip} xlinkHref="#icon-volume-medium"></use></svg>;
    } else if(volume > 0 && volume < 40) {
      return <svg className="icon icon-volume-low"><use onClick={this.onSkip} xlinkHref="#icon-volume-low"></use></svg>;
    } else if(volume === 0) {
      return <svg className="icon icon-volume-mute"><use onClick={this.onSkip} xlinkHref="#icon-volume-mute"></use></svg>;
    } else {
      return;
    }
  }

  // replaces soundtrack artwork with placeholder if one is not available
  placeholderArtwork(url) {
    if(!url) return "http://placehold.it/100x100";

    // const regx = /(-large)/;
    // const str = url.replace(regx, "-crop");

    return url;
  }

  onCheckboxChange(e) {
    this.setState({
      isShuffle: e.target.checked
    });
  }

  render() {
    const {playlist, activeTrackIndex, playing} = this.props;
    const activeTrack = playlist[activeTrackIndex]; 
    // XXX: <audio ref="audio" src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}></audio>
    // this is the original audio element.
    // i'm currently replacing this with a version that directly references an mp3 track on the local
    // dev environment so put this back inside the return function once internet is back
    return (
      <div className="player">
        <div className="seek-bar-container">
          <span className="seek-bar-current-time">
            {this.convertToDisplayTime(this.state.currentAudioTime)}
          </span>
          <input
            className="seek-bar"
            type="range"
            value={this.state.currentAudioTime}
            min="0" max={this.convertToSeconds(this.state.currentAudioDuration)}
            onChange={this.onSeekbarChange}
          />
          <span className ="seek-bar-end-time">
            {this.convertToDisplayTime(this.convertToSeconds(this.state.currentAudioDuration))}
          </span>
        </div>

        <div className="player-info-container">
          <div className="player-info">
            {this.displayTrackInfo(activeTrack)}
            
            <audio ref="audio" src={this.formatStreamURL(activeTrack)}></audio>
          </div>
          <div className="player-controls">
            <svg className="icon icon-backward2"><use onClick={this.onPrevTrack} xlinkHref="#icon-backward2"></use></svg>
            {playing
            ? <svg onClick={this.onTogglePlay} className="icon icon-pause2"><use xlinkHref="#icon-pause2"></use></svg>
            : <svg onClick={this.onTogglePlay} className="icon icon-play3"><use  xlinkHref="#icon-play3"></use></svg>
            }

            <svg className="icon icon-forward3"><use onClick={this.onNextTrack} xlinkHref="#icon-forward3"></use></svg>
            
            <input
              id="shuffle-input"
              type="checkbox"
              defaultChecked={this.state.isShuffle}
              checked={this.state.isShuffle}
              onChange={this.onCheckboxChange}
            />
            <label htmlFor="shuffle-input" className="shuffle-label">
              <svg className="icon icon-shuffle"><use xlinkHref="#icon-shuffle"></use></svg>
            </label>
            
          </div>

          <div className="volume-container">
            {this.displayVolumeIcon()}
            <input
              className="volume-bar"
              type="range"
              value={this.state.currentVolumeLevel}
              min="0" max="100"
              onChange={this.onVolumeLevelChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  activeTrackIndex: React.PropTypes.number,
  playing: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  playlist: React.PropTypes.arrayOf(PropTypes.object)
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    activeTrackIndex: state.tracks.activeTrackIndex,
    playing: state.player.playing,
    playlist: state.tracks.playlist
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
