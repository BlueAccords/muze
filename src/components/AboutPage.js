import React from 'react';
// import {Link} from 'react-router';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div className="container about-container">
      <h2 className="alt-header">About</h2>
      <p>
        This app is built using react/redux and its source code can be found
         <a href="https://github.com/BlueAccords/muze">here</a>
      </p>
    </div>
  );
};

export default AboutPage;
