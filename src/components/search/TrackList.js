import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const TrackList = ({tracks = []}) => {
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

        {tracks.map((track, key) => 
          <tr key={key}>
            <td  className="track">{track.title}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

TrackList.propTypes = {
  tracks: React.PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  // The state for these are named in the reducerCombiner aka ./reducers/index.js
  const tracks = state.tracks;
  return {
    tracks: state.tracks
  };
}

export default connect(mapStateToProps)(TrackList);