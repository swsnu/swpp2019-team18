import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import authentication from './store/reducers/users';
import * as actionTypes from './store/actions/actionTypes';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import * as actionCreators from './store/actions/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const rootReducer = combineReducers({
  /* in this case, we have only single reducer,
   * but we can merge reducers by using combineReducers for bigger project */
  user : authentication,
  router : connectRouter(history)
});

const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Middleware] Next State', store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk, routerMiddleware(history))));

ReactDOM.render(<Provider store={store}><App history = {history} /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
