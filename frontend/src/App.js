
import React from 'react';

import './App.css';
import Login from './container/authentication/Login'
import SignUp from './container/authentication/SignUp'
import NewDiary from './container/diaryWrite/newDiary'
import EditDiary from './container/diaryEdit/editDiary';
import MyDiaryList from './container/MyDiaryList/MyDiaryList';

import {  Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';

function App(props) {
    return (
      <ConnectedRouter history={props.history}>
        <div>
        <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/signup' exact component={SignUp}/>
            <Route path='/diary/create' exact component={NewDiary}/>
            <Route path='/diary/:id/edit' exact component={EditDiary}/>
            <Route path='/diary' exact component={MyDiaryList} />
          </Switch>
        </div>    
      </ConnectedRouter>
    )
}

export default App;
