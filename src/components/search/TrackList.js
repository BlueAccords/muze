import React from 'react';
import Track from './Track';

const TrackList = ({tracks}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
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