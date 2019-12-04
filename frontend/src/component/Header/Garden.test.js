import React from 'react';
import Garden from './Garden'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import {  ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import { history } from '../../store/store';

const stubInitialState = {
};
  
const mockStore = getMockStore(stubInitialState);



describe('<Garden />', () => {
    let garden;
    beforeEach(() => {
        garden = (
            <Provider store = {mockStore}>
                <ConnectedRouter history={history} >
                    <Garden />
                 </ConnectedRouter>            
            </Provider>
        )
    })
    
    afterEach(() => { jest.clearAllMocks() });

    it('should handle clicks',() => {
        const component = mount(garden);
        const button = component.find('.header_menu')
        const spyHistoryPush = jest.spyOn(history, 'push')

        button.simulate('click');
        expect(spyHistoryPush).toBeCalledTimes(1);        
    })
})
