import React, {Component} from 'react';
import {Menu, Container} from 'semantic-ui-react'
import Logout from '../Logout'
import './Header.css'

class Header extends Component {
    render () {
        return (
          
            <Menu id = 'header' style = {{ position: "static", flex: 1,margin : 0 , height : 50}}>
                <Menu.Item>
                    <Logout/>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Header