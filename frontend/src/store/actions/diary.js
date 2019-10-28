import axios from 'axios';
import * as actionTypes from './actionTypes';


const getDiaryToReducer = (diaryObj) => {
    return {type: actionTypes.GET_DIARY, diary: diaryObj};
}

export const getDiary = (diaryId) => dispatch => {
    return axios.get('http://127.0.0.1:8000/api/diary/' + diaryId + '/')
                    .then(response => dispatch(getDiaryToReducer(response.data)));
}

const addDiaryToReducer = (diaryObj) => {
    console.log(diaryObj);
    return {type: actionTypes.ADD_DIARY, diary: diaryObj};
}

export const addDiary = diaryObj => dispatch => {
    return axios.post('http://127.0.0.1:8000/api/diary/', diaryObj)
                    .then(response => dispatch(addDiaryToReducer(response.data)));
}

const editDiaryToReducer = (diaryObj) => {
    console.log(diaryObj);
    return {type: actionTypes.EDIT_DIARY, diary: diaryObj};
}

export const editDiary =(diaryId, diaryObj) => dispatch => {
    console.log("[editDiary] ")
    console.log(diaryObj);
    return axios.put('http://127.0.0.1:8000/api/diary/' + diaryId + '/', diaryObj)
                    .then(response => dispatch(editDiaryToReducer(response.data)));
}