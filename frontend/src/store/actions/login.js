import * as actionTypes from './actionTypes'
import axios from 'axios'

export const loginRequest = (user) => {
    return dispatch => {
        return axios.post('/api/signin', user)
        .then( response => {
            console.log(response.headers)
            console.log(typeof response.headers)
            
            dispatch(loginSuccess(user.username))})
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
 
export function loginSuccess(username){
    console.log('loginsuccess')
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