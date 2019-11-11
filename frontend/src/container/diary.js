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

<<<<<<< HEAD
    componentDidMount(){
        console.log(this.props.mode);
    }

=======
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
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