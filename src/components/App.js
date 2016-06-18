import React, { PropTypes } from 'react';
// import { Link, IndexLink } from 'react-router';
import Header from './common/Header';
import Jumbotron from './home/Jumbotron';

const App = (props) => {
  return (
    <div>
      <Header />
      <br/>
      <Jumbotron />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
