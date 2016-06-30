// import all action types
import * as ActionTypes from '../constants/actionTypes';

// lib to help with returning immutable objects
import objectAssign from 'object-assign';

// central initial state
import initialState from './initialState';

// helper function to check action type and see if it ends in "_SUCCESS"
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxStatus, action) {
  if (action.type === ActionTypes.BEGIN_AJAX_CALL) {
    return incrementAjax(state, action);
  } else if (action.type == ActionTypes.CATCH_AJAX_CALL ||
    actionTypeEndsInSuccess(action.type)) {
    return decrementAjax(state, action);
  }

  return state;
}

// increment count of ajax actions in progress
function incrementAjax(state, action) {
  console.log(state.ajaxStatus);
  const ajaxCount = state.tracks + 1;
  return objectAssign({}, ...state,{
      tracks: ajaxCount
    }
  );
}

// decrement ajax count
// TODO: refactor this, its identical to the incrementAjax function
function decrementAjax(state, action) {
  const ajaxCount = state.tracks - 1;


  return objectAssign({}, ...state,{
      tracks: ajaxCount
    }
  );
}
