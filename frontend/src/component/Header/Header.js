import React, {Component} from 'react';
import {Menu, Container} from 'semantic-ui-react'
import Logout from '../Logout'

class Header extends Component {
    render () {
        return (
          
            <Menu style = {{margin : 0 , height : 50}}>
                <Menu.Item>
                    <Logout/>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Header