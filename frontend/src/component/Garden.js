import React, {Component} from 'react'
import * as actionCreators from '../store/actions/login'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'
import { Button, Image } from 'semantic-ui-react'
import flower from '../flower.png'

class Garden extends Component {
    onClickLogoutButton = () => {
        this.props.history.push('/garden')
    }

    render () {
        return (
            <div className = 'garden'>
                <Button animated basic fluid size = 'big' id = 'mydiary' onClick = {() => this.onClickLogoutButton()}>
                    <Button.Content visible>Garden</Button.Content>
                    <Button.Content hidden >
                        <Image src = {flower} style = {{height : 30}} verticalAlign='bottom'/>
                    </Button.Content>
                </Button>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Garden));

