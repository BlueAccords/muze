import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

// bind actions to .actions from redux
import {bindActionCreators} from 'redux';

// import all actions
import * as actions from '../../actions';
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
    const {onAuth} = this.props;
    return (
      <div className="SearchPage">
        <div>
          <button onClick={onAuth} type="button">Login</button>
        </div>
        <br/>
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

function mapDispatchToProps(dispatch) {
  debugger;
  return {
    // binding specific action to props.onAuth
    onAuth: bindActionCreators(actions.auth, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SearchPage);
