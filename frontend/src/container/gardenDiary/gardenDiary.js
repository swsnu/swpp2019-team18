import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Grid, Menu, Button} from 'semantic-ui-react';

import Garden from '../../component/Garden/Garden';
import {getAllGardenDiary, getGardenDiaryByCategory, getMyGardenDiary, getMyFlower} from '../../store/actions/gardendiary';
//import './MyDiaryList.css'


const mapStateToProps = state => {
    return {
        gardenDiary : state.garden.garden_diary,
        garden_category_name : state.garden.category_name,
        gardenmode : state.garden.gardenmode,

    }

}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllGardenDiary : (mode) => dispatch(getAllGardenDiary(mode)),
        onGetGardenDiaryByCategory : (name, mode) => dispatch(getGardenDiaryByCategory(name, mode)),
        onGetMyGardenDiary : (mode) => dispatch(getMyGardenDiary(mode)),
        onGetMyFlower : (mode) => dispatch(getMyFlower(mode)),
    } 
}

class gardenDiary extends Component{

    state = {
        activeItem : 'Latest'
    }

    componentDidUpdate(prevProps){

        if(this.props.gardenmode === 'ALL'  && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetAllGardenDiary(this.state.activeItem);
        }
        else if(this.props.gardenmode === 'CATEGORY'  && ((this.props.gardenmode !== prevProps.gardenmode) || this.props.garden_category_name !== prevProps.garden_category_name)){
            this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, this.state.activeItem);
            console.log(this.props.garden_category_name)
        } 
        else if (this.props.gardenmode === 'MYGARDEN' && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetMyGardenDiary(this.state.activeItem);
        }
        else if (this.props.gardenmode === 'MYFLOWER' && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetMyFlower(this.state.activeItem);
        }
    }
    componentDidMount(){

        switch(this.props.gardenmode){
            case 'ALL':
                this.props.onGetAllGardenDiary(this.state.activeItem);
                console.log("++++++++++++++++ALL++++++++++++++++++++")
                break;
            case 'CATEGORY':
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, this.state.activeItem); 
                break;
            case 'MYGARDEN':
                this.props.onGetMyGardenDiary(this.state.activeItem);
                console.log("++++++++++++++++MYGARDEN++++++++++++++++++++")
                break;
            case 'MYFLOWER':
                this.props.onGetMyFlower(this.state.activeItem);
                break;
        }

    }
    handleItemClick = (e, { name }) => {
        if(this.state.activeItem !== name){
            this.setState({ activeItem: name })
            if(this.props.gardenmode === 'ALL'){
                this.props.onGetAllGardenDiary(name);
            }
            else if(this.props.gardenmode ==='CATEGORY'){
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, name);
            }
            else if(this.props.gardenmode === 'MYGARDEN'){
                this.props.onGetMyGardenDiary(name);
            }
            else{
                this.props.onGetMyFlower(name);
            }
        }
    }
 
    render(){
               const garden = this.props.gardenDiary.map(garden => {
            return (

                        <Garden key = {garden.id}
                            id = {garden.id}
                            author = {garden.author}
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
            <div className = 'GardenDiaryList' >
                <div  align = 'left' style = {{position : 'relative'}}>
                <Button.Group size='large'>
                <Button
                    id = 'Latest_tab'
                    size = 'big'
                    name='Latest'
                    active={this.state.activeItem === 'Latest'}
                    onClick={this.handleItemClick}
                    >Latest</Button>
                <Button.Or />
                <Button
                    id = 'Popular_tab'
                    size = 'big'
                    name='Popular'
                    active={this.state.activeItem === 'Popular'}
                    onClick={this.handleItemClick}
                    >Popular</Button>
                </Button.Group>
                    
                </div>
                <div style = {{position : 'relative'}}>

                <Grid>    
                <Grid.Row columns={3}>
                    {garden}
                </Grid.Row>
                </Grid></div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(gardenDiary));

