import * as actionTypes from './actionTypes'
import axios from 'axios'

export const loginRequest = (user) => {
    return dispatch => {
        return axios.post('/signin', user)
        .then( response => {loginSuccess(id)})
        .catch(error => {
            dispatch(loginFailure(error.response.data.code))
        })
    }
}

export function login() {
    return {
        type: actionTypes.LOGIN
    };
}
 
export function loginSuccess(id) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        ID : id
    };
}
 
export function loginFailure(error) {
    return {
        type: actionTypes.LOGIN_FAILURE,
        error
    };
}