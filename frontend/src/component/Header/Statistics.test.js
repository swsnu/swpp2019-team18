import React from 'react';
import Statistics from './Statistic'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import {  ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import { history } from '../../store/store';

const stubInitialState = {
};
  
const mockStore = getMockStore(stubInitialState);



describe('<Garden />', () => {
    let statistics;
    beforeEach(() => {
        statistics = (
            <Provider store = {mockStore}>
                <ConnectedRouter history={history} >
                    <Statistics />
                 </ConnectedRouter>            
            </Provider>
        )
    })
    
    afterEach(() => { jest.clearAllMocks() });

    it('should handle clicks',() => {
        const component = mount(statistics);
        const button = component.find('.header_menu')
        const spyHistoryPush = jest.spyOn(history, 'push')

        button.simulate('click');
        expect(spyHistoryPush).toBeCalledTimes(1);        
    })
})
