import * as ActionTypes from '../constants/actionTypes';

export function togglePlayer(playerState) {
  return {
    type: ActionTypes.TOGGLE_PLAYER,
    playerState
  };
}
