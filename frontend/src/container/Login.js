import React, {Component} from 'react'

class Login extends Component {
    state = {
        id : '',
        password : ''
    }
    
    render() {
        return (
            <div>
                <label>ID</label>
                <input  value={this.state.id} id = "id-input"
                        onChange={(event) => this.setState({ id : event.target.value })} />
                <label>password</label>
                <input  value={this.state.id} id = "password-input"
                        onChange={(event) => this.setState({ password : event.target.value })} />
                <button id = 'login-button'>Sign In</button>
            </div>
        )
    }
}

export default Login;