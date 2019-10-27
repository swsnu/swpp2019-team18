import * as actionTypes from '../actions/actionTypes'

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
    /* sing-up */
      case actionTypes.SIGN_UP:
        return {
          ...state,
          register: {
            status: 'WAITING',
            error: -1
          }
        }
      case actionTypes.SIGN_UP_SUCCESS:
        return {
          ...state,
          register: {
            ...state.register,
            status: 'SUCCESS'
          }
        }
      case actionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          register:{
            status: 'FAILURE',
            error: action.error
          }
        }
        /* login */
      case  actionTypes.LOGIN:
        return {
          ...state,
          login : {
            status: 'WAITING'
          }
        }
    case actionTypes.LOGIN_SUCCESS:
       console.log('login success')
        return {
          ...state,
          login: {
              status: 'SUCCESS'
          },
          status: {
            ...state.status,
            isLoggedIn: true,
            currentUser: action.username
          }
        }
    case actionTypes.LOGIN_FAILURE:
        return {
          ...state,
          login:{
            status: 'FAILURE'
          }
        }
      default:
        break;
    }
    return state
    
  };

  export default reducer;
  


