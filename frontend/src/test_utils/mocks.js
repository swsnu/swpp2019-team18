import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter} from 'connected-react-router';

import { history, middlewares } from '../store/store';
import * as actionTypes from '../store/actions/actionTypes';

const getMockUserReducer = jest.fn(
  initialState => (state = initialState, action) => { 
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
          /* log out */
          case actionTypes.LOGOUT:
            return {
              ...state,
              login : { status : 'INIT'},
              status : {
                ...state.status,
                isLoggedIn : false,
                currentUser : ''
              }
            }
          default:
            break;
        }
    return state;
  }
);

const getMockDiaryReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return {...state};

  }
);

export const getMockStore = (initialState) => {
  const mockUserReducer = getMockUserReducer(initialState);
  const mockDiaryReducer = getMockDiaryReducer(initialState);
  const rootReducer = combineReducers({
    diary : mockDiaryReducer,
    user : mockUserReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}

