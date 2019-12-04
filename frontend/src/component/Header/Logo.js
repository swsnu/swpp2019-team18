import React, {Component} from 'react'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Image } from 'semantic-ui-react'


class Logo extends Component {
    onClickLogoutButton = () => {
        this.props.history.push('/diary')
    }

    render () {
        return (
            <div className = 'garden'>
                <Image className = 'logo' src = '/logo/SDA_HEADER_LOGO.png' size = 'small' href ='#' onClick = {() => this.onClickLogoutButton()}/>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Logo));

