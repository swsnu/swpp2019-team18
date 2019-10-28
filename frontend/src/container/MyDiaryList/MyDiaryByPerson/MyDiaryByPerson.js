import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Diary from '../../../component/Diary/Diary';
import * as actionCreators from '../../../store/actions/index';

const mapStateToProps = state => {
    return {
        selectedDiary : state.diary.selectedDiary,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetDiaryByPerson : (id) => dispatch(actionCreators.getDiaryByPerson(id)),
    }
}

class MyDiaryList extends Component{

    componentDidMount(){
       //this.props.onGetDiaryByPerson(this.props.person_id);
       this.props.onGetDiaryByPerson(1);
    }

    
    render(){
       
        const diaries = this.props.selectedDiary.map(diary => {
            return (
                <Diary key = {diary.id}
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
            <div className = 'MyDiaryListByPerson'>
                {diaries}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDiaryList));


