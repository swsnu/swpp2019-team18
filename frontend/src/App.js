import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import NewDiary from './container/diaryWrite/newDiary'
import EditDiary from './container/diaryEdit/editDiary';

function App(props) {
    return (
        <ConnectedRouter history={props.history}>
        <div className="APP">
        <Switch>
        <Route path='/' exact render={() => <p>Home Page</p>}/> 
        <Route path='/diary/create' exact component={NewDiary}/>
        <Route path='/diary/:id/edit' exact component={EditDiary}/>
        </Switch>
        </div>
        </ConnectedRouter>
    );
}
export default App;