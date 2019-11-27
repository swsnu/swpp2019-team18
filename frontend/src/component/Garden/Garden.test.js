import React, {Component} from 'react';
import { mount, shallow } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../store/store'

import Garden from './Garden';

import * as actionCreator from '../../store/actions/gardendiary';

const stubInitialState = {
   
        garden_diary : [{
            id: 1,
            category_name: "MOVIE",
            category_title: "title",
            content: "content",
            flower_count: 1,
            flower_users: ["user1"],
            shared_date: "2019-12-25"
        }],
        gardenmode : 'ALL',        //ALL or CATEGORY or MYGARDEN or MYFLOWER
        category_name : 'PEOPLE',
        status: {
            valid: false,
            isLoggedIn: true,
            currentUser: 'user1'   //username
        },
    
}

const mockStore = getMockStore(stubInitialState); 

describe('<Garden />', ()=>{
    let garden, spyGiveFlower, spyDeleteGardenDiary;
    beforeEach(()=> {
        garden = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
        <Route path='/' render={(props) => <Garden {...props}   shared_date={'2019-12-25'}
                                                                category_name = {"MOVIE"}
                                                                category_title= {"title"}
                                                                content = {"content"}
                                                                author = {'user1'}
                                                                flower_count = {1}
                                                                flower_users = {["user1"]}
                                                                 /> } />
              </Switch>
              </ConnectedRouter>
            </Provider>
          );
          spyGiveFlower = jest.spyOn(actionCreator, 'giveFlower')
          .mockImplementation(()=> {return dispatch => {}; });
          spyDeleteGardenDiary = jest.spyOn(actionCreator, 'deleteGardenDiary')
          .mockImplementation(()=> {return dispatch => {}; });
          
          
    });
    afterEach(() => { jest.clearAllMocks() });

    
    it('should render without errors', () => {

        const component = mount(garden);
        const wrapper = component.find('div.gardenDiaryDetail');
        expect(wrapper.length).toBe(1);


    });
    it('should popup diary when active is true', () => {
        const component = mount(garden);
        let wrapper = component.find('.popup');
        expect(wrapper.length).toBe(0);
        const newInstance = component.find(Garden.WrappedComponent).instance();
        newInstance.setState({active : true});
        component.update();
        wrapper = component.find('.popup');
        expect(wrapper.length).toBe(1);

    });
    it('should appear delete button if currentuser = author', () => {
        let component = mount(garden);
        const newInstance = component.find(Garden.WrappedComponent).instance();
        newInstance.setState({active : true});
        component.update();
        let wrapper = component.find('#garden_delete_button');
        expect(wrapper.length).toBe(2);
        wrapper.at(0).simulate('click');
        expect(spyDeleteGardenDiary).toHaveBeenCalledTimes(1);
        const mockInitialStore = getMockStore({...stubInitialState, status: {currentUser : 'user2'} });
        component = mount(
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' render={(props) => <Garden {...props}   shared_date={'2019-12-25'}
                                                                category_name = {"MOVIE"}
                                                                category_title= {"title"}
                                                                content = {"content"}
                                                                author = {'user1'}
                                                                flower_count = {1}
                                                                flower_users = {["user1"]}
                                                                 /> } />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        const newInstance2 = component.find(Garden.WrappedComponent).instance();
        newInstance2.setState({active : true});
        component.update();
        wrapper = component.find('.card');
        expect(wrapper.length).toBe(0);

    })

    it('should call giveflower when click flower_button', () => {
        let component = mount(garden);
        let newInstance = component.find(Garden.WrappedComponent).instance();
        newInstance.setState({active : true});
        component.update();
        let wrapper = component.find('#flower_button_red');
        expect(wrapper.length).toBe(2);
        wrapper.at(0).simulate('click');
        expect(spyGiveFlower).toHaveBeenCalledTimes(1);
        const mockInitialStore = getMockStore({...stubInitialState, status: {currentUser : 'user2'} });
        component = mount(
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' render={(props) => <Garden {...props}   shared_date={'2019-12-25'}
                                                                category_name = {"MOVIE"}
                                                                category_title= {"title"}
                                                                content = {"content"}
                                                                author = {'user1'}
                                                                flower_count = {1}
                                                                flower_users = {["user1"]}
                                                                 /> } />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        newInstance = component.find(Garden.WrappedComponent).instance();
        newInstance.setState({active : true});
        component.update();
        wrapper = component.find('#flower_button_grey');
        wrapper.at(0).simulate('click');
        expect(spyGiveFlower).toHaveBeenCalledTimes(2);
    })
   it('should become active state when click garden_detail_button', () => {
    const component = mount(garden);
    const newInstance = component.find(Garden.WrappedComponent).instance();
    expect(newInstance.state.active).toEqual(false);
    const wrapper = component.find('.card');
    wrapper.at(0).simulate('click');
    expect(newInstance.state.active).toEqual(true);
   })
   it('should category_title label exist', () => {
    let component = mount(garden);
    let newInstance = component.find(Garden.WrappedComponent).instance();
    newInstance.setState({active : true});
    component.update();
    let wrapper = component.find('#category_title');
    expect(wrapper.length).toBe(2);
    const mockInitialStore = getMockStore({...stubInitialState, status: {currentUser : 'user2'} });
        component = mount(
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' render={(props) => <Garden {...props}   shared_date={'2019-12-25'}
                                                                category_name = {"MOVIE"}
                                                                content = {"content"}
                                                                author = {'user1'}
                                                                flower_count = {1}
                                                                flower_users = {["user1"]}
                                                                 /> } />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        expect(wrapper.length).toBe(2);

   })


})