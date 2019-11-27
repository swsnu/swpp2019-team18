import React from 'react';
import Logout from './Logout';
import {  mount } from 'enzyme';
import { Provider } from 'react-redux';
import {  ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../test_utils/mocks'
import { history } from '../store/store';
import * as actionCreators from '../store/actions/login';


const stubInitialState = {
};
  
const mockStore = getMockStore(stubInitialState);


describe('Logout', ()=> {
    let logout,spyUserLogout, spyAlert
    beforeEach(() => {
        logout = (
            <Provider store = {mockStore}>
                <ConnectedRouter history={history} >
                    <Logout/>
                 </ConnectedRouter>
                
            </Provider>
        )
        spyUserLogout = jest.spyOn(actionCreators, 'logoutRequest').mockImplementation(() => { return dispatch => {}; });
        spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { return () => {}; });
    }
    )
    afterEach(() => { jest.clearAllMocks() });
    


    it('correct username and password - login success' , () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        const component = mount(logout)
        const button = component.find('#logout button')
        button.simulate('click')
        
        expect(spyUserLogout).toBeCalledTimes(1)
        expect(spyHistoryPush).toBeCalledTimes(1)
    })
})