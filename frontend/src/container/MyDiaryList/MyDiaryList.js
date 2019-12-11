import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

import { Input, Segment, Divider, Button } from 'semantic-ui-react'
import Diary from '../../component/Diary/Diary';
import {getDiaryByDate, getDiaryByPerson, getDiaryByCategory} from '../../store/actions/previousdiary';
// import './MyDiaryList.css'


const mapStateToProps = state => {
    return {
        mode : state.diary.mode,
        selectedDiary : state.diary.selectedDiary,
        year : state.diary.year,
        month : state.diary.month,
        day : state.diary.day, 
        person_id : state.diary.person_id,
        category_name : state.diary.category_name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetDiaryByDate : (year, month, day) => dispatch(getDiaryByDate(year, month, day)),
        onGetDiaryByPerson : (id) => dispatch(getDiaryByPerson(id)),
        onGetDiaryByCategory : (name) => dispatch(getDiaryByCategory(name)),
    } 
}


class MyDiaryList extends Component{

    state = {
        search : '',
        keyword : ''
    }

    componentWillReceiveProps(nextProps){
        if(this.props.mode === 'CALENDAR'  && (this.props.year === nextProps.year && this.props.month === nextProps.month && this.props.day === nextProps.day)){
            this.setSearch();
        }
        else if(this.props.mode === 'PERSON' && (this.props.person_id === nextProps.person_id)){
            this.setSearch();
        } 
        else if (this.props.mode === 'CATEGORY' && (this.props.category_name === nextProps.category_name)){
            this.setSearch();
        }
    }  


    componentDidUpdate(prevProps){
        
        if(this.props.mode === 'CALENDAR'  && (this.props.year !== prevProps.year || this.props.month != prevProps.month || this.props.day != prevProps.day)){
            this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
            this.setSearch();
        }
        
        else if(this.props.mode === 'PERSON' && (this.props.person_id !== prevProps.person_id)){
            this.props.onGetDiaryByPerson(this.props.person_id);
            this.setSearch();
        } 
        else if (this.props.mode === 'CATEGORY' && (this.props.category_name !== prevProps.category_name)){
            this.props.onGetDiaryByCategory(this.props.category_name);
            this.setSearch();
        }
    }

    componentDidMount(){
        switch(this.props.mode){
            case 'CALENDAR':
                this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
                this.setSearch();
                break;
            case 'PERSON' : 
                
                this.props.onGetDiaryByPerson(this.props.person_id);
                this.setSearch();
                break;
            case 'CATEGORY':
                this.props.onGetDiaryByCategory(this.props.category_name);
                this.setSearch();
                break;
            
        }
    }
    

    setSearch = () => {
        this.setState({
            search :'',
            keyword : ''
        })
    }

    changeKeyword = () => {
        this.setState({keyword : this.state.search})
    }


    enterPress = (e) => {
        if (e.key === 'Enter') {
           this.changeKeyword();
        }
    }

 
    render(){
        const filtered_diary = this.props.selectedDiary.filter((diary) => {
        const contentState = convertFromRaw(JSON.parse(diary.content));
        const editorState = EditorState.createWithContent(contentState);
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        return value.indexOf(this.state.keyword) > -1
        })
    
               const diaries = this.props.selectedDiary.length !==0 ? filtered_diary.length !==0 ?
               <Segment>

                <Input  placeholder='Search...'  
                        id='diary-search-input'
                        value={this.state.search}
                        onChange={e => this.setState({search : e.target.value})}
                        onKeyPress={this.enterPress}
                        >
                        <input />
                <Button type='submit' onClick = {this.changeKeyword} icon='search'/></Input>
                <Divider clearing />
                
               {filtered_diary.map(diary => {
                    return (
                        <Diary key = {diary.id}
                            id = {diary.id}
                            category_name = {diary.category_name}
                            category_title = {diary.category_title}
                            person_tag = {diary.person_tag}
                            rating = {diary.rating}
                            content = {diary.content}
                            emotion_score = {diary.emotion_score}
                    />
                );
            })          
            } </Segment> 
            : 
            
            <Segment>
                <Input  placeholder='Search...'  
                    id='diary-search-input'
                    value={this.state.search}
                    onChange={e => this.setState({search : e.target.value})}
                    onKeyPress={this.enterPress}
                    >
                <input />
                <Button type='submit' onClick = {this.changeKeyword} icon='search'/></Input>
                <Divider clearing />
                <div className = 'noResultOfSearch' Align='center' style={{ minHeight: 650, minWidth : 1150, padding: '10em 0em' }} > 
                <img src = '/Crying-icon.png' align = 'center'></img>
                <h1>Sorry!</h1>
                <h2>There is no diary that you are finding!</h2>
                </div>
            </Segment>
            
            : <Segment textAlign='center' style={{ minHeight: 650, minWidth : 1150, padding: '10em 0em' }}>
                <div className = 'null_page' > 
                <img src = '/null.png' align = 'center'></img>
                <h2>You have no diary</h2>
                <h2>Let's write!</h2>

            </div>
            </Segment>
        
        return(
            <div className = 'MyDiaryList' >
                {diaries}
            </div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDiaryList));

