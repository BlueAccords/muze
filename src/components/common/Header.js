import React from 'react';
import {Link, IndexLink } from 'react-router';

// Reusable header component, basic navigation
const Header = () => {
  return (
    <header>
      <nav>
        <h1 className="header-title">Muze</h1>
        <div className="nav-lg">
          <ul className="nav-lg-menu" id="main-menu">
            <li id="slide-menu-close-btn">&larr; Close Menu</li>
            <li><a href="/">Home</a></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Search">Search</a></li>
          </ul>
        </div>

          <button id="hamburger-button">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
      </nav>
</header>
  );
};

export default Header;
