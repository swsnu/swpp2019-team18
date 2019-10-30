import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDiary, getDiary } from '../../store/actions/diary';
import { Grid, Button, Form, Divider, Container, Segment } from 'semantic-ui-react';

class EditDiary extends Component {
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : null,
        rating : null,
        emotionScore : 0,
    }

    componentDidMount(){
        this.props.getDiary(this.props.match.params.id);
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

    submitHandler = () => {
        const diaryObj = this.state;
        console.log(diaryObj);
        this.props.editDiary(this.props.match.params.id, diaryObj);
        alert("Successfully Sended!");
    }


    render() {
        return (

            <Grid>
            <Grid.Row columns={2} style={{ margin: '5px' }}>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={7}>
                <Segment>
                    <Container textAlign='center' style={{ margin:'0px 0px 15px 0px' }}><h2>Edit Diary</h2></Container>
                    <Form>
                        
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 1})}>MOVIE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 2})}>FRIEND</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 3})}>DATE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({category_id: 4})}>TRAVEL</Button>
                        {/* <Divider /> */}
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
    console.log("This is mapStateToProps  ");
    console.log(state.diary);
    return {
        diary : state.diary.diary
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getDiary: (diaryID) => dispatch(getDiary(diaryID)),
        editDiary: (diaryId, diaryObj) => dispatch(editDiary(diaryId, diaryObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDiary);