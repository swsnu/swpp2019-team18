import {  Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import React from 'react';
import * as actionCreators from './store/actions/login'
import axios from 'axios'


const PrivateRoute = ({component : Component, currentUser,loginCheck, ...rest  }) => (
    <Route {...rest} render = {props => 
      {
        console.log('before check')
        console.log(currentUser)
        if(currentUser !== 'SUCCESS') {
          loginCheck()
          //return  <Redirect to = "/login" />
        } 
        else{
          console.log('you')
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