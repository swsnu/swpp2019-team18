import React, { Component } from 'react';
import { Grid, Button, Form, Container, Segment, Dropdown, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addDiary,getDiary, editDiary } from '../../store/actions/diary';
import { getPeople } from '../../store/actions/people';
import CatergorySelect from '../../component/DiaryWrite/CategorySelect';
import GetCategoryTitle from '../../component/DiaryWrite/GetCategoryTitle';
import AddPeoplePopUp from '../addPeople/addPeopleModal'
import MessagePopup from '../message/MessagePopup';
import { withRouter } from 'react-router';
import MyEditor from '../../component/DiaryWrite/DraftJs/DraftWithIMG'

class NewDiary extends Component {
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        currentCategoryType : '',
        people : [],
        rating : null,
        emotionScore : 0,
        allPeople: [],
        modalOpen : false,
        messageSuccess : false,
        date : {},
        writeMode : false,
        titleConfirm : false,
        selectedFile : null
    }

    submitHandler = () => {
        const diaryObj = {
            content: this.state.content,
            categoryName : this.state.categoryName,
            categoryTitle : this.state.categoryTitle,
            people : this.state.people,
            rating : this.state.rating,
            emotionScore : this.state.emotionScore,
            date : this.state.date,
        };
        if(this.props.EditMode){
            this.props.editDiary(this.props.match.params.id, diaryObj);
        }
        else {
            this.props.addDiary(diaryObj);
        }
    }

    componentDidMount(){
        this.props.getPeople();
        if(this.props.EditMode){
            this.props.getDiary(this.props.match.params.id);
            this.setState({writeMode : true, titleConfirm : true})
        }
    }

    componentDidUpdate(prevProps) {
        /*
        only activates at editmode 
        */
        if ( this.props.EditMode && (this.props.diary !== prevProps.diary)) {
            this.setState({
                content : this.props.diary.content,
                categoryName : this.props.diary.categoryName,
                categoryTitle : this.props.diary.categoryTitle,
                people : this.props.diary.people,
                rating : this.props.diary.rating,
                emotionScore : this.props.diary.emotionScore,
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
        const newDate = {year : nextProps.year, month : nextProps.month, day : nextProps.day};
        if(newDate.year !== undefined && newDate.month !== undefined && newDate.day !== undefined && newDate !== prevState.date){
            return {...prevState, date : newDate};
        }
        return prevState;
    }

    handleChange = (e, { value })=> {
        this.setState({people : value});
    }

    handleSelectCategory = (name, type) => {
        this.setState({categoryName : name, selectedCategoryType : type, writeMode : true, currentCategory : name});
        if (type === 3){
            this.setState({titleConfirm : true})
        }
    }

    handleTitle = (title, rating) => {
        this.setState({titleConfirm : true, categoryTitle : title, ratinf : rating})
    }

    handleMode = () => {
        this.setState({writeMode : false})
        this.setState({titleConfirm : false})
    }

    handleContent = (content) => {
        this.setState({content : content})
    }

    closeMessage = () => {
        this.setState({messageSuccess : false});
        this.props.getPeople();
    }
    
    openMessage = () => {
        this.setState({messageSuccess : true});
    }
    render() {

        let options = this.state.allPeople.map((obj) => {return {key:obj.id, text:obj.name, value:obj.id}});
        let optionComponent = <Dropdown 
            style={{margin:'0px 0px 20px 0px'}}
            onChange={this.handleChange}
            placeholder='People' fluid multiple search selection options={options} />;

        let createPeopleSuccessMessage = this.state.messageSuccess ? 
                <MessagePopup id="create-people-success-message" header="New friend is successfully created" content="You can now add new people" onClose={this.closeMessage}/> :
                 null;
        
        return (


        <Grid className="Grid">
            <Grid.Row columns={2} style={{ marginLeft: '15px' }}>
                <Segment>
                {createPeopleSuccessMessage}
               
                        {this.state.writeMode ? 
                        //if writeMode is True, show input components
                        <Container>
                            <Container align = 'left'>
                                    <Button id = 'change-category-button' onClick = {() => this.handleMode()}>Change Category</Button>
                                </Container>
                                <Segment>
                            { this.state.titleConfirm ? 
                            //If user confirmed title, show label 
                            <Container>
                                <Container>
                                    <Label as='a' color='blue' id = 'category-label' onClick = {() => this.setState({titleConfirm : false})} image>
                                        {this.state.categoryName}
                                        <Label.Detail >{this.state.categoryTitle}</Label.Detail>
                                    </Label>
                                   
                                </Container>
                            </Container>
                            //if user did not confirm the title, show category title input form 
                             :  <GetCategoryTitle 
                             selectedCategoryType = {this.state.selectedCategoryType}
                             categoryName = {this.state.categoryName}
                             handleTitle = {(name, rating) => this.handleTitle(name,rating)}/>
                             }
                             </Segment>
            
                        <Form>
                            
                        {optionComponent /* component for tagging people */}

                        {/* writing components using Draft.js */}
                        <Segment>
                            <MyEditor handleContent = {(content) => this.handleContent(content)} EditMode = {this.props.EditMode} content = {this.state.content}/> 
                        </Segment>
                        

                        <Button color='teal' id='diary-submit-button' onClick={() => this.submitHandler()}>Confirm</Button>

                        <AddPeoplePopUp successHandler={this.openMessage}/> </Form>  </Container>
                        :
                        //if writeMode is False, user category selecting components should appear
                        <div>
                         <Container textAlign='center' style={{ margin:'0px 0px 0px 0px' }}><h2>Choose category</h2></Container>
                         <CatergorySelect handleSelectCategory = {(name, type) => this.handleSelectCategory(name, type)}/>
                         </div>}
                </Segment>
            </Grid.Row>
        </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDiary: (diaryObj) => dispatch(addDiary(diaryObj)),
        getPeople: () => dispatch(getPeople()),
        getDiary: (diaryID) => dispatch(getDiary(diaryID)),
        editDiary: (diaryId, diaryObj) => dispatch(editDiary(diaryId, diaryObj)),
    }
}

const mapStateToProps = state => {
    return {
        allPeople : state.diary.allPeople,
        year : state.diary.year,
        month : state.diary.month,
        day : state.diary.day, 
        diary : state.diary.diary,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewDiary));