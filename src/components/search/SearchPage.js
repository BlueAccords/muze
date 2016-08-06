import React, {PropTypes, Component} from 'react';
// import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


// bind actions to .actions from redux
import {bindActionCreators} from 'redux';

// import all actions
import * as actions from '../../actions';

// import components
import TrackList from './TrackList';
import SearchForm from '../common/SearchForm';

// Parent Smart component
class SearchPage extends Component {
  constructor(props, context) {
    super(props, context);

    // Storing form data in local component state, no other components
    // need this data. Like. at all. Unless its submitted to them.
    this.state = {
      search: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateSearchState = this.updateSearchState.bind(this);
    this.setActiveTrack = this.setActiveTrack.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.actions.getTracks(this.state.search);
  }

  // Updates search state every keystroke(yes its pretty often)
  updateSearchState(event) {
    let search = event.target.value;
    return this.setState({
      search: search
    });
  }

  // sets the active track to the passed in track
  // then plays the track in the player
  setActiveTrack(trackIndex) {
    // if(this.props.activeTrack !== track.id) 
    console.log('trakc index here', trackIndex)
    this.props.actions.setActiveTrack(trackIndex);
  }

  // display results
  // if none display nothing, else if loading results display spinner
  displayResults(tracks, loading) {

    if(loading) {
      return (
        <h1>Loadingu</h1>
      );
    } else if(tracks === undefined) {
      return (
        <h1>No results found</h1>
      );
    } else if(!loading && tracks.length > 0 ) {
      return (
        <TrackList tracks={tracks} onSetTrack={this.setActiveTrack}/>
      );
    } else {
      return (
        <h1>No results</h1>
      );
    }
  }



  render () {
    const {tracks, loading} = this.props;


    return (
      <div className="container SearchPage">
        <br/>
        <h1>Search Page</h1>
        <SearchForm
          onSubmit={this.onSubmit}
          onChange={this.updateSearchState}
          searchValue = {this.state.search}
          />
        {this.displayResults(tracks, loading)}


      </div>
    );
  }
}

// prop validation
SearchPage.propTypes = {
  actions: PropTypes.object,
  tracks: PropTypes.array,
  search: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

// Get tracks from src/index.js dispatching an action to load tracks into store's state or
// directly from redux store
function mapStateToProps(state) {
  const {tracks, activeTrackIndex} = state.tracks;
  const isPlaying = state.player.playing;
  return {
    tracks,
    isPlaying,
    activeTrackIndex,
    search: {},
    loading: state.ajaxStatus.tracks > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // binding all actions
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SearchPage);
