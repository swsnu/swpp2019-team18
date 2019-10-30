
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import DiaryReducer from './reducers/diary';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';                   

import authentication from './reducers/users'

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    user : authentication,
    diary : DiaryReducer, 
    router: connectRouter(history),
});

export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(...middlewares)));

export default store; 
