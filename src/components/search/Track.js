import React from 'react';
// import {Link} from 'react-router';

const Track = ({track}) => {
  return (
    <tr>
      <td>
        <img src={replaceArtwork(track.artwork_url)} title={track.title}/>
      </td>
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

  const regx = /(-large)/;
  const str = url.replace(regx, "-crop");

  return url;
}

// convert soundcloud milliseconds to minutes:seconds
function convertToTime(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


export default Track;