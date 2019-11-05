import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';

import {Dropdown, Grid, Label, Divider, Segment} from 'semantic-ui-react';


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
    }

    componentDidUpdate(prevProps){
        if(this.props.selectedDiary !== prevProps.selectedDiary){
            this.props.history.push('/diary');
        }
    }

    onClickMenuShareButton = (id, content) => {

        let changedContent = prompt('edit content before sharing', content);
        if(changedContent !== '' && changedContent !== null){
            this.props.onShareDiary(id, changedContent);
        }

    }

    onClickMenuEditButton = (id) => {
        this.props.history.push('/diary/'+id+'/edit'); 
    }

    onClickMenuDeleteButton = (id) => {
        let check = window.confirm('Are you sure?') ;
            if(check){
                this.props.onDeleteDiary(id);
            } 
        
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
    return (
        <div className = 'diaryDetail'>
            
           <Segment.Group centered="true" style={{ maxWidth: 800}}  >
           <Segment> 
            <div className = 'category_name and person tag'>              
                <Label as='a' color='yellow' tag>{this.props.category_name}</Label>
            
            {
                this.props.person_tag ? 
                    this.props.person_tag.map(person => 
                        <Label as='a' color='teal' tag>{person.name}</Label>
                    )
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

            <Divider hidden /> 
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
