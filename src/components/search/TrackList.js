import React from 'react';
import Track from './Track';

const TrackList = ({tracks, results}) => {
  let wrapperClass = "table container";
  if (results) {
    wrapperClass += " " + "active-search";
  } else {
    wrapperClass += " " + "inactive-search";
  }

  return (
    <table className={wrapperClass}>
      <thead>
        <tr>
          <th>Art</th>
          <th>Title</th>
          <th>Uploader</th>
          <th>Length</th>
          <th>Genre</th>
          <th>Likes</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => 
          <Track key={track.title} track={track}/>
        )}
      </tbody>
    </table>
  );
};

export default TrackList;