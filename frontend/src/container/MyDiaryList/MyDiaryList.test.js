import React from 'react';
import {  mount, shallow } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import MyDiaryList from './MyDiaryList';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/previousdiary';
import * as actionTypes from '../../store/actions/actionTypes'
import { Button } from 'semantic-ui-react';


 jest.mock('../../component/Diary/Diary', () => {
    return jest.fn(props => {
        return (
            <div className = 'spyDiary'>
            
            </div>
        );
    })
})

const stubInitialState = {
    diary_list : [],
    garden_list : [],
    selectedDiary : [{
                    'id' : 1,
                    'author': 1,
                    'content': '{"blocks":[{"key":"dl73i","text":"Do. Or do not. There is no try","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                    'categoryName': 'MOVIE',
                    'categoryTitle': 'Star Wars',
                    'emotionScore' : 0,
                    'people' : [],
                    'rating': 5,
                    'created_date': null,
                    'modified_date': null
                }],
    mode : 'PERSON',           //'PERSON' or 'CATEGORY'
    person_id : 1,
    year : 2019,
    month : 12,
    day :1,
    category_name : 'MOVIE'
}

const mockStore = getMockStore(stubInitialState);

describe('<MyDiaryList />', () => {
    let mydiary, spyGetByDate, spyGetByPerson, spyGetByCategory, spySetSearch;
    beforeEach(()=> {
     
        mydiary = (
            <Provider store={mockStore}>
              <ConnectedRouter history={history}>
              <Switch>
                <Route path='/' exact component={MyDiaryList} />
              </Switch>
              </ConnectedRouter>
            </Provider>
          );
          spyGetByDate = jest.spyOn(actionCreators, 'getDiaryByDate')
          .mockImplementation(()=> {return dispatch => {}; });
          spyGetByPerson = jest.spyOn(actionCreators, 'getDiaryByPerson')
          .mockImplementation(()=> {return dispatch => {}; });
          spyGetByCategory = jest.spyOn(actionCreators, 'getDiaryByCategory')
          .mockImplementation(()=> {return dispatch => {}; });
        
          
    });
    afterEach(() => { jest.clearAllMocks() });

    it('should render MyDiaryList', () => {
        const component = mount(mydiary);
        const wrapper = component.find('.MyDiaryList');
        expect(wrapper.length).toBe(1);
    });
    it('should render Diary component', () => {
        const component = mount(mydiary);
        const wrapper = component.find('.spyDiary');
        expect(wrapper.length).toBe(1);
    });
      it(`mode CALENDAR should call onGetDiaryByDate`, () => {
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
        expect(spyGetByDate).toHaveBeenCalledTimes(1);
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
        expect(spyGetByCategory).toHaveBeenCalledTimes(1);
    });

    it('should set state properly on input', () => {
      const mockInitialStore = getMockStore({...stubInitialState, selectedDiary : [{
        'id' : 1,
        'author': 1,
        'content': '{"blocks":[{"key":"dl73i","text":"Do. Or do not. There is no try","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        'categoryName': 'MOVIE',
        'categoryTitle': 'Star Wars',
        'emotionScore' : 0,
        'people' : [],
        'rating': 5,
        'created_date': null,
        'modified_date': null
    }] });
      const component = mount(
        <Provider store={mockInitialStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={MyDiaryList} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );


      expect(component.find('#diary-search-input').length).toBe(2);
      const newState = component.find(MyDiaryList.WrappedComponent).instance();
      const input = component.find('#diary-search-input');
      input.at(1).simulate('change', {
        target : {
          value : 'Do'
        }
      })
      input.at(1).simulate('keypress', {key: 'Enter'})
      expect(newState.state.search).toEqual('Do');
      expect(newState.state.keyword).toEqual('Do');
    })

    it('should set state by button', () => {
      const mockInitialStore = getMockStore({...stubInitialState, selectedDiary : [{
        'id' : 1,
        'author': 1,
        'content': '{"blocks":[{"key":"dl73i","text":"Do. Or do not. There is no try","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        'categoryName': 'MOVIE',
        'categoryTitle': 'Star Wars',
        'emotionScore' : 0,
        'people' : [],
        'rating': 5,
        'created_date': null,
        'modified_date': null
    }] });
      const component = mount(
        <Provider store={mockInitialStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={MyDiaryList} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );


      expect(component.find(Button).length).toBe(1);
      const newButton = component.find(Button);
      const newState = component.find(MyDiaryList.WrappedComponent).instance();
      const input = component.find('#diary-search-input');
      input.at(1).simulate('change', {
        target : {
          value : 'Do'
        }
      })
      newButton.simulate('click')
      expect(newState.state.search).toEqual('Do');
      expect(newState.state.keyword).toEqual('Do');
    })

    
    it('componentdidupdate' , () => {
      mount(mydiary);
      mockStore.dispatch({type : actionTypes.SET_PERSONID});
      expect(spyGetByPerson).toHaveBeenCalledTimes(4);
    });

    it('componentdidupdate 2' , () => {
      const mockInitialStore = getMockStore({...stubInitialState, mode: 'CALENDAR'});
      mount(  
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={MyDiaryList} />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        mockStore.dispatch({type : actionTypes.SET_DAY});
        expect(spyGetByDate).toHaveBeenCalledTimes(1);
    });


    it('componentdidupdate 3' , () => {
      const mockInitialStore = getMockStore({...stubInitialState, mode: 'CATEGORY' });
      const component = mount(  
          <Provider store={mockInitialStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={MyDiaryList} />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        mockStore.dispatch({type : actionTypes.SET_CATEGORY});
        expect(spyGetByCategory).toHaveBeenCalledTimes(1);


      });

   

})