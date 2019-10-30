import React, { Component } from 'react';
import { Grid, Button, Form, Divider, Container, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addDiary } from '../../store/actions/diary';

class newArticle extends Component {
    
    state = {
        content : "",
        categoryName: "",
        categoryTitle : "", 
        people : null,
        rating : null,
        emotionScore : 0,
    }

    submitHandler = () => {
        const diaryObj = this.state;
        this.props.addDiary(diaryObj);
        alert("Successfully Sended!");
    }

    render() {
        return (


        <Grid>
            <Grid.Row columns={2} style={{ margin: '5px' }}>
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={7}>
                <Segment>
                    <Container textAlign='center' style={{ margin:'0px 0px 15px 0px' }}><h2>New Diary</h2></Container>
                    <Form>
                        
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({categoryName: "MOVIE"})}>MOVIE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({categoryName: "FRIEND"})}>FRIEND</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({categoryName: "DATE"})}>DATE</Button>
                        <Button id='diary-category-button' color='blue' style={{ marginBottom:'1em' }} onClick={e => this.setState({categoryName: "TRAVEL"})}>TRAVEL</Button>
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

const mapDispatchToProps = dispatch => {
    return {
        addDiary: (diaryObj) => dispatch(addDiary(diaryObj))
    }
}

export default connect(null, mapDispatchToProps)(newArticle);