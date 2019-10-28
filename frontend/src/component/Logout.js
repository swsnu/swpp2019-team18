import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button } from 'semantic-ui-react'

class Logout extends Component {
    onClickLogoutButton = () => {
        this.props.logout()
        this.props.history.push('/login')
    }

    render () {
        return (
            <div>
                <Button color = 'grey' fluid size = 'small' id = 'logout'onClick = {() => this.onClickLogoutButton()}>Log out</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      logout : () => dispatch(actionCreators.logoutRequest()),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout));

