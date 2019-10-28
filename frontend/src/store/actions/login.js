import * as actionTypes from './actionTypes'
import axios from 'axios'


export const loginRequest = (user) => {
    return dispatch => {
        dispatch(login());
        return axios.post('/api/signin/', user)
        .then( response => {
            dispatch(loginSuccess(user.username))
            //dispatch(push('./diary))
        })
        .catch(error => {
            dispatch(loginFailure())
            alert('login fail')
        })
    }
}

export const logoutRequest = () => {
    return dispatch => {
        return axios.get('/api/signout/')
        .then( response => {
            dispatch({
                type : actionTypes.LOGOUT
            })
        })
        .catch(error => {
            alert('logout fail')
        })
    }
}



export function login() {
    return {
        type: actionTypes.LOGIN
    };
}
 
export function loginSuccess(username){
    
    return {
        type: actionTypes.LOGIN_SUCCESS,
        username : username
    };
}
 
export function loginFailure(error) {
    return {
        type: actionTypes.LOGIN_FAILURE,
    };
}