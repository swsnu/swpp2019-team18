
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router';

const getDiaryToReducer = (diaryObj) => {
    return {type: actionTypes.GET_DIARY, diary: diaryObj};
}

export const getDiary = (diaryId) => dispatch => {
    return axios.get('http://localhost:8000/api/diary/' + diaryId + '/')
                    .then(response => {return dispatch(getDiaryToReducer(response.data))})
                    .catch(err => {return dispatch(push('/login'))});
}

const addDiaryToReducer = (diaryObj) => {
    return {type: actionTypes.ADD_DIARY, diary: diaryObj};
}

export const addDiary = diaryObj => dispatch => {
    return axios.post('http://localhost:8000/api/diary/', diaryObj)
                    .then(response => dispatch(addDiaryToReducer(response.data)))
                    .then(() => dispatch(push('/diary')));
}

const editDiaryToReducer = (diaryObj) => {
    return {type: actionTypes.EDIT_DIARY, diary: diaryObj};
}

export const editDiary =(diaryId, diaryObj) => dispatch => {
    return axios.put('http://localhost:8000/api/diary/' + diaryId + '/', diaryObj)
                    .then(response => dispatch(editDiaryToReducer(response.data)));
}

export const returnPeopleToReducer = (allPeople) => {
    return {type:actionTypes.SEARCH_PEOPLE, allPeople: allPeople};
}

export const getPeople = () => dispatch => {
    return axios.get('http://localhost:8000/api/diary/people/')
                .then(response => dispatch(returnPeopleToReducer(response.data)));
}

export const deleteDiary_ = (id) => {
    return{
        type : actionTypes.DELETE_DIARY,
        targetID : id
    };
};

export const deleteDiary = (id) => {
    return (dispatch) => {
        return axios.delete('http://localhost:8000/api/diary/'+id+'/')
        .then(() => {dispatch(deleteDiary_(id))})
    };
};