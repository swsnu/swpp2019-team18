import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'

class Login extends Component {
    state = {
        username : '',
        password : ''
    }
    onClickLogInButton = () => {
        const data = {username: this.state.username , password: this.state.password};
        this.props.login(data);
        if(this.props.status.isLoggedIn){
            //go to the main page
            console.log('log in success')
        }

    }

    onClickSignUpButton = (at) => {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div>
                <label>ID</label>
                <input  value={this.state.username} id = "id-input"
                        onChange={(event) => this.setState({ username: event.target.value })} />
                <label>password</label>
                <input  value={this.state.password} id = "password-input" type= 'password'
                        onChange={(event) => this.setState({ password : event.target.value })} />
                <button id = 'login-button' onClick = {() => this.onClickLogInButton}>Sign In</button>

                <a onClick = {() => this.onClickSignUpButton() }>Sign Up</a>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginState : state.user.login,
        userState : state.user.status

    }
}

const mapDispatchToProps = dispatch => {
    return {
        login : (user) => dispatch (actionCreators.loginRequest(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))