import { combineReducers } from 'redux';
import tracks from './tracksReducer';
import ajaxStatus from './ajaxStatusReducer';
import player from './playerReducer';
import playlist from './playlistReducer';

// Root reducer, so we only ever need to import one reducer

const rootReducer = combineReducers({
  tracks,
  player,
  ajaxStatus,
  playlist
});

export default rootReducer;
