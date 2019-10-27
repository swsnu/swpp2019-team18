import React, {Component} from 'react'
import * as actionCreators from '../store/actions/signUp'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'

class SignUp extends Component {
    state = {
        username : '',
        password : '',
        email : '',
        nickname : '',
        email_valid : false,
    }

    onClickSignUpButton = () => {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!regExp.test(this.state.email)){
            alert('email form is incorrect - check email');
            return;
        }
        const data = {username: this.state.username , password: this.state.password, email : this.state.email, nickname : this.state.nickname};
        this.props.signUp(data).then( () => {
                if(this.props.registerState == 'SUCCESS'){
                    this.props.history.push('/login');
                }
                else{
                    alert('Sign Up error : code ' + this.props.registerErrorCode)
                }
            }
        ) 
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

                <label>email</label>
                <input  value={this.state.email} id = "signup-email-input" type = 'text'
                        onChange={(event) => this.setState({ email : event.target.value })} />

                <label>nickname</label>
                <input  value={this.state.nickname} id = "signup-nickname-input" type = 'text'
                        onChange={(event) => this.setState({ nickname : event.target.value })} />
                <button id = 'signup-button' onClick = {() => this.onClickSignUpButton()}>REGISTER</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        registerState : state.user.register.status,
        registerErrorCode : state.user.register.error,
        userState : state.user.status

    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp : (user) => dispatch (actionCreators.signUpRequest(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUp))