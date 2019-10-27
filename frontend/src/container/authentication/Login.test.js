import React from 'react';
import Login from './Login';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test_utils/mocks'
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/login';


const stubInitialState = {
};
  
const mockStore = getMockStore(stubInitialState);


describe('Login', ()=> {
    let login, spyUserLogin
    beforeEach(() => {
        history.replace('/login')
        login = (
          <Provider store={mockStore}>
                <ConnectedRouter history={history} >
                    <Switch>
                    <Route path='/' exact component = {Login}/>
                    <Route path='/login' exact component = {Login}/>

                    </Switch>
            </ConnectedRouter>
          </Provider>
        );

        spyUserLogin = jest.spyOn(actionCreators, 'loginRequest').mockImplementation(() => { return dispatch => {}; });
    }
    )
    afterEach(() => { jest.clearAllMocks() });
    


    it('correct username and password - login success' , () => {
        const component = mount(login)
        const usernameForm = component.find('#login-username-input input')
        const passwordForm = component.find('#login-password-input input')
        const button = component.find('#login button')
        usernameForm.simulate('change', {target : {value : 'testuser'}})
        passwordForm.simulate('change', {target : {value : 'testpassword'}})
        button.simulate('click')
        expect(spyUserLogin).toBeCalledTimes(1)
    })

    it('move to signup page' , () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
        const component = mount(login)
        const button = component.find('#sign-up')
        button.simulate('click')
        expect(spyHistoryPush).toBeCalledTimes(1)
    })
})