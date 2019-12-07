import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';
import Content from './Content'
import Share from './Share'
import axios from 'axios'

import {Dropdown, Grid, Label, Divider, Segment, Container, Dimmer, Button, Header,  Modal, Popup, Rating} from 'semantic-ui-react';
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
        shareSuccess : 'INIT',
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
    handleContent = (content) => {
        this.setState({content : content})
    }

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

    _onShareDiary = (diary, content) => {
        return axios.post('/api/diary/share/'+ diary+'/', content)
        .then(res => this.setState({shareSuccess : 'SUCCESS'}))
        .catch( error => {
            if(error.response.status === 403){
                this.setState({shareSuccess : 'DUPLICATED'})
            }
            else{
                this.setState({shareSuccess : 'ERROR'})
            }
        } 
     )
    }

    

    render(){
        const options = [
            { key : 'share-button', id: 'share-button', icon: 'share', text: 'SHARE', value: 'share' , 
                onClick : () => this.onClickMenuShareButton(this.props.id, this.props.content)},
            { key : 'delete-button',id: 'delete-button', icon: 'delete', text: 'DELETE', value: 'delete',
                onClick : () => this.onClickMenuDeleteButton(this.props.id)},
            { key : 'edit-button', id: 'edit-button', icon: 'edit', text: 'EDIT', value: 'edit',
                onClick : () => this.onClickMenuEditButton(this.props.id) },
        ]
       const active = this.state.active
       const shareSuccess = this.state.shareSuccess
       let popup = <Dimmer></Dimmer>
       const deletePopup = 
        <Dimmer active={active} onClickOutside={this.handleHide}>
            <Header inverted>Are you sure?</Header>
            <Button id = 'delete-confirm-button' inverted onClick = {() => this.props.onDeleteDiary(this.props.id)}>Yes</Button>
            <Button id = 'delete-cancel-button' inverted onClick = {() => this.handleHide()}>No</Button>
        </Dimmer>

        const shareEditPopup = <div>
            <Modal open={active} centered={false} >
            <Modal.Header>Share</Modal.Header>
            <Modal.Content>
            
            <Modal.Description>
                <Header>You can edit your diary before sharing</Header>
                <p>Edit your personal information</p>
                <Segment><Share content = {this.state.content} handleContent = {(content) => this.handleContent(content)} /></Segment>
            </Modal.Description>
            <p></p>
            
            <Button primary id = 'share-confirm-button' onClick = {() => {
                this._onShareDiary(this.props.id, this.state.content)
                this.handleHide()
                }} >share</Button>
            
            <Button id = 'share-cancel-button' onClick = {() => this.setState({active : false})} >close</Button>
            
            </Modal.Content>

        </Modal>
        <Modal open = {shareSuccess === 'SUCCESS'}>
            <Modal.Header>SHARE SUCCEED!</Modal.Header>
            <Modal.Content>
            <Modal.Description>
            <p>You can check your shared diary in 'Garden -> My Garden'</p>
            </Modal.Description>
            <p></p>
            <Button onClick = {() => this.setState({shareSuccess : 'INIT'})}>확인</Button> 
            </Modal.Content>
            
        </Modal>
        <Modal open = {shareSuccess === 'DUPLICATED'}>
            <Modal.Header>SHARE FAIL</Modal.Header>
            <Modal.Content>
            <Modal.Description>
            <p>ALREADY SHARED.</p>
            <p>If you want to cancel your sharing, you can cancel it in 'Garden -> My Garden'</p>
            </Modal.Description>
            <p></p>
            <Button onClick = {() => this.setState({shareSuccess : 'INIT'})}>확인</Button>
            </Modal.Content>
            
        </Modal>

        </div>
        
        if(this.state.popupMode === 'DELETE'){
            popup = deletePopup;
        }
        else if(this.state.popupMode === 'SHARE'){
            popup = shareEditPopup
        }
    return (
        <div className = 'diaryDetail' >
            <Dimmer.Dimmable as ={Segment} dimmed = {active}>
            <Container textAlign = 'left'>
            <Grid>
                <Grid.Column width = {13}>           
                <Label as='a' color='olive' tag>
                    {this.props.category_name}
                    {this.props.category_title ? <Label.Detail id='diary_category_title'>{this.props.category_title}</Label.Detail>  : null}
                </Label>
                {
                this.props.person_tag ? 
                    this.props.person_tag.map(person => person.information ? <Popup inverted content = {person.information} key = {person.name} trigger = {
                        <Label key = {person.name} id = 'diary_person_tag' as='a' color='teal' tag>{person.name}</Label>} /> :
                        <Label key = {person.name} id = 'diary_person_tag' as='a' color='teal' tag>{person.name}</Label>
                    )
                 : null
                }
                </Grid.Column>
                    {this.props.rating ?
                    <Grid.Column width = {3} floated = 'right'>
                    <span>Rating   </span>
                    <Rating icon='star' defaultRating={this.props.rating} maxRating={5} disabled /> 
                    </Grid.Column> : null}
            </Grid>
             </Container>
             <Divider />
             <Container>
                {/* showing content */}
                {this.props.content ?  <Content content = {this.props.content}/> : null}
             
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