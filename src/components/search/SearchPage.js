import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../actions/fuelSavingsActions';
// import FuelSavingsForm from '../components/FuelSavingsForm';
import TrackList from './TrackList';

const tracks = [
  {
    title: 'Moe Shop'
  },
  {
    title: 'Hello WOrld'
  }
];

class SearchPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className="SearchPage">
        <h1>Search Page</h1>
        <TrackList tracks={tracks}/>
      </div>
    );
  }
}

SearchPage.propTypes = {
  actions: PropTypes.object,
  fuelSavings: PropTypes.object,
  title: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    fuelSavings: state.fuelSavings
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(
  mapStateToProps)(SearchPage);
