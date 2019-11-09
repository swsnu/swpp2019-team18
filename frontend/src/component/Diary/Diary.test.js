import React from 'react';
import { mount } from 'enzyme';
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
    
    it('toggle menu', () => {
        let spyWindow = jest.spyOn(window, 'prompt')
        .mockImplementation(()=> {return "share content"});

        const component = mount(diaryDetail);
        let wrapper = component.find('#menu-button');
        wrapper.at(0).simulate('click');


        wrapper = component.find('#share-button');
        wrapper.at(0).simulate('click');
        wrapper = component.find('#share-cancel-button');
        wrapper.at(0).simulate('click');
        expect(spyShareDiary).toHaveBeenCalledTimes(0);

        wrapper = component.find('#share-button');
        wrapper.at(0).simulate('click');
        const contentForm = component.find('#diary-content-input textarea')
        contentForm.simulate('change', {target : {value : 'testedit'}})
        wrapper = component.find('#share-confirm-button');
        wrapper.at(0).simulate('click');
        expect(spyShareDiary).toHaveBeenCalledTimes(1);
        expect(spyWindow).toHaveBeenCalledTimes(0);

        jest.spyOn(window, 'confirm')
        .mockImplementation(()=> {return true});

        wrapper = component.find('#delete-button');
        wrapper.at(0).simulate('click');
        wrapper = component.find('#delete-cancel-button')
        wrapper.at(0).simulate('click');
        expect(spyDeleteDiary).toHaveBeenCalledTimes(0);

        wrapper = component.find('#delete-button');
        wrapper.at(0).simulate('click');
        wrapper = component.find('#delete-confirm-button')
        wrapper.at(0).simulate('click');
        expect(spyDeleteDiary).toHaveBeenCalledTimes(1);

        const spyHistoryPush = jest.spyOn(history, 'push')
        .mockImplementation(path => {});
        wrapper = component.find('#edit-button');
        wrapper.at(0).simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });
    // it("componentDidUpdate should update ", () => {
    //     const spyHistoryPush = jest.spyOn(history, 'push')
    //     .mockImplementation(path => {});
    //     const component = mount(diaryDetail);
    //     const wrapper = component.find('Diary');
    //     expect(spyHistoryPush).toHaveBeenCalledTimes(0);
    //     wrapper.setState({selectedDiary : []});   

    // });
})