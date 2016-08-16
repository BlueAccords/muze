import React from 'react';
import {Link} from 'react-router';


import scImg from '../../public/powered_by_sc_white.png';
// Reusable header component, basic navigation
const Header = () => {
  return (
    <header>
      <nav>
        <h1 className="header-title">Muze</h1>
        <div className="nav-lg">
          <ul className="nav-lg-menu" id="main-menu">
            <li id="slide-menu-close-btn">&larr; Close Menu</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><a href="soundcloud.com"><img src={scImg} alt="soundcloud attribution"/></a></li>
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
