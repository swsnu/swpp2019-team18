import React from 'react';
import {  mount } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import gardenDiary from './gardenDiary';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/gardendiary';

 jest.mock('../../component/Garden/Garden', () => {
    return jest.fn(props => {
        return (
            <div className = 'spyGarden'>
            
            </div>
        );
    })
})

const stubInitialState = {
   
    garden_diary : [{
        id: 1,
        category_name: "MOVIE",
        category_title: "title",
        content: '{"blocks":[{"key":"dl73i","text":"Do. Or do not. There is no try","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        flower_count: 1,
        flower_users: [{user : "user1"}],
        shared_date: "2019-12-25"
    }],
    category_name : 'MOVIE',
    status: {
        valid: false,
        isLoggedIn: true,
        currentUser: 'user1'   //username
    },
    gardenmode : 'ALL',        //ALL or CATEGORY or MYGARDEN or MYFLOWER


}

const mockStore = getMockStore(stubInitialState);

describe('<gardenDiary />', () => {
    let gardendiary, spyGetAllGardenDiary, spyGetGardenDiaryByCategory, spyGetMyGardenDiary, spyGetMyFlower;
    beforeEach(()=> {
     
        gardendiary = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={gardenDiary} />
              </Switch>
              </ConnectedRouter>
            </Provider>
          );
          spyGetAllGardenDiary = jest.spyOn(actionCreators, 'getAllGardenDiary')
          .mockImplementation(()=> {return dispatch => {}; });
          spyGetGardenDiaryByCategory= jest.spyOn(actionCreators, 'getGardenDiaryByCategory')
          .mockImplementation(()=> {return dispatch => {}; });
          spyGetMyGardenDiary = jest.spyOn(actionCreators, 'getMyGardenDiary')
          .mockImplementation(()=> {return dispatch => {}; });
          spyGetMyFlower = jest.spyOn(actionCreators, 'getMyFlower')
          .mockImplementation(()=> {return dispatch => {}; });
          
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render gardenDiary', () => {
        const component = mount(gardendiary);
        let wrapper = component.find('.GardenDiaryList');
        expect(wrapper.length).toBe(1);
        expect(spyGetAllGardenDiary).toHaveBeenCalledTimes(1);
        wrapper = component.find('#Popular_tab');
        wrapper.at(0).simulate('click');
        expect(spyGetAllGardenDiary).toHaveBeenCalledTimes(2);
    });

    it('mode category', () => {
        const mockInitialStore = getMockStore({...stubInitialState, gardenmode: 'CATEGORY' });
        const component = mount( 
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={gardenDiary} />
            </Switch>
            </ConnectedRouter>
          </Provider>);

        //const newInstance = component.find(gardenDiary.WrappedComponent).instance();
        const wrapper = component.find('#Popular_tab');
        wrapper.at(0).simulate('click');
        expect(spyGetGardenDiaryByCategory).toHaveBeenCalledTimes(2);
    });

    it('mode mygarden', () => {
        const mockInitialStore = getMockStore({...stubInitialState, gardenmode: 'MYGARDEN' });
        const component = mount( 
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={gardenDiary} />
            </Switch>
            </ConnectedRouter>
          </Provider>);

        //const newInstance = component.find(gardenDiary.WrappedComponent).instance();
        const wrapper = component.find('#Popular_tab');
        wrapper.at(0).simulate('click');
        expect(spyGetMyGardenDiary).toHaveBeenCalledTimes(2);
    });

    it('mode myflower', () => {
        const mockInitialStore = getMockStore({...stubInitialState, gardenmode: 'MYFLOWER' });
        const component = mount( 
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={gardenDiary} />
            </Switch>
            </ConnectedRouter>
          </Provider>);

        const wrapper = component.find('#Popular_tab');
        wrapper.at(0).simulate('click');
        expect(spyGetMyFlower).toHaveBeenCalledTimes(2);
        wrapper.at(0).simulate('click');
        expect(spyGetMyFlower).toHaveBeenCalledTimes(2);

    });

    it('should set state properly on input', () => {
      const mockInitialStore = getMockStore({...stubInitialState, garden_diary : [{
        id: 1,
        category_name: "MOVIE",
        category_title: "title",
        content: '{"blocks":[{"key":"dl73i","text":"Do. Or do not. There is no try","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        flower_count: 1,
        flower_users: [{user : "user1"}],
        shared_date: "2019-12-25"
    }] });
      const component = mount( 
        <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={gardenDiary} />
            </Switch>
            </ConnectedRouter>
        </Provider>);


      expect(component.find('#diary-search-input').length).toBe(2);
      const newState = component.find(gardenDiary.WrappedComponent).instance();
      const input = component.find('#diary-search-input');
      input.at(1).simulate('change', {
        target : {
          value : 'Do'
        }
      })
      input.at(1).simulate('keypress', {key: 'Enter'})
      expect(newState.state.search).toEqual('Do');
      expect(newState.state.keyword).toEqual('Do');
    })
})