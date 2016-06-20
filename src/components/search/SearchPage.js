import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';


// bind actions to .actions from redux
import {bindActionCreators} from 'redux';

// import all actions
import * as actions from '../../actions';

// import components
import TrackList from './TrackList';
import SearchForm from '../common/SearchForm';

// Parent Smart component
class SearchPage extends Component {
  constructor(props, context) {
    super(props, context);
    
    // Storing form data in local component state, no other components
    // need this data. Like. at all. Unless its submitted to them.
    this.state = {
      search: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.updateSearchState = this.updateSearchState.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    
    console.log(this.state.search)
    this.props.actions.getTracks(this.state.search);
  }
  
  // Updates search state every keystroke(yes its pretty often)
  updateSearchState(event) {
    let search = event.target.value;
    return this.setState({
      search: search
    });
  }

  render () {
    const {tracks} = this.props;
    return (
      <div className="SearchPage">
        <br/>
        <h1>Search Page</h1>
        <SearchForm 
          onSubmit={this.onSubmit}
          onChange={this.updateSearchState}
          searchValue = {this.state.search}/>
        <TrackList tracks={tracks}/>
      </div>
    );
  }
}

// prop validation
SearchPage.propTypes = {
  actions: PropTypes.object,
  fuelSavings: PropTypes.object,
  tracks: PropTypes.array,
  search: PropTypes.object
};

// Get tracks from src/index.js dispatching an action to load tracks into store's state
function mapStateToProps(state) {
  return {
    tracks: state.tracks,
    search: {}
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // binding all actions
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SearchPage);
