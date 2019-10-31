import React from 'react';
import { shallow, mount } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../store/store'

import Diary from './Diary';

import * as actionCreator1 from '../../store/actions/diary';
import * as actionCreator2 from '../../store/actions/share';

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
    mode : 'PERSON'           //'PERSON' or 'CATEGORY'
}

const mockStore = getMockStore(stubInitialState); 

describe('<Diary/>', ()=>{
    let diaryDetail, spyDeleteDiary, spyShareDiary;
    beforeEach(()=> {
        diaryDetail = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={Diary} />
              </Switch>
              </ConnectedRouter>
            </Provider>
          );
          spyDeleteDiary = jest.spyOn(actionCreator1, 'deleteDiary')
          .mockImplementation(()=> {return dispatch => {}; });
          spyShareDiary = jest.spyOn(actionCreator2, 'shareDiary')
          .mockImplementation(()=> {return dispatch => {}; });
          
    });
    afterEach(() => { jest.clearAllMocks() });

    
    it('should render without errors', () => {
        const component = mount(diaryDetail);
        const wrapper = component.find('.diaryDetail');
        expect(wrapper.length).toBe(1);
    })
    
    // it('should personTag is shown', () => {
    //     const component = mount(diaryDetail);
    //     print(component.state.person_tag)
    //     let wrapper = component.find('.personTag');
    //     expect(wrapper.length).toBe(1);
      
    // })
    // it('should category_title is shown', () => {
    //     const component = mount(diaryDetail);
    //     component.setProps({category_title : 'MOVIE'})
    //     let wrapper = component.find('.category_title');
    //     expect(wrapper.length).toBe(1);
     
    // })
    // it('should rating is shown', () => {
    //     const component = mount(diaryDetail);
    //     let wrapper = component.find('.rating');
    //     expect(wrapper.length).toBe(1);
     
    // })

    it('toggle menu', () => {
        let spyWindow = jest.spyOn(window, 'prompt')
        .mockImplementation(()=> {return "share content"});

        const component = mount(diaryDetail);
        let wrapper = component.find('.menu-button');
        wrapper.at(0).simulate('click');
        // wrapper = component.find('.toggleMenu');
        // expect(wrapper.length).toBe(1);

        wrapper = component.find('#share-button');
        wrapper.at(0).simulate('click');
        expect(spyShareDiary).toHaveBeenCalledTimes(1);

        spyWindow = jest.spyOn(window, 'confirm')
        .mockImplementation(()=> {return true});

        wrapper = component.find('#delete-button');
        wrapper.at(0).simulate('click');
        expect(spyDeleteDiary).toHaveBeenCalledTimes(1);

        const spyHistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        wrapper = component.find('#edit-button');
        wrapper.at(0).simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    if("componentDidUpdate should update ", () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        const component = mount(diaryDetail);
        expect(spyHistoryPush).toHaveBeenCalledTimes(0);
        component.setProps({selectedDiary : null})  ;      
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);

    });
})