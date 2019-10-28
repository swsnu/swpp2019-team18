import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import DiaryReducer from './reducers/diary';

export const history = createBrowserHistory();
const rootReducer = combineReducers({
    diary : DiaryReducer, router: connectRouter(history)
});

export const logger = store => next => action => {
    // console.log("[MiddleWare] Dispatching", action);
    const result = next(action);
    // console.log("[MiddleWare] Next State", store.getState());
    return result; 
}

const store = createStore(rootReducer, applyMiddleware(logger, thunk, routerMiddleware(history)));

export default store; 