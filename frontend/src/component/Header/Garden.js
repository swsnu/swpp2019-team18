import React, {Component} from 'react'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'


class Garden extends Component {
    onClickButton = () => {
        this.props.history.push('/garden')
    }

    render () {
        return (
            <div className = 'garden'>
                {/*<Button animated basic fluid size = 'big' id = 'garden' onClick = {() => this.onClickLogoutButton()}>
                    <Button.Content visible>Garden</Button.Content>
                    <Button.Content hidden >
                        <Image src = {flower} style = {{height : 30}} verticalAlign='bottom'/>
                    </Button.Content>
        </Button>*/}
                <button className = 'header_menu' onClick = {() => this.onClickButton()}>Garden</button>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Garden));

