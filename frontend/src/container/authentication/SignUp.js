import React, {Component} from 'react'
import * as actionCreators from '../../store/actions/signUp'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button, Form, Grid, Header,  Segment , Message} from 'semantic-ui-react'

class SignUp extends Component {
    state = {
        username : '',
        password : '',
        password_check : '',
        email : '',
        nickname : '',
        email_valid : false,
        failMessage : '',
        signUpFail : false,
    }

    onClickSignUpButton = () => {
        var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!this.state.username || !this.state.password || !this.state.email || !this.state.nickname){
            //alert('Fill all the forms.');
            this.setState({failMessage : 'Fill all the forms.', signUpFail : true})
            return ;
        }
        else if(!regExp.test(this.state.email)){
            //alert('email form is incorrect - check email');
            this.setState({failMessage : 'email form is incorrect - check email', signUpFail : true})
            return ;
        }
        else if(this.state.password !== this.state.password_check){
            //alert('check password again');
            this.setState({failMessage : 'check password again', signUpFail : true})
            return;
        }
        
        const data = {
            username: this.state.username , 
            password: this.state.password, 
            email : this.state.email, 
            nickname : this.state.nickname
        };
        this.props.signUp(data)
        
    }

    render() {
        const signupFailMessage = 
        <Message negative>
            <Message.Header>Sign-up Failed</Message.Header>
            <p>{this.state.failMessage}</p>
        </Message>
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    Sign up for S.DA
                </Header>
                    <Form size='large'>
                        <Segment stacked>
                            {this.state.signUpFail ? signupFailMessage : null}
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' 
                                value={this.state.username} id = "signup-username-input"
                                onChange={(event) => this.setState({ username : event.target.value })}/>
                            <Form.Input 
                                fluid icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={this.state.password} id = "signup-password-input" 
                                onChange={(event) => this.setState({ password : event.target.value })}/>
                            <Form.Input 
                                fluid icon='lock'
                                iconPosition='left'
                                placeholder='Password Check'
                                type='password'
                                value={this.state.password_check} id = "signup-password-check-input" 
                                onChange={(event) => this.setState({ password_check : event.target.value })}/>
                            <Form.Input  placeholder='email' 
                                value={this.state.email} id = "signup-email-input" type = 'text'
                                onChange={(event) => this.setState({ email : event.target.value })}/>
                            <Form.Input  placeholder='Nickname' 
                                value={this.state.nickname} id = "signup-nickname-input" type = 'text'
                                onChange={(event) => this.setState({ nickname : event.target.value })}/>
                            <Button color='blue' fluid size='large' id = "signup" onClick = {() => this.onClickSignUpButton()}>
                                REGISTER
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
            
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