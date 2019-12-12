import React,{Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Grid, Menu, Button, Input, Segment, Divider } from 'semantic-ui-react';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

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
        activeItem : 'Latest',
        search : '',
        keyword : ''
    }

    componentWillReceiveProps(nextProps){
      
        if((this.props.gardenmode === 'ALL'  && (this.props.gardenmode === nextProps.gardenmode))
        ||(this.props.gardenmode === 'CATEGORY'  && ((this.props.gardenmode === nextProps.gardenmode) && this.props.garden_category_name !== nextProps.garden_category_name))
        ||(this.props.gardenmode === 'MYGARDEN' && (this.props.gardenmode === nextProps.gardenmode))
        ||(this.props.gardenmode === 'MYFLOWER' && (this.props.gardenmode === nextProps.gardenmode))){
            this.setSearch();
        }
        
    }  

    componentDidUpdate(prevProps){

        if(this.props.gardenmode === 'ALL'  && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetAllGardenDiary(this.state.activeItem);
            this.setSearch();
        }
        else if(this.props.gardenmode === 'CATEGORY'  && ((this.props.gardenmode !== prevProps.gardenmode) || this.props.garden_category_name !== prevProps.garden_category_name)){
            this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, this.state.activeItem);
            this.setSearch();
        } 
        else if (this.props.gardenmode === 'MYGARDEN' && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetMyGardenDiary(this.state.activeItem);
            this.setSearch();
        }
        else if (this.props.gardenmode === 'MYFLOWER' && (this.props.gardenmode !== prevProps.gardenmode)){
            this.props.onGetMyFlower(this.state.activeItem);
            this.setSearch();
        }
    }
    componentDidMount(){

        switch(this.props.gardenmode){
            case 'ALL':
                this.props.onGetAllGardenDiary(this.state.activeItem);
                this.setSearch();
                break;
            case 'CATEGORY':
                this.props.onGetGardenDiaryByCategory(this.props.garden_category_name, this.state.activeItem); 
                this.setSearch();
                break;
            case 'MYGARDEN':
                this.props.onGetMyGardenDiary(this.state.activeItem);
                this.setSearch();
                break;
            case 'MYFLOWER':
                this.props.onGetMyFlower(this.state.activeItem);
                this.setSearch();
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

    setSearch = () => {
        this.setState({
            search :'',
            keyword : ''
        })
    }

    keywordChange = () => {
        this.setState({keyword : this.state.search})
    }


    pressEnter = (e) => {
        if (e.key === 'Enter') {
           this.keywordChange();
        }
    }
 
    render(){
            const filtered_diary = this.props.gardenDiary.filter((diary) => {
            const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(diary.content)));
            const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
            const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
            return value.indexOf(this.state.keyword) > -1
            })

            const garden = filtered_diary.map(garden_ => {

            return (
                

                        <Garden key = {garden_.id}
                            id = {garden_.id}
                            author = {garden_.author}
                            category_name = {garden_.category_name}
                            category_title = {garden_.category_title}
                            flower_count = {garden_.flower_count}
                            flower_users = {garden_.flower_users}
                            shared_date = {garden_.shared_date}
                            rating = {garden_.rating}
                            content = {garden_.content}
                            emotion_score = {garden_.emotion_score}
                    />
            );
        });

        const gardens = this.props.gardenDiary.length !==0 ? filtered_diary.length !==0 ?
        <Segment>
            <div className = 'GardenDiaryList' align = 'center' style={{ position : 'relative', minHeight: 650, minWidth : 1150, padding: '0em 2em' }} >
                <Grid>

                <Grid.Column floated='left' width={5} >
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
                </Button.Group></Grid.Column>

                <Grid.Column floated='right' width={5}>
                <Input  placeholder='Search...'  
                    id='garden-search-input'
                    value={this.state.search}
                    onChange={e => this.setState({search : e.target.value})}
                    onKeyPress={this.enterPress}
                    >
                <input />
                <Button type='submit' onClick = {this.changeKeyword} icon='search'/></Input></Grid.Column>
                </Grid>
                <Divider clearing />
                <div>
                <Grid>    
                <Grid.Row columns={3}>
                    {garden}
                </Grid.Row>
                </Grid></div>
            </div> </Segment>
            : 
            
            <Segment align='right'>
                <Input  placeholder='Search..'  
                    id='garden-search-input'
                    value={this.state.search}
                    onChange={e => this.setState({search : e.target.value})}
                    onKeyPress={this.pressEnter}
                    >
                <input />
                <Button type='submit' onClick = {this.keywordChange} icon='search' /></Input>
                <Divider clearing />
                <div className = 'noResultOfSearch_garden' Align='center' style={{ minHeight: 650, minWidth : 1150, padding: '10em 0em' }} > 
                <img src = '/Crying-icon.png' align = 'center'></img>
                <h1>Sorry!</h1>
                <h2>There is no garden diary that you are finding!</h2>
                </div>
            </Segment>
            
            : <Segment textAlign='center' style={{ minHeight: 650, minWidth : 1150, padding: '10em 0em' }}>
                <div className = 'null_page_garden' > 
                <img src = '/null.png' align = 'center'></img>
                <h2>There is no garden diary!</h2>


            </div>
            </Segment>


        
        return(
            <div className = 'gardenList' >
                {gardens}
            </div>

            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(gardenDiary));

