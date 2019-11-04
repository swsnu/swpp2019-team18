import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDiary, getDiary } from '../../store/actions/diary';
import { getPeople } from '../../store/actions/people';
import { Grid, Button, Form, Dropdown, Container, Segment } from 'semantic-ui-react';

class EditDiary extends Component {
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : [],
        rating : null,
        emotionScore : 0,
        buttons : [false, false, false, false],
        nameInput: "",
        allPeople: [],
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

    componentDidMount(){
        this.props.getDiary(this.props.match.params.id);
        this.props.getPeople();
    }

    setButtons(categoryName) {
        let updatedButtons = this.state.buttons.slice();
        switch(categoryName){
            case "MOVIE":
                updatedButtons[0] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "PEOPLE":
                updatedButtons[1] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "DATE":
                updatedButtons[2] = true;
                this.setState({buttons : updatedButtons});
                break;
            case "TRAVEL":
                updatedButtons[3] = true;
                this.setState({buttons : updatedButtons});
                break;
            default:
                return ;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.diary !== prevProps.diary) {
            this.setState({
                content : this.props.diary.content,
                categoryName : this.props.diary.categoryName,
                categoryTitle : this.props.diary.categoryTitle,
                people : this.props.diary.people,
                rating : this.props.diary.rating,
                emotionScore : this.props.diary.emotionScore,
            })
            this.setButtons(this.props.diary.categoryName);
        }
      }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.allPeople !== undefined && nextProps.allPeople.length > 0 && prevState.allPeople !== nextProps.allPeople ){
            return {...prevState, allPeople : nextProps.allPeople};
        }
        return prevState;
    }

    handleChange = (e, { value })=> {
        this.setState({people : value});
    }

    submitHandler = () => {
        const diaryObj = this.state;
        this.props.editDiary(this.props.match.params.id, diaryObj);
        alert("Successfully Sended!");
    }

    render() {
        let optionComponent;
        if(this.state.people !== undefined && this.state.people.length >= 1){
            let options = this.state.allPeople.map((obj) => {return {key:obj.id, text:obj.name, value:obj.id}});
            optionComponent = <Dropdown 
                style={{margin:'0px 0px 20px 0px'}} 
                onChange={this.handleChange}
                placeholder='People' fluid multiple search selection options={options}
                defaultValue={this.state.people}
                />
        }       
        return (
            
            <Grid>
            <Grid.Row columns={2} style={{ margin: '5px' }}>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                <Segment>
                    <Container textAlign='center' style={{ margin:'0px 0px 3px 0px' }}><h2>Edit Diary</h2></Container>
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
                    </Form>
                </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        diary : state.diary.diary,
        allPeople : state.diary.allPeople,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getDiary: (diaryID) => dispatch(getDiary(diaryID)),
        editDiary: (diaryId, diaryObj) => dispatch(editDiary(diaryId, diaryObj)),
        getPeople: () => dispatch(getPeople()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDiary);