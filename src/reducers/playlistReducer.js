import * as ActionTypes from '../constants/actionTypes';

// object assign poly fill
import objectAssign from 'object-assign';

const initialState = {
  activeTrackIndex: null,
  activePlaylistIndex: null,
  playlists: []
}

export default function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_PLAYLIST_TRACKS:
      return setPlaylistTracks(state, action);
    case ActionTypes.SET_ACTIVE_PLAYLIST_TRACK:
      return setActiveTrack(state, action);
    default:
      return state;
  }
}

function setPlaylistTracks(state, action) {
  const { title, tracks } = action;

  return {...state,
    playlists:[

    ] 
  };
}

function setActiveTrack(state, action) {
  const { trackIndex } = action;
  
  return objectAssign({}, state, {
    activeTrackIndex: trackIndex
  });
}

function setActivePlaylist(state, action) {
  const { playlistIndex } = action;
  
  return objectAssign({}, state, {
    activePlaylistIndex: playlistIndex
  });
}