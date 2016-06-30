import React from 'react';
import Track from './Track';

const TrackList = ({tracks}) => {
  let wrapperClass = "table container";

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
        {tracks.map((track, key) =>
          <Track key={key} track={track}/>
        )}
      </tbody>
    </table>
  );
};

export default TrackList;
