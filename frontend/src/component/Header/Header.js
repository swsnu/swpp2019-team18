import React, {Component} from 'react';
import {Menu, Container} from 'semantic-ui-react'
import Logout from '../Logout'
import Test from '../test'

class Header extends Component {
    render () {
        return (
          
            <Menu id = 'header'  color = 'red' style = {{margin : 0 , height : 50}}>
                
                <Menu.Item position = 'right'>
                    <Logout/>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Header