import React, {PropTypes} from 'react';
// import {Link} from 'react-router';

const Track = ({track}) => {
  return (
    <tr>
      <td>
        <a href={track.title} target="_blank">{track.title}</a>
      </td>
    </tr>
  );
};

export default Track;