import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDiary, getDiary } from '../../store/actions/diary';

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
        <div className="EditDiary">
        <h1>Edit Diary</h1>
        <button id='diary-category-button' onClick={e => this.setState({category_id: 1})}>MOVIE</button>
        <button id='diary-category-button' onClick={e => this.setState({category_id: 2})}>FRIEND</button>
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