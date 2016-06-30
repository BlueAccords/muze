import * as ActionTypes from '../constants/actionTypes';

// begin ajax call and increment counter by 1
// no payload needed
export function beginAjaxCall(tracks) {
  return {type: ActionTypes.BEGIN_AJAX_CALL};
}

// catch ajax call errors
export function catchAjaxCall() {
  return {type: ActionTypes.CATCH_AJAX_CALL}
}


