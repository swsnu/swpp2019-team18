import React from 'react';
import './App.css';
import Login from './container/Login'
import SignUp from './container/SingUp'
import {  Route, Redirect, Switch} from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import {PrivateRoute} from './PrivateRoute'

function App(props) {
    return (
      <ConnectedRouter history={props.history}>
        <div>
        <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/signup' exact component={SignUp}/>
            {/* <PrivateRoute path = '/diary' exact component= {Diary} */}
            {/* Need to check whether PrivateRoute works as expected*/}
          </Switch>
        </div>    
      </ConnectedRouter>
    )
}

export default App