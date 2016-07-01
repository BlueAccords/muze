import React, {PropTypes} from 'react';
import Track from './Track';

const TrackList = ({tracks, onSetTrack}) => {
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
          <Track key={key} track={track} playTrack={onSetTrack}/>
        )}
      </tbody>
    </table>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  onSetTrack: PropTypes.func.isRequired
};

export default TrackList;
