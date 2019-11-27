import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button, Image, Icon } from 'semantic-ui-react'

class Mydiary extends Component {
    onClickLogoutButton = () => {
        this.props.history.push('/diary')
    }

    render () {
        return (
            <div className = 'mydiary'>
                <Button animated basic fluid size = 'big' id = 'mydiary' onClick = {() => this.onClickLogoutButton()}>
                    <Button.Content visible>My Diary</Button.Content>
                    <Button.Content hidden >
                        {/*<Image src = {pencil} style = {{height : 40}} verticalAlign='middle'/>*/}
                        <Icon name = 'book'/>
                    </Button.Content>
                </Button>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Mydiary));

