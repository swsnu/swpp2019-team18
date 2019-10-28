import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Diary from '../../component/Diary/Diary';
import * as actionCreators from '../../store/actions/index';

const mapStateToProps = state => {
    
    return {
        
        selectedDiary : state.diary.selectedDiary,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetDiaryByDate : (date) => dispatch(actionCreators.getDiaryByDate(date)),
    }
}

class MyDiaryList extends Component{
    // state = {
    //     testDiary : [
    //         { id : '1',
    //         category_id : 'movie',
    //         title : 'exit',
    //         rating : 5,
    //         content : 'Perfect',
    //         date : '20191022',
    //         },
    //         { id : '2',
    //         category_id : 'exercise',
    //         content : 'too tired',
    //         date : '20191022',
    //     },
    //     { id : '3',
    //         category_id : 'sport',
    //         title : 'soccer',
    //         content : 'Win!!',
    //         date : '20191022',
    //     }

    //     ]
    // }

    componentDidMount(){
       this.props.onGetDiaryByDate(191010);
    }

  

    render(){
       
        // const testDiary = this.state.testDiary.map(diary => {
        //     return (
        //         <Diary key = {diary.id}
        //                     id = {diary.id}
        //                     category_id = {diary.category_id}
        //                     title = {diary.title}
        //                     rating = {diary.rating}
        //                     content = {diary.content}
        //             />
        //     );
        // });
        
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
            <div className = 'MyDiaryListByDate'>
                {diaries}
            </div>
        );
    }
}

// export default MyDiaryList;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyDiaryList));


