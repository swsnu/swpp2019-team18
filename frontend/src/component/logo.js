import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Image } from 'semantic-ui-react'
import sdaHeaderLogo from '../SDA_HEADER_LOGO.png'


class Logo extends Component {
    onClickLogoutButton = () => {
        this.props.history.push('/diary')
    }

    render () {
        return (
            <div className = 'garden'>
                <Image src = {sdaHeaderLogo} size = 'small' href ='#' onClick = {() => this.onClickLogoutButton()}/>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Logo));

