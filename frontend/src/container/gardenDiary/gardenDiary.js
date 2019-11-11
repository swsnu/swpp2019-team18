import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Garden from '../../component/Garden/Garden';
import {getAllGardenDiary} from '../../store/actions/gardendiary';
import { relativeTimeThreshold } from 'moment';
//import './MyDiaryList.css'


const mapStateToProps = state => {
    return {
        gardenmode : state.garden.gardenmode,
        gardenDiary : state.garden.garden_diary,

        person_id : state.diary.person_id,
        garden_category_name : state.garden.category_name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllGardenDiary : () => dispatch(getAllGardenDiary()),
        //onGetGardenDiaryByCategory : (name) => dispatch(getGardenDiaryByCategory(name)),
    } 
}

class gardenDiary extends Component{

    componentDidUpdate(prevProps){

        // if(this.props.mode === 'CALENDAR'  && (this.props.year !== prevProps.year || this.props.month != prevProps.month || this.props.day != prevProps.day)){
        //     this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
        // }
        // else if(this.props.mode === 'PERSON' && (this.props.person_id !== prevProps.person_id)){
        //     this.props.onGetDiaryByPerson(this.props.person_id);
        // } 
        // else if (this.props.mode === 'CATEGORY' && (this.props.category_name !== prevProps.category_name)){
        //     this.props.onGetDiaryByCategory(this.props.category_name);
        // }
    }

    componentDidMount(){
        console.log('[Garden Mode]: '+this.props.gardenmode);

        switch(this.props.gardenmode){
            case 'ALL':
                this.props.onGetAllGardenDiary();
                console.log('[Garden]: '+this.props.gardenDiary);
                break;
            case 'CATEGORY':
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name); 
                break;
        }
    }
 
    render(){
               const garden = this.props.gardenDiary.map(diary => {
            return (
        
                        <Garden key = {diary.id}
                            id = {diary.id}
                            category_name = {diary.category_name}
                            category_title = {diary.category_title}
                            flower_count = {diary.flower_count}
                            rating = {diary.rating}
                            content = {diary.content}
                            emotion_score = {diary.emotion_score}
                    />
            );
        });
        
        return(
            <div className = 'GardenDiaryList' align = 'center'>
                {garden}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(gardenDiary));

