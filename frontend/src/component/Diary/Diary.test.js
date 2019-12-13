import React from 'react';
import { mount } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from '../../store/store'
import axios from 'axios'

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
                    'created_date' : '2019-12-1',                                              
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
              <Route path='/' render={(props) => <Diary {...props}  reated_date={'2019-12-25'} /> } />
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

    it('should show proper info', () => {
        let component = mount(diaryDetail);
        let wrapper1 = component.find('#diary_category_title');
        let wrapper2 = component.find('#diary_rating');
        let wrapper3 = component.find('#diary_person_tag');
        expect(wrapper1.length).toBe(0);
        expect(wrapper2.length).toBe(0);
        expect(wrapper3.length).toBe(0);

            component = mount(
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' render={(props) => <Diary {...props}    id = {1}
                                                                        author = {'user'}
                                                                        content = {'content'}
                                                                        category_name =  {'MOVIE'} 
                                                                        category_title = {'Star Wars'}
                                                                        emotionScore = {0}
                                                                        person_tag = {[{name : 'friend1'}, {name : 'friend2'}]}
                                                                        rating =  {'5'}
                                                                        created_date={'2019-12-25'}

                                                                    /> } />
                </Switch>
                </ConnectedRouter>
            </Provider>
            );
        wrapper1 = component.find('#diary_category_title');
        wrapper2 = component.find('#diary_rating');
        wrapper3 = component.find('#diary_person_tag');
        expect(wrapper1.length).toBe(2);
        expect(wrapper2.length).toBe(2);
        expect(wrapper3.length).toBe(4);
   
    })

    it ('handle share properly', () => {
        const component = mount(
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                <Route path='/' render={(props) => <Diary {...props}    id = {1}
                                                                        author = {'user'}
                                                                        content = {'{"blocks":[{"key":"4np7e","text":"dddd","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'}
                                                                        category_name =  {'MOVIE'} 
                                                                        category_title = {'Star Wars'}
                                                                        emotionScore = {0}
                                                                        person_tag = {[{name : 'friend1'}, {name : 'friend2'}]}
                                                                        rating =  {'5'}
                                                                        created_date={'2019-12-25'}
                                                                    /> } />
                </Switch>
                </ConnectedRouter>
            </Provider>
            );
        
        const spyAxios = jest.spyOn(axios, 'post')
            .mockImplementation((url, user) => {
              return new Promise((resolve, reject) => {
                const result = {
                  status: 200
                };
                resolve(result);
              });
        })
            jest.spyOn(window, 'scrollTo')
        .mockImplementation(()=> {return true});

            let wrapper = component.find('#menu-button');
            wrapper.at(0).simulate('click');
    
    
            wrapper = component.find('#share-button');
            wrapper.at(0).simulate('click');
            wrapper = component.find('#share-cancel-button');
            wrapper.at(0).simulate('click');
            expect(spyAxios).toHaveBeenCalledTimes(0);
    
            wrapper = component.find('#share-button');
            wrapper.at(0).simulate('click');

            const search = component.find('#share-edit-search-input')
            search.simulate('change', {target : {value : 'd'}})
            const replace = component.find('#share-edit-replace-input')
            replace.simulate('change', {target : {value : 'a'}})
            const replacebutton = component.find('#share-edit-replace-button')
            replacebutton.simulate('click')



            wrapper = component.find('#share-confirm-button');
            wrapper.at(0).simulate('click');
            expect(spyAxios).toHaveBeenCalledTimes(1);
    
        

    } )
    // it("componentDidUpdate should update ", () => {
    //     const spyHistoryPush = jest.spyOn(history, 'push')
    //     .mockImplementation(path => {});
    //     const component = mount(diaryDetail);
    //     const wrapper = component.find('Diary');
    //     expect(spyHistoryPush).toHaveBeenCalledTimes(0);
    //     wrapper.setState({selectedDiary : []});   

    // });
})