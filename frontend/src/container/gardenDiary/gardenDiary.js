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

        switch(this.props.gardenmode){
            case 'ALL':
                this.props.onGetAllGardenDiary();
                break;
            case 'CATEGORY':
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name); 
                break;
        }

    }
 
    render(){

               const garden = this.props.gardenDiary.map(garden => {
            return (

                        <Garden key = {garden.id}
                            id = {garden.id}
                            category_name = {garden.category_name}
                            category_title = {garden.category_title}
                            flower_count = {garden.flower_count}
                            flower_users = {garden.flower_users}
                            rating = {garden.rating}
                            content = {garden.content}
                            emotion_score = {garden.emotion_score}
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

