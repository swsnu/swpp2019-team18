import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const mapStateToProps = state => {
    return {
        mode : state.diary.mode,
        year : state.diary.year,
        month : state.diary.month,
        day : state.diary.day
    }
}

class tempdiary extends Component {
    state = {
        a : '19'
    };

  render() {
    return <div className="content-container">
        
      
      {this.props.year}
      {this.props.month}
      {this.props.day}
      {this.props.mode}
    </div>
  }
}

export default connect(mapStateToProps,undefined)(withRouter(tempdiary));