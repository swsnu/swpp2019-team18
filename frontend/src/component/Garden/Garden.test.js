import React, {Component} from 'react';
import { mount, shallow } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../store/store'

import Garden from './Garden';

import * as actionCreator from '../../store/actions/gardendiary';
import * as actionCreator2 from '../../store/actions/login'

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
            currentUser: 'user'   //username
        },
    
}

const mockStore = getMockStore(stubInitialState); 

describe('<Garden />', ()=>{
    let garden, spyGiveFlower, spyDeleteGardenDiary, spyLoginCheckRequest;
    beforeEach(()=> {
        garden = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
        <Route path='/' render={(props) => <Garden {...props}   shared_date={'2019-12-25'}
                                                                category_name = {"MOVIE"}
                                                                category_title= {"title"}
                                                                content = {"content"}
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
          spyLoginCheckRequest = jest.spyOn(actionCreator2, 'loginCheckRequest')
          .mockImplementation(()=> {return dispatch => {}; });
          
          
    });
    afterEach(() => { jest.clearAllMocks() });

    
    it('should render without errors', () => {

        const component = mount(garden);
        const wrapper = component.find('div.gardenDiaryDetail');
        expect(wrapper.length).toBe(1);
    });
    fit('should popup diary when active is true', () => {
        const component = mount(garden);
        const newInstance = component.find(Garden.WrappedComponent).instance();
        newInstance.setState({active : true});
        console.log(component.debug());
        let wrapper = component.find('.test');
        expect(wrapper.length).toBe(1);

    });
   

})