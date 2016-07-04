import * as ActionTypes from '../constants/actionTypes';

export function togglePlaying(playerState) {
  return {
    type: ActionTypes.TOGGLE_PLAYER,
    playerState
  };
}
