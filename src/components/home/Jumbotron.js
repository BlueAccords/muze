import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';

class Jumbotron extends Component {
  constructor(props, context) {
    super(props, context); 

    this.redirectToSearch = this.redirectToSearch.bind(this);
  }

  redirectToSearch(event) {
    event.preventDefault();
    this.context.router.push('/search');
  }

  render() {
    return (
      <section className="container jumbotron">
      <div className="jumbo-content">
        <h1>Hello, and Welcome to Muze</h1>
        <h3>Explore our music, powered by SoundCloud's API, and save
        snippets from your favorite songs to build a playlist that you can listen to or share with your friends!</h3>
        <br/>
        <a className="btn" href="/search">Search Now!</a>
        <a className="btn" href="">Source Code</a>
      </div>
      
      </section>
    );
  }
}

Jumbotron.contextTypes = {
  router: PropTypes.object
};

/**
 * this function defines an object that returns what properties
 * we'd like you see exposed on our component
 * @param  {[obj]} state    [represents state inside of redux store]
 * @param  {[type]} ownProps [lets us access props that are attached to this component]
 * @return {[type]}          [description]
 */
// function mapStateToProps(state, ownProps) {
//   return {
//     // Defined inside of reducers
//     courses: state.courses
//   };
// }

export default connect()(Jumbotron);