import React from 'react';
import Logo from './Logo'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import {  ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import { history } from '../../store/store';

const stubInitialState = {
};
  
const mockStore = getMockStore(stubInitialState);



describe('<Logo />', () => {
    let logo;
    beforeEach(() => {
        logo = (
            <Provider store = {mockStore}>
                <ConnectedRouter history={history} >
                    <Logo />
                 </ConnectedRouter>            
            </Provider>
        )
    })
    
    afterEach(() => { jest.clearAllMocks() });

    it('should handle clicks',() => {
        const component = mount(logo);
        const button = component.find('.logo')
        const spyHistoryPush = jest.spyOn(history, 'push')
        
        button.at(1).simulate('click');
        expect(spyHistoryPush).toBeCalledTimes(1);
        /*expect(button.length()).toEqual(1);*/
    })
})
