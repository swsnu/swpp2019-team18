import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './login';
import store from '../store';

const stubStatus =  {
    valid: false,
    isLoggedIn: true,
    currentUser: 'TEST_USER'
}

const stubLogin = {
    status: 'SUCCESS'
}

const stubErrorStatus =  {
    valid: false,
    isLoggedIn: false,
    currentUser: ''
}

const stubErrorLogin = {
    status: 'FAILURE'
}

const stubStatusLogout =  {
    valid: false,
    isLoggedIn: false,
    currentUser: ''
}

const stubInitLogin = {
    status: 'INIT'
}

describe('ActionCreators : login', () => {
    afterEach(() => {

      jest.clearAllMocks();
      const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { return () => {}; });
    }) 

    it(`'loginRequest' should change login status and user status correctly`, (done) => {
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
    
        const spy = jest.spyOn(axios, 'post')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 201,
                data : stubUser
              };
              const result_fail = {
                  status : 400,
                  data : 'test'
              };
              resolve(result);
              reject(result_fail);
            });
          })
    
        store.dispatch(actionCreators.loginRequest(stubUser)).then(() => {
          const newState = store.getState();
          expect(newState.user.login).toEqual(stubLogin);
          expect(newState.user.status).toEqual(stubStatus);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

      it(`'loginCheckRequest' should change login status and user status correctly`, (done) => {
        const stubUser = {"username" : "TEST_USER"}
    
        const spy = jest.spyOn(axios, 'get')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data : stubUser
              };
              resolve(result);
              reject(result_fail);
            });
          })
    
        store.dispatch(actionCreators.loginCheckRequest()).then(() => {
          const newState = store.getState();
          expect(newState.user.login).toEqual(stubLogin);
          expect(newState.user.status).toEqual(stubStatus);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });


      it(`'logoutRequest' should change login status and user status correctly`, (done) => {
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
    
        const spy = jest.spyOn(axios, 'get')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 201,
              };
              const result_fail = {
                  status : 400,
                  data : 'test'
              };
              resolve(result);
              reject(result_fail);
            });
          })
    
        store.dispatch(actionCreators.logoutRequest()).then(() => {
          const newState = store.getState();
          expect(newState.user.login).toEqual(stubInitLogin);
          expect(newState.user.status).toEqual(stubErrorStatus);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

      it(`'loginRequest' Fail`, (done) => {
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
    
        const spy = jest.spyOn(axios, 'post')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 400,
              };
              reject(result);
            });
          })
    
        store.dispatch(actionCreators.loginRequest()).then(() => {
          const newState = store.getState();
          expect(newState.user.login).toEqual(stubErrorLogin);
          expect(newState.user.status).toEqual(stubErrorStatus);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

      it(`'loginCheckRequest' Fail`, (done) => {
    
        const spy = jest.spyOn(axios, 'get')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 400,
              };
              reject(result);
            });
          })
    
        store.dispatch(actionCreators.loginCheckRequest()).then(() => {
          const newState = store.getState();
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

      it(`'logoutRequest' Fail`, (done) => {
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
    
        const spy = jest.spyOn(axios, 'get')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 400,
              };
              reject(result);
            });
          })
    
        store.dispatch(actionCreators.logoutRequest()).then(() => {
          const newState = store.getState();
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });
 }
)