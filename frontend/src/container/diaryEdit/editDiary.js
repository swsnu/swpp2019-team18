import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDiary, getDiary, getPeople } from '../../store/actions/diary';
import { Grid, Button, Form, Dropdown, Container, Segment } from 'semantic-ui-react';

class EditDiary extends Component {
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : [],
        rating : null,
        emotionScore : 0,
        nameInput: "",
        allPeople: [],
    }

    componentDidMount(){
        this.props.getDiary(this.props.match.params.id);
        this.props.getPeople();
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
                        
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 1})}>MOVIE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 2})}>FRIEND</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 3})}>DATE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 4})}>TRAVEL</Button>
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