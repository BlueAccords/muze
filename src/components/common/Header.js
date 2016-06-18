import React from 'react';
import {Link, IndexLink } from 'react-router';

// Reusable header component, basic navigation
const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/" activeClassName="active">About</Link>
      {" | "}
      <Link to="/" activeClassName="active">Explore</Link>
    </nav>
  );
};

export default Header;
