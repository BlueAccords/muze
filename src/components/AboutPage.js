import React from 'react';
// import {Link} from 'react-router';
import '../styles/about-page.css';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div>
      <h2 className="alt-header">About</h2>
      <p>
        This app is built using react/redux and its source code can be found
         <a href="https://github.com/BlueAccords/muze">here</a>
      </p>
    </div>
  );
};

export default AboutPage;
