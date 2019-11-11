import * as actionTypes from './actionTypes'
import axios from 'axios'
import { push } from 'connected-react-router';


export const loginRequest = (user) => {
    return dispatch => {
        dispatch(login());
        return axios.post('/api/signin/', user)
        .then( response => {
            dispatch(loginSuccess(response.id))
            dispatch(push('/diary'))
        })
        .catch(error => {
            dispatch(loginFailure())
            //alert('login fail')
        })
    }
}

export const loginCheckRequest = (user) => {
    return dispatch => {
        dispatch(login());
        
        return axios.get('/api/getuser/').then(
            response => {
                dispatch(loginSuccess(response.data.userID))
                console.log('login success')
            }
        )
        .catch(error => {
            dispatch(push('/login'))
            //dispatch(loginFailure())
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
            //alert('logout fail')
        })
    }
}

export function login() {
    return {
        type: actionTypes.LOGIN
    };
}
 
export function loginSuccess(id){
    
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userID : id
    };
}
 
export function loginFailure(error) {
    return {
        type: actionTypes.LOGIN_FAILURE,
    };
}