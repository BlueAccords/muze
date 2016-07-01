import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {bindActionCreators} from 'redux';
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
    const { playing } = this.props;

    // if an active track is found then play else pause
    if (playing && activeTrack) {
      audioElement.pause();
      this.props.actions.togglePlayer(false);
    } else if(!playing && activeTrack){
      audioElement.play();
      this.props.actions.togglePlayer(true);
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
    const {activeTrack, playing} = this.props;

    return (
      <div className="player">
        <div className="player-controls">
          <svg className="icon icon-backward2"><use onClick={this.handleSkip} xlinkHref="#icon-backward2"></use></svg>
          {playing
          ? <svg onClick={this.handlePlay} className="icon icon-pause2"><use xlinkHref="#icon-pause2"></use></svg>
          : <svg onClick={this.handlePlay} className="icon icon-play3"><use  xlinkHref="#icon-play3"></use></svg>
          }

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
