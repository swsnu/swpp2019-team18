import React from 'react';
import {  mount, shallow } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './sidebar';
import { history } from '../../store/store'
import moment from 'moment';


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
    day : '17',
    allPeople : [{name : 'John', id : 1}]

}

const mockStore = getMockStore(stubInitialState);
const time = moment();

describe('<MyDiaryList />', () => {
    let Sidebar_, spySetMode, spySetYear, spySetMonth, spySetDay
    beforeEach(()=> {
        Sidebar_ = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={Sidebar} />
                <Route path='/diary' exact component={Sidebar} />
                <Route path='/diary/create' exact component={Sidebar} />
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
        const newState = component.find(Sidebar.WrappedComponent).instance();
        expect(newState.monthFull()).toBe(time.format("MMMM"))
        expect(newState.year()).toBe(time.format("YYYY"))    
        expect(newState.month()).toBe(time.format("MMM"))
        expect(newState.monthNum()).toBe(time.format("MM"))
        expect(newState.currentDay()).toBe(time.format("D"))
    });

    it('peson mode change by click button', () => {
        const component = mount(Sidebar_);
        const buttons = component.find('#tag_person');
        buttons.at(1).simulate('click');
        const newState = component.find(Sidebar.WrappedComponent).instance();
        expect(spySetMode).toBeCalledTimes(1);
        expect(newState.state.mode).toBe("PERSON");
        const button = component.find('#John a');
        button.simulate('click');
        expect(newState.state.selectedPersonId).toBe(1);
    });

    it('categoty mode change by click button', () => {
        const component = mount(Sidebar_);
        
        const buttons = component.find('#tag_category');
        buttons.at(1).simulate('click');
        expect(spySetMode).toBeCalledTimes(1);
        const newState = component.find(Sidebar.WrappedComponent).instance();
        expect(newState.state.mode).toBe("CATEGORY");
        const button = component.find('#MOVIE a');
        button.simulate('click');
        expect(newState.state.selectedCategory).toBe("MOVIE");


    });

    it('calendar mode change by click button', () => {
        const component = mount(Sidebar_);
        const buttons = component.find('#tag_calendar');
        buttons.at(1).simulate('click');
        expect(spySetMode).toBeCalledTimes(1);
    });

    it('date change by click button', () => {
        
        const component = mount(Sidebar_);
        const buttons = component.find('#day_20 a');
        buttons.simulate('click');
        expect(spySetYear).toBeCalledTimes(2);
        expect(spySetMonth).toBeCalledTimes(2);
        expect(spySetDay).toBeCalledTimes(2);
     })

    it('month change by click', () =>{
        const component = mount(Sidebar_);
        const wrapper = component.find('#label_month');
        expect(wrapper.length).toBe(2);
        /*const newState = component.find(Sidebar.WrappedComponent).instance();
        expect(newState.state.mode).toBe("CALENDAR");*/
    })

    it('year change by click', () => {
        const component = mount(Sidebar_);
        const wrapper = component.find('#label_year');
        expect(wrapper.length).toBe(2);
    })
    
    it('click to create click', () => {
        const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(path => {});
        const component = mount(Sidebar_);
        const button = component.find('#tag_create');
        button.at(0).simulate('click')
        history.replace('/diary/create')
        expect(spyHistoryPush).toBeCalledTimes(1)
        const buttons = component.find('#day_1 a');
        buttons.simulate('click');
        expect(spyHistoryPush).toBeCalledTimes(2)
    })
    
})