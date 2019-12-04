import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import { Input, Segment, Divider } from 'semantic-ui-react'
import Diary from '../../component/Diary/Diary';
import {getDiaryByDate, getDiaryByPerson, getDiaryByCategory} from '../../store/actions/previousdiary';
//import './MyDiaryList.css'


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

    componentDidUpdate(prevProps){

        if(this.props.mode === 'CALENDAR'  && (this.props.year !== prevProps.year || this.props.month != prevProps.month || this.props.day != prevProps.day)){
            this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
        }
        else if(this.props.mode === 'PERSON' && (this.props.person_id !== prevProps.person_id)){
            this.props.onGetDiaryByPerson(this.props.person_id);
        } 
        else if (this.props.mode === 'CATEGORY' && (this.props.category_name !== prevProps.category_name)){
            this.props.onGetDiaryByCategory(this.props.category_name);
        }
    }

    componentDidMount(){

        switch(this.props.mode){
            case 'CALENDAR':
                this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
                break;
            case 'PERSON' : 
                
                this.props.onGetDiaryByPerson(this.props.person_id);
                break;
            case 'CATEGORY':
                this.props.onGetDiaryByCategory(this.props.category_name);
                break;
            
        }
    }

    state = {
        keyword : ''
    }

    _searchContact = (e) => { 
        this.setState({
          keyword : e.target.value
        });
      }

 
    render(){
        console.log(this.props.selectedDiary)
        const diaries = this.props.selectedDiary.map(diary => {
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

        });
        /* const filterItems = (query) => {
            return diaries.content.filter((el) =>
              el.toLowerCase().indexOf(query.toLowerCase()) > -1
            );
          }
          
          console.log(filterItems('born')); // ['apple', 'grapes']

        /*const filtered_diaries = (data) => {
            data = data.filter((diary) => {
                return diary.content.indexOf(this.state.keyword);
            });
            return (
                <Diary key = {data.id}
                    id = {data.id}
                    category_name = {data.category_name}
                    category_title = {data.category_title}
                    person_tag = {data.person_tag}
                    rating = {data.rating}
                    content = {data.content}
                    emotion_score = {data.emotion_score}
            />
    );
        }*/
        
        return(
            <div className = 'MyDiaryList' >
            <Segment attached = 'top' align='right'>
                <Input value = {this.state.keyword} onChange = {this._searchContact} icon='search' placeholder='Search...' />
            </Segment>
                <Divider clearing />
            
                {/*diaries(this.props.selectedDiary)*/diaries}
            
            </div>
            /*<div className = 'MyDiaryList' align = 'center'>
            <div className = 'MyDiaryList' >
                {diaries}
            </div>*/
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDiaryList));

