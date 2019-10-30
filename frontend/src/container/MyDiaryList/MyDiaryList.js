import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Diary from '../../component/Diary/Diary';
import {getDiaryByDate, getDiaryByPerson, getDiaryByCategory} from '../../store/actions/previousdiary';

const mapStateToProps = state => {
    return {
        mode : state.diary.mode,
        selectedDiary : state.diary.selectedDiary,
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

    componentDidMount(){
       //this.props.onGetDiaryByPerson(this.props.person_id);
       console.log(this.props.mode);
        switch(this.props.mode){
            case 'CALENDAR':
                this.props.onGetDiaryByDate(2019, 10, 29);
                //this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
                break;
            case 'PERSON' : 
                //this.props.onGetDiaryByPerson(this.props.person_id);
                this.props.onGetDiaryByPerson(1);
                break;
            case 'CATEGORY':
                this.props.onGetDiaryByCategory('MOVIE');
                //this.props.onGetDiaryByCategory(this.props.category_name);
                break;
            
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


