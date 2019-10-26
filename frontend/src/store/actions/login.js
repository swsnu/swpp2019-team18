import * as actionTypes from './actionTypes'
import axios from 'axios'

axios.defaults.xsrfCookieName = "csrftoken"; 
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true

export const loginRequest = (user) => {
    return dispatch => {
        return axios.post('/api/signin', user)
        .then( response => {loginSuccess(user.username)})
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
 
export function loginSuccess(username) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        username : username
    };
}
 
export function loginFailure(error) {
    return {
        type: actionTypes.LOGIN_FAILURE,
        error
    };
}