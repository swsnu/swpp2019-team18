import React, {Component} from 'react'
import * as actionCreators from '../../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button } from 'semantic-ui-react'

class Statistic extends Component {
    onClickButton = () => {
        this.props.history.push('/stat')
    }

    render () {
        return (
            <div className = 'statistics'>
                <button className = 'header_menu' onClick = {() => this.onClickButton()}>Statistic</button>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Statistic));

