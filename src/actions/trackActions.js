// All actions pertaining to tracks
import * as ActionTypes from '../constants/actionTypes';
import {CLIENT_ID} from '../constants/auth';

// return action payload
export function setTracks(tracks) {
  return {type: ActionTypes.SET_TRACKS, tracks};
}

// Action payload for success on getting tracks
export function getTracksSuccess(tracks) {
  return {type: ActionTypes.GET_TRACKS_SUCCESS, tracks: tracks.collection};
}

export function getTracks() {
  return function(dispatch) {
    // ajax  status handler
    // dispatch(beginAjaxCall());

    // returns a promise then handles it
    // catches error if an error occurs
    return fetch(`http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${CLIENT_ID}&tags=house&limit=50&offset=0`)
      .then(response => response.json())
      .then(json => dispatch(getTracksSuccess(json)))
      .catch(error => {
      throw(error);
    });
  };
}