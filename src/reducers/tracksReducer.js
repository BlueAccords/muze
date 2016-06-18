// import all action types
import * as ActionTypes from '../constants/actionTypes';

// lib to help with returning immutable objects
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function tracksReducer(state = initialState.tracks, action) {
  
  // switch actions
  switch (action.type) {
    // Set tracks ==============================================================
    case ActionTypes.SET_TRACKS:
      // Use redux thunk here to make async call
      
      return setTracks(state, action);

    // default =================================================================
    default:
      return state;
  }
}

function setTracks(state, action) {
  const {tracks} = action;
  return objectAssign({}, ...state, ...tracks);
}