import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';
import Header from './common/Header';

const App = (props) => {
  return (
    <div>
      <Header />
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
