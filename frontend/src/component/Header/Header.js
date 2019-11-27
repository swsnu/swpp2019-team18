import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react'
import Logout from '../Logout'
import './Header.css'
import Garden from '../Garden'
import Mydiary from '../Mydiary'
import Statistic from '../Statistic'
import Logo from '../logo'

class Header extends Component {
    render () {
        return (
          

            <Menu  secondary id = 'header'   style = {{margin : 0 , height : 50, backgroundColor : 'white'}}>
                
                <Menu.Item header>
                    <Logo/>
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Mydiary/>
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Garden/>
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Statistic/>
                </Menu.Item>
                <Menu.Item position = 'right'>
                    <Logout/>
                </Menu.Item>
            </Menu>
            
        )
    }
}

export default Header