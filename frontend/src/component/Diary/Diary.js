import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';

import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';
import './Diary.css'


const mapDispatchToProps = dispatch => {
    return {
        onDeleteDiary : (id) => dispatch(deleteDiary(id)),
        onShareDiary : (diary, content) => dispatch(shareDiary(diary, content))
    }
}

class Diary extends Component {
    state = {
        showMenu : false,
        changedContent : '',
        active : false,
        popupMode : 'INIT',
        content : '',
    }

    componentDidUpdate(prevProps){
        if(this.props.selectedDiary !== prevProps.selectedDiary){
            this.props.history.push('/diary');
        }
    }

    onClickMenuShareButton = (id, content) => {
        this.setState({popupMode : 'SHARE'})
        this.setState({ active: true })
        this.setState({ content: content })
        /*let changedContent = prompt('edit content before sharing', content);
        if(changedContent !== '' && changedContent !== null){
            this.props.onShareDiary(id, changedContent);
        } */

    }
    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    onClickMenuEditButton = (id) => {
        this.props.history.push('/diary/'+id+'/edit'); 
    }

    onClickMenuDeleteButton = (id) => {
        this.setState({popupMode : 'DELETE'})
        this.setState({ active: true })

        /*let check = window.confirm('Are you sure?') ;
            if(check){
                this.props.onDeleteDiary(id);
            } 
            */
        
    }

    render(){
        const options = [
            { id: 'share-button', icon: 'share', text: 'SHARE', value: 'share' , 
                onClick : () => this.onClickMenuShareButton(this.props.id, this.props.content)},
            { id: 'delete-button', icon: 'delete', text: 'DELETE', value: 'delete',
                onClick : () => this.onClickMenuDeleteButton(this.props.id)},
            { id: 'edit-button', icon: 'edit', text: 'EDIT', value: 'edit',
                onClick : () => this.onClickMenuEditButton(this.props.id) },
        ]
       const deletePopupActive = this.state.deletePopupActive
       const sharePopupActive = this.state.sharePopupActive
       const active = this.state.active
       let popup = <Dimmer></Dimmer>
       const deletePopup = 
        <Dimmer active={active} onClickOutside={this.handleHide}>
            <Header inverted>Are you sure?</Header>
            <Button id = 'delete-confirm-button' inverted onClick = {() => this.props.onDeleteDiary(this.props.id)}>Yes</Button>
            <Button id = 'delete-cancel-button' inverted onClick = {() => this.handleHide()}>No</Button>
        </Dimmer>

        const shareEditPopup = 
        <Dimmer active={active} onClickOutside={this.handleHide}>
            <Header inverted>You can edit content before sharing - original article wouldn't be changed</Header>
            <Form>
            <Form.TextArea 
                        id='diary-content-input'
                        placeholder='Tell me more about you...'
                        fluid
                        value={this.state.content}
                        onChange={e => this.setState({content : e.target.value})}
                        />
            </Form>
            <br></br>
            <Button id = 'share-confirm-button' inverted onClick = {() => 
            {
                this.props.onShareDiary(this.props.id, this.state.content)
                this.handleHide()
            }}>Share</Button>
            <Button id = 'share-cancel-button' inverted onClick = {() => this.handleHide()}>Cancel</Button>
        </Dimmer>

        if(this.state.popupMode === 'DELETE'){
            popup = deletePopup;
        }
        else if(this.state.popupMode === 'SHARE'){
            popup = shareEditPopup
        }

    return (
        <div className = 'diaryDetail' style = {{flex : 1}}>
            <Dimmer.Dimmable as ={Segment} dimmed = {active}>
            <Container textAlign = 'left'>
            <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail >{this.props.category_title}</Label.Detail>  : null}
                    {this.props.rating ? <Label.Detail>{this.props.rating}</Label.Detail> : null}
                </Label>
                {
                this.props.person_tag ? 
                    this.props.person_tag.map(person => 
                        <Label as='a' color='teal' tag>{person.name}</Label>
                    )
                 : null
            }
             </Container>
             <Divider />
             <Container fluid>
             {
                this.props.content ? 
                this.props.content.split('\n').map( line => {
                return (<span>{line}<br/></span>)
                }) : null
            }
             </Container>
             <Divider />
             <Container>
              <Grid>
                    <Grid.Column>
                      <Dropdown
                            className = 'icon'
                            id='menu-button'
                            button
                            floating
                            icon = 'bars'
                            options={options}
                            trigger={<React.Fragment />}
                        />
                    </Grid.Column>
                    <Grid.Column width = {3} floated = 'right'>
                    <Label color = 'black'>
                    Emotion Score
                    <Label.Detail>
                        {this.props.emotion_score}
                    </Label.Detail>
                    </Label>
                    </Grid.Column>
              </Grid>
             </Container>
             {popup}
            </Dimmer.Dimmable>

            <Divider hidden /> 
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
