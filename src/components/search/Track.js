import React, {PropTypes}from 'react';
// import {Link} from 'react-router';

const Track = ({track, playTrack, index, active}) => {
  return (
    <tr className={isTrackActive(active)} onClick={() => {playTrack(index);}}>
      <td>
        <span className="track-title">{track.title}</span><br/>
        <span className="track-author">{track.user.username}</span>
      </td>
      <td>
        <span>
          {convertToTime(track.duration)}
        </span>
      </td>
    </tr>
  );
};

// Replaces artwork link with cropped version which has higher dimensions
// NOT USED RIGHT NOW because the cropped verisons, while bigger, are various in size
// function replaceArtwork(url) {
//   if(!url) return "http://placehold.it/100x100";

//   // const regx = /(-large)/;
//   // const str = url.replace(regx, "-crop");

//   return url;

/*
<td>
  <img className="track-art" src={replaceArtwork(track.artwork_url)} title={track.title}/>
  <svg className="icon icon-play3"><use onClick={() => {playTrack(index);}} xlinkHref="#icon-play3"></use></svg>
</td>

*/
// }

// check if active or not and return list of classNames relevant to state
function isTrackActive(active) {
  return active 
    ? "track-row active-track"
    : "track-row";
}

// convert soundcloud milliseconds to minutes:seconds
// function convertToTime(millis) {
//   const minutes = Math.floor(millis / 60000);
//   const seconds = ((millis % 60000) / 1000);

//   const dMinutes = Math.floor(seconds % (60 * 60) / 60);
//   const dMinGreaterThanHour = (seconds % 60);
//   const dSeconds = Math.floor(seconds);

//   var h = Math.floor(seconds / 3600);
//   var m = Math.floor(seconds % 3600 / 60);
//   var s = Math.floor(seconds % 3600 % 60);

//   // return dMinGreaterThanHour + "::" + minutes + ":" + (dSeconds < 10 ? '0' : '') + dSeconds;
//   return h + ":" + m + ":" + s;
// }

// convert to hh:mm:ss display time
// unless less than 1 hour in time then mm:ss instead
function convertToTime(millis) {
  const seconds = (millis / 1000);

  const dHours = Math.floor(seconds / (60 * 60));
  const dMinutes = Math.floor(seconds % (60 * 60) / 60);
  const dSeconds = (Math.floor(seconds % 60));

  return (dHours > 0)
    ? dHours + ":" 
      + (dMinutes < 10 ? "0" : "")
        + dMinutes + ":"
      + (dSeconds < 10 ? "0" : "") 
        + dSeconds
    : (dMinutes > 0 ? dMinutes + ":" : "0" + ":")
      + (dSeconds < 10 ? "0" : "") 
      + dSeconds;   
}

Track.propTypes = {
  track: PropTypes.object,
  playTrack: PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
  index: React.PropTypes.number.isRequired
};


export default Track;
