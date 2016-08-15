// All actions pertaining to tracks
import * as ActionTypes from '../constants/actionTypes';

// import ajax status handlers
import {beginAjaxCall, catchAjaxCall} from './ajaxStatusActions';

// try to get local api key or from env
// if(process.env.NODE_ENV === 'production') {
//   var CLIENT_ID = process.env.SC_KEY;
// } else {
//   var CLIENT_ID = require('../constants/auth').CLIENT_ID;
// }
// import { CLIENT_ID } from '../constants/auth';

// return action payload
export function setTracks(tracks) {
  return {type: ActionTypes.SET_TRACKS, tracks};
}

// Action payload for success on getting tracks
export function getTracksSuccess(tracks) {
  return {type: ActionTypes.GET_TRACKS_SUCCESS, tracks: tracks};
}

// sets the active track by playlist index
export function setActiveTrack(trackIndex) {
 return {type: ActionTypes.SET_ACTIVE_TRACK, trackIndex: trackIndex};
}

//   // TODO: set up ajax status handlers


// api call to get tracks from soundcloud
export function getTracks(searchParams) {
  return function(dispatch) {
    // ajax  status handler
    dispatch(beginAjaxCall());

    if(searchParams === undefined) dispatch(getTracksSuccess({}));

    // returns a promise then handles it
    // catches error if an error occurs
    // return fetch(`https://api.soundcloud.com/tracks.json?client_id=${CLIENT_ID}&q=${searchParams}&limit=50&offset=0`)
    // return fetch(`http://localhost:3030/space?q=${searchParams}`)
      return fetch(`https://muze.blueaccords.com/api/tracks.json?q=${searchParams}&limit=50`)
        .then(response => response.json())
        .then(json => dispatch(getTracksSuccess(json)))
        .catch(error => {
          dispatch(catchAjaxCall(error));
        throw(error);
      });
  };
}

// returns new track index depending on change type and only if its a valid change
// should only be called within actions
export function setTrackChangeIndex(trackIndex, changeType) {
  return function(dispatch, getState) {
    const { tracks } = getState();
    const { playlist, activeTrackIndex } = tracks;
    let newTrackIndex = null;

    // TODO: set constants for song change types
    switch(changeType) {
      case 'next':
        newTrackIndex =  activeTrackIndex + 1;
        break;
      case 'prev':
        newTrackIndex = activeTrackIndex - 1;       
        break;
      case 'shuffle':
        newTrackIndex = Math.floor(Math.random() * playlist.length - 1);
        break;
    }

    // check if new index is valid within context of playlist length
    if(newTrackIndex >= playlist.length || newTrackIndex < 0) {
      return;
    } else {

      dispatch(setActiveTrack(newTrackIndex));
    }
  };
}
