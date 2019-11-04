import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import NewDiary from './newDiary';
import { history } from '../../store/store';
import { Switch, Route } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
let stubInitialState = {
};
let mockStore = getMockStore(stubInitialState);

let newDiary = (
    <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
        <Route path='/' exact render={() => <NewDiary/>}/>    
        </Switch>
        </ConnectedRouter>
    </Provider>
);

axios.post = jest.fn(url => {
    return new Promise((resolve, reject) => {
      const result = {
        status: 200,
  };
      resolve(result);
    })
  });

axios.get = jest.fn(url => {
    return new Promise((resolve, reject) => {
        const result = {
        status: 200, allPeople : []
    };
        resolve(result);
    })
});

describe('<New Diary/>', ()=> {
    beforeEach(() => {
    })

    it('should render without error', ()=> {
        const component = mount(newDiary);
        const wrapper = component.find('#diary-submit-button');
        expect(wrapper.length).toBe(2);
    })

    it('should render addPeople Message', () => {
        const myInitialState = {
            allPeople : [{key : 1, id : 1}],
        };
        const newMockStore = getMockStore(myInitialState);
        history.push('/');
        const myNewDiary = (
            <Provider store={newMockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary);
        const wrapper = component.find('#add-people-trigger-button');
        wrapper.at(0).simulate('click');
        const submitWrapper = component.find('#add-person-submit-button');
        submitWrapper.at(0).simulate('click');
    })

    it('should change title, content', () => {
        const component = shallow(<NewDiary.WrappedComponent history={history} store={mockStore}/>);
        const categoryWrapper = component.find('#diary-category-movie-button')
        categoryWrapper.simulate('click');
        const titleWrapper = component.find("#diary-category-title-input");
        const testTitle = "TEST_TITLE";
        titleWrapper.simulate('change', {target : {value: testTitle}});

        
        const contentWrapper = component.find("#diary-content-input");
        const testContent = "TEST_CONTENT";
        contentWrapper.at(0).simulate('change', {target : {value: testContent}});
    })

    it('should create new Diary without error', () => {
        const component = mount(newDiary)
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
        const component = shallow(<NewDiary.WrappedComponent history={history} store={mockStore}/>);
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

    


})