import React from 'react';
import {Link, IndexLink } from 'react-router';

// Reusable header component, basic navigation
const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      <Link to="/search" activeClassName="active">Search</Link>
    </nav>
  );
};

export default Header;
