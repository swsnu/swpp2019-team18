import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { getMockStore } from '../../test_utils/mocks'
import EditDiary from './EditDiary';
import { Switch, Route } from 'react-router-dom';
import { mount} from 'enzyme';
import { createBrowserHistory } from 'history';
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
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
                resolve({data : {
                        content: 'Do. Or do not. There is no try.',
                        categoryName: 'MOVIE', 
                        categoryTitle: 'Star Wars',
                        emotionScore : 0,
                        people : [],
                        rating: 5,
                }});
            })
          });

        const component = mount(editDiary);
        const wrapper = component.find('#diary-submit-button');
        expect(wrapper.length).toBe(2);
    })
})