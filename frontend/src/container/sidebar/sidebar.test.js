import React from 'react';
import {  mount, shallow } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './sidebar';
import { history } from '../../store/store'

import * as actionCreators from '../../store/actions/sidabar';



const stubInitialState = {
    diary_list : [],
    garden_list : [],
    selectedDiary : [{
                    'id' : 1,
                    'author': 1,
                    'content': 'Do. Or do not. There is no try.',
                    'categoryName': 'MOVIE',
                    'categoryTitle': 'Star Wars',
                    'emotionScore' : 0,
                    'people' : [],
                    'rating': 5,
                    'created_date': null,
                    'modified_date': null
                }],
    mode : 'CALENDAR',
    year : '2019',
    month : '11',
    day : '17'
}

const mockStore = getMockStore(stubInitialState);

describe('<MyDiaryList />', () => {
    let Sidebar_, spySetMode, spySetYear, spySetMonth, spySetDay
    beforeEach(()=> {
        Sidebar_ = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={Sidebar} />
              </Switch>
              </ConnectedRouter>
            </Provider>
          );
          
          spySetMode = jest.spyOn(actionCreators, 'setMode').mockImplementation(() => { return dispatch => {}; });
          spySetYear = jest.spyOn(actionCreators, 'setYear').mockImplementation(() => { return dispatch => {}; });
          spySetMonth = jest.spyOn(actionCreators, 'setMonth').mockImplementation(() => { return dispatch => {}; });
          spySetDay = jest.spyOn(actionCreators, 'setDay').mockImplementation(() => { return dispatch => {}; });

    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render sidebar', () => {
        const component = mount(Sidebar_);
        const wrapper = component.find('.sidebar_container');
        expect(wrapper.length).toBe(1);
    });

    it('mode change by click button', () => {
        const component = mount(Sidebar_);
        const buttons = component.find('button');
        buttons.at(1).simulate('click');
        expect(spySetMode).toBeCalledTimes(1);
    });

    it('date change by click button', () => {
        const component = mount(Sidebar_);
        const buttons = component.find('.day');
        buttons.at(20).simulate('click');
        expect(spySetYear).toBeCalledTimes(1);
        expect(spySetMonth).toBeCalledTimes(1);
        expect(spySetDay).toBeCalledTimes(1);

    })

    it('month change by click', () =>{
        const component = mount(Sidebar_);
        const wrapper = component.find('.label_month');
        expect(wrapper.length).toBe(1);
        const newState = coponent.find(Sidebar.WrappedComponent).instance();
        
    })
    
    /*it(`mode CALENDAR should call onGetDiaryByDate`, () => {
        const mockInitialStore = getMockStore({...stubInitialState, mode: 'CALENDAR' });
        mount(
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={MyDiaryList} />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        expect(actionCreators.getDiaryByDate).toHaveBeenCalledTimes(1);
    });
    it(`mode CATEGORY should call onGetDiaryByCategory`, () => {
        const mockInitialStore = getMockStore({...stubInitialState, mode : 'CATEGORY' });
        mount(
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={MyDiaryList} />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        expect(actionCreators.getDiaryByCategory).toHaveBeenCalledTimes(1);
    });*/


})