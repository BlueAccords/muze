import { combineReducers } from 'redux';
import tracksReducer from './tracksReducer';

// Root reducer, so we only ever need to import one reducer

const rootReducer = combineReducers({
  tracksReducer
});

export default rootReducer;
