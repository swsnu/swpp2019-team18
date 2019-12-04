import React from 'react';
import {  mount } from 'enzyme';
import { getMockStore } from '../../test_utils/mocks';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import MyDiaryList from './MyDiaryList';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/previousdiary';

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
                    'content': 'Do. Or do not. There is no try.',
                    'categoryName': 'MOVIE',
                    'categoryTitle': 'Star Wars',
                    'emotionScore' : 0,
                    'people' : [],
                    'rating': 5,
                    'created_date': null,
                    'modified_date': null
                }],
    mode : 'PERSON',           //'PERSON' or 'CATEGORY'
    day :1
}

const mockStore = getMockStore(stubInitialState);

describe('<MyDiaryList />', () => {
    let mydiary, spyGetByDate, spyGetByPerson, spyGetByCategory;
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
    // it("componentDidUpdate should update ", () => {
    //   let mockInitialStore = getMockStore({...stubInitialState, mode : 'CALENDAR' });
    //   let component = mount(
    //     <Provider store={mockInitialStore}>
    //         <ConnectedRouter history={history}>
    //         <Switch>
    //           <Route path='/' exact component={MyDiaryList} />
    //         </Switch>
    //         </ConnectedRouter>
    //       </Provider>
    //   );
    //   component.setProps({day : 2});
    //   component.setProps({day : 3});

    //   // mockInitialStore = getMockStore({...stubInitialState, mode : 'CALENDAR', day : 2 });
    //   // component = mount(
    //   //   <Provider store={mockInitialStore}>
    //   //       <ConnectedRouter history={history}>
    //   //       <Switch>
    //   //         <Route path='/' exact component={MyDiaryList} />
    //   //       </Switch>
    //   //       </ConnectedRouter>
    //   //     </Provider>
    //   // );
    //   expect(spyGetByDate).toHaveBeenCalledTimes(2);

     
    // });

   

})