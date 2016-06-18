import React, {PropTypes} from 'react';
// import CourseListRow from './CourseListRow';

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

export default TrackList;