import React from 'react';
import { mount } from 'enzyme';
import { getMockStore } from './test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './store/store'

import PrivateRoute from './PrivateRoute';
import * as actionCreator from './store/actions/login';
import * as actionTypes from './store/actions/actionTypes';

const stubInitialState = {
    login : {
        status : 'SUCCESS'
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
}

const stubFailureState = {
    login : {
        status : 'FAILURE'
    }
    ,
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: ''
    }
}
let mockStore = getMockStore(stubInitialState); 
const mockContent = () => {return <div id = 'auth'>auth</div>}
const mockDefault = () => {return <div id = 'default'>default</div>}

describe('Private Route', () => {
    let privateRoute ,spyLoginCheckRequest;
    beforeEach(()=> {
        
          spyLoginCheckRequest = jest.spyOn(actionCreator, 'loginCheckRequest')
          .mockImplementation(()=> {return dispatch => {return <div> fail</div>}});
          
    });
    afterEach(() => { jest.clearAllMocks() });

    

    it('if there is no session information in browser, it should be in default page', () => {
        mockStore = getMockStore(stubFailureState); 
        privateRoute = 
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <PrivateRoute path='/auth' exact component={mockContent} />
                <PrivateRoute path='/' exact component={mockDefault} />
              </Switch>
              </ConnectedRouter>
            </Provider>
          
        const component = mount(privateRoute);
        const wrapper = component.find('#default')
        expect(spyLoginCheckRequest).toBeCalledTimes(1)
    })

    it('if there is a information in browser, it should be in auth page', () => {

        mockStore = getMockStore(stubInitialState); 
        privateRoute = 
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <PrivateRoute path='/auth' exact component={mockContent} />
                <PrivateRoute path='/' exact component={mockDefault} />
              </Switch>
              </ConnectedRouter>
            </Provider>
        const component = mount(privateRoute);
        expect(spyLoginCheckRequest).toBeCalledTimes(0);
    
    })


    



})


