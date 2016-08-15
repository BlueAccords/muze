import React, {PropTypes} from 'react';
import Track from './Track';

const TrackList = ({tracks, onSetTrack, activeIndex}) => {
  let wrapperClass = "table container";

  return (
    <table className={wrapperClass}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Uploader</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, index) =>
          <Track key={track.id} track={track} active={index === activeIndex}index={index} playTrack={onSetTrack}/>
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
