// All actions pertaining to tracks
import * as ActionTypes from '../constants/actionTypes';

// return action payload
export function setTracks(tracks) {
  return {type: ActionTypes.SET_TRACKS, tracks};
}