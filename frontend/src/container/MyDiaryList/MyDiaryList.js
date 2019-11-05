import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Diary from '../../component/Diary/Diary';
import {getDiaryByDate, getDiaryByPerson, getDiaryByCategory} from '../../store/actions/previousdiary';


const mapStateToProps = state => {
    return {
        mode : state.diary.mode,
        selectedDiary : state.diary.selectedDiary,
        year : state.diary.year,
        month : state.diary.month,
        day : state.diary.day, 
        //person_id : state.diary.person_id,
        //category_name : state.diary.category_name,
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
        if(this.props.year !== prevProps.year || this.props.month != prevProps.month || this.props.day != prevProps.day
            || this.props.mode !== prevProps.mode){
            this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
        }
    }
    componentDidMount(){
        //this.props.onGetDiaryByPerson(this.props.person_id);
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
            default:
                return ;
        }
    }
 
    render(){
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
        
        return(
            <div className = 'MyDiaryList'>
                {diaries}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDiaryList));


