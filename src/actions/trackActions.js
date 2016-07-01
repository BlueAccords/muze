// All actions pertaining to tracks
import * as ActionTypes from '../constants/actionTypes';
import {CLIENT_ID} from '../constants/auth';

// import ajax status handlers
import {beginAjaxCall, catchAjaxCall} from './ajaxStatusActions';

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
 return {type: ActionTypes.SET_ACTIVE_TRACK, track: track}
}

// api call to get tracks from soundcloud
export function getTracks(searchParams) {
  return function(dispatch) {
    // ajax  status handler
    dispatch(beginAjaxCall());

    if(searchParams === undefined) dispatch(getTracksSuccess({}));

    // returns a promise then handles it
    // catches error if an error occurs
    return fetch(`https://api.soundcloud.com/tracks.json?client_id=${CLIENT_ID}&q=${searchParams}&limit=50&offset=0`)
      .then(response => response.json())
      .then(json => dispatch(getTracksSuccess(json)))
      .catch(error => {
        dispatch(catchAjaxCall(error))
      throw(error);
    });
  };
}
