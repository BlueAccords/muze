import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

// bind actions to .actions from redux
import {bindActionCreators} from 'redux';

// import all actions
import * as actions from '../../actions';
import TrackList from './TrackList';

// const tracks = [
//   {
//     title: 'Moe Shop'
//   },
//   {
//     title: 'Hello WOrld'
//   }
// ];

class SearchPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  // Checks props that this component will receive
  // and compares it to current props(before ajax calls are done)
  // and sets state accordingly if it has ajax calls waiting for it

  // Will always be called when props change or MAY have changed
  //(it can be called even if props haven't been changed)
  componentWillReceiveProps(nextProps) {
    // Checks nextProps because sometimes props don't change but
    // this function is ran anyways
    if (this.props.tracks.length != nextProps.tracks.length) {
      // Necessary to populate form when existing course is loaded directly
      // via course/:id
      this.setState({
        tracks: Object.assign({}, nextProps.tracks)
      });
    }
  }

  render () {
    const {onAuth, tracks} = this.props;
    return (
      <div className="SearchPage">
        <div>
          <button onClick={onAuth} type="button">Login</button>
        </div>
        <br/>
        <h1>Search Page</h1>
        <TrackList tracks={tracks}/>
      </div>
    );
  }
}

SearchPage.propTypes = {
  actions: PropTypes.object,
  fuelSavings: PropTypes.object,
  tracks: PropTypes.array
};

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // binding specific action to props.onAuth
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SearchPage);
