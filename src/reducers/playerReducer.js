import * as ActionTypes from '../constants/actionTypes';

// import objectAssign from 'object-assign';
import initialState from './initialState';

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_PLAYER:
      return setPlayerStatus(state, action);
    default:
      return state;
  }
}

function setPlayerStatus(state, action) {
  const {playerState} = action;

  return { ...state, playing: playerState};
}

