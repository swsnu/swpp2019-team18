import * as actionTypes from './actionTypes'
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios'

export const signUpRequest = (newUser) => {
    return dispatch => {
        return axios.post('/api/signup', newUser)
        .then( response => {dispatch(signUpSuccess())})
        .catch(error => {
            dispatch(signUpFailure(error.response.data.code))
        })
    }
}

export function register() {
    return {
        type: actionTypes.SIGN_UP
    };
}
 
export function signUpSuccess() {
    return {
        type: actionTypes.SIGN_UP_SUCCESS
    };
}
 
export function signUpFailure(error) {
    return {
        type: actionTypes.SIGN_UP_FAILURE,
        error
    };
}

