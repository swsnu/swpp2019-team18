import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Grid, Menu} from 'semantic-ui-react';

import Garden from '../../component/Garden/Garden';
import {getAllGardenDiary, getGardenDiaryByCategory} from '../../store/actions/gardendiary';
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
        onGetAllGardenDiary : (mode) => dispatch(getAllGardenDiary(mode)),
        onGetGardenDiaryByCategory : (name, mode) => dispatch(getGardenDiaryByCategory(name, mode)),
    } 
}

class gardenDiary extends Component{

    state = {
        activeItem : 'Latest'
    }

    componentDidUpdate(prevProps){
        
        // if(this.props.mode === 'CALENDAR'  && (this.props.year !== prevProps.year || this.props.month != prevProps.month || this.props.day != prevProps.day)){
        //     this.props.onGetDiaryByDate(this.props.year, this.props.month, this.props.day);
        // }

    }

    componentDidMount(){

        switch(this.props.gardenmode){
            case 'ALL':
                this.props.onGetAllGardenDiary(this.state.activeItem);
                break;
            case 'CATEGORY':
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, this.state.activeItem); 
                break;
        }

    }
    handleItemClick = (e, { name }) => {
        if(this.state.activeItem !== name){
            this.setState({ activeItem: name })
            if(this.props.gardenmode === 'ALL'){
                this.props.onGetAllGardenDiary(name);
            }
            else {
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, name);
            }
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
                            shared_date = {garden.shared_date}
                            rating = {garden.rating}
                            content = {garden.content}
                            emotion_score = {garden.emotion_score}
                    />
            );
        });
        
        return(
            <div className = 'GardenDiaryList' align = 'center'>
                <Menu tabular>
                    <Menu.Item
                        name='Latest'
                        active={this.state.activeItem === 'Latest'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Popular'
                        active={this.state.activeItem === 'Popular'}
                        onClick={this.handleItemClick}
                    />
                </Menu>
                <Grid>    
                <Grid.Row columns={3}>
                    {garden}
                </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(gardenDiary));

