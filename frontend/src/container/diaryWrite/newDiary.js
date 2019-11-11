import React, { Component } from 'react';
import { Grid, Button, Form, Container, Segment, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addDiary } from '../../store/actions/diary';
import { getPeople } from '../../store/actions/people';
import AddPeoplePopUp from '../addPeople/addPeopleModal'
import MessagePopup from '../message/MessagePopup';
import { withRouter } from 'react-router';

class NewDiary extends Component {
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : [],
        rating : null,
        emotionScore : 0,
        nameInput: "",
        allPeople: [],
        buttons : [false, false, false, false],
        modalOpen : false,
        messageSuccess : false,
<<<<<<< HEAD
=======
        date : {},
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
    }

    submitHandler = () => {
        const diaryObj = {
            content: this.state.content,
            categoryName : this.state.categoryName,
            categoryTitle : this.state.categoryTitle,
            people : this.state.people,
            rating : this.state.rating,
            emotionScore : this.state.emotionScore,
<<<<<<< HEAD
        };
        this.props.addDiary(diaryObj);
        this.props.history.push('/diary')
=======
            date : this.state.date,
        };
        this.props.addDiary(diaryObj);
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
    }

    componentDidMount(){
        this.props.getPeople();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
<<<<<<< HEAD
=======
        const newDate = {year : nextProps.year, month : nextProps.month, day : nextProps.day};
        if(newDate.year !== undefined && newDate.month !== undefined && newDate.day !== undefined && newDate !== prevState.date){
            return {...prevState, date : newDate};
        }
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
        return prevState;
    }

    handleChange = (e, { value })=> {
        this.setState({people : value});
    }

    handleToggle = (e, btnId, name) => {
        let updateButtons = this.state.buttons.slice();
        updateButtons[btnId] = !updateButtons[btnId]
        if(updateButtons[btnId]){
            updateButtons = updateButtons.map(val => false);
            updateButtons[btnId] = true;
        }
        this.setState({buttons : updateButtons, categoryName: name});
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
            <Grid.Row columns={2} style={{ margin: '5px' }}>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                <Segment>
                {createPeopleSuccessMessage}
                    <Container textAlign='center' style={{ margin:'0px 0px 3px 0px' }}><h2>New Diary</h2></Container>
                    <Form>
                        <Button id='diary-category-movie-button' color={this.state.buttons[0] ? 'red' : 'blue'} active={this.state.buttons[0]} style={{ marginBottom:'1em' }} onClick={e => this.handleToggle(e, 0, "MOVIE")}>MOVIE</Button>
                        <Button id='diary-category-people-button' color={this.state.buttons[1] ? 'red' : 'blue'} active={this.state.buttons[1]} style={{ marginBottom:'1em' }} onClick={e => this.handleToggle(e, 1, "PEOPLE")}>PEOPLE</Button>
                        <Button id='diary-category-date-button' color={this.state.buttons[2] ? 'red' : 'blue'} active={this.state.buttons[2]} style={{ marginBottom:'1em' }} onClick={e => this.handleToggle(e, 2, "DATE")}>DATE</Button>
                        <Button id='diary-category-travel-button' color={this.state.buttons[3] ? 'red' : 'blue'} active={this.state.buttons[3]} style={{ marginBottom:'1em' }} onClick={e => this.handleToggle(e, 3, "TRAVEL")}>TRAVEL</Button>
                        {optionComponent}
                        <Form.Input 
                        fluid label='Title' 
                        placeholder='Star Wars'
                        id='diary-category-title-input'
                        value={this.state.categoryTitle}
                        onChange={e => this.setState({categoryTitle : e.target.value})}
                        />
                        <Form.TextArea 
                        style={{ minHeight: 400 }}
                        id='diary-content-input'
                        label='Your story'
                        placeholder='Tell me more about you...'
                        value={this.state.content}
                        onChange={e => this.setState({content : e.target.value})}
                        />
                        <Button color='teal' id='diary-submit-button' onClick={() => this.submitHandler()}>Confirm</Button>

                        <AddPeoplePopUp successHandler={this.openMessage}/>
                    </Form>
                    
                </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDiary: (diaryObj) => dispatch(addDiary(diaryObj)),
        getPeople: () => dispatch(getPeople())
    }
}

const mapStateToProps = state => {
    return {
        allPeople : state.diary.allPeople,
<<<<<<< HEAD
=======
        year : state.diary.year,
        month : state.diary.month,
        day : state.diary.day, 
>>>>>>> 0eca6cbc8f39ad0a3e5e8d4d20be5dab757e84f7
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewDiary));