import { combineReducers } from 'redux';
import tracks from './tracksReducer';

// Root reducer, so we only ever need to import one reducer

const rootReducer = combineReducers({
  tracks
});

export default rootReducer;
