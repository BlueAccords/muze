// All actions pertaining to tracks
import * as types from '../constants/actionTypes';

// return action payload
export function setTracks(tracks) {
  return {type: types.SET_TRACKS, tracks};
}