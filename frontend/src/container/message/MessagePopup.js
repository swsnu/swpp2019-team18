import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class MessagePopup extends Component {
    timeoutSlice = 2500;
    
    openHandler = () => {
        this.timeout = setTimeout(() => {
            this.props.onClose()}, 
            this.timeoutSlice
        )
    }

    render () {
        this.openHandler();
        return (
            <Message positive>
                <Message.Header>{this.props.header}</Message.Header>
                <p>{this.props.content}</p>
            </Message>
            
        )
    }
}

export default MessagePopup;