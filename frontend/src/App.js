import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './container/Login'
import SignUp from './container/SingUp'
import {  Route, Redirect, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';

const mapStateToProps = state => {
  return {
    currentUser : state.user.status.isLoggedIn
  };
};



function App(props) {

    return (
      <ConnectedRouter history={props.history}>
        <div>
        <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/signup' exact component={SignUp}/>
          </Switch>
        </div>    
      </ConnectedRouter>
    
    )
  
  
}




export default App