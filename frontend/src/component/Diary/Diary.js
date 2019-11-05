import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';

import {Dropdown, Grid, Label, Divider, Segment, Container} from 'semantic-ui-react';


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
            <Segment >
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
            </Segment>

            <Divider hidden /> 
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
