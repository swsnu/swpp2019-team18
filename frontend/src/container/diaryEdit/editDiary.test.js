import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import EditDiary from './editDiary';
import { Switch, Route } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import * as actionCreators from '../../store/actions/diary';
import { createStore, combineReducers } from 'redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as actionTypes from '../../store/actions/actionTypes';
import axios from 'axios';

const history = createBrowserHistory();

let stubInitialState = {};
let mockStore = getMockStore(stubInitialState);
let editDiary;
describe('<EditDiary/>', ()=> {
    beforeEach(() => {
        global.alert = jest.fn((x) => {})
        editDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <EditDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    afterEach(() => {
        afterEach(() => { jest.clearAllMocks() });
    })

    it('should render without error', ()=> {
        const component = mount(editDiary);
        const wrapper = component.find('#diary-submit-button');
        expect(wrapper.length).toBe(2);
    })

    it('should change title, content', () => {
        const component = shallow(<EditDiary.WrappedComponent history={history} store={mockStore}/>);
        const categoryWrapper = component.find('#diary-category-movie-button')
        categoryWrapper.simulate('click');
        const titleWrapper = component.find("#diary-category-title-input");
        const testTitle = "TEST_TITLE";
        titleWrapper.simulate('change', {target : {value: testTitle}});
        
        const contentWrapper = component.find("#diary-content-input");
        const testContent = "TEST_CONTENT";
        contentWrapper.at(0).simulate('change', {target : {value: testContent}});
    })

    it('should edit Diary without error', () => {
        axios.put = jest.fn(url => {
            return new Promise((resolve, reject) => {
                resolve({status : 201});
            })
          });

        const component = mount(editDiary)
        const categoryWrapper = component.find('#diary-category-movie-button')
        categoryWrapper.at(0).simulate('click');

        const titleWrapper = component.find("#diary-category-title-input");
        const testTitle = "TEST_TITLE";
        titleWrapper.at(0).simulate('change', {target : {value: testTitle}});
        
        const contentWrapper = component.find("#diary-content-input");
        const testContent = "TEST_CONTENT";
        contentWrapper.at(0).simulate('change', {target : {value: testContent}});
        const wrapper = component.find("#diary-submit-button");
        wrapper.at(0).simulate('click');
    })

    it('should set diary category', () => {
        const component = shallow(<EditDiary.WrappedComponent history={history} store={mockStore}/>);
        const movieWrapper = component.find("#diary-category-movie-button");
        movieWrapper.at(0).simulate('click');
        const peopleWrapper = component.find("#diary-category-people-button");
        peopleWrapper.at(0).simulate('click');
        const dateWrapper = component.find("#diary-category-date-button");
        dateWrapper.at(0).simulate('click');
        const travelWrapper = component.find("#diary-category-travel-button");
        travelWrapper.at(0).simulate('click');
        expect(component.state().buttons).toEqual([false, false, false, true])
    })

    it('should render addPeople Message', () => {
        stubInitialState = {
            allPeople : [{key : 1, id : 1, name: "민수"}],
        };
        mockStore = getMockStore(stubInitialState);
        let newPeople = [{key : 1, id : 3, name : "윤수"}, {key : 2, id : 4, name : "대현"}];
        actionCreators.getDiary = jest.fn(() => dispatch => dispatch({type : actionTypes.SEARCH_PEOPLE, allPeople : newPeople}));
        editDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <EditDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        mount(editDiary);

    })


    it('should get diary', () => {
        stubInitialState = {
            diary : {
                content: 'Do. Or do not. There is no try.',
                categoryName: 'MOVIE', 
                categoryTitle: 'Star Wars',
                emotionScore : 0,
                people : [],
                rating: 5,
            },
        };
        let stubDiary = {
            content : "제다이",
            categoryName : "MOVIE",
            categoryTitle : "스타워즈",
            people : [{key : 1, name : "윤수"}],
            rating : 0,
            emotionScore : 0,
        };

        let diaryReducer = (state=stubInitialState, action) => {
            if(action.type === actionTypes.GET_DIARY){
                return {...state, diary: action.diary} 
            }
            else{
                return {...state};
            }
        }

        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
                resolve({data : stubDiary});
            })
          });

        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        const rootReducer = combineReducers({
          diary : diaryReducer,
          router : connectRouter(history),
        });
        const newMockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));
        actionCreators.getDiary = jest.fn(() => dispatch => dispatch({type : "None"}));
        global.alert = jest.fn((x) => {})
        editDiary = (
            <Provider store={newMockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <EditDiary/>}/>    
                <Route path='/:id' exact render={() => <EditDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        mount(editDiary);
        
    })

})












