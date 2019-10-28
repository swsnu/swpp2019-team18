import {  Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';

const PrivateRoute = ({component : Component, isLoggedIn, ...rest  }) => (
    <Route {...rest} render = {props => 
      {
        if(!props.currentUser) {
        return <Redirect to = "/login" />
        } else {
          return <Component {...props} />
        }
      } 
     }/>
  )
  const mapStateToProps = state => {
    return {
      currentUser : state.user.status.isLoggedIn
    };
  };
  
  export default connect(mapStateToProps, null)(PrivateRoute);