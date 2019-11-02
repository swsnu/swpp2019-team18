import * as actionTypes from './actionTypes'
import axios from 'axios'
import { push } from 'connected-react-router';

export const signUpRequest = (newUser) => {
    return dispatch => {
        dispatch(register())
        return axios.post('/api/signup/', newUser)
        .then( response => {
            dispatch(signUpSuccess());
            dispatch(push('/login'));
        })
        .catch(error => {
            dispatch(signUpFailure(error.response.data.code));
            alert('Sign Up Fail')
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

