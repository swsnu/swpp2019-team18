import React from 'react';
import SignUp from './SignUp';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import {withRouter} from 'react-router'
import { getMockStore } from '../../test_utils/mocks'
import { createBrowserHistory } from 'history';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/signUp';
import * as actionTypes from '../../store/actions/actionTypes'




const stubInitialState = {
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
  
const mockStore = getMockStore(stubInitialState);


describe('SignUp', ()=> {
    let signup, spySignUp, spyAlert, spySignUpSuccess
    beforeEach(() => {
        history.replace('/signup')
        signup = (
          <Provider store={mockStore}>
                <ConnectedRouter history={history} >
                    <Switch>
                    <Route path='/' exact component = {SignUp}/>
                    <Route path='/signup' exact component = {SignUp}/>

                    </Switch>
            </ConnectedRouter>
          </Provider>
        );


        spySignUp = jest.spyOn(actionCreators, 'signUpRequest').mockImplementation(() => { return dispatch => {}; });
        spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { return () => {}; });
    }
    )
    afterEach(() => { jest.clearAllMocks() });
    


    it('Fill nothing' , () => {
        const component = mount(signup);
        const button = component.find('#signup button');
        button.simulate('click');
        expect(spySignUp).toBeCalledTimes(0);
        expect(spyAlert).toBeCalledTimes(1);
    })

    it('Fill wrong email' , () => {
       
        const component = mount(signup);
        const usernameForm = component.find('#signup-username-input input')
        const passwordForm = component.find('#signup-password-input input')
        const passwordCheckForm = component.find('#signup-password-check-input input')
        const emailForm = component.find('#signup-email-input input')
        const nicknameForm = component.find('#signup-nickname-input input')
        usernameForm.simulate('change', {target : {value : 'testuser'}})
        passwordForm.simulate('change', {target : {value : 'testpassword'}})
        passwordCheckForm.simulate('change', {target : {value : 'testpassword'}})
        emailForm.simulate('change', {target : {value : 'wrong email'}})
        nicknameForm.simulate('change', {target : {value : 'testnickname'}})
        const button = component.find('#signup button')
        button.simulate('click')
        expect(spySignUp).toBeCalledTimes(0)
        expect(spyAlert).toBeCalledTimes(1);
    })

    it('Password check fail' , () => {
       
        const component = mount(signup);
        const usernameForm = component.find('#signup-username-input input')
        const passwordForm = component.find('#signup-password-input input')
        const passwordCheckForm = component.find('#signup-password-check-input input')
        const emailForm = component.find('#signup-email-input input')
        const nicknameForm = component.find('#signup-nickname-input input')
        usernameForm.simulate('change', {target : {value : 'testuser'}})
        passwordForm.simulate('change', {target : {value : 'testpassword'}})
        passwordCheckForm.simulate('change', {target : {value : 'testwrongpassword'}})
        emailForm.simulate('change', {target : {value : 'test@test.com'}})
        nicknameForm.simulate('change', {target : {value : 'testnickname'}})
        const button = component.find('#signup button')
        button.simulate('click')
        expect(spySignUp).toBeCalledTimes(0)
        expect(spyAlert).toBeCalledTimes(1);
    })
    it('signup success' , async () => {

        const component = mount(signup);
        const usernameForm = component.find('#signup-username-input input')
        const passwordForm = component.find('#signup-password-input input')
        const passwordCheckForm = component.find('#signup-password-check-input input')
        const emailForm = component.find('#signup-email-input input')
        const nicknameForm = component.find('#signup-nickname-input input')
        usernameForm.simulate('change', {target : {value : 'testuser'}})
        passwordForm.simulate('change', {target : {value : 'testpassword'}})
        passwordCheckForm.simulate('change', {target : {value : 'testpassword'}})
        emailForm.simulate('change', {target : {value : 'test@test.com'}})
        nicknameForm.simulate('change', {target : {value : 'testnickname'}})
        const button = component.find('#signup button')
        button.simulate('click')
        expect(spySignUp).toBeCalledTimes(1)
        expect(spyAlert).toBeCalledTimes(0);
    })
})