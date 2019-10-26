import React, {Component} from 'react'
import * as actionCreators from '../store/actions/signUp'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'

class SignUp extends Component {
    state = {
        username : '',
        password : ''
    }
    onClickSignUpButton = () => {
        const data = {username: this.state.username , password: this.state.password};
        this.props.signUp(data);
        if(this.props.registerState){
            //go to the main page
            console.log('sign up success')
        }
        else{
            console.log('sign up fail')
        }
 
    }
    render() {
        return (
            <div>
                <label>username</label>
                <input  value={this.state.username} id = "signup-id-input"
                        onChange={(event) => this.setState({ username : event.target.value })} />
                <label>password</label>
                <input  value={this.state.password} id = "signup-password-input" type = 'password'
                        onChange={(event) => this.setState({ password : event.target.value })} />
                <button id = 'signup-button' onClick = {() => this.onClickSignUpButton()}>REGISTER</button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        registerState : state.user.register.status,
        userState : state.user.status

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp : (user) => dispatch (actionCreators.signUpRequest(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUp))