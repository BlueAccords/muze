import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';
import Header from './common/Header';
import Player from './common/Player';
import SvgDefinitions from './common/SvgDefinitions';
import testImage from '../public/chouchou_lunaria.jpg';

const App = (props) => {
  return (
    <div>
      <SvgDefinitions />
      <Header />
      <br/>
      {props.children}
      <Player />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
