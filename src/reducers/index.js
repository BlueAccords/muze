import { combineReducers } from 'redux';
import tracks from './tracksReducer';
import ajaxStatus from './ajaxStatusReducer';

// Root reducer, so we only ever need to import one reducer

const rootReducer = combineReducers({
  tracks,
  ajaxStatus
});

export default rootReducer;
