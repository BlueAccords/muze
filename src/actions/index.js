// Root file containing all actions so they can be exported all at once

// import {auth} from './auth';
import { setTracks, getTracks } from './trackActions';

// player actions
import { togglePlaying } from './playerActions';

// playlist actions
import { setActiveTrack, setTrackChangeIndex } from './playlistActions';

// ajax status
import {beginAjaxCall, catchAjaxCall} from './ajaxStatusActions';

export {
  setTracks, getTracks,
  togglePlaying,
  setActiveTrack, setTrackChangeIndex,
  beginAjaxCall, catchAjaxCall
};
