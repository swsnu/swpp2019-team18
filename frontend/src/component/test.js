import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button } from 'semantic-ui-react'
import './test.css'

class test extends Component {
    /*onClickLogoutButton = () => {
        this.props.logout()
        this.props.history.push('/login')
    }*/

    render () {
        return (
            <div className = 'test1'>
                HOVER
            </div>
        )
    }
}


export default connect(null, null)(withRouter(test));
