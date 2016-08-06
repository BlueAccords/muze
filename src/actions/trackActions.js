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
import { CLIENT_ID } from '../constants/auth';

// return action payload
export function setTracks(tracks) {
  return {type: ActionTypes.SET_TRACKS, tracks};
}

// Action payload for success on getting tracks
export function getTracksSuccess(tracks) {
  return {type: ActionTypes.GET_TRACKS_SUCCESS, tracks: tracks};
}

// sets the active track
export function setActiveTrack(track) {
 return {type: ActionTypes.SET_ACTIVE_TRACK, track: track};
}

// api call on proxy api to get direct link to track stream url
// export function getDirectTrackUrl(track) {
//   // if no activeTrack is available then do nothing
//   if(track.setActiveTrack === undefined) setActiveTrack(track);

//   // TODO: set up ajax status handlers

// }

// api call to get tracks from soundcloud
export function getTracks(searchParams) {
  return function(dispatch) {
    // ajax  status handler
    dispatch(beginAjaxCall());

    if(searchParams === undefined) dispatch(getTracksSuccess({}));

    // returns a promise then handles it
    // catches error if an error occurs
    // return fetch(`https://api.soundcloud.com/tracks.json?client_id=${CLIENT_ID}&q=${searchParams}&limit=50&offset=0`)
    return fetch(`http://localhost:3030/space/${searchParams}`)
      .then(response => response.json())
      .then(json => dispatch(getTracksSuccess(json)))
      .catch(error => {
        dispatch(catchAjaxCall(error));
      throw(error);
    });
  };
}
