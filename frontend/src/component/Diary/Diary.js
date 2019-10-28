import React, {Component} from 'react';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import ShareButton from './ShareButton/ShareButton';

const mapDispatchToProps = dispatch => {
    return {
        onDeleteDiary : (id) => dispatch(actionCreators.deleteDiary(id)),
        onShareDiary : (id, content) => dispatch(actionCreators.shareDiary(id, content))
    }
}
class Diary extends Component {
    state = {
        showMenu : false,
        sharediary : '',
    }
   
    onShowMenu = (event)=> {
        event.preventDefault();
        this.setState({showMenu : true}, 
        );
        document.addEventListener('click',this.onCloseMenu);

        
    }
    onCloseMenu = (event) => {

        if(!this.dropdownMenu.contains(event.target)){
            this.setState({showMenu : false}, );
            document.removeEventListener('click', this.onCloseMenu);

        }
    }

    onClickMenuShareButton = (diary) => {
        this.state.sharediary = prompt('edit content before sharing', diary.content);
        if(this.state.sharediary !== '' && this.state.sharediary !== null){
            this.props.onShareDiary();
        }
    }

    onClickMenuEditButton = (diary) => {
        this.props.history.push('/diary/edit/'+diary.id); 
    }

    onClickMenuDeleteButton = (diary) => {
        let check = window.confirm('Are you sure?') ;
            if(check){
                this.props.onDeleteDiary(diary.id)
            } 
    }

    render(){
    return (
        <div className = 'diaryDetail'>1
            
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
            <div className = 'menuButton'  >
                <button id = 'menu-button' onClick = {this.onShowMenu}>...</button>
            </div>
            {
                this.state.showMenu ? (
                <div className = 'toggleMenu' ref = {(element) => { this.dropdownMenu = element;  }}>
                    <button id = 'share-button' onClick = {this.onClickMenuShareButton} >Share</button>
                    <button id = 'edit-button' onClick ={this.onClickMenuEditButton}>Edit</button>
                    <button id = 'delete-button' onClick = {this.onClickMenuDeleteButton}>Delete</button>
                </div>
                ) : null
            }
        </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Diary));
