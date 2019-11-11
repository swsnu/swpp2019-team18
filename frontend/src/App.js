import React, {Component} from 'react';
import axios from 'axios'
import './App.css';
import Login from './container/authentication/Login'
import SignUp from './container/authentication/SignUp'
import NewDiary from './container/diaryWrite/newDiary'
import EditDiary from './container/diaryEdit/editDiary';
import MyDiaryList from './container/MyDiaryList/MyDiaryList';
import Sidebar from './container/sidebar/sidebar'
import gardenDiary from './container/gardenDiary/gardenDiary';
import {withRouter} from 'react-router';
import Header from './component/Header/Header'

import {  Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './PrivateRoute'
import {connect} from 'react-redux'
import * as actionCreators from './store/actions/login'

const mapDispatchToProps = dispatch => {
  return {
      loginCheck : (user) => dispatch (actionCreators.loginCheckRequest())
  }
}

const mapStateToProps = state => {
  return {
    currentUser : state.user.status.isLoggedIn
  }
}

class App extends Component {
  componentDidMount(){
    axios.get('/api/token/');
    this.props.loginCheck();
  }
  
  render(){
    console.log(this.props.currentUser)
  return (
    <ConnectedRouter history={this.props.history}>
       
      <div>
        {this.props.currentUser ? <Header /> : null}
      <div style={{clear:"both"}}></div>
       <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/login' exact component={Login}/>
          <Route path='/signup' exact component={SignUp}/>
            
          <div style={{ float : 'left'}}>
            <div className = 'sidebar'  >
              {this.props.currentUser ? <Sidebar/> : null}
            </div >
            <div style={{clear:"both"}}></div>
            <div className = 'main' style={{ marginLeft: 265}}>
              <PrivateRoute path='/diary' exact component={MyDiaryList}/>
              <PrivateRoute path='/diary/create' exact component={NewDiary}/>
              <PrivateRoute path='/diary/:id/edit' exact component={EditDiary}/>
              <PrivateRoute path='/garden' exact component={gardenDiary}/>

            </div>
          </div>
        </Switch>    
      </div>

        
    </ConnectedRouter>
  )  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

