import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';

// try to get local api key or from env
if(process.env.NODE_ENV === 'production') {
  var CLIENT_ID = process.env.SC_KEY;
} else {
  var CLIENT_ID = require('../../constants/auth');
}

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleTogglePlay = this.handleTogglePlay.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
    this.displayTrackInfo = this.displayTrackInfo.bind(this);
    this.handleAudioPlayed = this.handleAudioPlayed.bind(this);
    this.handleAudioPaused = this.handleAudioPaused.bind(this);
  }

  // Lifecycle components
  componentDidMount() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    // update ui icons based on audio element changes directly
    audioElement.addEventListener('play', this.handleAudioPlayed, false);
    audioElement.addEventListener('pause', this.handleAudioPaused, false);
  }

  // clean up event listeners on dismount
  componentWillUnmount() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    audioElement.removeEventListener('play', this.handleAudioPlayed, false);
    audioElement.removeEventListener('pause', this.handleAudioPaused, false);
  }

  // compare changed activeTrack and automaticaly play song if activeTrack is different
  // from the previous
  componentDidUpdate(prevProps) {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio);

    if(this.props.activeTrack && this.props.activeTrack !== prevProps.activeTrack) {
      audioElement.play();
    }
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

  // toggle audio element playing/pause if possible
  handleTogglePlay() {
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
    const {activeTrack, playing} = this.props;

    return (
      <div className="player">
        <div className="player-controls">
          <svg className="icon icon-backward2"><use onClick={this.handleSkip} xlinkHref="#icon-backward2"></use></svg>
          {playing
          ? <svg onClick={this.handleTogglePlay} className="icon icon-pause2"><use xlinkHref="#icon-pause2"></use></svg>
          : <svg onClick={this.handleTogglePlay} className="icon icon-play3"><use  xlinkHref="#icon-play3"></use></svg>
          }

          <svg className="icon icon-forward3"><use onClick={this.handleSkip} xlinkHref="#icon-forward3"></use></svg>
        </div>
        <div className="active-track-container">
          <audio ref="audio" src={`${activeTrack.stream_url}?client_id=${CLIENT_ID}`}></audio>
          {this.displayTrackInfo(activeTrack)}
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
