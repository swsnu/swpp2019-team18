import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';

<<<<<<< HEAD
import {Dropdown, Grid, Label, Divider, Segment} from 'semantic-ui-react';
=======
import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header, Form} from 'semantic-ui-react';
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7


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
<<<<<<< HEAD
=======
        active : false,
        popupMode : 'INIT',
        content : '',
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
    }

    componentDidUpdate(prevProps){
        if(this.props.selectedDiary !== prevProps.selectedDiary){
            this.props.history.push('/diary');
        }
    }

    onClickMenuShareButton = (id, content) => {
<<<<<<< HEAD

        let changedContent = prompt('edit content before sharing', content);
        if(changedContent !== '' && changedContent !== null){
            this.props.onShareDiary(id, changedContent);
        }

    }
=======
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
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7

    onClickMenuEditButton = (id) => {
        this.props.history.push('/diary/'+id+'/edit'); 
    }

    onClickMenuDeleteButton = (id) => {
<<<<<<< HEAD
        let check = window.confirm('Are you sure?') ;
            if(check){
                this.props.onDeleteDiary(id);
            } 
=======
        this.setState({popupMode : 'DELETE'})
        this.setState({ active: true })

        /*let check = window.confirm('Are you sure?') ;
            if(check){
                this.props.onDeleteDiary(id);
            } 
            */
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
        
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
<<<<<<< HEAD
    return (
        <div className = 'diaryDetail'>
            
           <Segment.Group centered="true" style={{ maxWidth: 800}}  >
           <Segment> 
            <div className = 'category_name and person tag'>              
                <Label as='a' color='yellow' tag>{this.props.category_name}</Label>
            
            {
                this.props.person_tag ? 
                    <Label as='a' color='teal' tag>{this.props.person_tag.map(person => 
                        person.name
                    )}</Label>
                 : null
            }
            </div>
            </Segment>
            
            {
                this.props.category_title ? <div className = 'category_title'>
                    <Segment>
                    <Grid columns = {2} >
                    <Grid.Row >
                    <Grid.Column textAlign='center' width = {4} color = 'blue'>category_title</Grid.Column>
                    <Grid.Column width = {12}>{this.props.category_title}</Grid.Column>
                    </Grid.Row>
                    </Grid>
                    </Segment>
                 </div> : null
            }
            
            
            {
                this.props.rating ? <Segment><div className = 'rating'>
                    rating : {this.props.rating}
                 </div></Segment> : null
            }
           <div className = 'content'>
            <Segment>
                <Grid columns = {2}>
                    <Grid.Row >
                        <Grid.Column textAlign='center' width = {4} color = 'blue'>content </Grid.Column>
                        <Grid.Column width = {12}>{this.props.content} </Grid.Column>
                    
                </Grid.Row>
                </Grid>
            </Segment>
            </div>
            <Segment>
                <Grid columns = {3}>
                    <Grid.Row>
           
                <Grid.Column textAlign = 'center' width = {4} color = 'blue'>emotion_score</Grid.Column>
                <Grid.Column width = {10}> {this.props.emotion_score}</Grid.Column>
                <Grid.Column width = {2}>
                        <Dropdown
                            className='menu-button'
                            button
                            floating
                            options={options}
                            trigger={<React.Fragment />}
                        />
            </Grid.Column>
            </Grid.Row>
            </Grid>
            </Segment>
            
            </Segment.Group> 
=======
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
            <Button id = 'share-confirm-button' inverted onClick = {() => this.props.onShareDiary(this.props.id, this.state.content)}>Share</Button>
            <Button id = 'share-cancel-button' inverted onClick = {() => this.handleHide()}>Cancel</Button>
        </Dimmer>

        if(this.state.popupMode === 'DELETE'){
            popup = deletePopup;
        }
        else if(this.state.popupMode === 'SHARE'){
            popup = shareEditPopup
        }

    return (
        <div className = 'diaryDetail'>
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
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7

            <Divider hidden /> 
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
