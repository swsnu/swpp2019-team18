import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import Logout from '../component/Logout'

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
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' 
                    value={this.state.username} id = "id-input"
                    onChange={(event) => this.setState({ username: event.target.value })}/>
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        value={this.state.password} id = "password-input" 
                                    onChange={(event) => this.setState({ password : event.target.value })}
                    />

                    <Button color='blue' fluid size='large' onClick = {() => this.onClickLogInButton()}>
                        Login 
                    </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='#' onClick = {() => this.onClickSignUpButton() }>Sign Up</a>
                </Message>
                </Grid.Column>
            </Grid>
            
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