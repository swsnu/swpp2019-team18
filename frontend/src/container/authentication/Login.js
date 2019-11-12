import React, {Component} from 'react'
import * as actionCreators from '../../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

class Login extends Component {
    state = {
        username : '',
        password : ''
    }
    
    onClickLogInButton = () => {
        const data = {username: this.state.username , password: this.state.password};
        this.props.login(data)
    }

    onClickSignUpButton = (at) => {
        this.props.history.push('/signup')
    }

    render() {
        const loginFailMessage = 
        <Message id = 'loginfail' negative>
            <Message.Header>Login Failed</Message.Header>
            <p>Please check your username and password</p>
        </Message>
        return (
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h1' color='black' textAlign='center'>
                    S.DA
                </Header>
                <Header as='h3' color='black' textAlign='center'>
                    Your Sentimental Diary Assistant
                </Header>
                
                <Form size='large'>
                    <Segment stacked>
                    { this.props.loginState === 'FAILURE' ? loginFailMessage : null}
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' 
                    value={this.state.username} id = "login-username-input"
                    onChange={(event) => this.setState({ username: event.target.value })}/>
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={this.state.password} id = "login-password-input" 
                                    onChange={(event) => this.setState({ password : event.target.value })}
                    />

                    <Button color='blue' fluid size='large' id = 'login' onClick = {() => this.onClickLogInButton()}>
                        Login 
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#' id = 'sign-up' onClick = {() => this.onClickSignUpButton() }>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        loginState : state.user.login.status,
        userState : state.user.status

    }
}

const mapDispatchToProps = dispatch => {
    return {
        login : (user) => dispatch (actionCreators.loginRequest(user))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login))