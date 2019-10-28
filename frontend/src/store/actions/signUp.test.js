import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './signUp';
import store from '../store';



const stubInitRegister = {
    status: 'INIT',
    error: -1
}

const stubRegister = {
    status: 'SUCCESS',
    error: -1
}

const stubErrorRegister = {
    status: 'FAILURE',
    error: 1
}


describe('ActionCreators : signup', () => {
    afterEach(() => {

      jest.clearAllMocks();
      const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { return () => {}; });
    }) 

    it(`'signUpRequest' should change register correctly`, (done) => {
        const push = jest.fn( ()=> {})
      
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
        jest.mock('connected-react-router',()=>{return}) 
        const spy = jest.spyOn(axios, 'post')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 201,
                data : stubUser
              };
              resolve(result);
            });
          })
    
        store.dispatch(actionCreators.signUpRequest()).then(() => {
          const newState = store.getState();
          expect(newState.user.register).toEqual(stubRegister);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });


      it(`'signUpRequest' Fail`, (done) => {
        const stubUser = {"username" : "TEST_USER", "password" : "password"}
    
        const spy = jest.spyOn(axios, 'post')
          .mockImplementation((url, user) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 400,
                response : { data : {code : 1}}
              };
              reject(result);
            });
          })
    
        store.dispatch(actionCreators.signUpRequest()).then(() => {
          const newState = store.getState();
          expect(newState.user.register).toEqual(stubErrorRegister);
          expect(spy).toHaveBeenCalledTimes(1);
          done();
        });
      });

    
 }
)