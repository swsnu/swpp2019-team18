import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';


import MyDiaryList from './container/MyDiaryList/MyDiaryList';


function App(props) {
  return (
    <ConnectedRouter history={props.history}>
    <div className="App" >
      <Switch>
        <Route path='/diary' exact component={MyDiaryList}  />

        {/* <Redirect exact from='/' to='todos' /> */}
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
    </div>
  </ConnectedRouter>
  );
}

export default App;
