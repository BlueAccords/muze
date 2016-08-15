import React, {PropTypes}from 'react';
// import {Link} from 'react-router';

const Track = ({track, playTrack, index}) => {
  return (
    <tr className="track-row" onClick={() => {playTrack(index);}}>
      <td>
        <a href={track.permalink_url} target="_blank">{track.title}</a>
      </td>
      <td>
        <span>
          <a href={track.user.permalink_url}>{track.user.username}</a>
        </span>
      </td>
      <td>
        <span>
          {convertToTime(track.duration)}
        </span>
      </td>
      <td>
        <span>{track.genre}</span>
      </td>
      <td>
        <span>{track.likes_count}</span>
      </td>
    </tr>
  );
};

// Replaces artwork link with cropped version which has higher dimensions
// NOT USED RIGHT NOW because the cropped verisons, while bigger, are various in size
function replaceArtwork(url) {
  if(!url) return "http://placehold.it/100x100";

  // const regx = /(-large)/;
  // const str = url.replace(regx, "-crop");

  return url;

/*
<td>
  <img className="track-art" src={replaceArtwork(track.artwork_url)} title={track.title}/>
  <svg className="icon icon-play3"><use onClick={() => {playTrack(index);}} xlinkHref="#icon-play3"></use></svg>
</td>

*/
}

// convert soundcloud milliseconds to minutes:seconds
function convertToTime(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

Track.propTypes = {
  track: PropTypes.object,
  playTrack: PropTypes.func.isRequired
};


export default Track;
