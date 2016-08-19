// All actions pertaining to tracks
import * as ActionTypes from '../constants/actionTypes';

// import ajax status handlers
import {beginAjaxCall, catchAjaxCall} from './ajaxStatusActions';

import _ from 'lodash';

// try to get local api key or from env
// if(process.env.NODE_ENV === 'production') {
//   var CLIENT_ID = process.env.SC_KEY;
// } else {
//   var CLIENT_ID = require('../constants/auth').CLIENT_ID;
// }
// import { CLIENT_ID } from '../constants/auth';

// return action payload
export function setPlaylistTracks(tracks, playlistIndex) {
  return {
    type: ActionTypes.SET_PLAYLIST_TRACKS,
    tracks: tracks,
    playlistIndex: playlistIndex
  };
}

// sets the active track by playlist index
export function setActiveTrack(trackIndex) {
 return {
  type: ActionTypes.SET_ACTIVE_PLAYLIST_TRACK,
  trackIndex: trackIndex 
  };
}

export function setActivePlaylist(playlistIndex) {
  return {
    type: ActionTypes.SET_ACTIVE_PLAYLIST_INDEX,
    playlistIndex: playlistIndex
  };
}

// updates active track and queue list
// the queue list by default is the frist playlist in the list of arrays.
export function updateQueueAndTrack(trackIndex) {
  return function(dpsatch, getState) {
    const { tracks, playlist } = getState();
    const { playlists, activeTrackIndex, activePlaylistIndex } = playlist;
    const trackList = tracks.tracks;

    if(playlists === null || !_.isEqual(playlists[activePlaylistIndex], trackList)) {
      return dispatch(
        dispatch(setPlaylistTracks(trackList));
      ).then(() => 
        dispatch(setPlaylistTracks(trackList));
      )
    }
  }
}

// returns new track index depending on change type and only if its a valid change
// should only be called within actions
export function setTrackChangeIndex(trackIndex, changeType) {
  return function(dispatch, getState) {
    const { tracks, playlist } = getState();
    const { playlists, activeTrackIndex } = playlist;
    const trackList = tracks.tracks;
    let newTrackIndex = null;

    // TODO: set constants for song change types
    switch(changeType) {
      case 'next':
        newTrackIndex =  activeTrackIndex + 1;
        break;
      case 'prev':
        newTrackIndex = activeTrackIndex - 1;       
        break;
      case 'shuffle':
        newTrackIndex = Math.floor(Math.random() * playlist.length - 1);
        break;
    }

    // check if new index is valid within context of playlist length
    if(newTrackIndex >= playlist.length || newTrackIndex < 0) {
      return;
    } else {
      dispatch(setActiveTrack(newTrackIndex));
    }
  };
}
