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
        let tempwrapper = component.find('#diary-category-button-1');
        tempwrapper.at(0).simulate('click');
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
        let wrapper = component.find('#diary-category-button-1');
        wrapper.at(0).simulate('click');
        wrapper = component.find('#add-people-trigger-button');
        wrapper.at(0).simulate('click');
        
        const submitWrapper = component.find('#add-person-submit-button');
        submitWrapper.at(0).simulate('click');
    })

    it('should change title, content', () => {
        const myNewDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary);
        const categoryWrapper = component.find('#diary-category-button-1');
        categoryWrapper.at(0).simulate('click');
        const titleWrapper = component.find("#diary-category-title-input input");
        const testTitle = "TEST_TITLE";
        titleWrapper.simulate('change', {target : {value: testTitle}});

    
    })

    it('should create new Diary without error', () => {
        const component = mount(newDiary)
        const categoryWrapper = component.find('#diary-category-button-1')
        categoryWrapper.at(0).simulate('click');

        const titleWrapper = component.find("#diary-category-title-input input");
        const testTitle = "TEST_TITLE";
        titleWrapper.simulate('change', {target : {value: testTitle}});
        const titleConfirmWrapper = component.find('#title-confirm-button button')
        titleConfirmWrapper.simulate('click')
        
        const wrapper = component.find("#diary-submit-button");
        wrapper.at(0).simulate('click');
    })

    it('should set diary category', () => {
        history.push('/');
        const myNewDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary)
        let categoryWrapper = component.find('#diary-category-button-1')
        categoryWrapper.at(0).simulate('click');
        categoryWrapper = component.find('#change-category-button button')
        categoryWrapper.simulate('click');

        
    })

    it('should chagne category title', () => {
        history.push('/');
        const myNewDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary)
        let categoryWrapper = component.find('#diary-category-button-1')
        categoryWrapper.at(0).simulate('click');
        const titleWrapper = component.find("#diary-category-title-input input");
        const testTitle = "TEST_TITLE";
        titleWrapper.simulate('change', {target : {value: testTitle}});
        const ratingWrapper = component.find('#category-rating');
        ratingWrapper.at(1).simulate('click')
        const titleConfirmWrapper = component.find('#title-confirm-button button')
        titleConfirmWrapper.simulate('click')
        categoryWrapper = component.find('#category-label')
        categoryWrapper.at(0).simulate('click');


        
    })

    it('should handle type3 category', () => {
        history.push('/');
        const myNewDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary)
        let categoryWrapper = component.find('#diary-category-button-3')
        console.log(categoryWrapper.length)
        categoryWrapper.at(0).simulate('click');        
    })

    it('should handle type2 category', () => {
        history.push('/');
        const myNewDiary = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' exact render={() => <NewDiary/>}/>    
                </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(myNewDiary)
        let categoryWrapper = component.find('#diary-category-button-2')
        console.log(categoryWrapper.length)
        categoryWrapper.at(0).simulate('click');        
    })



    


})