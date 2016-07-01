import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="player">
        <div className="player-controls">
          <svg className="icon icon-backward2"><use xlinkHref="#icon-backward2"></use></svg>
          <svg className="icon icon-play3"><use xlinkHref="#icon-play3"></use></svg>
          <svg className="icon icon-forward3"><use xlinkHref="#icon-forward3"></use></svg>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {

}

export default connect(mapStateToProps)(Player);
