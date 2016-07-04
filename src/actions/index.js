// Root file containing all actions so they can be exported all at once

// import {auth} from './auth';
import { setTracks, getTracks, setActiveTrack } from './trackActions';

// player actions
import { togglePlaying } from './playerActions';

// ajax status
import {beginAjaxCall, catchAjaxCall} from './ajaxStatusActions';

export {
  setTracks, getTracks, setActiveTrack,
  togglePlaying,
  beginAjaxCall, catchAjaxCall
};
