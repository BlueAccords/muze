import React, { Component } from 'react';

export default class Callback extends Component {
  
  // Life cycle methods
  componentDidMount() {
    window.setTimeout(opener.SC.connectCallback, 1);
  }

  render() {
    return (
      <div><p>This page should close soon.</p></div>
    );
  }
}
