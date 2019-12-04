import React, { Component } from 'react';
import NewDiary from '../diaryWrite/newDiary'

class EditDiary extends Component {
    render() {
        return <NewDiary EditMode = {true}/>
    }
}

export default EditDiary;