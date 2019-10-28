import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
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
        <div className="NewDiary">
        <h1>Add New Diary</h1>
        <Button id='diary-category-button' onClick={e => this.setState({category_id: 1})}>MOVIE</Button>
        <Button id='diary-category-button' onClick={e => this.setState({category_id: 2})}>FRIEND</Button>
        <input 
        type='text'
        id='diary-category-title-input'
        value={this.state.categoryTitle}
        onChange={e => this.setState({categoryTitle : e.target.value})}
        ></input>
        <input 
        type='text'
        id='diary-content-input'
        value={this.state.content}
        onChange={e => this.setState({content : e.target.value})}
        ></input>
        <button id='diary-submit-button' onClick={() => this.submitHandler()}>Confirm</button>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDiary: (diaryObj) => dispatch(addDiary(diaryObj))
    }
}

export default connect(null, mapDispatchToProps)(newArticle);