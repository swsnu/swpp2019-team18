import {  Route } from 'react-router-dom'
import {connect} from 'react-redux'
import React from 'react';
import * as actionCreators from './store/actions/login'


const PrivateRoute = ({component : Component, currentUser,loginCheck, ...rest  }) => (
    <Route {...rest} render = {props => 
      {

        if(currentUser !== 'SUCCESS') {
          loginCheck()
          //return  <Redirect to = "/login" />
        } 
        else{

          return <Component {...props} />
        }
        
      } 
     }/>
  )
  const mapStateToProps = state => {
    return {
      currentUser : state.user.login.status
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
        loginCheck : (user) => dispatch (actionCreators.loginCheckRequest())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);