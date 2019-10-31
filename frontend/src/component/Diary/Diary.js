import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {deleteDiary} from '../../store/actions/diary';
import {shareDiary} from '../../store/actions/share';

import {Button, Dropdown} from 'semantic-ui-react';

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
        if(this.props.selectedDiary != prevProps.selectedDiary){
            this.props.history.push('/diary');
        }
    }
   
    // onShowMenu = (event)=> {
    //     event.preventDefault();
    //     this.setState({showMenu : true}, 
    //     );
    //     document.addEventListener('click',this.onCloseMenu);

        
    // }
    // onCloseMenu = (event) => {
    //     if(this.dropdownMenu != null && !this.dropdownMenu.contains(event.target)){
    //         this.setState({showMenu : false}, );
    //         document.removeEventListener('click', this.onCloseMenu);

    //     }
    // }

    onClickMenuShareButton = (id, content) => {

        let changedContent = prompt('edit content before sharing', content);
        if(changedContent !== '' && changedContent !== null){
            this.props.onShareDiary(id, changedContent);
        }

        // this.setState({changedContent : prompt('edit content before sharing', content)});
        // if(this.state.changedContent !== '' && this.state.changedContent !== null){
        //     this.props.onShareDiary(id, this.state.changedContent);
        // }
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
            
            <div className = 'category_name'>category_name : {this.props.category_name}</div>
            {
                this.props.person_tag ? <div className = 'personTag'>
                    person_tag : {this.props.person_tag.map(person => 
                        person.name
                    )}
                </div> : null
            }
            {
                this.props.category_title ? <div className = 'category_title'>
                    category_title : {this.props.category_title}
                 </div> : null
            }
            {
                this.props.rating ? <div className = 'rating'>
                    rating : {this.props.rating}
                 </div> : null
            }
            <div className = 'content'>content : {this.props.content} </div>
            <div className = 'emotion_score'>emotion_score : {this.props.emotion_score}</div>
            <div >

            <Dropdown
                className='menu-button'
                button
                floating
                options={options}
                trigger={<React.Fragment />}
            />
            </div>
            
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
