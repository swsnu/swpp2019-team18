import React, {Component} from 'react'
import {connect } from 'react-redux'
import {withRouter} from 'react-router'

class Mydiary extends Component {
    onClickButton = () => {
        this.props.history.push('/diary')
    }

    render () {
        return (
            <div >
                {/*<Button animated basic fluid size = 'big' id = 'mydiary' onClick = {() => this.onClickLogoutButton()}>
                    <Button.Content visible>My Diary</Button.Content>
                    <Button.Content hidden >
                        {/*<Image src = {pencil} style = {{height : 40}} verticalAlign='middle'/>
                        <Icon name = 'book'/>
                    </Button.Content>
        </Button>*/}
            <button className = 'header_menu' onClick = {() => this.onClickButton()}>My Diary</button>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(Mydiary));

