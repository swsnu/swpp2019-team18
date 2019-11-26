import React, {Component} from 'react';
import {Menu, Button } from 'semantic-ui-react'
import Logout from '../Logout'

class Header extends Component {

    render () {
        return (
          
            <Menu id = 'header' style = {{margin : 0 , height : 50}}>
                <Menu.Item>
                    <Logout/>
                </Menu.Item>
                <Menu.Item>
                    <Button color = 'blue' id = 'stat' onClick={() => this.props.history.push('/stat')}>Statistics</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button color = 'blue' id = 'stat' onClick={() => this.props.history.push('/diary')}>Home</Button>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Header