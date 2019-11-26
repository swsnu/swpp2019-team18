
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const returnPeopleToReducer = (allPeople) => {
    return {type:actionTypes.SEARCH_PEOPLE, allPeople: allPeople};
}

export const getPeople = () => dispatch => {
    console.log("[getPeople axios call]");
    return axios.get('http://localhost:8000/api/diary/people/')
                .then(response => dispatch(returnPeopleToReducer(response.data)));
}

const addPeopleToReducer = (res) => {
    return {type:actionTypes.ADD_PEOPLE};
}

export const addPeople = (obj) => dispatch => {
    return axios.post('http://localhost:8000/api/diary/people/', obj)
                .then(response => dispatch(addPeopleToReducer(response.data)))
                .catch(err => dispatch(addPeopleToReducer(1)));
}