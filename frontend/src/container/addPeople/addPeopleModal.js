import React, { Component } from 'react';
import { Button, Form, Modal, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addPeople } from '../../store/actions/diary';

class AddPeoplePopUp extends Component {

    state = {
        name: "",
        information: "",
        show : false,
    }

    handleNameChangeForm = (e, {value}) => {
        this.setState({name : value});
    }

    handleInfoChangeForm = (e, {value}) => {
        this.setState({information : value});
    }

    open = () => {
        this.setState({show : true});
    }

    close = () => {
        this.setState({show : false});
    }

    createPeopleHandler = (evt) => {
        const peopleObj = {name : this.state.name, information : this.state.information};
        this.props.addPeople(peopleObj);
        this.props.successHandler();
        this.close();
    }

    render (){
        const {
            name,
            information,
            show
          } = this.state
        return (
            <Modal open={show} onClose={this.close}
            trigger={<Button color='teal' onClick={() => this.setState({show : true})}><Icon className='plus'/>Add People</Button>}
            >
                <Modal.Content>
                    <Form>
                        <Form.Input 
                        label="name" 
                        value={name} 
                        onChange={this.handleNameChangeForm}
                        />
                        <Form.TextArea 
                        label="information" 
                        value={information} 
                        onChange={this.handleInfoChangeForm}
                        />
                        <Button color='red' onClick={this.close}> <Icon name='remove' /> Cancel</Button>
                        <Button color='green' onClick={evt => this.createPeopleHandler(evt)}> <Icon name='checkmark'/>Confirm</Button>
                    </Form>
                </Modal.Content>
            </Modal>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPeople : (peopleObj) => dispatch(addPeople(peopleObj)),
    }
}

export default connect(null, mapDispatchToProps)(AddPeoplePopUp);