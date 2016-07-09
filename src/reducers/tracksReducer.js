// import all action types
import * as ActionTypes from '../constants/actionTypes';

// lib to help with returning immutable objects
import objectAssign from 'object-assign';
const initialState = {
    tracks: [],
    activeTrack: {}
  }

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function tracksReducer(state = initialState, action) {
  // switch actions
  switch (action.type) {

    // Set tracks ==============================================================
    case ActionTypes.SET_TRACKS:
      return setTracks(state, action);
    /*
      Handles the payload after api call to get a list of tracks from soundcloud
      Returns a new state with the newly added tracks
     */
    case ActionTypes.GET_TRACKS_SUCCESS:
      if(action.tracks === undefined) return state;
      return setTracks(state, action);
    case ActionTypes.SET_ACTIVE_TRACK:
      return setActiveTrack(state, action);
    default:
      return state;
  }
}

// Replace tracks in state with new tracks
function setTracks(state, action) {
  const {tracks} = action;

  return { ...state, tracks: tracks};
}

function setActiveTrack(state, action) {
  const {track} = action;
  return objectAssign({}, state, {
    activeTrack: track
  });
}
